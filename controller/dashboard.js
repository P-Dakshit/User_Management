const express = require('express');
//exported
const logger = require('../logger/logger');
const User_Data = require('../model/user_data');

const route = express.Router();

route.get('/user/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User_Data.findOne({ email });

        if (!user) {
            logger.warn(`User not Found`);
            return res.status(404).json('User not found');
        }

        logger.info(`Displayed user \n${user}`);
        res.status(200).render('single_user', { user });
    }
    catch (err) {
        logger.error(`Server Side fatching error: ${err}`);
        res.status(500).json(err);
    }
});

module.exports = route;