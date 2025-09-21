class RegistrationPage {
  visit() {
    cy.visit('/register');
  }

  getFirstNameInput() {
    return cy.get('input[name="firstName"]');
  }

  getLastNameInput() {
    return cy.get('input[name="lastName"]');
  }

  getEmailInput() {
    return cy.get('input[name="email"]');
  }

  getPasswordInput() {
    return cy.get('input[name="password"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  register(firstName, lastName, email, password) {
    this.visit();
    this.getFirstNameInput().type(firstName);
    this.getLastNameInput().type(lastName);
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
    this.getSubmitButton().click();
  }
}

export default RegistrationPage;
