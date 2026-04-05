/** @type {import('eslint').Rule.RuleModule} */
export const noDomainDeepImports = {
  meta: {
    type: 'problem',
    docs: { description: 'Enforce imports from domain index files only' },
    messages: {
      noDeepImport:
        "Deep import from domain '{{domain}}' is not allowed. Import from '@/domains/{{domain}}' instead."
    }
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        // Match @/domains/<domain>/<anything>
        const match = importPath.match(/^@\/domains\/([^/]+)\/.+/);
        if (!match) return;
        const importedDomain = match[1];
        const currentFile = context.filename.replaceAll('\\', '/');
        const isInsideSameDomain = currentFile.includes(
          `/domains/${importedDomain}/`
        );
        if (!isInsideSameDomain) {
          context.report({
            node,
            messageId: 'noDeepImport',
            data: { domain: importedDomain }
          });
        }
      }
    };
  }
};
