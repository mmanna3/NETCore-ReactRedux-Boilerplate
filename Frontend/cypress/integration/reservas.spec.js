import "cypress-localstorage-commands";

describe('Crear reservas', () => {

    it('Puede agregar renglones', () => {        

        cy.contains('button', 'Cargar nueva')
            .click()

        cy.contains('button', 'Agregar cama')
            .click()

        cy.get('.button.is-static:visible:contains("Hab.")')
            .should('have.length', 2)
    })
})

before(() => {
    cy.login();
    cy.saveLocalStorage();
  });
  
beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/reservas')
});