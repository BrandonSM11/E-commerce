/// <reference types="cypress" />

describe('Login', () => {
  it('debe hacer login correctamente', () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Password123!';
    const testName = 'Test User';

    cy.register(testName, testEmail, testPassword);
    cy.get('p').should('contain', '¡Cuenta creada con éxito!', { timeout: 5000 });
    cy.url({ timeout: 5000 }).should('include', '/login');
    
    cy.login(testEmail, testPassword);
    cy.url({ timeout: 3000 }).should('include', '/shop');
  });

  it('debe mostrar error con credenciales incorrectas', () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Password123!';
    const testName = 'Test User';

    cy.register(testName, testEmail, testPassword);
    cy.get('p').should('contain', '¡Cuenta creada con éxito!', { timeout: 5000 });
    cy.url({ timeout: 5000 }).should('include', '/login');
    
    cy.login('noexiste@example.com', 'WrongPassword123!');
    cy.get('p.text-red-500').should('contain', 'Error');
  });
});