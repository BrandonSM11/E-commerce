declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    register(name: string, email: string, password: string): Chainable<void>;
    clearTestData(): Chainable<void>;
  }
}