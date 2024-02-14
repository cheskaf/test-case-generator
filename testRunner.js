// Import necessary modules
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

// Constant for the test case JSON file path
const TEST_CASE_FILE_PATH = 'test-cases.json';

// Import test scenarios
const testDashboard  = require( './test-scenarios/TC000-digicash-dashboard.js' );
const testDigicashRequestLogin  = require( './test-scenarios/TC001-digicash-request-login.js' );

// Function to generate the current date and time
function getCurrentDateTime() {
    return new Date().toLocaleString();
}

// Main function to execute test scenarios
async function executeTestScenarios() {
    // Initialize WebDriver
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Get current date and time
        const dateTime = getCurrentDateTime();
        
        // Write the date and time to a file
        fs.writeFileSync('updated.txt', dateTime);
        
        // Try logging in        
        // Start time for user login
        const loginStartTime = new Date().getTime();
        // Navigate to the login page
        console.log("Waiting for user login...");
        await driver.get("https://login.microsoftonline.com/");

        console.log("Waiting for the page to load completely...");
        // Wait until the page is loaded completely
        await driver.wait(until.urlIs("https://www.office.com/?auth=2"), 300000);
        console.log("Page loaded successfully.");

        // Calculate elapsed time for user login
        const loginElapsedTime = new Date().getTime() - loginStartTime;
        console.log(`User login elapsed time: ${loginElapsedTime} milliseconds`);

        // Execute test scenarios
        await testDashboard(driver, TEST_CASE_FILE_PATH);
        await testDigicashRequestLogin(driver, TEST_CASE_FILE_PATH);
        
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Execute test scenarios
executeTestScenarios();
