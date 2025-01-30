const express = require("express");
const cors = require("cors");
const {rmSync} = require("fs");

const app = express();

app.use(cors());

app.get("/api/products/:id",(req, res) => {
    const product = {
        id: req.params.id,
        title: `product title ${req.params.id}`,
        description: `product ${req.params.id}`,
    };
    res.send(product);
});

app.listen("3000", () => {
    console.log("server listening to 3000");
});