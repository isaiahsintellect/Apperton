const express = require('express');
const router = express.Router();

// Mock data
const properties = [
    { id: 1, name: 'Property 1', details: 'Details of Property 1', contacts: ['Contact 1', 'Contact 2'] },
    { id: 2, name: 'Property 2', details: 'Details of Property 2', contacts: ['Contact 3'] }
];

// GET /search to search properties
router.get('/search', (req, res) => {
    const { query } = req;
    // Implement search logic here (mocked for now)
    const results = properties.filter(property => property.name.toLowerCase().includes(query.name?.toLowerCase() || ''));
    res.json(results);
});

// GET /:id to get property details with contacts
router.get('/:id', (req, res) => {
    const propertyId = parseInt(req.params.id);
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        res.json(property);
    } else {
        res.status(404).send('Property not found');
    }
});

// GET /:id/contacts to get all contacts for a property
router.get('/:id/contacts', (req, res) => {
    const propertyId = parseInt(req.params.id);
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        res.json(property.contacts);
    } else {
        res.status(404).send('Property not found');
    }
});

module.exports = router;