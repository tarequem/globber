const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');
// import our typeDefs & resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const serverApollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

// This middleware should be added before calling `applyMiddleware`.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await serverApollo.start();

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  //integerate our Apollo server with Express application as middleware
  serverApollo.applyMiddleware({ app });

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    const server = app.listen(PORT, () => {
      // Defining the web-socket server
      const wsServer = new WebSocketServer({
        server,
        path: '/graphql',
      });
      useServer({ schema }, wsServer);
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${serverApollo.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
