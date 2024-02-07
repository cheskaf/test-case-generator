// Import Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');

// Create a new instance of the Firefox driver
const driver = new Builder().forBrowser('firefox').build();

// Navigate to a website
driver.get('https://artisan-ai-a5f011e35d03.herokuapp.com/');

// Wait until the page is loaded completely
driver.wait(until.titleIs('Log In – ArtisanAI'), 15000);

// Print the page title to the console after a small delay
setTimeout(async () => {
    const title = await driver.getTitle();
    console.log('Page title is:', title);
    
    // Close the browser
    driver.quit();
}, 15000); // Wait for 30 seconds before getting the title
