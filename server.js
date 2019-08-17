const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))





app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})