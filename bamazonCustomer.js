//Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
//Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
//The app should then prompt users with two messages.
//
//
//
//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
//
//
//
//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
//
//
//
//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
//
//
//
//However, if your store does have enough of the product, you should fulfill the customer's order.
//
//
//This means updating the SQL database to reflect the remaining quantity.
//Once the update goes through, show the customer the total cost of their purchase.


var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "products_DB"
});

// connect to the mysql server and sql database

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  queryAllItem()
});


//  Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

function queryAllItem() {
connection.query("SELECT * FROM products", function (err, res) {
if (err) throw err;
for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " dollars" + "\n");
}
console.log("-----------------------------------");
itemBuy();
});
}

// prompt question for which item customers want to buy
function itemBuy(){
  inquirer
    .prompt({
        name: "itemAsk",
        type: "input",
        message: "What do you want to buy? Please type item id."
    })
    .then(function(answer) {
    
     var query = "SELECT * FROM products WHERE ?";
     var itemAsk = answer.itemAsk;
      connection.query(query, {item_id: itemAsk}, function(err, res) {
     if (err) throw err;
     for (var i = 0; i < res.length; i++) {
  console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " dollars" + " | " + " Available stock: " + res[i].stock_quantity  + "\n");
   }

  checkStock(); 
  return itemAsk;
  });
    });
      
}

// prompt question of how many units customers want to buy
                  
function checkStock() {
  inquirer
    .prompt({
      name: "unitAsk",
      type: "input",
      message: "How many do you want?"
    })
    .then(function(answer) {
    var query = "SELECT * FROM products WHERE ?";

      connection.query(query, {item_id: itemAsk, stock_quantity : stock_quantity, }, function(err, res) {
     if (err) throw err;
     if (answer.i)
     for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " dollars" + " | " + " Available stock: " + res[i].stock_quantity  + "\n");
       }
   
      });
    
      });
    }




//
//function updateProduct() {
//    console.log("Updating songs \n");
//    var query = connection.query(
//        "UPDATE songs SET ? WHERE ?", [
//            {
//                artist: "Emmy"
//      },
//            {
//                genre: "Country"
//      }
//    ],
//        function (err, res) {
//            console.log(res.affectedRows + " Emmy's song updated!\n");
//            // Call deleteProduct AFTER the UPDATE completes
//            deleteProduct();
//        }
//    );
//
//    // logs the actual query being run
//    console.log(query.sql);
//}
