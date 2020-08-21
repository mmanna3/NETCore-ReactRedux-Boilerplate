describe('Calendario', () => {

    it('Reservar 6 días', () => {
        
        acceder();
        
        irAlCalendario();        
        
        seleccionarDesdeHasta('00', '50');

        queEstenSeleccionadasDesdeHasta('00','50');
    })

    it('Si se inició la reserva de una cama, al mover el mouse a la columna de otra cama, no se selecciona', () => {
        
        acceder();
        
        irAlCalendario();        
        
        cy.get('#00')
            .trigger('mouseover')
            .trigger('mousedown', {which: 1})
            .trigger('mousemove')        

        cy.get('#10')
            .trigger('mouseover')
            .trigger('mousemove')

        cy.get('#11')
            .trigger('mouseover')
            .trigger('mousemove')
        
        cy.get('#22')
            .trigger('mouseover')
            .trigger('mousemove')

        cy.get('#20')
            .trigger('mousemove')
            .trigger('mouseup', {force: true})

        queEstenSeleccionadasDesdeHasta('00','20');

        queNoEsteSeleccionada('11');
        queNoEsteSeleccionada('22');
    })

    //idem arriba pero volviendo a 50 en vez de a 20.
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

