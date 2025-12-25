# AlgoFi Contribution Guide

Thank you for your interest in contributing to AlgoFi! This guide will walk you through the contribution process.

## 📋 Quick Summary of Changes Made

### Issues Fixed:

1. **Removed broken favicon reference** - `index.html` was referencing a non-existent `logo-fi.png` file
2. **Added environment configuration files** - Created `.env.example` for both backend and frontend
3. **Added GitHub templates** - Created PR and Issue templates for standardized submissions

---

## 🚀 How to Make Your Contribution

### Step 1: Fork the Repository

1. Click the **Fork** button in the top-right corner of the repository
2. This creates your own copy of the project

### Step 2: Clone Your Fork Locally

```bash
git clone https://github.com/<your-username>/AlgoFi.git
cd AlgoFi
```

### Step 3: Create a Feature Branch

Follow the branch naming convention:

```bash
# For bug fixes
git checkout -b fix/issue-description

# For new features
git checkout -b feature/feature-description

# For documentation
git checkout -b docs/documentation-description

# For refactoring
git checkout -b refactor/refactor-description
```

### Step 4: Set Up the Project Locally

#### Backend Setup:

```bash
cd backend
npm install

# Create .env file from .env.example
cp .env.example .env

# Edit .env and add your Algorand credentials
# Then start the server
npm run dev  # For development with hot-reload
# or
npm start    # For production
```

#### Frontend Setup:

```bash
cd frontend
npm install

# Create .env file from .env.example
cp .env.example .env

# Start the frontend
npm start
```

### Step 5: Make Your Changes

#### Code Style Guidelines:

- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use consistent indentation (2 spaces)

#### Commit Message Format (Conventional Commits):

```
<type>(<scope>): <description>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test changes

**Example:**

```bash
git commit -m "fix(frontend): resolve wallet connection timeout issue"
git commit -m "feat(backend): add NFT metadata validation"
git commit -m "docs(readme): update installation instructions"
```

### Step 6: Push Your Changes

```bash
git push origin feature/your-feature-name
```

### Step 7: Create a Pull Request

1. Go to the original repository
2. Click **Compare & pull request**
3. Fill in the PR template with:
   - Clear description of changes
   - Related issues (use `Closes #123`)
   - Type of change (bug, feature, etc.)
   - Testing performed
   - Screenshots (if UI changes)

### Step 8: Code Review Process

The maintainers will:

- Review your code
- Provide feedback if needed
- Suggest improvements
- Merge when approved

---

## 🐛 Types of Contributions

### Bug Fixes

1. Describe the bug clearly in an issue first
2. Include reproduction steps
3. Provide error logs if applicable

### New Features

1. Discuss the feature idea in an issue
2. Wait for approval before implementing
3. Follow the existing architecture

### Documentation

1. Improve README sections
2. Add code comments
3. Create/update API documentation
4. Fix typos and unclear explanations

### Performance Improvements

1. Benchmark before and after
2. Document performance gains
3. Explain the optimization approach

---

## 📁 Project Structure

```
AlgoFi/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API endpoints
│   │   └── services/       # Business logic
│   ├── server.js           # Entry point
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── views/          # Page components
│   │   ├── App.js          # Main component
│   │   └── index.js        # React entry
│   └── package.json
└── smart_contracts/        # PyTeal smart contracts
    └── algomint_contract.py
```

---

## 🧪 Testing

### Before Submitting:

**Backend Tests:**

```bash
cd backend
npm test
npm run dev  # Test manually in browser
```

**Frontend Tests:**

```bash
cd frontend
npm test
npm start    # Test in browser
```

---

## 💡 Common Contribution Scenarios

### Scenario 1: Fixing a Typo

```bash
# 1. Create a branch
git checkout -b fix/typo-in-readme

# 2. Make the change
# 3. Commit
git commit -m "fix(docs): correct typo in README"

# 4. Push and create PR
git push origin fix/typo-in-readme
```

### Scenario 2: Adding a New Feature

```bash
# 1. Discuss in an issue first
# 2. Create branch
git checkout -b feature/wallet-disconnect

# 3. Make changes (backend and frontend)
# 4. Test thoroughly
# 5. Commit with multiple commits if needed
git commit -m "feat(frontend): add wallet disconnect button"
git commit -m "feat(backend): add logout endpoint"

# 6. Push and create PR
git push origin feature/wallet-disconnect
```

### Scenario 3: Reporting a Bug

```
1. Go to Issues tab
2. Click "New Issue"
3. Select "Bug Report"
4. Fill in:
   - Description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment info
   - Screenshots/logs
5. Submit
```

---

## ⚠️ Important Guidelines

1. **Always work from the latest main branch** - Pull latest changes before starting
2. **One feature per PR** - Keep PRs focused and manageable
3. **Don't modify package.json unless necessary** - Discuss with maintainers first
4. **Add tests for new functionality** - Helps maintain code quality
5. **Update documentation** - If changing behavior, update docs
6. **Be respectful** - Follow the Code of Conduct

---

## 🆘 Need Help?

- Check [existing issues](../../issues) for similar problems
- Read the [README](../../README.md) for setup help
- Review [existing code](../../tree/main) for patterns
- Ask questions in your PR - maintainers are here to help!

---

## ✅ Checklist Before Submitting PR

- [ ] Code follows project style guidelines
- [ ] All changes are tested locally
- [ ] Commit messages follow Conventional Commits format
- [ ] No console errors or warnings
- [ ] Documentation is updated if needed
- [ ] Branch is up-to-date with main
- [ ] PR description is clear and complete

---

**Thank you for contributing to AlgoFi! 🎉**
