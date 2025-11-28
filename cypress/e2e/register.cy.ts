/// <reference types="cypress" />

describe('Registro', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  const testName = 'Test User';

  beforeEach(() => {
    cy.visit('/register');
  });

  it('debe registrar un nuevo usuario', () => {
    cy.register(testName, testEmail, testPassword);
    cy.get('p').should('contain', '¡Cuenta creada con éxito!');
    cy.url({ timeout: 3000 }).should('include', '/login');
  });
});
