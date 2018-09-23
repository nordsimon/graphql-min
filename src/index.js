const compress = require('graphql-query-compress');

function gql(...args) {
  const literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  let result = typeof literals === 'string' ? literals : literals[0];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body;
    } else {
      result += args[i];
    }

    result += literals[i];
  }

  return compress(result);
}

module.exports = gql;
