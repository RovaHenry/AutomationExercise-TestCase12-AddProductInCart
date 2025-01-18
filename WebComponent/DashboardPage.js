const {By} = require('selenium-webdriver');
// Test Case ini tidak membutuhkjan lebih dari 2 file, karena hanya melakukan validasi pada halaman homepage

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.logoDisplay = By.xpath("//img[@alt='Website for automation practice']");
        this.loginMenuButton = By.css("[href='/login']");
        this.loginbutton = By.css("[data-qa='login-button']");
        this.emailFill = By.css("[data-qa='login-email']");
        this.passwordFill = By.css("[name='password']");
    }
    async navigate(baseURL){
        await this.driver.get(baseURL);
    }

    async verifyLogoHome() {
        const logo = await this.driver.findElement(this.logoDisplay);
        return logo;
    }
    async login(email, password) {
        await this.driver.findElement(this.emailFill).sendKeys(email);
        await this.driver.findElement(this.passwordFill).sendKeys(password);
        await this.driver.findElement(this.loginbutton).click();
    }
    async loginMenu() {
        await this.driver.findElement(this.loginMenuButton).click();
    }
}

module.exports = DashboardPage;