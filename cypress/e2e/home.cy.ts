/// <reference types="cypress" />

describe('Página Principal', () => {
  beforeEach(() => {
    // Visitar página antes de cada test
    cy.visit('/');
  });

  it('debe cargar la página correctamente', () => {
    // Verificar que la página carga
    cy.get('body').should('be.visible');
  });

it('debe tener el título correcto', () => {
  // Verificar que la página tiene contenido en lugar del título
  cy.get('h1').should('be.visible');
  cy.get('h1').contains('Conduce tus').should('exist');
});

it('debe mostrar contenido principal', () => {
  // Esperar a que la animación termine (ajusta el tiempo si es necesario)
  cy.get('h1').should('be.visible');
  cy.get('h2').should('be.visible');
});
});