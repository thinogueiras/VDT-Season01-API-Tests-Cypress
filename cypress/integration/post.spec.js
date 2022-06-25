describe('POST /characters', () => {
    it('Deve cadastrar um personagem com sucesso', () => {
        const character = {
            name: 'Tony Stark',
            alias: 'Homem de Ferro',
            team: ['Avengers', 'Illuminati', 'S.H.I.E.L.D.'],
            active: true,
        };

        cy.postCharacter(character)
            .then(async (response) => {
                await expect(response.status).to.eql(201);
                await expect(response.body.character_id.length).to.equal(24);
            });
    });

    context('Quando o personagem já existe', () => {
        const character = {
            name: 'Clint Barton',
            alias: 'Gavião Arqueiro',
            team: ['Avengers', 'Defensores', 'S.H.I.E.L.D.'],
            active: true,
        };

        before(() => {
            cy.postCharacter(character)
                .then(async (response) => {
                    await expect(response.status).to.eql(201);
                });
        });

        it('Não deve cadastrar duplicado', () => {
            cy.postCharacter(character)
                .then(async (response) => {
                    await expect(response.status).to.eql(400);
                    await expect(response.body.error).to.eql('Duplicate character');
                });
        });
    });

    context('Validar os campos obrigatórios para o cadastro do personagem', () => {
        it('Validar a obrigatoriedade do nome', () => {
            const character = {
                alias: 'Viúva Negra',
                team: ['Avengers', 'S.H.I.E.L.D.', 'Vigilantes'],
                active: true,
            };

            cy.postCharacter(character)
                .then(async (response) => {
                    await expect(response.status).to.eql(400);
                    await expect(response.body.validation.body.message).to.eql('\"name\" is required');
                });
        });

        it('Validar a obrigatoriedade do alias', () => {
            const character = {
                name: 'Natasha Romanoff',
                team: ['Avengers', 'S.H.I.E.L.D.', 'Vigilantes'],
                active: true,
            };

            cy.postCharacter(character)
                .then(async (response) => {
                    await expect(response.status).to.eql(400);
                    await expect(response.body.validation.body.message).to.eql('\"alias\" is required');
                });
        });

        it('Validar a obrigatoriedade do team', () => {
            const character = {
                name: 'Natasha Romanoff',
                alias: 'Viúva Negra',
                active: true,
            };

            cy.postCharacter(character)
                .then(async (response) => {
                    await expect(response.status).to.eql(400);
                    await expect(response.body.validation.body.message).to.eql('\"team\" is required');
                });
        });

        it('Validar a obrigatoriedade do active', () => {
            const character = {
                name: 'Natasha Romanoff',
                alias: 'Viúva Negra',
                team: ['Avengers', 'S.H.I.E.L.D.', 'Vigilantes'],
            };

            cy.postCharacter(character)
                .then(async (response) => {
                    await expect(response.status).to.eql(400);
                    await expect(response.body.validation.body.message).to.eql('\"active\" is required');
                });
        });
    });
});
