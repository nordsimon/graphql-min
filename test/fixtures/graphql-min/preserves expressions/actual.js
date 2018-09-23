import gql from 'graphql-min';

const bax = gql`fragment bax on Bax {
  bax
}`

const foo = gql`
  {
    foo(id: 1000) {
      bar
      buzz
    }
  }
  ${bax}
`;
