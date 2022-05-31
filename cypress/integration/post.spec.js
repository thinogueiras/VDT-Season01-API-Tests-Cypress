const helper = require('../../cypress.json');

describe('POST /characters', () => {
    before(() => {
        cy.request({
            method: 'POST',
            url: '/sessions',
            body: {
                email: helper.email,
                password: helper.password,
            },
        }).then((response) => {
            Cypress.env('token', response.body.token);
        });
    });

    beforeEach(() => {
        cy.request({
            method: 'DELETE',
            url: `back2thepast/${helper.myApiID}`,
        });
    });

    it('Deve cadastrar um personagem com sucesso', () => {
        const character = {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-men', 'Illuminati'],
            active: true,
        };

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token'),
            },
        }).then((response) => {
            expect(response.status).to.eql(201);
        });
    });
});
