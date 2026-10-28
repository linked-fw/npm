import {literalProperty, objectProperty} from '@_linked/core/shapes/SHACL';
import {Shape} from '@_linked/core/shapes/Shape';
import {CreativeWork} from '@_linked/schema/shapes/CreativeWork';
import {Person} from '@_linked/schema/shapes/Person';
import * as xsd from '@_linked/xsd/ontologies/xsd';
import * as npm from '../ontologies/npm.js';
import {linkedShape} from '../package.js';
import {NpmDependency} from './NpmDependency.js';

/**
 * An npm package as its `package.json` describes it. `homepage`, `repository` and `bugs` are
 * IRIs (`{id}`); each dependency list holds `NpmDependency` nodes the package owns.
 *
 * `npm:Package` is a `schema:SoftwareSourceCode`, a `schema:CreativeWork`, so the shape extends
 * `CreativeWork`, whose `name` and `description` are `schema:name` / `schema:description`. The
 * package.json fields are `npmName` and `npmDescription` (`npm:name`, `npm:description`).
 */
@linkedShape({
  name: 'NpmPackage',
  description:
    'An npm package as its package.json describes it: name, version, description, keywords, license, links, people and dependencies. (package, npm, package.json, library)',
})
export class NpmPackage extends CreativeWork {
  static targetClass = npm.Package;

  /** The npm name, with its scope if it has one, e.g. `@_linked/npm`. */
  @literalProperty({path: npm.name, datatype: xsd.string, required: true, maxCount: 1})
  get npmName(): string {
    return null;
  }

  @literalProperty({path: npm.version, datatype: xsd.string, maxCount: 1})
  get version(): string {
    return null;
  }

  @literalProperty({path: npm.description, datatype: xsd.string, maxCount: 1})
  get npmDescription(): string {
    return null;
  }

  @literalProperty({path: npm.keyword, datatype: xsd.string})
  get keywords(): string[] {
    return null;
  }

  /** An SPDX expression, e.g. `MIT`. */
  @literalProperty({path: npm.license, datatype: xsd.string, maxCount: 1})
  get license(): string {
    return null;
  }

  @literalProperty({path: npm.private_, datatype: xsd.boolean, maxCount: 1})
  get private(): boolean {
    return null;
  }

  @objectProperty({path: npm.homepage, shape: Shape, maxCount: 1})
  get homepage(): Shape {
    return null;
  }

  @objectProperty({path: npm.repository, shape: Shape, maxCount: 1})
  get repository(): Shape {
    return null;
  }

  @objectProperty({path: npm.bugs, shape: Shape, maxCount: 1})
  get bugs(): Shape {
    return null;
  }

  @objectProperty({path: npm.author, shape: Person, maxCount: 1})
  get author(): Person {
    return null;
  }

  @objectProperty({path: npm.contributor, shape: Person})
  get contributors(): Person[] {
    return null;
  }

  @objectProperty({path: npm.maintainer, shape: Person})
  get maintainers(): Person[] {
    return null;
  }

  @objectProperty({path: npm.dependency, shape: NpmDependency, contains: true})
  get dependencies(): NpmDependency[] {
    return null;
  }

  @objectProperty({path: npm.devDependency, shape: NpmDependency, contains: true})
  get devDependencies(): NpmDependency[] {
    return null;
  }

  @objectProperty({path: npm.peerDependency, shape: NpmDependency, contains: true})
  get peerDependencies(): NpmDependency[] {
    return null;
  }

  @objectProperty({path: npm.optionalDependency, shape: NpmDependency, contains: true})
  get optionalDependencies(): NpmDependency[] {
    return null;
  }

  @objectProperty({path: npm.engine, shape: NpmDependency, contains: true})
  get engines(): NpmDependency[] {
    return null;
  }
}
