describe('Tests del calendario', () => {

    it('Ir a la opción de menú', () => {
        cy.visit('http://localhost:3000/');
        
        cy.get('[name="username"]')
            .type('yo')

        cy.get('[name="password"]')
            .type('123')

        cy.get('[type="submit"]')
            .click()
        
        cy.get('.navbar-burger')
            .click()

        cy.contains('a', 'Calendario')
            .click()
        
        //El menú debería cerrarse. Assertear eso cuando se pueda.

        cy.contains('h1', 'Calendario')
            .should('be.visible')
        
        seleccionarDesdeHasta('00', '30');

        cy.get('#00')
            .invoke('attr', 'class')
            .should('contain', 'Selected');
    })

  })

const seleccionarDesdeHasta = (celdaInicialId, celdaFinalId) => {

    const celdasIdsEntre = (celdaInicialId, celdaFinalId) => {
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

