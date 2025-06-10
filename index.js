const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {
  // Create a table with more columns
  db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)");

  // Insert data using parameterized queries (safer!)
  const insertStmt = db.prepare("INSERT INTO products (name, description, price) VALUES (?, ?, ?)");
  insertStmt.run("Laptop", "High-performance laptop", 1200.00);
  insertStmt.run("Mouse", "Wireless mouse", 25.00);
  insertStmt.finalize(); // Important to finalize prepared statements

  // Query data with a WHERE clause
  db.get("SELECT name, price FROM products WHERE name = ?", "Laptop", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    if (row) {
      console.log("Laptop price:", row.price);
    } else {
      console.log("Laptop not found");
    }
  });

  // Update data
  db.run("UPDATE products SET price = ? WHERE name = ?", [1250.00, "Laptop"], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });

  // Delete data
  db.run("DELETE FROM products WHERE name = ?", "Mouse", function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  });

  //Query all data again
    db.each("SELECT id, name, description, price FROM products", (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row.id + ": " + row.name + " (" + row.description + ") - $" + row.price);
      });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});