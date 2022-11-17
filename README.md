# AFEX App

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Installation

```bash
# Install dependencies from package.json
yarn install
```

## Dev server

```bash
# Launch the dev server
yarn dev
```

## Linting and formatting

```bash
# Lint all files, fixing many violations automatically
yarn lint
```

## Building and deploying to production

```bash
# Build for production with minification
yarn build
```

```bash
# Preview of build 
yarn preview
```

## Environment Variables

May be defined on a `.env` file or direct on OS

| Name                         | Description                   | Default           |
| ---------------------------- | ----------------------------- | ----------------- |
| `VITE_APP_NAME`              | The application name          | `AFEX App`        |
| `VITE_GC_KEY`                | Google Cloud API KEY          |                   |
| `VITE_FB_KEY`                | Firebase API KEY              |                   |
| `VITE_FB_AUTHDOMAIN`         | Firebase Auth domain          |                   |
| `VITE_FB_PROJECTID`          | Firebase Project ID           |                   |
| `VITE_FB_STORAGEBUCKET`      | Firebase Storage Bucket       |                   |
| `VITE_FB_MESSAGINGSENDERID`  | Firebase Messaging SenderId   |                   |
| `VITE_FB_APPID`              | Firebase APP ID               |                   |

## Screeshots

![Saved videos](/public/screenshots/snapshot_1.png)
![Confirm deletion](/public/screenshots/snapshot_2.png)
![Previously added video](/public/screenshots/snapshot_3.png)
![Video detail](/public/screenshots/snapshot_4.png)
