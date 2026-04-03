// contactController.js  

const contacts = [];  
const leads = [];  

// Function to get contact details  
const getContactDetails = (contactId) => {  
    return contacts.find(contact => contact.id === contactId);  
};  

// Function to create leads from contacts  
const createLeadFromContact = (contactId) => {  
    const contact = getContactDetails(contactId);  
    if (contact) {  
        const lead = {  
            id: leads.length + 1,  
            contactId: contact.id,  
            status: 'new',  
            dealScore: calculateDealScore(contact)  
        };  
        leads.push(lead);  
        return lead;  
    }  
    return null;  
};  

// Function to update lead status  
const updateLeadStatus = (leadId, newStatus) => {  
    const lead = leads.find(lead => lead.id === leadId);  
    if (lead) {  
        lead.status = newStatus;  
    }  
};  

// Function to retrieve all leads for a user (assuming userId is passed)  
const retrieveLeadsForUser = (userId) => {  
    // Assuming leads have a userId property  
    return leads.filter(lead => lead.userId === userId);  
};  

// Mock function to calculate deal scoring logic  
const calculateDealScore = (contact) => {  
    // Simple scoring logic based on contact properties  
    return contact.importanceLevel * 10;  
};  

module.exports = {  
    getContactDetails,  
    createLeadFromContact,  
    updateLeadStatus,  
    retrieveLeadsForUser  
};