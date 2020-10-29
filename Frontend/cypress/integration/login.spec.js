//hacer logout y login fallido

describe('Login', () => {

    it('Exitoso', () => {
        
        acceder();        
        
        irAHabitaciones();

        cy.contains('h1', 'Habitaciones')
            .should("be.visible")
    })
})

const acceder = () => {
    cy.visit('/');

    cy.get('[name="username"]')
        .type('yo');

    cy.get('[name="password"]')
        .type('123');

    cy.get('[type="submit"]')
        .click();
}

const irAHabitaciones = () => {
    cy.contains('a', 'Habitaciones')
    .click()
}