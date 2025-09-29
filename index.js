const express = require('express');
const sequelize = require('./db');
const path = require('path');
const cookieParser = require('cookie-parser');

//exported
const logger = require('./logger/logger');
const { authMiddleware, restrictedTo } = require('./middleware/auth');
const static_routes = require('./static_route/static');
const create_route = require('./controller/user_data');
const login_route = require('./controller/login');
const admin_route = require('./controller/admin');
const dashboard_route = require('./controller/dashboard');
const forget_password_route = require('./controller/forget_password');
const reset_password_route = require('./controller/reset_password');

//app
const app = express();
const port = 8000;

//postgres connection 
sequelize.authenticate()
  .then(() => {
    logger.info(`PostgreSQL database connected successfully`)
    return sequelize.sync();
  })
  .catch((err) => logger.warn(`Unable to connect to database : ${err}`));

//middlewares
app.use(express.json());                            //json
app.use(express.urlencoded({ extended: true }));    //form data
app.use(cookieParser());                            //cookie
//created middlewares
//printing body requests before using winston
app.use((req, res, next) => {
  logger.info(`Incoming request body: ${JSON.stringify(req.body)}`);
  next();
});

//view
app.set("view engine", "ejs");
app.set("views", path.resolve('./view'));

//application working calls
app.use('/', static_routes);            //ejs views
app.use('/', create_route);             //creating user/admin
app.use('/', login_route);              //login page route
app.use('/', forget_password_route)     //forget password route
app.use('/', reset_password_route)      //reset password route
//restricted to admin only
app.use('/admin', authMiddleware, restrictedTo('admin'), admin_route);
//restricted to admin and user
app.use('/dashboard', authMiddleware, restrictedTo('user', 'admin'), dashboard_route);

//listen
app.listen(port, () => logger.info(`Server Started at Port: ${port}`));