const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const searchRouter = require('./routes/searchRouter');
const category = require('./categories');

const app = express();
const port = 3001;
const models = require('./models/index');

// Check DB-Server Connetion
models.sequelize
    .sync()
    .then(() => {
        models.Factor.bulkCreate(category, { ignoreDuplicates: true });
        console.log(' DB 연결 성공');
    })
    .catch(err => {
        console.log(err, '연결 실패');
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// index page
app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to hojae hojae!\nthis is a main(index) page');
});

// configure api router
app.use('/user', userRouter);
app.use('/search', searchRouter);

// Do we need set CORS() and header ?
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.set('Content-Type', 'application/json');
// });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(port, () => {
    console.log('example app listening on port ' + port + '!');
});

module.exports = app;
