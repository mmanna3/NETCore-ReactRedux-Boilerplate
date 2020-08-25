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


describe('Calendario', () => {

    skip('Reservar 6 días', () => {
        
        acceder();
        
        irAlCalendario();        
        
        seleccionarDesdeHasta('00', '50');

        queEstenSeleccionadasDesdeHasta('00','50');
    })

    skip('Si se inició la reserva de una cama, al mover el mouse a la columna de otra cama, termina reserva en último día seleccionado', () => {
        
        acceder();
        
        irAlCalendario();        
        
        cy.get('#00')
            .trigger('mouseover')
            .trigger('mousedown', {which: 1})
            .trigger('mousemove')        

        cy.get('#10')
            .trigger('mouseover')
            .trigger('mousemove')

        cy.get('#20')
            .trigger('mouseover')
            .trigger('mousemove')

        cy.get('#11')
            .trigger('mouseover')
            .trigger('mousemove')
        
        cy.get('#22')
            .trigger('mouseover')
            .trigger('mousemove')

        queEstenSeleccionadasDesdeHasta('00','20');

        queNoEsteSeleccionada('11');
        queNoEsteSeleccionada('22');
    })

    it('Si se inició la reserva de una cama, si me paro arriba una celda ya seleccionada, termino ahí la reserva', () => {

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


const seleccionarDesdeHasta = (celdaInicialId, celdaFinalId) => {
    
    const celdasIdsEntre = (celdaInicialId, celdaFinalId) => { //Es igual a la otra, no la pude sacar
        var columna = celdaInicialId[1];
        
        var result = [];
        var i = parseInt(celdaInicialId[0]) + 1;
    
        while (i < parseInt(celdaFinalId[0])) {            
            result.push(`${i}${columna}`);
            i++;            
        }
    
        return result;
    }

    
    var celdasIdsEntre = celdasIdsEntre(celdaInicialId, celdaFinalId);        

    cy.get('#'+celdaInicialId)
        .trigger('mouseover')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove')        

    celdasIdsEntre.forEach(id => {
        cy.get('#'+id)
            .trigger('mouseover')            
            .trigger('mousemove')
    });

    cy.get('#'+celdaFinalId)
        .trigger('mousemove')
        .trigger('mouseup', {force: true})
}


const queNoEsteSeleccionada = (celda) => {
    cy.get('#'+celda)
        .invoke('attr', 'class')
        .should('not.contain', 'selected');
}

const queEstenSeleccionadasDesdeHasta = (celdaInicialId, celdaFinalId) => {

    const celdasIdsEntre = (celdaInicialId, celdaFinalId) => {  //Es igual a la otra, no la pude sacar
        var columna = celdaInicialId[1];
        
        var result = [];
        var i = parseInt(celdaInicialId[0]) + 1;
    
        while (i < parseInt(celdaFinalId[0])) {            
            result.push(`${i}${columna}`);
            i++;            
        }
    
        return result;
    }
    
    var celdasIdsEntre = celdasIdsEntre(celdaInicialId, celdaFinalId);        

    cy.get('#'+celdaInicialId)
        .invoke('attr', 'class')
        .should('contain', 'selected')
        .should('contain', 'firstSelected');

    celdasIdsEntre.forEach(id => {
        cy.get('#'+id)
            .invoke('attr', 'class')
            .should('contain', 'selected');
    });

    cy.get('#'+celdaFinalId)
        .invoke('attr', 'class')
        .should('contain', 'selected')
        .should('contain', 'lastSelected');

}

