# Contributing to The Crumb Log

## Branching Workflow

We use a simple branching strategy to maintain clean git history and enable code review:

### Branch Structure

- **`main`** - Production-ready code. Only merged via Pull Requests.
- **`develop`** - Development integration branch. Feature branches merge here first.
- **`feature/*`** - Feature branches for new functionality (e.g., `feature/search`, `feature/discussions`)

### Workflow

1. **Start a new feature:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Work on your feature:**
   - Make commits with clear messages
   - Push your branch regularly
   ```bash
   git push -u origin feature/your-feature-name
   ```

3. **Create a Pull Request:**
   - Go to GitHub and create a PR from `feature/your-feature-name` → `develop`
   - Add a description of what the PR does
   - Review your own changes
   - Merge when ready

4. **After merging:**
   ```bash
   git checkout develop
   git pull origin develop
   git branch -d feature/your-feature-name  # Delete local branch
   ```

5. **When ready for production:**
   - Create a PR from `develop` → `main`
   - Review and merge to deploy

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add search functionality`
- `fix: resolve recipe submission bug`
- `style: update bread card styling`
- `refactor: reorganize auth context`

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `style/description` - Styling changes

