import fixture from '../fixtures/characters.json';

describe('GET /characters', () => {
    before(() => {
        cy.back2ThePast();
        cy.setToken();
        cy.insertCharacters(fixture.Characters);
    });

    it('Deve retornar uma lista de personagens', () => {
        cy.getAllCharacters()
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.a('array');
                expect(response.body.length).equal(fixture.Characters.length);
            });
    });
});
