import apiLink from "@/config";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

const cache = new InMemoryCache();

const graphqlClient = new ApolloClient({
  link: createHttpLink({ uri: apiLink.apiLink }),
  cache,
});

export default graphqlClient;
