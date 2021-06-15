# my-vue-monorepo

## Project setup
```
yarn install
```
## Storybook with hot reload
```
yarn sb
```
## Unit tests 
```
yarn test:unit
```
## Interactive unit tests 
```
yarn test:interactive
```
## How to create a new component
```
yarn new

```
## How to create a vue app

```
$ cd packages

$ vue create hello-world-app

$ yarn workspaces info

yarn workspaces v1.22.5
{
  "@kfern/components": {
    "location": "packages/components",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "hello-world-app": {
    "location": "packages/hello-world-app",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }

```
## Add components dependency

```
$ lerna add @kfern/components --scope=hello-world-app 

```

in packages/hello-world-app/src/App.vue

```
- import HelloWorld from './components/HelloWorld.vue'
+ import { HelloWorld } from "@kfern/components";
```

You are now using packages/components, so you can delete packages/hello-world-app/src/components folder and test/unit/example.spec.* file

## MIT License

Copyright (c) 2021 Fernando Navarro https://github.com/kfern
