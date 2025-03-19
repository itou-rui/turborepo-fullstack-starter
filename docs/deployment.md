# Deployment

This project implements automated deployment to Google Cloud Platform (GCP) using GitHub Actions.

## Environment Configuration

The following four environments are available:

- `prod`: Production environment (main branch)
- `stage`: Staging environment (stage branch)
- `dev`: Development environment (dev branch)
- `prev`: Preview environment (other branches)

## Deployment Flow

### Automated Deployment

Deployment is automatically executed when changes are pushed to the following files:

- `apps/web/**`
- `apps/api/**`
- `packages/critters/**`
- `packages/ui/**`

### Manual Deployment

Manual deployment can be executed using the `workflow_dispatch` event.
However, direct deployment to `main`, `stage`, and `dev` branches is restricted.

## Infrastructure

### Cloud Run

Applications are deployed on Google Cloud Run and provide the following services:

- Web Application: `{app-name}-web`
- API Server: `{app-name}-api`

### Load Balancer

Cloud Load Balancing provides the following features:

- SSL/TLS termination
- Custom domain management
- Traffic control (Blue/Green deployment)

### Domain Configuration

Each environment uses the following domain format:

- Production: `https://{app-name}.{domain}`
- Staging: `https://stage.{app-name}.{domain}`
- Development: `https://dev.{app-name}.{domain}`
- Preview: `https://{branch-name}.{app-name}.{domain}`

> [!NOTE]
> The `app-name` may be omitted.
> Can be set up without specifying subdomains before building the load balancer

## Required Environment Variables

### Common

- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_CLOUD_PROJECT_NUMBER`
- `GOOGLE_CLOUD_IDENTITY_POOL_ID`
- `GOOGLE_CLOUD_IDENTITY_PROVIDER_ID`

### Web Application

All [env](../apps/web/.env.example) values listed in the file.

### API Server

All [env](.../apps/api/.env.example) values listed in the file.

## Traffic Control

Traffic control during deployment is handled as follows:

- Production environment: Migrate 100% of traffic to the new revision
- Other environments: Deploy new revision with tags while maintaining existing production traffic

## Security

- All deployments are authenticated using Workload Identity
- Environment variables are securely managed as GitHub Secrets
- Secure communication using HTTPS only
