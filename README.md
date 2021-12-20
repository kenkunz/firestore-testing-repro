# firestore-testing-repro

## Overview

This repository demonstrates a bug with `@firebase/rules-unit-testing` and/or
`firebase-js-sdk/firestore` (incompatibility between the two).

With `@firebase/rules-unit-testing@2.0.1` and `firebase >=9.0.0 <=9.1.3`, the test utilities work
whether loaded as a cjs require or an es6 module. After upgrading to `firebase >=9.2.0`, the
utilities no longer work when loaded as es6 module, but still work when loaded with cjs require.

## Steps to reproduce

1. install dependency: [Firebase Emulators](https://firebase.google.com/docs/emulator-suite/install_and_configure)
1. clone this repository and install npm modules
   ```bash
   git clone https://github.com/kenkunz/firestore-testing-repro.git
   cd firestore-testing-repro
   npm install
   ```
1. run the tests
   ```bash
   npm run test
   ```
   Note that both `test.js` and `test.cjs` complete successfully

1. upgrade to `firebase@9.2.0` (or greater)
   ```bash
   npm i -D firebase@9.2.0
   ```
1. run the tests again
   ```bash
   npm run test
   ```
   Note that `test.cjs` still passes but `test.js` fails (see error output below)

## Error output

```
FirebaseError: Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore
at doc (file:///Users/ken/Code/firestore-testing-repro/node_modules/@firebase/firestore/dist/index.node.mjs:19998:19)
at file:///Users/ken/Code/firestore-testing-repro/test.js:8:20
at RulesTestEnvironmentImpl.<anonymous> (node_modules/@firebase/rules-unit-testing/dist/index.cjs.js:310:46)
at step (node_modules/@firebase/rules-unit-testing/dist/index.cjs.js:74:23)
at Object.next (node_modules/@firebase/rules-unit-testing/dist/index.cjs.js:55:53)
at /Users/ken/Code/firestore-testing-repro/node_modules/@firebase/rules-unit-testing/dist/index.cjs.js:48:71
at new Promise (<anonymous>)
at __awaiter (node_modules/@firebase/rules-unit-testing/dist/index.cjs.js:44:12)
at RulesTestEnvironmentImpl.withSecurityRulesDisabled (node_modules/@firebase/rules-unit-testing/dist/index.cjs.js:300:16)
at Context.<anonymous> (file:///Users/ken/Code/firestore-testing-repro/test.js:7:19)
at processTicksAndRejections (node:internal/process/task_queues:96:5)
```
