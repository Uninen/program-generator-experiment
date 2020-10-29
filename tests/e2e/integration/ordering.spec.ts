// https://docs.cypress.io/api/introduction/api.html

describe('Ordering list items', () => {
  it('Expects item swapping to work', () => {
    cy.viewport('macbook-11')
    cy.visit('/')

    cy.get('.list-item')
      .eq(0)
      .should('contain', 'The Midnight - Days of Thunder')

    cy.window().then((win) => {
      // @ts-ignore
      win.vxstore.commit('SWAP_ROWS', {
        from: 0,
        to: 2,
      })
    })

    cy.wait(10)
      .get('.list-item')
      .eq(2)
      .should('contain', 'The Midnight - Days of Thunder')
  })
})
