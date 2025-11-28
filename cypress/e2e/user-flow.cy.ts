/// <reference types="cypress" />

describe('Flujo Completo de Usuario', () => {
  it('debe completar el flujo: registro → login → shop', () => {
    const email = `test${Date.now()}@example.com`;
    const name = 'Test User';
    const password = 'TestPassword123!';

    // PASO 1: Registro
    cy.visit('/register');
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
    
    // Verificar registro exitoso
    cy.get('p').should('contain', '¡Cuenta creada con éxito!');
    
    // PASO 2: Redirección a login
    cy.url({ timeout: 3000 }).should('include', '/login');
    
    // PASO 3: Login
    cy.login(email, password);
    
    // PASO 4: Verificar shop
    cy.url({ timeout: 5000 }).should('include', '/shop');
    cy.get('body').should('be.visible');
  });

  it('debe manejar login con credenciales incorrectas', () => {
    cy.visit('/login');
    
    cy.get('#email').type('usuario@noexiste.com');
    cy.get('#password').type('PasswordIncorrecto');
    cy.get('button[type="submit"]').first().click();
    
    cy.get('p.text-red-500').should('contain', 'Error');
    cy.url().should('include', '/login');
  });
});