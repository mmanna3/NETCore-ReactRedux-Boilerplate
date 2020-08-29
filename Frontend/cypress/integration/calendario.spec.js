/*

Puedo reservar un sólo día
    3 camas
Puedo resevar 2 días
    una cama
    3 camas
Puedo reservar más de 2 días
    una cama
    2 camas
    3 camas

Al moverme hacia la celda de arriba, se deselecciona(n) la(s) celda(s) del día actual
    Durante reserva de una cama
    Durante reserva de 3 camas

No puedo seleccionar en la misma reserva camas de distintas habitaciones

No puedo seleccionar camas ya reservadas ese día
    una cama
    3 camas

    
    En Table, tener variable "reservas" que sea array de objetos. Props: celda inicio, celda fin (a lo excel) y después más datos.
    Al finalizar, assertear que la reserva se guarde en ese array

    En cada celda tener los attributes: dia="01" cama="id" habitacion="id"
*/


describe('Poder reservar un día', () => {

    it('Una cama', () => {
        
        acceder();        
        irAlCalendario();        
        
        cy.get('[row="0"][column="0"]')
            .click();
        
        cy.get('[row="0"][column="0"]')
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

        // queEstenSeleccionadasDesdeHasta({row:0,col:0},{row:2,col:0});
        // queNoEsteSeleccionada(({row:1,col:0}));
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


// const queNoEsteSeleccionada = (celda) => {
//     cy.get('#'+celda)
//         .invoke('attr', 'class')
//         .should('not.contain', 'selected');
// }

// function queEstenSeleccionadasDesdeHasta(celdaInicialId, celdaFinalId) {
    
//     var celdasIdsEntre = celdasIdsEntre(celdaInicialId, celdaFinalId);        

//     cy.get('#'+celdaInicialId)
//         .invoke('attr', 'class')
//         .should('contain', 'selected')
//         .should('contain', 'firstSelected');

//     celdasIdsEntre.forEach(id => {
//         cy.get('#'+id)
//             .invoke('attr', 'class')
//             .should('contain', 'selected');
//     });

//     cy.get('#'+celdaFinalId)
//         .invoke('attr', 'class')
//         .should('contain', 'selected')
//         .should('contain', 'lastSelected');

// }

function celdasEntre(celdaInicial, celdaFinal) {
    
    var result = [];
    var i = parseInt(celdaInicial.column) + 1;

    while (i < parseInt(celdaFinal.column)) {            
        result.push({
                        column: celdaInicial.column, 
                        row: i
                    });
        i++;            
    }

    return result;
}