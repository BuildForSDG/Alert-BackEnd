const express = require('express');
require('dotenv').config()
const mongoose = require("mongoose");

const regularUserRoutes = require('./routes/regularUser');
const respondersRoutes = require('./routes/responders');


const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api/v1/regularuser', regularUserRoutes);
app.use('/api/v1/responders', respondersRoutes);


app.use((req, res) => {
    res.send("<h1>Welcome to Alert API page</h1>");
});

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose
    .connect(
        "mongodb+srv://josh:jesus000@cluster0-hziu4.mongodb.net/alert?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("Database connected");
        app.listen(port);
    })
    .catch((err) => console.log(err));

module.exports = app