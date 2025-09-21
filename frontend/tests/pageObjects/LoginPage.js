class LoginPage {
  visit() {
    cy.visit('/login');
  }

  getEmailInput() {
    return cy.get('input[type="email"]');
  }

  getPasswordInput() {
    return cy.get('input[type="password"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  login(email, password) {
    this.visit();
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
    this.getSubmitButton().click();
  }
}

export default LoginPage;
