import CartPage from "./Cartpage";
export default class ProductPage {

    verifyCardLength(){
        cy.get('.mb-3').should('have.length', 4);
    }

    selectProduct(productName){
        cy.get('.mb-3')
            .filter(`:contains("${productName}")`)
            .within(() => {
                cy.contains('button', 'Add').click();
            })
    }

    goToCartPage(){
         cy.contains('a', 'Checkout').click();
         return new CartPage();
    }
}