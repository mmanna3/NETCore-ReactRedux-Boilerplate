import "cypress-localstorage-commands";

describe('Crear reservas', () => {   

    it('Si la primera es una habitación privada, figura la leyenda correspondiente', () => {

      mockearSoloUnaHabitacionPrivada();

      cy.contains('button', 'Cargar nueva')
         .click()
      
      cy.get('#habitacion-privada-renglon-0')
         .should('contain.value', 1)

      cy.get('#habitacion-privada-renglon-0')
         .should('contain.text', 'Todas - Habitación privada')
    })

    it('Si la primera es una habitación sin camas, figura la leyenda correspondiente', () => {

      mockearSoloUnaHabitacionSinCamas();
      
      cy.contains('button', 'Cargar nueva')
         .click()
      
      cy.get('#habitacion-renglon-0')
         .should('contain.value', 1)

         cy.get('#renglon-sin-camas-0')
         .should('contain.value', 'No tiene')
    })
})

before(() => {    
    cy.login();
    cy.saveLocalStorage();
  });
  
beforeEach(() => {
   cy.restoreLocalStorage();
});

function mockearSoloUnaHabitacionPrivada(){
   cy.server()
   cy.route({
      method: 'GET',
      url: '/api/habitaciones/conLugaresLibres**',
      response: [
        {
           "id":1,
           "nombre":"Roja",
           "esPrivada":true,
           "camas":[
              {
                 "id":31,
                 "nombre":"4",
                 "tipo":"Cucheta Abajo"
              },
              {
                 "id":32,
                 "nombre":"4",
                 "tipo":"Cucheta Arriba"
              },
              {
                 "id":34,
                 "nombre":"2",
                 "tipo":"Matrimimonial"
              },
              {
                 "id":33,
                 "nombre":"1",
                 "tipo":"Individual"
              }
           ],
           "cantidadDeLugaresLibres":5
        }
     ]
    }).as('conLugaresLibres')
    
    cy.visit('/reservas')
    
    cy.wait('@conLugaresLibres')
}

function mockearSoloUnaHabitacionSinCamas(){
   cy.server()
   cy.route({
      method: 'GET',
      url: '/api/habitaciones/conLugaresLibres**',
      response: [
        {
           "id":1,
           "nombre":"Roja",
           "esPrivada":true,
           "camas":[],
           "cantidadDeLugaresLibres":0
        }
     ]
    }).as('conLugaresLibres')
    
    cy.visit('/reservas')
    
    cy.wait('@conLugaresLibres')
}