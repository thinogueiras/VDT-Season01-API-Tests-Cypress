describe('DELETE /characters/id', () => {
    const newCharacter = {
        name: 'Clint Barton',
        alias: 'Gavião Arqueiro',
        team: ['Avengers', 'Defensores', 'S.H.I.E.L.D.'],
        active: true,
    };

    before(() => {
        cy.back2ThePast();
        cy.setToken();
        cy.postCharacter(newCharacter)
            .then((response) => {
                Cypress.env('characterId', response.body.character_id);
            });
    });

    it('Deve remover o personagem por ID', () => {
        const id = Cypress.env('characterId');
        cy.deleteCharacterByID(id)
            .then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.be.empty;
            });
    });

    it('Deve retornar 404 ao remover por ID não cadastrado', () => {
        const id = Cypress.env('characterId');
        cy.deleteCharacterByID(id)
            .then((response) => {
                expect(response.status).to.equal(404);
                expect(response.body).to.be.empty;
            });
    });
});
