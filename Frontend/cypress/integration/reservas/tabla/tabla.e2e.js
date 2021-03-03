import "cypress-localstorage-commands";
import habitaciones from '../../../mocks/habitaciones/2-habitaciones-5-camas'
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM'

describe('Mostrar reservas', () => {   

    it('Muestra correctamente reservas', () => {

        cy.contains('h1', 'Reservas')
            .should('have.length', 1)   
         
         paginaReservas.obtenerCelda(numeroDelDiaDeHoy(), 1)
            .should('contain', 'Elliot')
    })
})

before(() => {    
    cy.login();
    cy.saveLocalStorage();
  });

function numeroDelDiaDeHoy(){
   return new  Date().getDate();
}

function hoyString(){
   var hoy = new Date();
   hoy.setHours(0);
   return hoy.toISOString().slice(0,10);   
}

function diaDentroDe30DiasString(){
   var diaDentroDe30dias = new Date();
   diaDentroDe30dias.setDate(diaDentroDe30dias.getDate() + 30);
   return diaDentroDe30dias.toISOString().slice(0,10);
}

beforeEach(() => {
   cy.restoreLocalStorage();

   cy.intercept('/api/habitaciones', habitaciones).as('habitaciones') 

   cy.intercept('/api/reservas/actuales', 
   {
      "reservas":[
         {
            "diaInicio": numeroDelDiaDeHoy(),
            "diaFin": numeroDelDiaDeHoy(),
            "aNombreDe": "Elliot",
            "camasIds": [1,2]
         }
      ],
      "desde": hoyString(),
      "hasta": diaDentroDe30DiasString()
   }
   ).as('reservasActuales')

    cy.visit('/reservas')
    
    cy.wait(['@habitaciones', '@reservasActuales'])
});