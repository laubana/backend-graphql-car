import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

import { typeDefs, resolvers } from "./src/schema.js";

dotenv.config();

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/api",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );

  console.log(`PORT : ${process.env.PORT || 4000}`);
};

startApolloServer(typeDefs, resolvers);
