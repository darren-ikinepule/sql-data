const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db'); // Creates or opens the database file

db.serialize(() => {
  // Create a table
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

  // Insert data
  db.run("INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com')");
  db.run("INSERT INTO users (name, email) VALUES ('Jane Smith', 'jane.smith@example.com')");

  // Query data
  db.each("SELECT id, name, email FROM users", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + ": " + row.name + " (" + row.email + ")");
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});

