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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    queryAllItem()
});


//  Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

function queryAllItem() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | "  +" Price:  " + res[i].price + " dollars" + "\n");
        }
        console.log("-----------------------------------");
        promptUserPurchase();
    });
}

// prompt question for which item customers want to buy
function promptUserPurchase() {
    // console.log('___ENTER promptUserPurchase___');

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the item ID which you would like to purchase.',
            validate: validateInput,


		},
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
		}
	]).then(function (input) {
        console.log('Review Order: \n    item_id = ' + input.item_id + '\n    quantity = ' + input.quantity);

        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, {
            item_id: item
        }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                queryAllItem()

            } else {
                var productData = data[0];

                //				 console.log('productData = ' + JSON.stringify(productData));
                //				 console.log('productData.stock_quantity = ' + productData.stock_quantity);

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    // console.log('updateQueryStr = ' + updateQueryStr);

                    // Update the inventory
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    queryAllItem()

                }
            }
        })
    })
}

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}
