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
    cy.server();

    cy.route({
      method: 'GET',
      url: '/api/habitaciones/conLugaresLibres**',
      response: [{"id":2146,"nombre":"Roja","esPrivada":false,"camas":[{"id":31,"nombre":"4","tipo":"Cucheta Abajo"},{"id":32,"nombre":"4","tipo":"Cucheta Arriba"},{"id":34,"nombre":"2","tipo":"Matrimimonial"},{"id":33,"nombre":"1","tipo":"Individual"}],"cantidadDeLugaresLibres":5},{"id":2144,"nombre":"Azul","esPrivada":false,"camas":[{"id":29,"nombre":"Matri","tipo":"Matrimimonial"},{"id":27,"nombre":"1","tipo":"Individual"},{"id":28,"nombre":"2","tipo":"Individual"}],"cantidadDeLugaresLibres":4},{"id":2148,"nombre":"Amarilla","esPrivada":false,"camas":[{"id":37,"nombre":"1","tipo":"Individual"},{"id":38,"nombre":"2","tipo":"Individual"},{"id":39,"nombre":"4","tipo":"Individual"},{"id":40,"nombre":"5","tipo":"Individual"}],"cantidadDeLugaresLibres":4},{"id":2147,"nombre":"Verde","esPrivada":false,"camas":[{"id":36,"nombre":"m","tipo":"Matrimimonial"},{"id":35,"nombre":"1","tipo":"Individual"}],"cantidadDeLugaresLibres":3},{"id":2145,"nombre":"La deseada","esPrivada":false,"camas":[{"id":30,"nombre":"1","tipo":"Matrimimonial"}],"cantidadDeLugaresLibres":2},{"id":2149,"nombre":"Privada soy","esPrivada":true,"camas":[{"id":41,"nombre":"1","tipo":"Individual"}],"cantidadDeLugaresLibres":1}]
    })
    
    cy.login();
    cy.saveLocalStorage();
  });
  
beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/reservas')
});