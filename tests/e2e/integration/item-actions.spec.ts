// https://docs.cypress.io/api/introduction/api.html

describe('Item actions', () => {
  it('Deletes a row from list, calculates currently scripted time', () => {
    cy.visit('/')

    cy.get('.list-item').should('have.length', 9)
    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 26 min'
    )

    cy.get('.song-name').eq(0).click()

    cy.get('button.delete').click()

    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Are you sure?')
      return true
    })

    cy.get('.list-item').should('have.length', 8)
    cy.get('#currently-scripted').should(
      'contain',
      'Currently scripted: 20 min'
    )
  })
})
