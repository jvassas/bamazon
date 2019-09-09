//Environment variables
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


//connection info for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  //port number
  port: 3306,

  //username
  user: "root",

  //password and database
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);

    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    promptCustomerForItem(res);
  });
}

function promptCustomerForItem(inventory) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would like to purchase? [Quit with Q]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      checkIfShouldExit(val.choice);
      var choiceID = parseInt(val.choice);
      var product = checkInventory(choiceID, inventory);

      if (product) {
        promptCustomerForQuantity(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}

function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        makePurchase(product, quantity);
      }
    });
}

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

function checkInventory(choiceID, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceID) {
      return inventory[i];
    }
  }

  return null;
}

function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye!");
    process.exit(0);
  }
}