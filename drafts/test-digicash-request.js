// Import necessary modules
const { By, until } = require('selenium-webdriver');
const {
    createTestCase,
    determineStatus,
    captureAndSaveScreenshot,
    appendTestCaseToFile
} = require('../utilities.js');

// Define the test scenario function
async function testDigicashRequest(driver, TEST_CASE_FILE_PATH) {
    try {
        // Define the test case variables
        const testCaseId = 'TC003';
        const description = 'Verify Digicash "Edit iBERF" functionality';
        const expectedResults = 'Edited iBERF successfully';
        let actualResults;
        let status;
        
        // Capture and save a screenshot
        let screenshotFilePath;
        
        try {
            console.log('Executing test scenario...');
                
            // Navigate to the edit page
            await driver.get("https://mgenesis.sharepoint.com/sites/DigiCash/SitePages/FormType.aspx?formType=IBERF2024000005")
    
            // Input data into form fields        
            await driver.findElement(By.id("prjName")).click()
            await driver.findElement(By.id("prjName")).sendKeys("Project Title Edited")
            await driver.findElement(By.id("needDate")).click()
            await driver.findElement(By.id("needDate")).sendKeys("2024-02-14")
            await driver.findElement(By.id("prebidDate")).click()
            await driver.findElement(By.id("prebidDate")).sendKeys("2024-02-16")
            await driver.findElement(By.id("bidDate")).click()
            await driver.findElement(By.id("bidDate")).sendKeys("2024-02-20")
            await driver.findElement(By.id("rqstr")).click()
            {
            const element = await driver.findElement(By.id("prjAmt"))
            await driver.actions({ bridge: true }).moveToElement(element).perform()
            }
            await driver.findElement(By.id("rqstr")).sendKeys("Itsd Dev Intern 1")
            await driver.findElement(By.id("client")).click()
            await driver.findElement(By.id("client")).sendKeys("Microgenesis Business Systems")
            await driver.findElement(By.id("select")).click()
            {
            const dropdown = await driver.findElement(By.id("select"))
            await dropdown.findElement(By.xpath("//option[. = 'Social Media']")).click()
            }
            await driver.findElement(By.css("#select > option:nth-child(6)")).click()
            await driver.findElement(By.id("prjAmt")).click()
            await driver.findElement(By.id("prjAmt")).sendKeys("20000")
            await driver.findElement(By.id("gpa")).click()
            await driver.findElement(By.id("gpa")).sendKeys("29999")
            await driver.findElement(By.id("gpa")).sendKeys("29998")
            await driver.findElement(By.id("bdgtAmt2")).click()
            await driver.findElement(By.id("bdgtAmt2")).sendKeys("5000")
            await driver.findElement(By.id("bdgtAmt3")).click()
            await driver.findElement(By.id("bdgtAmt3")).sendKeys("5000")
            await driver.findElement(By.id("bdgtAmt1")).click()
            await driver.findElement(By.id("bdgtAmt1")).sendKeys("10000")
            await driver.findElement(By.id("bdgtAmt3")).click()
            await driver.findElement(By.id("bdgtAmt3")).sendKeys("500")
            await driver.findElement(By.id("addRowBtn")).click()
            {
            const element = await driver.findElement(By.id("addRowBtn"))
            await driver.actions({ bridge: true }).moveToElement(element).perform()
            }
            {
            const element = await driver.findElement(By.CSS_SELECTOR, "body")
            await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
            }
            await driver.findElement(By.id("partSelect4")).click()
            {
            const dropdown = await driver.findElement(By.id("partSelect4"))
            await dropdown.findElement(By.xpath("//option[. = 'Transportation']")).click()
            }
            await driver.findElement(By.css("#partSelect4 > option:nth-child(5)")).click()
            await driver.findElement(By.id("bdgtAmt4")).click()
            await driver.findElement(By.id("bdgtAmt4")).sendKeys("500")
            await driver.findElement(By.css("#exp1 .fa")).click()
            await driver.findElement(By.id("bdgtAmt2")).click()
            await driver.findElement(By.id("bdgtAmt3")).click()
            await driver.findElement(By.id("bdgtAmt3")).sendKeys("1500")
            await driver.findElement(By.id("bdgtAmt4")).click()
            await driver.findElement(By.id("bdgtAmt4")).click()
            await driver.findElement(By.id("bdgtAmt4")).sendKeys("2500")
            await driver.findElement(By.css(".col-md-9")).click()

            // Cancel the form submission (because of error when clicking save draft/submit button)
            await driver.findElement(By.id("cancelBtn")).click()
        
            // Set values for actualResults and status
            actualResults = 'Edited iBERF successfully';
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
            testCaseId,
            description,
            [
                { action: 'click', element: 'id=prjName', value: 'Project Name Textfield' },
                { action: 'input', element: 'id=prjName', value: 'Project Title Edited' },
                { action: 'click', element: 'id=needDate', value: 'Need Date Textfield' },
                { action: 'input', element: 'id=needDate', value: '2024-02-14' },
                { action: 'click', element: 'id=prebidDate', value: 'Pre-bid Date Textfield' },
                { action: 'input', element: 'id=prebidDate', value: '2024-02-16' },
                { action: 'click', element: 'id=bidDate', value: 'Bid Date Textfield' },
                { action: 'input', element: 'id=bidDate', value: '2024-02-20' },
                { action: 'click', element: 'id=rqstr', value: 'Requestor Textfield' },
                { action: 'input', element: 'id=rqstr', value: 'Itsd Dev Intern 1' },
                { action: 'click', element: 'id=client', value: 'Client Textfield' },
                { action: 'input', element: 'id=client', value: 'Microgenesis Business Systems' },
                { action: 'click', element: 'id=select', value: 'Project Type Dropdown' },
                { action: 'select', element: 'id=select', value: 'Social Media' },
                { action: 'click', element: 'id=prjAmt', value: 'Project Amount Textfield' },
                { action: 'input', element: 'id=prjAmt', value: '20000' },
                { action: 'click', element: 'id=gpa', value: 'GPA Textfield' },
                { action: 'input', element: 'id=gpa', value: '29999' },
                { action: 'click', element: 'id=gpa', value: 'GPA Textfield' },
                { action: 'input', element: 'id=gpa', value: '29998' },
                { action: 'click', element: 'id=bdgtAmt2', value: 'Budget Amount 2 Textfield' },
                { action: 'input', element: 'id=bdgtAmt2', value: '5000' },
                { action: 'click', element: 'id=bdgtAmt3', value: 'Budget Amount 3 Textfield' },
                { action: 'input', element: 'id=bdgtAmt3', value: '5000' },
                { action: 'click', element: 'id=bdgtAmt1', value: 'Budget Amount 1 Textfield' },
                { action: 'input', element: 'id=bdgtAmt1', value: '10000' },
                { action: 'click', element: 'id=bdgtAmt3', value: 'Budget Amount 3 Textfield' },
                { action: 'input', element: 'id=bdgtAmt3', value: '500' },
                { action: 'click', element: 'id=addRowBtn', value: 'Add Row Button' },
                { action: 'click', element: 'id=partSelect4', value: 'Part 4 Dropdown' },
                { action: 'select', element: 'id=partSelect4', value: 'Transportation' },
                { action: 'click', element: 'id=bdgtAmt4', value: 'Budget Amount 4 Textfield' },
                { action: 'input', element: 'id=bdgtAmt4', value: '500' },
                { action: 'click', element: 'css=#exp1 .fa', value: 'Expand Button' },
                { action: 'click', element: 'id=bdgtAmt2', value: 'Budget Amount 2 Textfield' },
                { action: 'click', element: 'id=bdgtAmt3', value: 'Budget Amount 3 Textfield' },
                { action: 'input', element: 'id=bdgtAmt3', value: '1500' },
                { action: 'click', element: 'id=bdgtAmt4', value: 'Budget Amount 4 Textfield' },
                { action: 'click', element: 'id=bdgtAmt4', value: 'Budget Amount 4 Textfield' },
                { action: 'input', element: 'id=bdgtAmt4', value: '2500' },
                { action: 'click', element: 'css=.col-md-9', value: 'Column' },
                { action: 'click', element: 'id=cancelBtn', value: 'Cancel Button' }                
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
module.exports = testDigicashRequest;
