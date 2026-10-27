// Runs against the built lib: `linked build && npm test`.
//
// The shape check (`@_linked/core/shapes/checkShapeHierarchy`) holds this package to the rules
// every vocabulary package follows: each shape's `extends` agrees with the class hierarchy in
// `src/data/npm.ttl`, each shape owns the class it targets, and no shape or exported term uses an
// `npm:` IRI the ontology does not define. Every term of the ontology is exported and typed.
//
// The package and its framework dependencies load the way an app loads them (each one's
// `shapes/index`, which registers its ontology data as well), so `npm:Package ⊑
// schema:SoftwareSourceCode ⊑ schema:CreativeWork` is known. Findings about the dependencies'
// shapes belong to their own packages: only this package's shapes and namespace count here.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const NS = 'https://linked.cm/ont/npm/';

await import(new URL('lib/esm/index.js', root).href);
for (const dep of Object.keys(manifest.dependencies ?? {})) {
  if (dep.startsWith('@_linked/') && dep !== '@_linked/core') await import(`${dep}/shapes/index`);
}
const npm = await import(new URL('lib/esm/ontologies/npm.js', root).href);
const { checkShapeHierarchy } = await import('@_linked/core/shapes/checkShapeHierarchy');
const { getAllNodeShapes, getShapeClass } = await import('@_linked/core/utils/ShapeClass');

const ownShape = (iri) => iri !== undefined && getShapeClass(iri)?.packageName === manifest.name;

const TERMS = {
  classes: ['Package', 'Dependency'],
  literals: ['name', 'version', 'description', 'keyword', 'license', 'private', 'range'],
  iris: ['homepage', 'repository', 'bugs'],
  people: ['author', 'contributor', 'maintainer'],
  dependencies: ['dependency', 'devDependency', 'peerDependency', 'optionalDependency', 'engine'],
};

describe('shape check', () => {
  it("finds nothing in this package's shapes or in its namespace", async () => {
    assert.ok([...getAllNodeShapes().keys()].some(ownShape), 'no shape of this package registered');
    const findings = (await checkShapeHierarchy()).filter(
      (f) => ownShape(f.shape) || (f.kind === 'mirror-undefined-term' && f.iri?.startsWith(NS)),
    );
    assert.deepEqual(
      findings.map((f) => `${f.severity} ${f.kind}: ${f.message}`),
      [],
    );
  });
});

describe('the npm ontology', () => {
  const turtle = readFileSync(new URL('lib/esm/data/npm.ttl', root), 'utf8');
  const all = Object.values(TERMS).flat();

  // A term named like a reserved word is exported with a trailing underscore (`private_`).
  const exportName = (term) => (term === 'private' ? 'private_' : term);

  it('exports every term, and only those', () => {
    for (const term of all) assert.equal(npm[exportName(term)]?.id, `${NS}${term}`, term);
    const exported = Object.keys(npm)
      .filter((k) => typeof npm[k]?.id === 'string' && npm[k].id.startsWith(NS) && npm[k].id !== NS)
      .map((k) => npm[k].id.slice(NS.length));
    assert.deepEqual(exported.sort(), [...all].sort());
  });

  it('types, labels and comments every term in npm.ttl', () => {
    for (const term of all) {
      const block = turtle.split(/\n\n/).find((b) => b.startsWith(`npm:${term}\n`));
      assert.ok(block, `npm:${term} is declared`);
      const type = TERMS.classes.includes(term)
        ? 'owl:Class'
        : TERMS.literals.includes(term)
          ? 'owl:DatatypeProperty'
          : 'owl:ObjectProperty';
      assert.match(block, new RegExp(`a ${type} ;`), term);
      assert.match(block, /rdfs:label "/, term);
      assert.match(block, /rdfs:comment "/, term);
    }
  });

  it('aligns with schema.org', () => {
    assert.match(turtle, /npm:Package\n[^]*?rdfs:subClassOf schema:SoftwareSourceCode/);
    assert.match(turtle, /npm:repository\n[^]*?rdfs:subPropertyOf schema:codeRepository/);
    for (const term of TERMS.people) {
      const block = turtle.split(/\n\n/).find((b) => b.startsWith(`npm:${term}\n`));
      assert.match(block, /rdfs:range schema:Person/, term);
    }
    for (const term of TERMS.dependencies) {
      const block = turtle.split(/\n\n/).find((b) => b.startsWith(`npm:${term}\n`));
      assert.match(block, /rdfs:range npm:Dependency/, term);
    }
  });
});
