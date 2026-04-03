'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const database = require('../database'); // Assuming there's a database module to handle DB operations

// Scraping function
async function scrapeProbateRecords() {
    try {
        // Array of county URLs to scrape
        const countyUrls = [
            'http://examplecounty1.com/probate',
            'http://examplecounty2.com/probate',
            // Add more county URLs as needed
        ];

        for (let url of countyUrls) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Example: scraping logic (requires updating based on actual HTML structure)
            $('selector').each(async (index, element) => {
                const propertyData = {
                    // Extract the necessary data from the elements
                    address: $(element).find('address-selector').text(),
                    executor: $(element).find('executor-selector').text(),
                    attorney: $(element).find('attorney-selector').text(),
                    // Additional fields if necessary
                };

                // Store the property data in the database
                await database.saveProperty(propertyData);
            });
        }
    } catch (error) {
        console.error('Error scraping probate records:', error);
    }
}

// Schedule scraping every 6 hours
schedule.scheduleJob('0 */6 * * *', () => {
    console.log('Running probate record scraper...');
    scrapeProbateRecords();
});

module.exports = scrapeProbateRecords;
