import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "sql7.freesqldatabase.com",
  user: process.env.DB_USER || "sql7786149",
  password: process.env.DB_PASSWORD || "FZK4aHjQUZ",
  database: process.env.DB_NAME || "sql7786149",
  charset: "utf8mb4",
}

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    return connection
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error)
    throw error
  }
}

export async function query(sql: string, params: any[] = []) {
  const connection = await getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results
  } finally {
    await connection.end()
  }
}
