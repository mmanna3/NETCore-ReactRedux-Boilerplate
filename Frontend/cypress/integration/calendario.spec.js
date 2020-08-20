describe('Calendario', () => {

    it('Selección básica', () => {
        
        acceder();
        
        irAlCalendario();        
        
        seleccionarDesdeHasta('00', '50');

        queEstenSeleccionadasDesdeHasta('00','50');
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

