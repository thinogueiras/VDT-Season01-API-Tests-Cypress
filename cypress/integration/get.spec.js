import fixture from '../fixtures/characters.json';

describe('GET /characters', () => {
    before(() => {
        cy.getAllCharacters()
            .then(async (response) => {
                Cypress.env('responseBody', response.body);
                const responseBody = Cypress.env('responseBody');
                if (responseBody != '') {
                    cy.back2ThePast();
                }
            });

        cy.insertLisOfCharacters(fixture.Characters)
            .then(async (response) => {
                await expect(response.status).to.equal(201);
                await expect(response.body).to.be.an('Object');
            });
    });

    it('Deve retornar uma lista de personagens', () => {
        cy.getAllCharacters()
            .then(async (response) => {
                await expect(response.status).to.equal(200);
                await expect(response.body).to.be.an('array');
                await expect(response.body.length).equal(fixture.Characters.length);
            });
    });

    it('Deve permitir buscar um personagem por nome', () => {
        cy.getCharacterByName('Logan')
            .then(async (response) => {
                await expect(response.status).to.equal(200);
                await expect(response.body.length).to.equal(1);
                await expect(response.body[0].name).to.equal('Logan');
                await expect(response.body[0]).to.have.property('alias', 'Wolverine');
            });
    });
});

describe('GET /characters/id', () => {
    context('Quando eu tenho um personagem cadastrado', () => {
        const newCharacter = {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-men', 'Illuminati'],
            active: true,
        };

        before(() => {
            cy.postCharacter(newCharacter)
                .then(async (response) => {
                    Cypress.env('characterId', response.body.character_id);
                });
        });

        it('Deve buscar o personagem pelo ID', () => {
            const id = Cypress.env('characterId');
            cy.getCharacterByID(id)
                .then(async (response) => {
                    await expect(response.status).to.equal(200);
                    await expect(response.body.name).to.equal('Charles Xavier');
                    await expect(response.body).to.have.property('alias', 'Professor X');
                });
        });

        it('Deve retornar 404 ao buscar por um ID não cadastrado', () => {
            const id = Cypress.env('characterId');
            cy.deleteCharacterByID(id)
                .then(async (response) => {
                    await expect(response.status).to.equal(204);
                    await expect(response.body).to.be.empty;
                });
            cy.getCharacterByID(id)
                .then(async (response) => {
                    await expect(response.status).to.equal(404);
                });
        });
    });
});
