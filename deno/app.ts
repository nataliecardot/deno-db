import { Application } from "https://deno.land/x/oak/mod.ts";

// File extension must be included when working with Deno
import todosRoutes from "./routes/todos.ts";

const app = new Application();

// Some route middlewares return promises that are only done when the async stuff in there finished. next() will not wait for it. So whenever you have any middlewares that do async stuff, you should make all your middlewares async and await next(). This tells Oak that we don't only want to start the next middlewares in line, but also want to wait for them to finish before we send back automatically generated response that is sent by Oak whenever it's done executing a middleware. Otherwise, the response bodies set by async route middlewares will not be taken into account
app.use(async (ctx, next) => {
  console.log("In the middleware!");
  await next();
});

app.use(todosRoutes.routes());

app.use(todosRoutes.allowedMethods());

await app.listen({ port: 3000 });
