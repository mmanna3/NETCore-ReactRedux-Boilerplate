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


        //cy.get('.00').then($el => console.log($el[0].getBoundingClientRect()))  Quizás sirva (?)

        cy.get('.00')
            .trigger('mouseover')
            .trigger('mousedown', {which: 1})
            .trigger('mousemove')
            .get('.10')
            .trigger('mouseover')            
            .trigger('mousemove')
            .get('.20')
            .trigger('mousemove')
            .trigger('mouseup', {force: true})
    })
  })