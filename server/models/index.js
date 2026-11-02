require("dotenv").config()
const { Pool } = require("pg")
const { drizzle } = require("drizzle-orm/node-postgres")
const schema = require("./schema")

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

module.exports = { db: drizzle(pool, { schema, casing: "snake_case" }) }
