describe('Tests del calendario', () => {

    it('Ir a la opción de menú', () => {
        cy.visit('http://localhost:3000/');
        
        cy.get('[name="username"]')
            .type('yo')

        cy.get('[name="password"]')
            .type('123')

        cy.get('[type="submit"]')
            .click()
        
        cy.get('.navbar-burger')
            .click()

        cy.contains('a', 'Calendario')
            .click()


        //El menú debería cerrarse. Assertear eso cuando se pueda.

        cy.contains('h1', 'Calendario')
            .should('be.visible')
    })
  })