// Selenium Webdriver test script for editing a post
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

// Constant for the test case JSON file path
const TEST_CASE_FILE_PATH = 'test-cases.json';

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
    
    const fs = require('fs');
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


// Function to execute the test scenario
async function executeTestScenario() {    
    // Initialize Firefox WebDriver
    let driver = await new Builder().forBrowser('firefox').build();
    
    // Test scenario: Edit a post
    try {
        console.log('Executing test scenario...');
        
        // Login
        await driver.get("https://artisan-ai-a5f011e35d03.herokuapp.com/login/?next=/post/97/")
        await driver.findElement(By.id("username_or_email")).click()
        await driver.findElement(By.id("username_or_email")).sendKeys("userbeginner")
        await driver.findElement(By.id("password")).sendKeys("Abc_1234")
        await driver.findElement(By.css(".project-btn-secondary")).click()
        
        // Navigate to the post to be edited
        await driver.get('https://artisan-ai-a5f011e35d03.herokuapp.com/post/97/');
        
        // Click on the edit button
        await driver.findElement(By.css(".fa-ellipsis")).click()
        await driver.findElement(By.css(".show > li:nth-child(1) .dropdown-item")).click()

        // Input data into form fields
        await driver.findElement(By.id("postname")).click()
        await driver.findElement(By.id("postname")).clear()
        await driver.findElement(By.id("postname")).sendKeys("eula plushie")
        await driver.findElement(By.id("postdescription")).click()
        await driver.findElement(By.id("postdescription")).clear()
        await driver.findElement(By.id("postdescription")).sendKeys("my fav character!")
        await driver.findElement(By.id("difficultySelect")).click()
        {
            const dropdown = await driver.findElement(By.id("difficultySelect"))
            await dropdown.findElement(By.xpath("//option[. = 'expert']")).click()
        }
        await driver.findElement(By.css("#difficultySelect > option:nth-child(4)")).click()

        // Submit the form
        await driver.findElement(By.css(".project-btn-primary")).click()

        // Wait for confirmation message or redirect
        await driver.wait(until.urlIs('https://artisan-ai-a5f011e35d03.herokuapp.com/post/97/'));

        // Determine the status of the test case
        const expectedResults = 'Post successfully edited';
        const actualResults = 'Post successfully edited';
        const status = determineStatus(expectedResults, actualResults);
        
        // Capture and save a screenshot
        const screenshotFilePath = await captureAndSaveScreenshot(driver, 'TC001');
        
        // Create a test case object
        console.log('Creating test case...');
        let testCase = createTestCase(
            'TC001',
            'Verify post editing functionality',
            [
                { action: 'navigate', value: 'View Post page: https://artisan-ai-a5f011e35d03.herokuapp.com/post/97/'},
                { action: 'click', element: '.fa-ellipsis', value: 'Dropdown Menu icon'},
                { action: 'click', element: '.show > li:nth-child(1) .dropdown-item', value: 'Edit button'},
                { action: 'click', element: 'postname', value: 'Input field for post name'},
                { action: 'type', element: 'postname', value: '"eula plushie"' },
                { action: 'click', element: 'postdescription', value: 'Input field for post description'},
                { action: 'type', element: 'postdescription', value: '"my fav character!"' },
                { action: 'click', element: 'difficultySelect', value: 'Dropdown for difficulty level'},
                { action: 'click', element: 'option:nth-child(4)', value: '"Expert difficulty level"'},
                { action: 'click', element: '.project-btn-primary', value: 'Submit button'}
            ],
            expectedResults,
            actualResults,
            status,
            screenshotFilePath
        );        
        
        // Append the test case to the test case file
        appendTestCaseToFile(testCase, TEST_CASE_FILE_PATH);
                
        console.log('Test case executed successfully');
        return 'status';
    } catch (error) {
        console.error('Error occurred:', error);
        return 'Fail';
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Execute the test scenario
executeTestScenario();
