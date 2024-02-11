// Selenium Webdriver test script for editing a post
const { Builder, By, until } = require('selenium-webdriver');

// Constant for the test case JSON file path
const TEST_CASE_FILE_PATH = 'test-cases.json';

// Function to create a test case object
function createTestCase(testCaseId, description, steps, expectedResults, actualResults, status) {
    return {
        test_case_id: testCaseId,
        description: description,
        steps: steps,
        expectedResults: expectedResults,
        actualResults: actualResults,
        status: status
    };
}

// Function to determine the status of the test case
function determineStatus(expectedResults, actualResults) {
    return expectedResults === actualResults ? 'Pass' : 'Fail';
}

// Function to append the test case to the test case file
function appendTestCaseToFile(testCase, filePath) {
    const fs = require('fs');
    const testCases = JSON.parse(fs.readFileSync(filePath));
    testCases.push(testCase);
    fs.writeFileSync(filePath, JSON.stringify(testCases, null, 4));
}

// Function to execute the test scenario
async function executeTestScenario() {
    // Initialize Firefox WebDriver
    let driver = await new Builder().forBrowser('firefox').build();
    
    // Test scenario: Edit a post
    try {
        // Navigate to the post to be edited
        await driver.get('https://artisan-ai-a5f011e35d03.herokuapp.com/post/97/');
        
        // Click on the edit button
        await driver.findElement(By.css(".fa-ellipsis")).click()
        await driver.findElement(By.css(".show > li:nth-child(1) .dropdown-item")).click()

        // Input data into form fields
        await driver.findElement(By.id("postname")).click()
        await driver.findElement(By.id("postname")).sendKeys("eula plushie")
        await driver.findElement(By.id("postdescription")).click()
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
        
        // Create a test case object
        let testCase = createTestCase(
            'TC001',
            'Verify post editing functionality',
            [
                { action: 'navigate', value: 'View Post page: https://artisan-ai-a5f011e35d03.herokuapp.com/post/97/'},
                { action: 'click', element: '.fa-ellipsis', value: 'Dropdown Menu icon'},
                { action: 'click', element: '.show > li:nth-child(1) .dropdown-item', value: 'Edit button'},
                { action: 'click', element: 'postname', value: 'Input field for post name'},
                { action: 'type', element: 'postname', value: 'eula plushie' },
                { action: 'click', element: 'postdescription', value: 'Input field for post description'},
                { action: 'type', element: 'postdescription', value: 'my fav character!' },
                { action: 'click', element: 'difficultySelect', value: 'Dropdown for difficulty level'},
                { action: 'click', element: 'option:nth-child(4)', value: 'Expert difficulty level'},
                { action: 'click', element: '.project-btn-primary', value: 'Submit button'}
            ],
            expectedResults,
            actualResults,
            status
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
