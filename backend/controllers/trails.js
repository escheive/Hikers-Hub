// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
const db = require('../models');
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple')
const config = require('../config/config')

function isAuthenticated(req, res, next) {
	if (req.headers.authorization) {
		const token = req.headers.authorization
		const decoded = jwt.decode(token, config.jwtSecret)
		const foundUser = db.User.findById(decoded.id)
		if (foundUser.admin) {
			next()
		} else {
			res.sendStatus(401)
		}
	}
}



//index route
router.get('/', async (req, res) => {
	const allTrails = await db.Trail.find({});
	res.json(allTrails);
});

// Create Route
router.post('/', isAuthenticated, async (req, res) => {
	const createdTrail = await db.Trail.create(req.body);
	res.json(createdTrail);
});

// Show Route
router.get('/:id', async (req, res) => {
	const trail = await db.Trail.findById(req.params.id);
	res.json(trail);
});

// Delete Route
router.delete('/:id', isAuthenticated, async (req, res) => {
	await db.Trail.findByIdAndDelete(req.params.id);
	res.json({ status: 200 });
});

// Update Route
router.put('/:id', isAuthenticated, async (req, res) => {
	const updatedTrail = await db.Trail.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.json(updatedTrail);
});

// // Create Review Route
router.put('/:id/review', async (req, res) => {
	const trail = await db.Trail.findByIdAndUpdate(
		req.params.id,
		{ $push: { reviews: req.body } },
		{ new: true }
	)
	res.json(trail)

});

module.exports = router;
