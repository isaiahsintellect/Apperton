const cron = require('node-cron');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

// Scraper function
async function scrapeProbateData(county) {
  try {
    // Scraper logic for probate data
    console.log(`Scraping probate data for ${county}...`);
    // Simulating data scraping with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Scraping finished for ${county}.`);
  } catch (error) {
    logger.error(`Error scraping data for ${county}: ${error.message}`);
    throw error; // Re-throw for retry logic
  }
}

// Retry logic
async function runScraperWithRetry(county, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await scrapeProbateData(county);
      break; // Break if successful
    } catch (error) {
      if (attempt < retries - 1) {
        console.log(`Retrying... Attempt ${attempt + 2}/${retries}`);
      } else {
        console.log(`Failed after ${retries} attempts for ${county}.`);
      }
    }
  }
}

// Schedule the job to run every 6 hours
cron.schedule('0 */6 * * *', () => {
  const counties = ['Los Angeles', 'Cook', 'Harris', 'Maricopa'];
  counties.forEach(county => {
    runScraperWithRetry(county);
  });
});

console.log('Scraper job is scheduled to run every 6 hours.');
