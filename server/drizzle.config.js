require("dotenv").config()
const { defineConfig } = require("drizzle-kit")

module.exports = defineConfig({
  dialect: "postgresql",
  schema: "./models/schema.js",
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL },
})
