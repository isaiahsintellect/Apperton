const express = require('express');
const router = express.Router();

let leads = [];

// Function to calculate deal score based on property condition and market value
function calculateDealScore(condition, marketValue) {
    let score = 0;
    if (condition === 'excellent') {
        score += 50;
    } else if (condition === 'good') {
        score += 30;
    } else if (condition === 'fair') {
        score += 10;
    }
    score += marketValue / 1000; // Simplified scoring
    return score;
}

// Route to create new lead
router.post('/leads', (req, res) => {
    const { name, propertyCondition, marketValue, followUpDate } = req.body;
    const score = calculateDealScore(propertyCondition, marketValue);
    const newLead = { id: leads.length + 1, name, propertyCondition, marketValue, score, status: 'new', followUpDate };
    leads.push(newLead);
    res.status(201).json(newLead);
});

// Route to update lead status and follow-up dates
router.put('/leads/:id', (req, res) => {
    const leadId = parseInt(req.params.id);
    const { status, followUpDate } = req.body;
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (status) lead.status = status;
    if (followUpDate) lead.followUpDate = followUpDate;
    res.json(lead);
});

// Route to get all leads filtered by status
router.get('/leads', (req, res) => {
    const { status } = req.query;
    if (status) {
        const filteredLeads = leads.filter(l => l.status === status);
        return res.json(filteredLeads);
    }
    res.json(leads);
});

module.exports = router;