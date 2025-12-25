///<reference types = 'cypress'/>

describe("End to End Ecommerce Test", function () {
    it("Submit Order", function () {

        const productName = "Nokia Edge";
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
        //login page
        cy.get("#username").type("rahulshettyacademy");
        cy.get("#password").type("learning");
        cy.contains("Sign In").click();
        cy.contains("Shop Name").should('be.visible');

        // product catalogue 
        //add product name as Nokia edge to cart
        cy.get(".mb-3").should('have.length', 4);
        cy.get(".mb-3").filter(`:contains("${productName}")`).then($element => {
            cy.wrap($element).contains("button", "Add").click();
        })
        // add first index product to cart
        cy.get(".mb-3").eq(0).contains('button', 'Add').click();
        //click on checkout 
        cy.contains('a', 'Checkout ').click();

        //on cart page verify value should not greater than 2,00,000
        let sum = 0;
        cy.get("tr td:nth-child(4) strong").each($el => {
            const amount = Number($el.text().split(" ")[1].trim());
            sum = sum + amount;
        }).then(function () {
            expect(sum).to.be.lessThan(200000);
        })

        cy.contains('button','Checkout').click();
        cy.get("#country").type("India");
        cy.get(".suggestions ul li a",{timeout: 10000}).should('be.visible').contains("India").click();
        cy.get(".btn-success").click();
        cy.get(".alert-success").should('contain','Success');
    })
})