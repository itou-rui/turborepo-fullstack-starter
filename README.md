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
