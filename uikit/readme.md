[![TypeScript](https://img.shields.io/badge/types-%20TypeScript-blue)](https://www.typescriptlang.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c7a6c178-9394-4213-a420-585466232d77/deploy-status)](https://app.netlify.com/sites/argo-ui-storybook/deploys)
[![Storybook](https://img.shields.io/badge/React-Storybook-ff69b4)](https://argo-ui-storybook.netlify.com)

This package contains the reusable [React](https://reactjs.org/) UI components for the Icgc Argo project.

Basic setup:

```javascript
import { ThemeProvider } from '@icgc-argo/uikit';

const App = () => (
  <ThemeProvider>
    <YourAwesomeApp />
  </ThemeProvider>
);
```

- Built with [Emotion.sh](https://emotion.sh/docs/introduction)
- All component import paths matches [Storybook](https://argo-ui-storybook.netlify.com) structure under `uikit`
  - ex: `import Table from '@icgc-argo/uikit/table`
- Also comes with TypeScript type definitions
