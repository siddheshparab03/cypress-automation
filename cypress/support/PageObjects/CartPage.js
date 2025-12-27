import ConfirmationPage from "./ConfirmationPage";
export default class CartPage{

    verifySumOfPrices(){
         cy.get('tr td:nth-child(4) strong').then(($els) => {
            let total = 0;
            $els.each((i, el) => {
                const text = Cypress.$(el).text();
                const amount = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
                total += amount;
            });
            expect(total).to.be.lessThan(200000);
        });

    }

    goToConFirmationPage(){
        cy.contains('button', 'Checkout').click();
        return new ConfirmationPage()
    }

}