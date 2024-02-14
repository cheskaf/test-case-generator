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
async function testDigicashRequestLogin(driver, TEST_CASE_FILE_PATH) {
    try {
        // Define the test case variables
        const testCaseId = 'TC00';
        const description = 'Verify DigiCash "Edit iBERF" functionality';
        const expectedResults = 'Edited iBERF successfully';
        let actualResults;
        let status;
        
        // Capture and save a screenshot
        let screenshotFilePath;

        // Define an array of objects containing element identifiers and actions
        const elements = [
            { selectorType: "id", identifier: "prjName", action: ["clear"] },
            { selectorType: "id", identifier: "prjName", action: ["click", "sendKeys", "Project Name - Edited"] },
            { selectorType: "id", identifier: "prjName", action: ["clear"] },
            { selectorType: "id", identifier: "prjName", action: ["click", "sendKeys", "Project Name - Updated"] },
            { selectorType: "id", identifier: "needDate", action: ["click", "sendKeys", "2024-02-16"] },
            { selectorType: "id", identifier: "prebidDate", action: ["click", "sendKeys", "2024-02-19"] },
            { selectorType: "id", identifier: "bidDate", action: ["click", "sendKeys", "2024-02-22"] },
            { selectorType: "id", identifier: "rqstr", action: ["clear"] },
            { selectorType: "id", identifier: "rqstr", action: ["click"] },
            { selectorType: "id", identifier: "rqstr", action: ["click", "sendKeys", "Microgenesis Business Systems"] },
            { selectorType: "id", identifier: "client", action: ["clear"] },
            { selectorType: "id", identifier: "client", action: ["click", "sendKeys", "ITSD Dev Intern 1"] },
            { selectorType: "id", identifier: "select", action: ["click", "sendKeys", "Social Media"] },
            { selectorType: "id", identifier: "prjAmt", action: ["clear"] },
            { selectorType: "id", identifier: "prjAmt", action: ["click", "sendKeys", "30000"] },
            { selectorType: "id", identifier: "gpa", action: ["clear"] },
            { selectorType: "id", identifier: "gpa", action: ["click", "sendKeys", "49999"] },
            { selectorType: "id", identifier: "bdgtAmt1", action: ["clear"] },
            { selectorType: "id", identifier: "bdgtAmt1", action: ["click", "sendKeys", "15000"] },
            { selectorType: "id", identifier: "bdgtAmt2", action: ["clear"] },
            { selectorType: "id", identifier: "bdgtAmt2", action: ["click", "sendKeys", "8000"] },
            { selectorType: "id", identifier: "bdgtAmt3", action: ["clear"] },
            { selectorType: "id", identifier: "bdgtAmt3", action: ["click", "sendKeys", "700"] },
            { selectorType: "css", identifier: "#exp1 .fa", action: ["click"] },
            { selectorType: "css", identifier: ".col-md-9", action: ["click"] },
        ];
        
        try {
            console.log('Executing test scenario...');

            // Start time for navigating to edit page -----------------------------------------------------------------------------
            const editPageStartTime = new Date().getTime();

            // Navigate to the edit page
            console.log("Navigating to the edit page...");

            // Wait until the #prj1 tbody is present
            const tbodyElement = await driver.wait(until.elementLocated(By.css('#prj1')), 30000);

            // Find the anchor tag within the #prj5 tbody
            const anchorTag = await tbodyElement.findElement(By.css('a'));

            // Retrieve the value of the href attribute
            const link = await anchorTag.getAttribute("href");

            // Open the retrieved link
            await driver.get(link);

            console.log("Waiting for the edit page to load completely...");
            // Wait until the page is loaded completely
            await driver.wait(until.titleIs('DigiCash - FormType'), 30000);
            console.log("Edit page loaded successfully.");

            // Calculate elapsed time for navigating to edit page
            const editPageElapsedTime = new Date().getTime() - editPageStartTime;
            console.log(`Edit page elapsed time: ${editPageElapsedTime} milliseconds`);
           
            // Loop through the elements array --------------------------------------------------------------------------------------
            for (const { selectorType, identifier, action } of elements) {
                try {
                    let locator;
                    // Create a locator based on the selector type
                    switch(selectorType) {
                        case "id":
                            locator = By.id(identifier);
                            break;
                        case "css":
                            locator = By.css(identifier);
                            break;
                        // Add more cases as needed
                        default:
                            console.error(`Invalid selector type: ${selectorType}`);
                            continue; // Skip to the next iteration if the selector type is invalid
                    }
                    // Find the element using the locator
                    const element = await driver.findElement(locator);
                    // Execute the actions defined for the element
                    for (let i = 0; i < action.length; i++) {
                        const act = action[i];
                        if (act === "sendKeys") {
                            await element[act](action[++i]);
                        } else {
                            await element[act]();
                        }
                    }
                } catch (error) {
                    console.error(`Error occurred with '${identifier}' element:`, error);
                }
            }            
            
            // Capture and save a screenshot
            screenshotFilePath = await captureAndSaveScreenshot(driver, testCaseId);

            // Click the Save button
            await driver.findElement(By.id("saveBtn")).click()
                        
            // Set values for actualResults and status
            actualResults = 'Edited iBERF successfully';
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

        // Create test actions
        const testActions = createTestActions(elements);

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
module.exports = testDigicashRequestLogin;
