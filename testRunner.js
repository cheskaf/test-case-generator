// Import necessary modules
const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');

// Constant for the test case JSON file path
const TEST_CASE_FILE_PATH = 'test-cases.json';

// Import test scenarios
const testEditPost = require('./test-scenarios/test-editpost.js');
const testEditProfile = require('./test-scenarios/test-editprofile.js');
const testDigicashRequest = require('./test-scenarios/test-digicash-request.js');

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
        // await driver.get("https://artisan-ai-a5f011e35d03.herokuapp.com/login/")
        // await driver.findElement(By.id("username_or_email")).click()
        // await driver.findElement(By.id("username_or_email")).sendKeys("userbeginner")
        // await driver.findElement(By.id("password")).sendKeys("Abc_1234")
        // await driver.findElement(By.css(".project-btn-secondary")).click()
        
        // Execute test scenarios
        await testDigicashRequest(driver, TEST_CASE_FILE_PATH);
        // await testEditPost(driver, TEST_CASE_FILE_PATH);
        // await testEditProfile(driver, TEST_CASE_FILE_PATH);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Execute test scenarios
executeTestScenarios();
