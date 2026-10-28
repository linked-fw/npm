# @\_linked/npm

## 0.1.0

### Minor Changes

- [#2](https://github.com/linked-fw/npm/pull/2) [`210ec2e`](https://github.com/linked-fw/npm/commit/210ec2e3c17c737362cfa02a5637529825090f10) Thanks [@flyon](https://github.com/flyon)! - First release: the npm ontology on `https://linked.cm/ont/npm/` (`npm:Package` ⊑
  `schema:SoftwareSourceCode`, `npm:Dependency`, the `package.json` fields as terms) and the shapes
  `NpmPackage` and `NpmDependency`.

### Patch Changes

- [#2](https://github.com/linked-fw/npm/pull/2) [`d2b64c1`](https://github.com/linked-fw/npm/commit/d2b64c18375699856fa816b7d460f90691eccfc2) Thanks [@flyon](https://github.com/flyon)! - `package.json` says what this package is in `"linked": {"kind": "ontology"}` only; the `"linkedPackage": true` beside it is gone (the CLI and server no longer read it).
