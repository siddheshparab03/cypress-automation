///<reference types='cypress'/>

describe('End to End Ecommerce Test', () => {
    it('submits an order', () => {
        const productName = 'Nokia Edge';

        cy.visit('https://rahulshettyacademy.com/loginpagePractise/');
        cy.get('#username').type('rahulshettyacademy');
        cy.get('#password').type('learning');
        cy.contains('Sign In').click();

        cy.get('.mb-3').should('have.length', 4);

        // add the specified product to cart
        cy.get('.mb-3')
            .filter(`:contains("${productName}")`)
            .within(() => {
                cy.contains('button', 'Add').click();
            });

        // go to the cart/checkout page
        cy.contains('a', 'Checkout').click();

        // verify the sum of item prices is below threshold
        cy.get('tr td:nth-child(4) strong').then(($els) => {
            let total = 0;
            $els.each((i, el) => {
                const text = Cypress.$(el).text();
                const amount = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
                total += amount;
            });
            expect(total).to.be.lessThan(200000);
        });

        cy.contains('button', 'Checkout').click();

        cy.get('#country').type('India');
        cy.get('.suggestions', { timeout: 10000 }).should('be.visible').contains('India').click();

        cy.get('.btn-success').click();
        cy.get('.alert-success').should('contain', 'Success');
    });
});
