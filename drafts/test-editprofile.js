// Import necessary modules
const { By, until } = require('selenium-webdriver');
const {
    createTestCase,
    determineStatus,
    captureAndSaveScreenshot,
    appendTestCaseToFile
} = require('../utilities.js');

// Define the test scenario function
async function testEditProfile(driver, TEST_CASE_FILE_PATH) {
    try {
        // Define the test case variables
        const testCaseId = 'TC002';
        const description = 'Verify profile editing functionality';
        const expectedResults = 'Profile successfully edited';
        let actualResults;
        let status;
        
        // Capture and save a screenshot
        let screenshotFilePath;
        
        try {
            console.log('Executing edit profile test scenario...');
                
            // Navigate to the profile page
            await driver.findElement(By.id("usericon")).click()
            await driver.findElement(By.css(".show > li:nth-child(1) .dropdown-item")).click()
            
            // Click on the edit button
            await driver.findElement(By.css(".profile-btn-primary")).click()

            // Input data into form fields        
            await driver.findElement(By.id("profileThemeSelect")).click()
            {
            const dropdown = await driver.findElement(By.id("profileThemeSelect"))
            await dropdown.findElement(By.xpath("//option[. = '🧡 orange']")).click()
            }
            await driver.findElement(By.css("#profileThemeSelect > option:nth-child(3)")).click()
            await driver.findElement(By.id("postname")).click()
            await driver.findElement(By.id("postname")).clear()
            await driver.findElement(By.id("postname")).sendKeys("hj")
            await driver.findElement(By.id("postdescription")).click()
            await driver.findElement(By.id("postdescription")).clear()
            await driver.findElement(By.id("postdescription")).sendKeys("hi, i\'m hyunjin!")
            await driver.findElement(By.id("difficultySelect")).click()
            {
            const dropdown = await driver.findElement(By.id("difficultySelect"))
            await dropdown.findElement(By.xpath("//option[. = 'beginner']")).click()
            }
            await driver.findElement(By.css("#difficultySelect > option:nth-child(1)")).click()
            
            // comment the following to avoid error
            await driver.findElement(By.css(".select-btn-preferences")).click()
            await driver.findElement(By.css("label:nth-child(8)")).click()
            await driver.findElement(By.css("label:nth-child(6)")).click()
            await driver.findElement(By.css("label:nth-child(2)")).click()
            await driver.findElement(By.css("label:nth-child(22)")).click()
            await driver.findElement(By.id("tagsSelect")).click()

            // Submit the form
            await driver.findElement(By.css(".project-btn-primary")).click()

            // Wait for confirmation message or redirect
            await driver.wait(until.urlIs('https://artisan-ai-a5f011e35d03.herokuapp.com/profile/userbeginner'));
        
            // Set values for actualResults and status
            actualResults = 'Profile successfully edited';
            status = determineStatus(expectedResults, actualResults);
            
            // Capture and save a screenshot
            screenshotFilePath = await captureAndSaveScreenshot(driver, testCaseId);
        
        } catch (elementError) {
            // Handle the error and set appropriate values for actualResults and status
            actualResults = `Error: Element '${elementError.element}' not interactable`;
            status = 'Fail';
            
            // Capture and save a screenshot if necessary
            screenshotFilePath = await captureAndSaveScreenshot(driver, `${testCaseId}_with_error`);
        }
        
        // Create a test case object
        console.log('Creating test case...');
        let testCase = createTestCase(
            'TC002',
            'Verify profile editing functionality',
            [
                { action: 'click', element: 'usericon', value: 'User icon'},
                { action: 'click', element: '.show > li:nth-child(1) .dropdown-item', value: 'Edit button'},
                { action: 'click', element: 'profileThemeSelect', value: 'Dropdown for profile theme'},
                { action: 'click', element: 'option:nth-child(3)', value: '"🧡 orange"'},
                { action: 'click', element: 'postname', value: 'Input field for post name'},
                { action: 'type', element: 'postname', value: '"hj"' },
                { action: 'click', element: 'postdescription', value: 'Input field for post description'},
                { action: 'type', element: 'postdescription', value: '"hi, i\'m hyunjin!"' },
                { action: 'click', element: 'difficultySelect', value: 'Dropdown for difficulty level'},
                { action: 'click', element: 'option:nth-child(1)', value: '"Beginner difficulty level"'},
                { action: 'click', element: '.select-btn-preferences', value: 'Submit button'}
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
        console.error('Error occurred during test scenario:', error);
        return 'Fail';
    }
}

// Export the login test scenario function
module.exports = testEditProfile;
