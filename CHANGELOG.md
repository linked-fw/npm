# @\_linked/npm

## 1.0.0

### Major Changes

- [#11](https://github.com/linked-fw/npm/pull/11) [`1bddab0`](https://github.com/linked-fw/npm/commit/1bddab0b60f23a41d16a1deabddb0776a5fb16ea) Thanks [@flyon](https://github.com/flyon)! - The ontology is registered by `src/ontologies/index.ts` (core's `registerOntologies`), which the package entry imports; the package registers no prefix (an app's prefix map, `linked.app.json`, holds the prefixes; the ontology's data suggests one). `src/package.ts` exports `registerOntologies` instead of `linkedOntology`. Requires the `@_linked/core` major with `registerOntologies`. Removed: `ontologies/npm.data` (`ns`, `dataFiles`, `loadData`) and `ontologies/npm.register`; the terms module `ontologies/npm` holds the terms as `{id}` literals.

### Patch Changes

- [#11](https://github.com/linked-fw/npm/pull/11) [`457b3f5`](https://github.com/linked-fw/npm/commit/457b3f5b01706b0a90a85b9cdbc25358a1a0c780) Thanks [@flyon](https://github.com/flyon)! - The ontology data states its suggested prefix and namespace (`vann:preferredNamespacePrefix`, `vann:preferredNamespaceUri`), which `linked build` now requires. The generated modules are unchanged.

## 0.1.0

### Minor Changes

- [#2](https://github.com/linked-fw/npm/pull/2) [`210ec2e`](https://github.com/linked-fw/npm/commit/210ec2e3c17c737362cfa02a5637529825090f10) Thanks [@flyon](https://github.com/flyon)! - First release: the npm ontology on `https://linked.cm/ont/npm/` (`npm:Package` ⊑
  `schema:SoftwareSourceCode`, `npm:Dependency`, the `package.json` fields as terms) and the shapes
  `NpmPackage` and `NpmDependency`.

### Patch Changes

- [#2](https://github.com/linked-fw/npm/pull/2) [`d2b64c1`](https://github.com/linked-fw/npm/commit/d2b64c18375699856fa816b7d460f90691eccfc2) Thanks [@flyon](https://github.com/flyon)! - `package.json` says what this package is in `"linked": {"kind": "ontology"}` only; the `"linkedPackage": true` beside it is gone (the CLI and server no longer read it).
