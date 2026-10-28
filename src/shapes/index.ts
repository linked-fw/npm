/**
 * Registers every shape this package defines, and nothing else.
 *
 * A shape registers when its module is evaluated, so this module exists to be
 * imported for that side effect alone: `import '@_linked/npm/shapes/index';`
 * It has no exports, so it loads in plain node as well as in a bundle. The
 * package entry imports it instead of listing shapes itself.
 */
import '../ontologies/npm.register.js';
import './NpmDependency.js';
import './NpmPackage.js';
