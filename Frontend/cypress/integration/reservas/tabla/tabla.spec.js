import "cypress-localstorage-commands";

describe('Mostrar reservas', () => {   

    it('Muestra correctamente reservas', () => {

        cy.contains('h1', 'Reservas')
            .should('have.length', 1)   
         
         cy.get('[dia="23"][camaId="1"]')
            .should('contain', 'Elliot')
    })
})

before(() => {    
    cy.login();
    cy.saveLocalStorage();
  });
  
beforeEach(() => {
   cy.restoreLocalStorage();   

   cy.server()

   cy.intercept('/api/habitaciones', { fixture: 'habitaciones/2-habitaciones-5-camas.json' }).as('habitaciones')   


   //No entiendo por qué no puedo escribir esto con INTERCEPT
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

    var hoy = new Date();
    hoy.setHours(0);
    var hoyString = hoy.toISOString().slice(0,10);
    
    var diaDentroDe30dias = new Date();
    diaDentroDe30dias.setDate(diaDentroDe30dias.getDate() + 30);
    var diaDentroDe30diasString = diaDentroDe30dias.toISOString().slice(0,10);

    cy.intercept('/api/reservas/actuales', {"reservas":[{"diaInicio": hoy.getDate(),"diaFin": hoy.getDate(),"aNombreDe":"Elliot","camasIds":[1,2]}],"desde":hoyString,"hasta":diaDentroDe30diasString}).as('reservasActuales')

    cy.visit('/reservas')
    
    cy.wait(['@habitaciones','@reservasActuales','@conLugaresLibres'])
});