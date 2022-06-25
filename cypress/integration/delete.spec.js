describe('DELETE /characters/id', () => {
    context('Quando eu tenho um personagem cadastrado', () => {
        const newCharacter = {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['Avengers'],
            active: true,
        };

        before(() => {
            cy.postCharacter(newCharacter)
                .then(async (response) => {
                    Cypress.env('characterId', response.body.character_id);
                    const id = Cypress.env('characterId');
                    await expect(id.length).to.equal(24);
                });
        });

        it('Deve remover o personagem por ID', () => {
            const id = Cypress.env('characterId');
            cy.deleteCharacterByID(id)
                .then(async (response) => {
                    await expect(response.status).to.equal(204);
                    await expect(response.body).to.be.empty;
                });
        });

        it('Deve retornar 404 ao remover um ID não cadastrado', () => {
            const id = Cypress.env('characterId');
            cy.deleteCharacterByID(id)
                .then(async (response) => {
                    await expect(response.status).to.equal(404);
                    await expect(response.body).to.be.empty;
                });
        });
    });
});
