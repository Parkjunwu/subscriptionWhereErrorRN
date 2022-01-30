import React from 'react';
import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
  // 지금 /graphql 임. 아마 이게 맞겠지만.
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    // 요 아래는 token 받아야 할 때.(header 가져오기)
    connectionParams: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQzNTAxMDY4fQ.MDaGQGL62FA0YKx87uPZnr_-WRuzIZUMTAkvOnvgBdQ",
    },
  }
});

const httpLink = new HttpLink({
  // 지금 http 임, 글고 ngrok 도 안돌린 상황.
  uri: 'http://localhost:4000/graphql'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;