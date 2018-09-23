const {
  isIdentifier,
  isImportDefaultSpecifier,
  templateLiteral,
} = require('babel-types');

const { name: packageName } = require('../package.json');

const gql = require('./index');

module.exports = () => {
  const compile = path => templateLiteral(
    path.node.quasis.map((node) => {
      // eslint-disable-next-line no-param-reassign
      node.value.raw = gql(node.value.raw).trim();

      return node;
    }),
    path.node.expressions,
  );

  return {
    visitor: {
      Program(programPath) {
        const tagNames = [];

        programPath.traverse({
          ImportDeclaration(path) {
            if (path.node.source.value === packageName) {
              const defaultSpecifier = path.node.specifiers
                .find(specifier => isImportDefaultSpecifier(specifier));

              if (defaultSpecifier) {
                tagNames.push(defaultSpecifier.local.name);

                if (path.node.specifiers.length === 1) {
                  path.remove();
                } else {
                  // eslint-disable-next-line no-param-reassign
                  path.node.specifiers = path.node.specifiers.filter(
                    specifier => specifier !== defaultSpecifier,
                  );
                }
              }
            }
          },
          TaggedTemplateExpression(path) {
            if (tagNames.some(name => isIdentifier(path.node.tag, { name }))) {
              try {
                const body = compile(path.get('quasi'));
                path.replaceWith(body);
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error('error', error);
              }
            }
          },
        });
      },
    },
  };
};
