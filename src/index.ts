import { Application, Router, RouterContext } from "../deps.ts";
import { applyGraphQL } from "../deps.ts";
import { oakCors } from "../deps.ts";
import { env } from "./config/env.ts";
import { resolvers } from "./graphql/resolvers.ts";
import { typeDefs } from "./graphql/typeDefs.ts";

const app = new Application();

// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.headers.get("X-Response-Time");
//   console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
// });

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   ctx.response.headers.set("X-Response-Time", `${ms}ms`);
// });

app.use(oakCors());

const GraphQLService = await applyGraphQL<Router>({
  Router,
  usePlayground: env.USE_PLAYGROUND === undefined
    ? false
    : env.USE_PLAYGROUND === "true",
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: (_ctx: RouterContext) => {
    return { user: "" };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log(`Server listening on http://localhost:${env.PORT}/graphql`);
await app.listen({ port: env.PORT === undefined ? 4000 : +env.PORT });
