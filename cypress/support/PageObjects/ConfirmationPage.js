export default class ConfirmationPage {

    selectCountry(){
        cy.get('#country').type('India');
        cy.get('.suggestions', { timeout: 10000 }).should('be.visible').contains('India').click();
    }

    verifyMsg(){
        cy.get('.btn-success').click();
        cy.get('.alert-success').should('contain', 'Success');
    }
}