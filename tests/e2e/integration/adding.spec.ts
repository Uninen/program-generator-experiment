// https://docs.cypress.io/api/introduction/api.html

describe('Adding items', () => {
  it('Adds song to the list', () => {
    cy.visit('/')

    cy.get('.list-item').should('have.length', 9)
    cy.get('.song-item').should('have.length', 5)
    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 26 min'
    )

    cy.get('#add-toggle').click()

    cy.get('input[value="song"]').click()
    cy.get('input[name="duration"]').type('240')
    cy.get('input[name="songtext"]').type('Added - Song')

    cy.get('button[type=submit]').click()

    cy.get('.list-item').should('have.length', 10)
    cy.get('.song-item').should('have.length', 6)
    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 30 min'
    )
  })

  it('Adds talk section to the list', () => {
    cy.get('#add-toggle').click()
    cy.get('.talk-item').should('have.length', 2)

    cy.get('input[value="talk"]').click()
    cy.get('input[name="duration"]').type('60')
    cy.get('input[name="text"]').type('Talk about something')

    cy.get('button[type=submit]').click()

    cy.get('.list-item').should('have.length', 11)
    cy.get('.talk-item').should('have.length', 3)

    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 31 min'
    )
  })

  it('Adds a jingle to the list', () => {
    cy.get('#add-toggle').click()
    cy.get('.jingle-item').should('have.length', 1)

    cy.get('input[value="jingle"]').click()
    cy.get('input[name="duration"]').type('10')
    cy.get('input[name="text"]').type('Jingle #2')

    cy.get('button[type=submit]').click()

    cy.get('.list-item').should('have.length', 12)
    cy.get('.jingle-item').should('have.length', 2)

    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 31 min'
    )
  })

  it('Adds a section to the list', () => {
    cy.get('#add-toggle').click()
    cy.get('.section-item').should('have.length', 1)

    cy.get('input[value="section"]').click()
    cy.get('input[name="text"]').type('Section #2')

    cy.get('button[type=submit]').click()

    cy.get('.list-item').should('have.length', 13)
    cy.get('.section-item').should('have.length', 2)

    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 31 min'
    )
  })
})
