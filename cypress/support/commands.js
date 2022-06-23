import helper from '../../cypress.json';

Cypress.Commands.add('setToken', () => {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: helper.email,
            password: helper.password,
        },
        failOnStatusCode: false,
    }).then((response) => {
        Cypress.env('token', response.body.token);
    });
});

Cypress.Commands.add('back2ThePast', () => {
    cy.api({
        method: 'DELETE',
        url: `back2thepast/${helper.myApiID}`,
        failOnStatusCode: false,
    });
});

Cypress.Commands.add('postCharacter', (payLoad) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payLoad,
        headers: {
            Authorization: Cypress.env('token'),
        },
        failOnStatusCode: false,
    }).then((response) => response);
});

Cypress.Commands.add('getAllCharacters', () => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token'),
        },
        failOnStatusCode: false,
    }).then((response) => response);
});

Cypress.Commands.add('insertCharacters', (characters) => {
    characters.forEach((c) => {
        cy.postCharacter(c);
    });
});
