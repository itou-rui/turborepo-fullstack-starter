# Turborepo Fullstack Starter

This is a starter project for a full-stack application using Turborepo.

The following applications are included:

## Included in this project

| Web (Next.js)   | Description                                       | Support |
| --------------- | ------------------------------------------------- | ------- |
| ServerComponent | Rendering on the server                           | ✅      |
| ClientComponent | Client on the server                              | ✅      |
| ServerAction    | New ability to omit redundant HTTP methods        | ✅      |
| AppRoute        | Latest routing methods                            | ✅      |
| TailwindCSS     | CSS Library                                       | ✅      |
| Embedded CSS    | Embed CSS in the head tag to maximize performance | ✅      |
| ReduxStore      | State controlled library                          | ✅      |
| PWA             | Functions to be enabled on the terminal           | 🚫      |

| API (Nest.js)      | Description                             | Support |
| ------------------ | --------------------------------------- | ------- |
| Multiple databases | Connect to multiple Mongodb databases   | ✅      |
| REST               | API that follows REST design principles | ✅      |
| DiscordBot         | Discord App Use Cases                   | 🚫      |

| Packages | Description                                                    |
| -------- | -------------------------------------------------------------- |
| critters | A plugin to inline critical CSS and lazy-load the rest         |
| esbuild  | An extremely fast JavaScript bundler and minifier              |
| eslint   | A tool for identifying and reporting on patterns in JavaScript |
| jest     | A delightful JavaScript testing framework                      |
| prettier | An opinionated code formatter                                  |
| tailwind | A utility-first CSS framework for rapid UI development         |
| tsconfig | Shared TypeScript configurations                               |
| ui       | A collection of reusable UI components                         |

## Requirements

1. [Yarn](https://classic.yarnpkg.com/en/)

```sh
npm install --global yarn
```

2. [Nps](https://github.com/sezna/nps)

```sh
npm install --global nps
```

3. [Docker](https://www.docker.com)

You can [install](https://docs.docker.com/desktop/) it any way you like.

4. [gcloud](https://cloud.google.com/sdk?hl=en)

You can [install](https://cloud.google.com/sdk/docs/install?hl=en) it any way you like.

```sh
gcloud auth login
```

## Run Project

1. Develop Mode

```sh
nps prepare.api && nps dev
```

2. Production Mode

> [!WARNING]
> Run it in a separate terminal.

```sh
nps start.web
```

```sh
nps start.api
```

## Commit

The following is incorporated

The recommended commit method is `yarn commit` or `npm run commit`.
You can create commits interactively

| Commit     | Description                                    |
| ---------- | ---------------------------------------------- |
| Commitizen | Standard for consistent commitments            |
| Commitlint | Inspect for commitments according to the rules |
| husky      | Automatically inspect when `git commit` is run |

## Deploy (Google Cloud Run)

1. Edit `name` in [package.json](./package.json)

> [!WARNING]
> Please respect GoogleCloudRun's naming conventions.
> Only `-` special symbols are allowed and names exceeding 32 characters cannot be set.
> Prefixes are handled internally in the system and must be set to 20 characters.

2. Copy [.env.example](./.env.example) to `.env` and fill in the values

3. Run Scripts

> [!NOTE]
> Please grant the authority to execute shell scripts in advance!

```sh
yarn setup-google-cloud
```

## Testing Github Workflow

1. Install [act](https://github.com/nektos/act)

```sh
brew install act
```

2. Copy [.variables.example](./.variables.example) to `.variables` and fill in the values

> [!NOTE]
> The values in this file are called out in `vars.xxx`!

3. Copy [.env.example](./.env.example) to `.env` and fill in the values

> [!NOTE]
> The values in this file are called out in `secrets.xxx`!

4. Run test

```sh
yarn act --job=job_name
```

> [!NOTE]
> Run `act:list` to see the list of jobs
