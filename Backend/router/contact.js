const express = require("express");
const app = express();
const contact = require("../controller/contact");

app.post("/add", contact.addContact);

app.get("/get/:iserId", contact.getAllContacts);
//app.get("/get/:userId", product.getAllProducts);

app.post("/update", contact.updateContact);

module.exports = app;
