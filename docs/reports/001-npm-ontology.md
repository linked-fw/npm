---
date: 2026-10-27
summary: >
  The first version of @_linked/npm (step CK of CN plan 057): the npm ontology on
  https://linked.cm/ont/npm/ (20 terms, npm:Package ⊑ schema:SoftwareSourceCode, npm:repository ⊑
  schema:codeRepository), the shapes NpmPackage (extends CreativeWork) and NpmDependency, made by
  hand on the layout of @_linked/rdfs. A local repo (main, dev), no remote yet.
---

# 001 — The npm ontology

## PR

### Summary

npm's terms leave `@_linked/core` (core report 080) for their own vocabulary package, like every
other `@_linked` vocabulary (contract K-npm of CN plan 057).

### Changes

- **Repo.** `packages-local/_linked-npm`, `git init` with an initial commit on `main`, branch
  `dev`; files on `@_linked/rdfs`'s layout: changesets (repo `linked-fw/npm`), the PR and publish
  workflows calling `linked-fw/.github@v1`, renovate, LICENSE (MIT), NOTICE, README, CHANGELOG.
- **`package.json`**: `@_linked/npm` `0.0.0`, `"linked": {"kind": "ontology"}` and
  `"linkedPackage": true`, `linkedOntologies` `{"npm": {"namespace": "https://linked.cm/ont/npm/"}}`,
  exports `.`, `./*.js`, `./*`; dependencies `@_linked/core ^2.44.0`, `@_linked/schema ^1.9.1`,
  `@_linked/xsd ^1.4.3`.
- **`src/data/npm.ttl`**: the 20 K-npm terms, each typed, labelled and commented, with domains
  and ranges; `npm:Package ⊑ schema:SoftwareSourceCode`, `npm:repository ⊑ schema:codeRepository`,
  people to `schema:Person`, dependency lists and `npm:engine` to `npm:Dependency`, `npm:private`
  `xsd:boolean`.
- **Generated** `src/ontologies/npm.ts`, `npm.data.ts`, `npm.register.ts` (`linked
  generate-ontology`). `npm:private` is exported as `private_` (a reserved word).
- **Shapes** `NpmPackage` (`npm:Package`, extends `@_linked/schema`'s `CreativeWork`) and
  `NpmDependency` (`npm:Dependency`: `name`, `range`); `shapes/index` registers both and the data.
- **Test** `test/shape-check.test.mjs`: loads the package and its `@_linked/*` dependencies'
  `shapes/index` (as dcat's), the shape check finds nothing on this package's shapes or namespace;
  every term exported (and only those), typed, labelled, commented; the schema.org alignments.
- **Backlog** `001-first-release.md`. Changeset `first-release.md` (minor).

### Verification

- In CN's main checkout after landing: `npx linked build` → `✔ Build successful` (4.3 s);
  `npm test` → `# tests 4`, `# pass 4`, `# fail 0` (0.6 s); `npx linked generate-ontology --check`
  → `npm: 20 terms from src/data/npm.ttl`, `Every ontology module is current.`
- The shape check is not vacuous: with `rdfs:subClassOf schema:SoftwareSourceCode` removed from the
  built Turtle it fails with `error extends-without-subclass: NpmPackage extends CreativeWork, but
  its class https://linked.cm/ont/npm/Package is not a subclass of http://schema.org/CreativeWork`.
- CN workspace member: `npm install` at CN's root (lockfile restored by the hook, `git status`
  clean), `npm ls @_linked/npm` → `@_linked/npm@0.0.0 -> ./packages-local/_linked-npm`.

### Deviations

- **`NpmPackage` extends `CreativeWork`** (the shape check requires it: `npm:Package ⊑
  schema:SoftwareSourceCode ⊑ schema:CreativeWork`). `CreativeWork` already has `name` and
  `description` on `schema:name` / `schema:description`, and an override cannot change a path, so
  the `npm:name` / `npm:description` accessors are `npmName` / `npmDescription`. Recorded under
  K-npm in core's sub-plan 005; the contract's terms and shape names are unchanged.
- **Both `linked.kind` and `linkedPackage: true`** until step RK removes the old flag everywhere
  (sub-plan pitfall).
- **No `package-lock.json`**: an `npm install` inside a checkout of CN's workspace is not allowed;
  backlog 001.
- `@_linked/xsd` is a dependency (the shapes' datatypes), beyond the sub-plan's list.

### Follow-ups

- `docs/backlog/001-first-release.md` — remote, lockfile, first publish, trusted publisher (owner
  actions, plan 057).

## Details

- The dependency lists are `contains` (owned): a dependency node belongs to its package.
- Package records of CN (step PR) type the record `core:OntologyPackage` / `core:AssetPackage` and
  carry `npm:name` / `npm:repository` through these terms.
