// Import necessary modules
const { Builder } = require('selenium-webdriver');
const {
    createTestCase,
    determineStatus,
    captureAndSaveScreenshot,
    appendTestCaseToFile
} = require('./utilities.js');


// Constant for the test case JSON file path
const TEST_CASE_FILE_PATH = 'test-cases.json';

// Import test scenarios
const testEditPost = require('./test-scenarios/test-editpost.js');
const testEditProfile = require('./test-scenarios/test-editprofile.js');

// Main function to execute test scenarios
async function executeTestScenarios() {
    // Initialize WebDriver
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Execute test scenarios
        await testEditPost(driver, TEST_CASE_FILE_PATH);
        await testEditProfile(driver, TEST_CASE_FILE_PATH);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Execute test scenarios
executeTestScenarios();
