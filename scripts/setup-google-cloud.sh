#!/bin/bash

LOG_FILE="scripts/log/setup-google-cloud.log"
mkdir -p scripts/log && >"$LOG_FILE"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

exec 2> >(while read -r line; do log "ERROR: $line"; done)

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  set -a
  source .env
  set +a
  log "Loaded environment variables from .env file."
fi

# Check if required environment variables are set
if [ -z "$GOOGLE_CLOUD_PROJECT_ID" ]; then
  log "Please set GOOGLE_CLOUD_PROJECT_ID."
  exit 1
fi

if [ -z "$GOOGLE_CLOUD_PROJECT_NUMBER" ]; then
  log "Please set GOOGLE_CLOUD_PROJECT_NUMBER."
  exit 1
fi

if [ -z "$GOOGLE_CLOUD_IDENTITY_POOL_ID" ]; then
  log "Please set GOOGLE_CLOUD_IDENTITY_POOL_ID."
  exit 1
fi

if [ -z "$GOOGLE_CLOUD_IDENTITY_PROVIDER_ID" ]; then
  log "Please set GOOGLE_CLOUD_IDENTITY_PROVIDER_ID."
  exit 1
fi

# Get repository URL from git config
REPO_URL=$(git config --get remote.origin.url)
log "Repository URL: $REPO_URL"

# Extract repository owner from URL
REPO_OWNER=$(echo "$REPO_URL" | sed -n 's#.*[:/]\([^/]*\)/[^/]*\.git#\1#p')
if [ -z "$REPO_OWNER" ]; then
  log "Error: Unable to extract repository owner name from the URL."
  exit 1
fi
log "Repository owner: $REPO_OWNER"

# Extract repository name from URL
REPO_NAME=$(echo "$REPO_URL" | sed -n 's#.*[:/][^/]*/\([^/]*\)\.git#\1#p')
if [ -z "$REPO_NAME" ]; then
  log "Error: Unable to extract repository name from the URL."
  exit 1
fi
log "Repository name: $REPO_NAME"

# Extract package name from package.json
PACKAGE_NAME=$(jq -r '.name' package.json)
if [ -z "$PACKAGE_NAME" ]; then
  log "Error: Could not extract name from package.json."
  exit 1
fi
log "Package name: $PACKAGE_NAME"

# Create workload identity pool
gcloud iam workload-identity-pools create "$GOOGLE_CLOUD_IDENTITY_POOL_ID" \
  --location="global" \
  --description="The pool to authenticate GitHub actions." \
  --display-name="Github Action for Pool" \
  --project="$GOOGLE_CLOUD_PROJECT_ID"
log "Created workload identity pool: $GOOGLE_CLOUD_IDENTITY_POOL_ID"

# Create workload identity provider
gcloud iam workload-identity-pools providers create-oidc "$GOOGLE_CLOUD_IDENTITY_PROVIDER_ID" \
  --workload-identity-pool="$GOOGLE_CLOUD_IDENTITY_POOL_ID" \
  --issuer-uri="https://token.actions.githubusercontent.com/" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner,attribute.branch=assertion.sub.extract('/heads/{branch}/')" \
  --location="global" \
  --attribute-condition="assertion.repository_owner=='$REPO_OWNER'" \
  --display-name="Github Action for Pool Provider" \
  --project="$GOOGLE_CLOUD_PROJECT_ID"
log "Created workload identity provider: $GOOGLE_CLOUD_IDENTITY_PROVIDER_ID"

# Create application service account
gcloud iam service-accounts create "$PACKAGE_NAME-app-sa" \
  --display-name="Application Service Account" \
  --description="manages the application resources" \
  --project="$GOOGLE_CLOUD_PROJECT_ID"
log "Created application service account: $PACKAGE_NAME-app-sa"

# Create networking service account
gcloud iam service-accounts create "$PACKAGE_NAME-net-sa" \
  --display-name="Networking Service Account" \
  --description="manages the networking resources" \
  --project="$GOOGLE_CLOUD_PROJECT_ID"
log "Created networking service account: $PACKAGE_NAME-net-sa"

# Add IAM policy bindings for application service account

roles=(
  "roles/artifactregistry.admin"
  "roles/run.admin"
  "roles/run.domainMappingAdmin"
  "roles/iam.serviceAccountUser"
  "roles/iam.serviceAccountTokenCreator"
  "roles/compute.loadBalancerAdmin"
  "roles/compute.networkAdmin"
  "roles/compute.securityAdmin"
  "roles/certificatemanager.admin"
  "roles/dns.admin"
)

# Add IAM policy bindings for application service account
for role in "${roles[@]}"; do
  gcloud projects add-iam-policy-binding "${GOOGLE_CLOUD_PROJECT_ID}" \
    --member="serviceAccount:$PACKAGE_NAME-app-sa@$GOOGLE_CLOUD_PROJECT_ID.iam.gserviceaccount.com" \
    --role="$role"
done
log "Added IAM policy bindings for application service account."

# Add IAM policy binding for networking service account
gcloud iam service-accounts add-iam-policy-binding "$PACKAGE_NAME-net-sa@$GOOGLE_CLOUD_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$GOOGLE_CLOUD_PROJECT_NUMBER/locations/global/workloadIdentityPools/$GOOGLE_CLOUD_IDENTITY_POOL_ID/attribute.repository/$REPO_OWNER/$REPO_NAME" \
  --project="$GOOGLE_CLOUD_PROJECT_ID"
log "Added IAM policy binding for networking service account."

# Add IAM policy binding for application service account
gcloud iam service-accounts add-iam-policy-binding "$PACKAGE_NAME-app-sa@$GOOGLE_CLOUD_PROJECT_ID.iam.gserviceaccount.com" \
  --project="${GOOGLE_CLOUD_PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principal://iam.googleapis.com/projects/$GOOGLE_CLOUD_PROJECT_NUMBER/locations/global/workloadIdentityPools/$GOOGLE_CLOUD_IDENTITY_POOL_ID/subject/repo:$REPO_OWNER/application-repo:ref:refs/heads/main"
log "Added IAM policy binding for application service account (main branch)."

# Add IAM policy binding for application service account
gcloud iam service-accounts add-iam-policy-binding "$PACKAGE_NAME-app-sa@$GOOGLE_CLOUD_PROJECT_ID.iam.gserviceaccount.com" \
  --project="${GOOGLE_CLOUD_PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$GOOGLE_CLOUD_PROJECT_NUMBER/locations/global/workloadIdentityPools/$GOOGLE_CLOUD_IDENTITY_POOL_ID/attribute.repository/$REPO_OWNER/$REPO_NAME"
log "Added IAM policy binding for application service account (repository)."

## Enable required services
services=(
  "compute.googleapis.com"
  "domains.googleapis.com"
  "dns.googleapis.com"
  "certificatemanager.googleapis.com"
)

for service in "${services[@]}"; do
  gcloud services enable "$service" --project="$GOOGLE_CLOUD_PROJECT_ID"
  echo "Enabled $service"
done
