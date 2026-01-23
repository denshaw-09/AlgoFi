# Contributing to AlgoFi

First off, thank you for taking the time to contribute! 🎉
We appreciate your help in making this project better.

---

##  Table of Contents

* [Code of Conduct](#-code-of-conduct)
* [How to Contribute](#-how-to-contribute)
* [Setting Up the Project Locally](#-setting-up-the-project-locally)
* [Branch Naming Convention](#-branch-naming-convention)
* [Commit Message Guidelines](#-commit-message-guidelines)
* [Pull Request Process](#-pull-request-process)
* [Issue Reporting Guidelines](#-issue-reporting-guidelines)
* [Style Guidelines](#-style-guidelines)
* [Community and Communication](#-community-and-communication)

---

##  Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).
Please be respectful and considerate of others at all times.

---

##  How to Contribute

There are several ways you can help improve this project:

* 🐛 **Report bugs** you find in the [Issues](../../issues) tab.
* 💡 **Suggest features** or improvements.
* 🧩 **Submit pull requests** to fix bugs or add features.
* 🧹 **Improve documentation** and code comments.
* ⚙️ **Refactor** existing code or optimize performance.

---

## ⚙️ Setting Up the Project Locally

1. **Fork the repository**
   Click on the "Fork" button at the top right corner of this page.

2. **Clone your fork**

   ```bash
   git clone https://github.com/<your-username>/AlgoFi.git
   cd AlgoFi
   ```

3. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**

   ```bash
   # Example for Python
   pip install -r requirements.txt

   # Example for Node.js
   npm install
   ```

5. **Run and test locally**
   Follow any specific setup instructions in the `README.md`.

---

##  Branch Naming Convention

Please follow this pattern for branches:

| Type          | Format                       | Example                  |
| ------------- | ---------------------------- | ------------------------ |
| Feature       | `feature/short-description`  | `feature/add-dark-mode`  |
| Bug Fix       | `fix/short-description`      | `fix/login-error`        |
| Documentation | `docs/short-description`     | `docs/update-readme`     |
| Refactor      | `refactor/short-description` | `refactor/cleanup-utils` |

---

##  Commit Message Guidelines

Follow the **Conventional Commits** format:

```
<type>(optional scope): <description>
```

**Types:**

* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation changes
* `style`: Formatting, missing semi-colons, etc.
* `refactor`: Code change that neither fixes a bug nor adds a feature
* `test`: Adding or modifying tests
* `chore`: Maintenance tasks, dependency updates, etc.

**Example:**

```
feat(auth): add JWT-based login system
fix(ui): correct alignment issue in header
```

---

##  Pull Request Process

1. **Ensure your branch is up to date**

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run all tests and linters** before pushing.

3. **Open a Pull Request (PR)**

   * Clearly describe what your PR does and why.
   * Link to related issues using `Closes #issue_number`.

4. **Request review** from a maintainer.

5. Once approved, your PR will be merged into the main branch.

---

##  Issue Reporting Guidelines

When opening a new issue, please include:

* A **clear title and description**
* Steps to reproduce (if a bug)
* Expected vs actual behavior
* Screenshots or logs (if applicable)
* Environment details (OS, version, dependencies, etc.)

---

##  Style Guidelines

Maintain consistency throughout the codebase:

* Use clear, descriptive variable and function names.
* Write modular, reusable code .
* Document functions and modules with comments or docstrings incude tests (if applicable).

---

## Community and Communication

We value open and respectful communication within the AlgoFi community.
You can engage with us through the following channels:

- **Discord**: Join our Discord server for contributor discussions, questions, and real-time collaboration.  
  **Discord Invite:** [<DISCORD_LINK>](https://discord.gg/VcbbKWC9Xc)

- **GitHub Discussions**: Use GitHub Discussions for design proposals, feature ideas, and long-form conversations.

- **GitHub Issues**: Report bugs or ask technical questions by opening an issue.

Please ensure all interactions follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---
