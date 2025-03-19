# Turborepo Fullstack Starter

A full-stack starter kit for modern web application development.

## Overview of Features

### Web Application (Next.js)

| Feature         | Description               | Status |
| --------------- | ------------------------- | ------ |
| ServerComponent | Server-side rendering     | ✅     |
| ClientComponent | Client-side components    | ✅     |
| ServerAction    | Efficient server actions  | ✅     |
| AppRoute        | Latest routing system     | ✅     |
| TailwindCSS     | Utility-first CSS         | ✅     |
| Embedded CSS    | Performance-optimized CSS | ✅     |
| ReduxStore      | State management          | ✅     |
| PWA             | Progressive Web App       | 🚫     |

### API Server (Nest.js)

| Feature     | Description                  | Status |
| ----------- | ---------------------------- | ------ |
| Multiple DB | Multiple MongoDB connections | ✅     |
| REST API    | RESTful API implementation   | ✅     |
| DiscordBot  | Discord integration          | 🚫     |

## Quick Start

### Prerequisites

- [Yarn](https://classic.yarnpkg.com/en/)
- [Nps](https://github.com/sezna/nps)
- [Docker](https://www.docker.com)
- [gcloud CLI](https://cloud.google.com/sdk)

Refer to the official documentation of each tool for detailed installation instructions.

### Starting the Development Environment

```sh
# Prepare the API and start the development server
nps prepare.web && nps dev
```

### Starting the Production Environment

```sh
# Start the web application
nps start.web

# Start the API server in a separate terminal
nps start.api
```

## Detailed Documentation

- [Deployment Guide](./docs/deployment.md)
- [Testing Workflows Guide](./docs/testing-workflows.md)

## Development Guidelines

### Branch Strategy

- `main`: Production environment (PR review required)
- `feat/{username}-*`: Feature development branches

### Commit Rules

```sh
# Recommended: Interactive commit creation
yarn commit
```

Supports creating consistent and high-quality commit messages using Commitizen, Commitlint, and husky.

## Package Structure

| Package  | Description                     |
| -------- | ------------------------------- |
| critters | Optimization of critical CSS    |
| esbuild  | Fast JavaScript bundler         |
| eslint   | Code quality management         |
| jest     | Testing framework               |
| prettier | Code formatter                  |
| tailwind | CSS framework                   |
| tsconfig | Shared TypeScript configuration |
| ui       | Reusable UI components          |

## License

This project is released under the MIT License.
