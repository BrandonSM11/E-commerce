// cypress/support/commands.ts

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').first().click();
});

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('#name').type(name);
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('clearTestData', () => {
  if (Cypress.env('NODE_ENV') === 'test') {
    cy.request('DELETE', `${Cypress.env('apiUrl')}/test/clear`);
  }
});