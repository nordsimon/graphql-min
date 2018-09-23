### GraphQL minifier through tagged template

Converts your graphql query to minified one via babel plugin

in .babelrc, add

```json
{
  "plugins": ["graphql-min/babel"]  
}
```

```js
import gql from 'graphql-min';

const query = gql`{
  foo {
    bar {
      baz
    }
  }
}`
```

becomes

```js
const query = `{foo{bar{baz}}}`
```
