import gql from 'graphql-min';

const foo = gql`
  {
    foo(id: 1000) {
      bar
      buzz
    }
  }
`;
