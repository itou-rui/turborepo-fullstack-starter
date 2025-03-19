# Testing Workflows

This project implements configurations for testing GitHub Actions workflows in local environments.

## Prerequisites

1. **Installing act**

   ```sh
   brew install act
   ```

2. **Setting Environment Variables**

   - Copy `.variables.example` to `.variables` and set required values
   - Copy `.env.example` to `.env` and set required values

   > [!NOTE]
   > Values in `.variables` are referenced as `vars.xxx`
   > Values in `.env` are referenced as `secrets.xxx`

## Running Workflow Tests

### Checking Available Jobs

```sh
yarn act:list
```

### Running Tests for Specific Jobs

```sh
yarn act --job=<job_name>
```

## Implemented Workflows

### Deployment Workflow

- **Triggers**:
  - PR merge
  - Manual execution (`workflow_dispatch`)
- **Execution Environments**:
  - Production (`main` branch)
  - Staging (`stage` branch)
  - Development (`dev` branch)
  - Preview (other branches)

### Test Workflow

- **Triggers**:
  - PR creation
  - Commits to PR
- **Execution Contents**:
  - Lint validation
  - Unit Test execution
  - E2E Test execution
  - Build verification

## Troubleshooting

### Common Issues

1. **Docker-related Errors**

   - Verify Docker daemon is running
   - Ensure sufficient disk space

2. **Environment Variable Issues**

   - Check settings in `.variables` and `.env`
   - Verify all required environment variables are set

3. **Permission Issues**
   - Check shell script execution permissions
   - Verify Docker execution permissions
