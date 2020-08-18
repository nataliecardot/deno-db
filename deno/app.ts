import { Application } from "https://deno.land/x/oak/mod.ts";

// File extension must be included when working with Deno
import todosRoutes from "./routes/todos.ts";

const app = new Application();

// Some route middlewares return promises that are only done when the async stuff in there finished. next() will not wait for it. So whenever you have any middlewares that do async stuff, you should make all your middlewares async and await next(). This tells Oak that we don't only want to start the next middlewares in line, but also want to wait for them to finish before we send back automatically generated response that is sent by Oak whenever it's done executing a middleware. Otherwise, the response bodies set by async route middlewares will not be taken into account
app.use(async (ctx, next) => {
  console.log("In the middleware!");
  await next();
});

// Ensure every outgoing response has proper headers attached
app.use(async (ctx, next) => {
  // Which other domains will be allowed to access our resources. *: every domain; every domain may send a request
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  // Which HTTP can be used in requests sent to this backend
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  // Which headers may be set by the frontend when it requests data (in the frontend, for PUT and POST requests, Content-Type headers is set to application/JSON). Important because this header on request being sent to Deno server will tell Deno/the Oak framework that the data attached to this request will be in JSON format, which allows Oak to automatically parse it when we try to get access to request body (ctx.request.body), transforming it from JSON to a JS object
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(todosRoutes.routes());

app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });
