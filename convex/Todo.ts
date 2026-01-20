import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todo").order("desc").collect();
    return todos;
  },
});

export const addTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todo", {
      text: args.text,
      completed: false,
    });
    return todoId;
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get("todo", args.id);

    if (!todo) {
      throw new ConvexError("Todo not found");
    }

    await ctx.db.patch("todo", args.id, {
      completed: !todo.completed,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.get("todo", args.id);

    if (!todoId) {
      throw new ConvexError("Todo not found");
    }

    await ctx.db.delete("todo", args.id);
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todo"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.get("todo", args.id);

    if (!todoId) {
      throw new ConvexError("Todo not found");
    }

    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const deleteAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todo").collect();

    for (const t of todos) {
      await ctx.db.delete(t._id);
    }
    return { deletedcount: todos.length };
  },
});
