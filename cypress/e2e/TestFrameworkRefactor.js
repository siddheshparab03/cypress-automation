///<reference types='cypress'/>
import HomePage from "../support/PageObjects/HomePage";

describe('End to End Ecommerce Test', function () {

    before(function () {
        cy.fixture('example').then(function (data) {
            this.data = data;
        })
    })
    it('submits an order', function () {
        const productName = this.data.productName;
        const homepage = new HomePage();
        homepage.goTo(Cypress.env('url')+'/loginpagePractise/');
        const productpage = homepage.login(this.data.username, this.data.password);
        productpage.verifyCardLength();
        productpage.selectProduct(productName);
        const cartpage = productpage.goToCartPage();
        cartpage.verifySumOfPrices();
        const confirmationpage = cartpage.goToConFirmationPage()
        confirmationpage.selectCountry();
        confirmationpage.verifyMsg()

    });
});
