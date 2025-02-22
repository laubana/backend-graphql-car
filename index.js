import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";

import corsConfig from "./configs/corsConfig";
import mergedResolvers from "./resolvers";
import mergedTypeDefs from "./typeDefs";

dotenv.config();

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use("/", express.static(path.join(__dirname, "public")));
  app.use(
    "/favicon.ico",
    express.static(path.join(__dirname, "public", "favicon.ico"))
  );
  app.use(
    "/graphql",
    cors(corsConfig.corsOptions),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(`Server launched at port ${process.env.PORT} 🚀`);
};

startApolloServer(mergedTypeDefs, mergedResolvers);
