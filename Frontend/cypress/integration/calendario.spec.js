/*

Puedo reservar un sólo día
    una cama
    2 camas
    3 camas
Puedo resevar 2 días
    una cama
    2 camas
    3 camas
Puedo reservar más de 2 días
    una cama
    2 camas
    3 camas

Al moverme hacia la celda de arriba, se deselecciona(n) la(s) celda(s) del día actual
    Durante reserva de una cama
    Durante reserva de 2 camas
    Durante reserva de 3 camas

No puedo seleccionar en la misma reserva camas de distintas habitaciones

No puedo seleccionar camas ya reservadas ese día
    una cama
    2 camas
    3 camas

    
    En Table, tener variable "reservas" que sea array de objetos. Props: celda inicio, celda fin (a lo excel) y después más datos.
    Al finalizar, assertear que la reserva se guarde en ese array

    En cada celda tener los attributes: dia="01" cama="id" habitacion="id"
*/


describe('Poder reservar un día', () => {

    it('Una cama', () => {
        
        acceder();        
        irAlCalendario();        
        
        cy.get('[row="0"][column="0"]')
            .click();
        
        cy.get('[row="0"][column="0"]')
            .invoke('attr', 'class')
            .should('contain', 'selected')
            .should('contain', 'firstSelected')
            .should('contain', 'lastSelected')
            ;
    })
})

const acceder = () => {
    cy.visit('http://localhost:3000/');

    cy.get('[name="username"]')
        .type('yo');

    cy.get('[name="password"]')
        .type('123');

    cy.get('[type="submit"]')
        .click();
}

const irAlCalendario = () => {
    cy.contains('a', 'Calendario')
    .click()

    cy.contains('h1', 'Calendario')
        .should('be.visible')
}