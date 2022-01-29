// // import React from 'react';
// // import {
// //   ApolloClient,
// //   InMemoryCache,
// //   ApolloProvider,
// // } from "@apollo/client";
// // import Apps from './src/Apps';

// // const client = new ApolloClient({
// //   uri: 'https://48p1r2roz4.sse.codesandbox.io',
// //   cache: new InMemoryCache()
// // });

// // const App = () => {
// //   return (
// //     <ApolloProvider client={client}>
// //       <Apps />
// //     </ApolloProvider>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { AppRegistry } from 'react-native';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import Apps from './src/Apps';

// // Initialize Apollo Client
// const client = new ApolloClient({
//   uri: 'localhost:4000/graphql',
//   cache: new InMemoryCache()
// });

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Apps />
//     </ApolloProvider>
//   )
// };

// // AppRegistry.registerComponent('MyApplication', () => App);

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Apps from './src/Apps';
import client from './src/client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Apps />
    </ApolloProvider>
  );
}
