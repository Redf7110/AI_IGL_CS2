import Database from "better-sqlite3"
import path from "path"

const dbPath = path.join(process.cwd(), "ai-igl.db")
export const db = new Database(dbPath)

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS screenshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER NOT NULL,
    image BLOB NOT NULL
  )
`).run()
