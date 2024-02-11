// Import necessary modules
const { By, until } = require('selenium-webdriver');
const {
    createTestCase,
    determineStatus,
    captureAndSaveScreenshot,
    appendTestCaseToFile
} = require('../utilities.js');

// Define the test scenario function
async function testEditPost(driver, TEST_CASE_FILE_PATH) {
    try {
        // Define the test case variables
        const testCaseId = 'TC001';
        const description = 'Verify post editing functionality';
        const expectedResults = 'Post successfully edited';
        let actualResults;
        let status;
        
        // Capture and save a screenshot
        let screenshotFilePath;
        
        // Assuming 'ElementNotInteractableError' represents an error when an element is not interactable
        // Catch the specific error and set appropriate values for actualResults and status
        try {
            console.log('Executing edit post test scenario...');
        
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
            
            // Set values for actualResults and status
            actualResults = 'Post successfully edited';
            status = determineStatus(expectedResults, actualResults);
            
            // Capture and save a screenshot
            screenshotFilePath = await captureAndSaveScreenshot(driver, testCaseId);
            
        } catch (elementError) {
            // Handle the error and set appropriate values for actualResults and status
            actualResults = 'Error: Element not interactable';
            status = 'Fail';
            
            // Capture and save a screenshot if necessary
            screenshotFilePath = await captureAndSaveScreenshot(driver, testCaseId + '_with_error');
        }
        
        // Create a test case object
        console.log('Creating test case...');
        let testCase = createTestCase(
            testCaseId,
            description,
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
                
        // Log success or failure
        if (status === 'Pass') {
            console.log('Test case executed successfully');
        } else {
            console.error('Error occurred during test scenario:', actualResults);
        }
        
        return 'status';
    } catch (error) {
        // Catch any unexpected errors
        console.error('Error occurred during test scenario:', error);
        return 'Fail';
    }
}

// Export the login test scenario function
module.exports = testEditPost;
