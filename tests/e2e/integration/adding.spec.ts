// https://docs.cypress.io/api/introduction/api.html

describe('Adding items', () => {
  it('Adds item to list', () => {
    cy.visit('/')

    cy.get('.list-item').should('have.length', 9)

    cy.get('.song-name').eq(0).click()

    cy.get('button.delete').click()

    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Are you sure?')
      return true
    })

    cy.get('.list-item').should('have.length', 8)
  })
})
