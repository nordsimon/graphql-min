import gqlMinifier from 'graphql-min';

const foo = gqlMinifier`
  {
    foo(id: 1000) {
      bar
      buzz
    }
  }
`;
