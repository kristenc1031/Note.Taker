
const express = require("express");
const fs = require("fs");
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());


require('./routes')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 