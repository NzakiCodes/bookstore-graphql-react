const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

try {
    mongoose.connect(`mongodb://localhost/book-store`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(
            app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
        );
} catch (err) {
    console.log(err)
}
 