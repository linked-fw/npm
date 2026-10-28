import {literalProperty} from '@_linked/core/shapes/SHACL';
import {Shape} from '@_linked/core/shapes/Shape';
import * as xsd from '@_linked/xsd/ontologies/xsd';
import * as npm from '../ontologies/npm.js';
import {linkedShape} from '../package.js';

/** One entry of a package's dependency list or engines: a package (or engine) name and the range accepted. */
@linkedShape({
  name: 'NpmDependency',
  description:
    'One entry of an npm package\'s dependency list or engines: the name of a package or engine and the version range accepted. (dependency, engine, version range)',
})
export class NpmDependency extends Shape {
  static targetClass = npm.Dependency;

  /** The name of the package (or engine) depended on, e.g. `@_linked/core` or `node`. */
  @literalProperty({path: npm.name, datatype: xsd.string, required: true, maxCount: 1})
  get name(): string {
    return null;
  }

  /** The range accepted, as npm writes it, e.g. `^2.44.0`. */
  @literalProperty({path: npm.range, datatype: xsd.string, maxCount: 1})
  get range(): string {
    return null;
  }
}
