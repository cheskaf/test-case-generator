// Import necessary modules
const { By } = require('selenium-webdriver');
const fs = require('fs');

// Function to create a test case object
function createTestCase(testCaseId, description, steps, expectedResults, actualResults, status, screenshot) {
    return {
        test_case_id: testCaseId,
        description: description,
        steps: steps,
        expectedResults: expectedResults,
        actualResults: actualResults,
        status: status,
        screenshot: screenshot
    };
}

// Function to determine the status of the test case
function determineStatus(expectedResults, actualResults) {
    return expectedResults === actualResults ? 'Pass' : 'Fail';
}

// Function to capture and save a screenshot
async function captureAndSaveScreenshot(driver, testCaseId) {
    console.log('Capturing screenshot...');
    const screenshot = await driver.takeScreenshot();
    const screenshotDirectory = './screenshots/';    
    // Check if the directory exists, create it if it doesn't
    if (!fs.existsSync(screenshotDirectory)) {
        fs.mkdirSync(screenshotDirectory);
    }
    const screenshotFilePath = `${screenshotDirectory}test_case_${testCaseId}.png`;

    // Save the screenshot as a PNG file
    fs.writeFileSync(screenshotFilePath, screenshot, 'base64');
    return screenshotFilePath;
}

// Function to append the test case to the test case file
function appendTestCaseToFile(testCase, filePath) {
    console.log('Updating test case file...');
    
    let testCases = [];
    let testCaseExists = false;

    // Check if the file exists and is not empty
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Parse the file content if it's not empty
        if (fileContent.trim() !== '') {
            testCases = JSON.parse(fileContent);

            // Check if the test case ID already exists in the file
            testCases.forEach((existingTestCase, index) => {
                if (existingTestCase.test_case_id === testCase.test_case_id) {
                    // Update the existing test case
                    testCases[index] = testCase;
                    testCaseExists = true;
                }
            });
        }
    }

    // If the test case doesn't exist, append it to the array
    if (!testCaseExists) {
        testCases.push(testCase);
    }

    // Write the modified test cases array back to the file
    fs.writeFileSync(filePath, JSON.stringify(testCases, null, 4));
}

// Helper function to create test actions
function createTestActions(elements) {
    const testActions = []

    for (const { selectorType, identifier, action } of elements) {
        let actionObj = {}

        if (action.length === 1) {
            actionObj.action = action[0]
        } else {
            actionObj.action = action[1]
            actionObj.value = action[2]
        }

        actionObj.element = selectorType === "id" ? By.id(identifier) : By.css(identifier)

        testActions.push(actionObj)
    }

    return testActions
}

module.exports = {
    createTestCase,
    determineStatus,
    captureAndSaveScreenshot,
    appendTestCaseToFile,
    createTestActions
};
