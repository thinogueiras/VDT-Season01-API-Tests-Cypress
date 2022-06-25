import './commands';
import '@bahmutov/cy-api';

before(() => {
    cy.setToken();
});
