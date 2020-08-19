import { Application } from "https://deno.land/x/oak/mod.ts";

// File extension must be included when working with Deno
import todosRoutes from "./routes/todos.ts";
// Need curly braces because connect is a named export (because have export keyword in front of function declaration and exporting multiple things from file)
import { connect } from "./helpers/db_client.ts";

connect();

const app = new Application();

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
