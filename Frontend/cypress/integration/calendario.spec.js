/*
Puedo reservar más de 2 días
    una cama
    2 camas
    3 camas

MOVIMIENTO HACIA ARRIBA
        Al moverme hacia la celda de arriba, se deselecciona(n) la(s) celda(s) del día actual
            Durante reserva de una cama
            Durante reserva de 3 camas

MOVIMIENTO HACIA LA IZQUIERDA

No puedo seleccionar en la misma reserva camas de distintas habitaciones

No puedo seleccionar camas ya reservadas ese día
    una cama
    3 camas
*/


describe('Poder reservar un día', () => {

    it('Una cama', () => {
        
        acceder();        
        irAlCalendario();        
        
        getCeldaCypress({col: 0, row: 0})
            .click();
        
        getCeldaCypress({col: 0, row: 0})
            .invoke('attr', 'class')
            .should('contain', 'selected')
            .should('contain', 'firstSelected')
            .should('contain', 'lastSelected')
            ;
    })

    it('3 camas', () => {
        
        acceder();        
        irAlCalendario();

        seleccionarDesdeHasta({row:0,col:0},{row:2,col:0});

        queEstenSeleccionadasDesdeHasta({row:0,col:0},{row:2,col:0});
        queNoEsteSeleccionada(({row:0,col:1}));
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

const seleccionarDesdeHasta = (celdaInicial, celdaFinal) => {    
    
    var celdasIntermedias = celdasEntre(celdaInicial, celdaFinal);        

    getCeldaCypress(celdaInicial)
        .trigger('mouseover')
        .trigger('mousedown', {which: 1})
        .trigger('mousemove')        

    celdasIntermedias.forEach(celda => {
        getCeldaCypress(celda)
            .trigger('mouseover')
            .trigger('mousemove')
    });

    getCeldaCypress(celdaFinal)
        .trigger('mousemove')
        .trigger('mouseup', {force: true})
}

function getCeldaCypress(celda) {
    return cy.get(`[row="${celda.row}"][column="${celda.col}"]`);
}


const queNoEsteSeleccionada = (celda) => {
    getCeldaCypress(celda)
        .invoke('attr', 'class')
        .should('not.contain', 'selected');
}

function queEstenSeleccionadasDesdeHasta(celdaInicial, celdaFinal) {
    
    var celdasIntermedias = celdasEntre(celdaInicial, celdaFinal);        

    getCeldaCypress(celdaInicial)
        .invoke('attr', 'class')
        .should('contain', 'selected')
        .should('contain', 'firstSelected');

    celdasIntermedias.forEach(celda => {
        getCeldaCypress(celda)
            .invoke('attr', 'class')
            .should('contain', 'selected');
    });

    getCeldaCypress(celdaFinal)
        .invoke('attr', 'class')
        .should('contain', 'selected')
        .should('contain', 'lastSelected');

}

function celdasEntre(celdaInicial, celdaFinal) {
    
    var result = [];
    var i = parseInt(celdaInicial.row) + 1;

    while (i < parseInt(celdaFinal.row)) {
        result.push({
                        col: celdaInicial.col, 
                        row: i
                    });
        i++;            
    }
    
    return result;
}