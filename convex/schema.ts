import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
  todo: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),
});
