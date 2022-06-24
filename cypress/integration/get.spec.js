import fixture from '../fixtures/characters.json';

describe('GET /characters', () => {
    before(() => {
        cy.back2ThePast();
        cy.setToken();
        cy.insertLisOfCharacters(fixture.Characters);
    });

    it('Deve retornar uma lista de personagens', () => {
        cy.getAllCharacters()
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.a('array');
                expect(response.body.length).equal(fixture.Characters.length);
            });
    });

    it('Deve permitir buscar um personagem por nome', () => {
        cy.getCharacterByName('Logan')
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(1);
                expect(response.body[0].name).to.equal('Logan');
                expect(response.body[0]).to.have.property('alias', 'Wolverine');
            });
    });
});

describe('GET /characters/id', () => {
    const newCharacter = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['Avengers', 'Illuminati', 'S.H.I.E.L.D.'],
        active: true,
    };
    context('Quando tenho um personagem cadastrado', () => {
        before(() => {
            cy.back2ThePast();
            cy.setToken();
            cy.postCharacter(newCharacter)
                .then((response) => {
                    Cypress.env('characterId', response.body.character_id);
                });
        });

        it('Deve buscar o personagem pelo ID', () => {
            const id = Cypress.env('characterId');
            cy.getCharacterByID(id)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.name).to.equal('Tony Stark');
                    expect(response.body).to.have.property('alias', 'Homem de Ferro');
                });
        });

        it('Deve retornar 404 ao buscar por um ID não cadastrado', () => {
            cy.back2ThePast();
            const id = Cypress.env('characterId');
            cy.getCharacterByID(id)
                .then((response) => {
                    expect(response.status).to.equal(404);
                });
        });
    });
});
