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
   
   cy.route({
      method: 'GET',
      url: '/api/habitaciones',
      response: require('./../../mocks/habitaciones/2-habitaciones-5-camas')
    }).as('habitaciones')

    var hoy = new Date();
    hoy.setHours(0);
    var hoyString = hoy.toISOString().slice(0,10);
    
    var diaDentroDe30dias = new Date();
    diaDentroDe30dias.setDate(diaDentroDe30dias.getDate() + 30);
    var diaDentroDe30diasString = diaDentroDe30dias.toISOString().slice(0,10);

    cy.route({
      method: 'GET',
      url: '/api/reservas/actuales',
      response: {"reservas":[{"diaInicio": hoy.getDate(),"diaFin": hoy.getDate(),"aNombreDe":"Elliot","camasIds":[1,2]}],"desde":hoyString,"hasta":diaDentroDe30diasString}
    }).as('reservasActuales')

    cy.visit('/reservas')
    
    cy.wait('@habitaciones')
    cy.wait('@reservasActuales')
});