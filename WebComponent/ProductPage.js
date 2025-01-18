const {By} = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.productButton = By.css(".nav [href='/products']");
        this.addtoCart1 = By.css(".features_items .productinfo > [data-product-id='1']");
        this.addtoCart2 = By.css(".features_items .productinfo > [data-product-id='2']");
        this.continueShopping = By.css('.btn-success');
        this.cartPageButton = By.css(".navbar-nav [href='/view_cart']");
        this.proceed = By.css(".check_out");
    }

    async productBtn() {
        await this.driver.findElement(this.productButton).click();
    }
    async addToCart1() {
        await this.driver.findElement(this.addtoCart1).click();
    }
    async addToCart2() {
        await this.driver.findElement(this.addtoCart2).click();
    }
    async continueButton() {
        await this.driver.findElement(this.continueShopping).click();
    }
    async cartPageBtn() {
        await this.driver.findElement(this.cartPageButton).click();
    }
    async verifyItem1() {
        const item1 = await this.driver.findElement(this.verifyItem1);
        return item1;
    }
    async verifyItem2() {
        const item2 = await this.driver.findElement(this.verifyItem2);
        return item2;
    }
    async proceedBtn() {
        await this.driver.findElement(this.proceed).click();
    }
}

module.exports = CartPage;