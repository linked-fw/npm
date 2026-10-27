---
summary: >
  Before @_linked/npm's first release: a GitHub repo linked-fw/npm as its remote, a committed
  package-lock.json (CI runs npm ci), the first `npm publish --access public` by hand, and the
  trusted publisher on npmjs. Owner actions, at the release of CN plan 057.
packages: [npm]
---

# First release of `@_linked/npm`

The package was made as a local repository with no remote (CN plan 057, step CK). Its first
release needs, in this order:

1. **Repository.** Create `linked-fw/npm` on GitHub and add it as `origin`; push `main` and `dev`.
2. **Lockfile.** The repo has no `package-lock.json`: it was made inside CN's workspace, where an
   `npm install` inside a checkout is not allowed. The shared PR and publish workflows run
   `npm ci`, so generate one in a standalone clone (`npm install` there) and commit it, as the
   other `_linked-*` repos have it (`.gitattributes` already marks it generated).
3. **First publish by hand** (`npm publish --access public`, 2FA): npm's trusted publisher can
   only be registered for a package that exists.
4. **Trusted publisher** on npmjs for `.github/workflows/publish.yml` of `linked-fw/npm`; from then
   on a merge with a changeset publishes.
5. Drop `"linkedPackage": true` from `package.json` with every other package's (step RK of plan
   057); `"linked": {"kind": "ontology"}` stays.
