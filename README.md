# @_linked/npm

The fields of an npm package's `package.json` as a Linked ontology, on
`https://linked.cm/ont/npm/` (prefix `npm:`), with the shapes `NpmPackage` and `NpmDependency`.

`package.json` carries `"linked": {"kind": "ontology"}`: an ontology package that also carries
shapes for its own terms.

## Install

```bash
npm install @_linked/npm
```

## Terms

| Term | Kind | What |
|---|---|---|
| `npm:Package` | class, `rdfs:subClassOf schema:SoftwareSourceCode` | an npm package |
| `npm:Dependency` | class | one entry of a dependency list or of `engines`: `npm:name` + `npm:range` |
| `npm:name`, `npm:version`, `npm:description`, `npm:keyword`, `npm:license` | literals (`xsd:string`) | `name`, `version`, `description`, `keywords`, `license` |
| `npm:private` | literal (`xsd:boolean`) | `private` |
| `npm:range` | literal (`xsd:string`) | the range a dependency accepts |
| `npm:homepage`, `npm:bugs` | IRIs | `homepage`, `bugs` |
| `npm:repository` | IRI, `rdfs:subPropertyOf schema:codeRepository` | `repository` |
| `npm:author`, `npm:contributor`, `npm:maintainer` | to `schema:Person` | `author`, `contributors`, `maintainers` |
| `npm:dependency`, `npm:devDependency`, `npm:peerDependency`, `npm:optionalDependency`, `npm:engine` | to `npm:Dependency` | `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`, `engines` |

```ts
import * as npm from '@_linked/npm/ontologies/npm';

npm.Package;   // {id: 'https://linked.cm/ont/npm/Package'}
npm.private_;  // npm:private (a reserved word, exported with a trailing underscore)
```

The terms, labels, comments and alignments are in `src/data/npm.ttl`. The modules in
`src/ontologies/` are generated from it by `linked generate-ontology` (from `linkedOntologies` in
`package.json`); never edit them by hand.

## Shapes

```ts
import {NpmPackage} from '@_linked/npm/shapes/NpmPackage';
import {NpmDependency} from '@_linked/npm/shapes/NpmDependency';
```

- **`NpmPackage`** (`npm:Package`) extends `CreativeWork` from `@_linked/schema`, since
  `npm:Package` is a `schema:CreativeWork`. `name` and `description` are therefore the inherited
  `schema:name` / `schema:description`; the `package.json` fields are `npmName` (`npm:name`) and
  `npmDescription` (`npm:description`). The others: `version`, `keywords`, `license`, `private`,
  `homepage`, `repository`, `bugs` (IRIs, `{id}`), `author`, `contributors`, `maintainers`
  (`Person`), and the owned dependency lists `dependencies`, `devDependencies`,
  `peerDependencies`, `optionalDependencies`, `engines` (`NpmDependency`).
- **`NpmDependency`** (`npm:Dependency`): `name` and `range`.

`import '@_linked/npm/shapes/index'` registers both shapes and the ontology data.

## Development

```bash
npx linked build && npm test
```

`npm test` runs the shape check on the build output: each shape's `extends` agrees with the class
hierarchy, and every term is exported and typed in `npm.ttl`.
