# Commit Configuration

## Types of Commits

The following commit types are available:

| Type     | Description                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------- |
| feat     | A new feature                                                                                  |
| fix      | A bug fix                                                                                      |
| docs     | Documentation only changes                                                                     |
| style    | Changes that do not affect the meaning of the code (whitespace, formatting, semi-colons, etc.) |
| refactor | A code change that neither fixes a bug nor adds a feature                                      |
| perf     | A code change that improves performance                                                        |
| test     | Adding missing tests                                                                           |
| chore    | Changes to the build process or auxiliary tools and documentation generation                   |
| revert   | Revert to a commit                                                                             |
| WIP      | Work in progress                                                                               |

## Scopes

The following scopes are available:

- web
- api
- workflows
- packages
- scripts
- docs

## How to Commit

1. Recommended commit method:

```bash
yarn commit
```

or

```bash
npm run commit
```

2. Follow the interactive prompts to enter:

- Type of change
- Scope of change (optional)
- Brief description of the change (within 50 characters)
- Breaking changes (optional)
- Related issues (optional)

## Commit Message Rules

- Maximum header length: 100 characters
- Maximum body line length: 100 characters
- Maximum footer line length: 100 characters
- Type must be lowercase
- Description must be in imperative mood
- No period at the end
- Description cannot be empty

## Validation

All commits are automatically validated by `commitlint` and checked through `husky` when `git commit` is executed.
