import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

// ctx object provides access to req and res
router.get("/todos", (ctx) => {
  // Oak automatically sends back response; just need to set response body, and if it's set to an object, Oak will assume it should be in JSON format; automatically transforms it to JSON and sets appropriate response headers
  ctx.response.body = { todos };
});

router.post("/todos", async (ctx) => {
  const result = ctx.request.body();
  const data = await result.value;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };

  todos.push(newTodo);

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const result = ctx.request.body();
  const data = await result.value;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.value.text };
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
