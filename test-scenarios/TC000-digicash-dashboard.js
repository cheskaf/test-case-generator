// Dashboard

// Import necessary modules
const { By, until } = require('selenium-webdriver');
const {
    createTestCase,
    determineStatus,
    captureAndSaveScreenshot,
    appendTestCaseToFile,
    createTestActions
} = require('../utilities.js');

// Define the test scenario function
async function testDashboard(driver, TEST_CASE_FILE_PATH) {
    try {
        // Define the test case variables
        const testCaseId = 'T0001';
        const description = 'Access the dashboard';
        const expectedResults = 'Access the DigiCash System landing page.';
        // Create test actions
        // create an array called testActions with the value "A", "B"
        const testActions = (
            [
                {
                    action: "Navigate to the DigiCash System landing page by accessing the link",
                    value: "https://mgenesis.sharepoint.com/sites/DigiCash/SitePages/LandingPage.aspx"
                }
            ]
            
        );
        let actualResults;
        let status;
        
        // Capture and save a screenshot
        let screenshotFilePath;
        
        try {
            console.log('Executing test scenario T0001...');
            
            // Navigate to the Landing page  -----------------------------------------------------------------------------
            
            // Start time for navigating to SharePoint landing page
            const sharePointStartTime = new Date().getTime();
            
            console.log("Navigating to the SharePoint landing page...");
            await driver.get("https://mgenesis.sharepoint.com/sites/DigiCash/SitePages/LandingPage.aspx");

            console.log("Waiting for the SharePoint page to load completely...");            
            // Wait until the SharePoint page is loaded completely
            await driver.wait(until.titleIs('DigiCash - LandingPage'), 30000);
            console.log("SharePoint page loaded successfully.");

            // Capture and save a screenshot
            await new Promise(resolve => setTimeout(resolve, 10000));
            screenshotFilePath = await captureAndSaveScreenshot(driver, testCaseId);
    
            // Calculate elapsed time for navigating to SharePoint landing page
            const sharePointElapsedTime = new Date().getTime() - sharePointStartTime;
            console.log(`SharePoint landing page elapsed time: ${sharePointElapsedTime} milliseconds`);   
            
            // Find all elements on the page
            let elements = await driver.findElements(By.css('*'));

            // Iterate over each element and extract its text content
            for (let element of elements) {
                const text = await element.getText();
                if (text.trim() !== '') {
                    console.log(text);
                }
            }

            // Set values for actualResults and status
            actualResults = 'Access the DigiCash System landing page.';
            status = determineStatus(expectedResults, actualResults);           
        
        } catch (error) {
            // Handle the error and set appropriate values for actualResults and status
            console.error("An error occurred during execution:", error);
            actualResults = error.toString();
            status = 'Fail';
            
            // Capture and save a screenshot if necessary
            screenshotFilePath = await captureAndSaveScreenshot(driver, `${testCaseId}_with_error`);
        }
        
        
        // Create a test case object
        console.log('Creating test case...');
        let testCase = createTestCase(
            testCaseId,
            description,
            testActions,
            expectedResults,
            actualResults,
            status,
            screenshotFilePath
        );
        
        // Append the test case to the test case file
        appendTestCaseToFile(testCase, TEST_CASE_FILE_PATH);        
                
        // Log success or failure
        if (status === 'Pass') {
            console.log('Test case executed successfully');
        } else {
            console.error('Error occurred during test scenario:', actualResults);
        }
        
        return 'status';
    } catch (error) {
        console.error('Error occurred during test scenario:', error);
        return 'Fail';
    }
}

// Export the login test scenario function
module.exports = testDashboard;
