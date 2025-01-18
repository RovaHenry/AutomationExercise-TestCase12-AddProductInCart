const {Builder, By} = require('selenium-webdriver');
const DashboardPage = require ('./WebComponent/DashboardPage');
const ProductPage = require ('./WebComponent/ProductPage')

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const elementsToVerify = [
    { locator: By.css("tbody > tr:nth-of-type(1) .cart_total_price"), expectedValue: "Rs. 500" },
    { locator: By.css("tbody > tr:nth-of-type(1) .disabled"), expectedValue: "1" },
    { locator: By.css("tr:nth-of-type(2) .cart_total_price"), expectedValue: "Rs. 400" },
    { locator: By.css("tr:nth-of-type(2) .disabled"), expectedValue: "1" },
    { locator: By.css("tr:nth-of-type(3) .cart_total_price"), expectedValue: "Rs. 900" }
];

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 12 [add product in cart]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }
    
    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage and login', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }
        await dashboardPage.loginMenu();
        await dashboardPage.login(email, password);
    });
    it('Come to Product Page and add item to Cart Page ', async function () {
        const productPage = new ProductPage(driver);
        await productPage.productBtn();
        await productPage.addToCart1();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await productPage.continueButton();
        await productPage.addToCart2();
        await productPage.cartPageBtn();
        await productPage.proceedBtn();
        elementsToVerify.forEach(async (element) => {
            const actualValue = await driver.findElement(element.locator).getText();
            if (actualValue === element.expectedValue) {
                console.log(`Verification passed for: ${element.locator} as expected "${element.expectedValue}" and got ${actualValue}`);
            } else {
                console.error(`Verification failed for: ${element.locator}. Expected: "${element.expectedValue}", Got: ${actualValue}`);
            }
        });
    });
    

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});