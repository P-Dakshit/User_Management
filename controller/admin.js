const express = require('express');
const User_Data = require('../model/user_data');
const logger = require('../logger/logger');

const route = express.Router();

route.get('/userlist', async (req, res) => {
    try {
        const userList = await User_Data.findAll();
        res.status(200).render('userlist', { users: userList });
    } catch (err) {
        logger.error(`Error fetching user list: ${err.message}`);
        res.status(500).json({ error: 'Server Side Error' });
    }
});

route.patch('/user/:email', async (req, res) => {
    const email = req.params.email;
    const body = req.body;

    try {
        const user = await User_Data.findOne({ where: { email } });

        if (!user) {
            logger.warn(`User with email ${email} not found`);
            return res.status(404).json({ error: 'User not found' }); 
        }

        // Update only fields that are in the body
        const fields = ['first_name', 'last_name', 'photo', 'phone', 'email', 'address'];
        fields.forEach(field => {
            if (body[field] !== undefined) {
                user[field] = body[field];
            }
        });

        const updatedUser = await user.save();

        logger.info(`User with email ${email} updated`);
        res.status(200).json({ msg: `User updated`, user: updatedUser });
    } catch (err) {
        logger.error(`Error updating user: ${err.message}`);
        res.status(500).json({ error: 'Server Side Error' });
    }
});

route.delete('/user/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User_Data.findOne({ where: { email } });

        if (!user) {
            logger.warn(`User with email ${email} not found`);
            return res.status(404).json({ error: 'User not found' }); 
        }

        await User_Data.destroy({ where: { email } });

        logger.warn(`User with email ${email} deleted`);
        res.status(200).json({ msg: `User with email ${email} deleted` });
    } catch (err) {
        logger.error(`Error deleting user: ${err.message}`);
        res.status(500).json({ error: 'Server Side Error' });
    }
});

module.exports = route;