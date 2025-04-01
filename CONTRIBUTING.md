# Contributing to Solid Memo

We greatly appreciate your interest in contributing! Our goal is to make contributing to this project as smooth and transparent as possible. Whether you're:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Interested in becoming a maintainer

...we welcome your participation!

## We Develop with GitHub

We use GitHub to host the code, track issues, manage feature requests, and accept pull requests. All contributions happen via GitHub.

## We Follow [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)

We use the [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow) workflow, so all code changes are made via pull requests. Here's how you can contribute:

1. Fork the repository and create a new branch from `main`.
1. Write tests for any new code you've added.
1. Update documentation if you’ve made changes to any APIs.
1. Run the test suite to ensure everything is working.
1. Submit your pull request!

## Commit Messages: Follow the "Conventional Commits" Format

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to standardize commit messages. This makes it easier to automate versioning and changelog generation.

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- Type: one of the commit types listed above (e.g., feat, fix, docs, etc.)
- Scope: the part of the project the change affects (optional but recommended)
- Append a `!` after the type/scope to indicate the commit contains a breaking API change.
- Message: a concise description of what was changed (use the present tense)

This ensures a consistent history that is easy to read and understand.

Here's a quick guide:

- feat!: A breaking API change.
  - Example: `feat!: remove deprecated fields from response`
- feat: A new feature or enhancement.
  - Example: `feat(auth): add login functionality`
- fix: A bug fix.
  - Example: `fix(button): resolve issue with hover state`
- docs: Documentation changes.
  - Example: `docs(readme): update contributing guidelines`
- style: Changes to code style (e.g., formatting, spacing).
  - Example: `style(css): refactor button styling`
- refactor: Code changes that neither fix a bug nor add a feature, but improve code quality or structure.
  - Example: `refactor(auth): clean up token handling`
- test: Changes related to tests.
  - Example: `test(auth): add unit tests for login`
- chore: Routine tasks such as updating dependencies or build configurations.
  - Example: `chore(deps): update npm packages`

## License

By contributing, you agree that your contributions will be licensed under the [Apache-2.0 license](https://github.com/antwika/solid-memo/blob/main/LICENSE.md), which applies to this project. If you have any concerns, feel free to reach out to the maintainers.

## Reporting Bugs

To report bugs, please open an issue on our [GitHub Issues page](https://github.com/antwika/solid-memo/issues).

### Writing Good Bug Reports

Great bug reports help us resolve issues faster! When reporting a bug, please include:

- A brief summary of the issue.
- Steps to reproduce:
  - Be as specific as possible.
  - If possible, provide sample code that others can run to replicate the problem.
- Expected behavior — What you thought should happen.
- Actual behavior — What actually happened.
- Additional notes — Include any ideas or observations you have (e.g., why you think the bug is happening or what you tried that didn’t work).

Thorough bug reports are incredibly helpful, so please provide as much detail as you can.

## Thank You!

We appreciate all contributions, whether large or small. Your involvement makes Solid Memo better for everyone!
