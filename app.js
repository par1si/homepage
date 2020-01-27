const express = require('express');
const app = express();

const weatherTodayRouter = require(process.cwd() + '/routes/weather-today.js');
app.use('/', weatherTodayRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});