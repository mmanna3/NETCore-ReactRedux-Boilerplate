export function obtenerCelda(dia: number, camaId: number) { 
    return cy.get(`[dia="${dia}"][camaId="${camaId}"]`)
}

export function abrirModalCargarNueva() {
    cy.contains('button', 'Cargar nueva')
        .click()

    cy.wait('@conLugaresLibres')
}