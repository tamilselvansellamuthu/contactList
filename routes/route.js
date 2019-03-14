const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

// retriving contacts
router.get('/contact/all', (req, res, next) => {
    Contact.find({}, (err, contacts) => {
        res.json(contacts);
    })
});

// retriving a contact
router.get('/contact/:phone', (req, res, next) => {
    Contact.find({ phone: req.params.phone }, (err, contacts) => {
        res.json(contacts);
    })
});

// add contact
router.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    Contact.create(newContact, (err, data) => {
        if (err) {
            res.json({ msg: 'Failed to add contact' });
        }
        else {
            res.json({ msg: 'Contact added successfully' });
        }
    });
});

// update contact
router.put('/contact', (req, res, next) => {
    Contact.findOneAndUpdate({ phone: req.body.phone }, { first_name: req.body.first_name, last_name: req.body.last_name }, { new: true }, (err, contacts) => {
        if (err) { res.json({ 'Error': ' Failed to update the db' }); }
        else {
            res.json(contacts);
        }
    });
});

// delete contact
router.delete('/contact/:phone', (req, res, next) => {
    Contact.deleteOne({ phone: req.params.phone }, (err, result) => {
        if (err) {
            res.json({ 'Error': err });
        }
        else {
            res.json(result);
        }
    });
});


module.exports = router;