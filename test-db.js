const pool = require("./dbConfig");

(async () => {
  try {
    const r = await pool.query("SELECT NOW()");
    console.log("✅ Conectado:", r.rows[0]);
    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e);
    process.exit(1);
  }
})();