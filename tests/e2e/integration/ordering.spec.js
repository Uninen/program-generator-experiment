// https://docs.cypress.io/api/introduction/api.html

export function triggerSortableDragAndDrop(elemDrag, elemDrop) {
  /*
  Summary of what events this fires:
  On elemDrag:
    mouseDown
    dragstart
  On elemDrop:
    dragover (repeat until it moves)
    drop
    mouseup
  */
  const DELAY_INTERVAL_MS = 10
  const MAX_TRIES = 10

  let startingDropRect

  function rectsEqual(r1, r2) {
    return (
      r1.top === r2.top &&
      r1.right === r2.right &&
      r1.bottom === r2.bottom &&
      r1.left === r2.left
    )
  }

  // trigger dragging process on top of drop target
  // We sometimes need to do this multiple times due to the vagaries of
  // how Sortable manages the list re-arrangement
  var counter = 0
  function dragover() {
    counter++
    console.log('DRAGOVER #' + counter)

    const currentDropRect = elemDrop.getBoundingClientRect()
    if (rectsEqual(startingDropRect, currentDropRect) && counter < MAX_TRIES) {
      return cy
        .wrap(elemDrop)
        .trigger('dragover', 'bottom')
        .wait(DELAY_INTERVAL_MS)
        .then(() => dragover())
    } else {
      if (rectsEqual(startingDropRect, currentDropRect)) {
        if (counter !== 1)
          console.log("drop target rect hasn't changed, trying again")
        return drop().then(() => {
          throw new Error(
            `wasn't able to budge drop target after ${MAX_TRIES} tries, aborting`
          )
        })
      } else {
        return drop()
      }
    }
  }

  function drop() {
    console.log('DROP')
    // release dragged element on top of drop target
    return cy.wrap(elemDrop).trigger('drop').trigger('mouseup', {
      which: 1,
      button: 0,
    })
  }

  // start dragging process
  console.log('DRAGSTART')
  cy.wrap(elemDrag)
    .trigger('mousedown', {
      which: 1,
      button: 0,
    })
    .trigger('dragstart')

  // after a delay, do the first dragover; this will run up to MAX_TRIES times
  // (with a delay between each run) and finally run drop() with a delay:
  return cy.wait(DELAY_INTERVAL_MS).then(() => {
    startingDropRect = elemDrop.getBoundingClientRect()
    return dragover()
  })
}

describe('Ordering list items', () => {
  it('expects drag & drop working', () => {
    cy.viewport('macbook-11')
    cy.visit('/')

    cy.get('.list-item')
      .first()
      .should('contain', 'The Midnight - Days of Thunder')

    // cy.get('.handle')
    //   .eq(1)
    //   .should('be.visible')
    //   // .click()
    //   .trigger('mousemove', { clientX: 109, clientY: 304, force: true })
    //   .trigger('touchstart', { clientX: 109, clientY: 304, force: true })
    //   .trigger('mousedown', {
    //     clientX: 109,
    //     clientY: 304,
    //     which: 1,
    //     button: 0,
    //     force: true,
    //   })
    //   .trigger('dragstart', { clientX: 109, clientY: 304, force: true })
    //   .wait(10)
    // cy.get('.handle')
    //   .eq(0)
    //   .should('be.visible')
    //   .first()
    //   .trigger('mousemove', 'center')
    //   // .trigger('dragover')
    //   .trigger('mouseup')
    //   .wait(10)

    // cy.get('.list-item')
    //   .eq(1)
    //   .should('contain', 'The Midnight - Days of Thunder')
    // const h1 = cy.get('.handle').eq(0)
    // const h2 = cy.get('.handle').eq(3)

    // triggerSortableDragAndDrop(h1, h2)
    //   //   .trigger('mouseover')
    //   //   .trigger('dragstart')
    //   //   //   .wait(10)
    //   // .trigger('mousedown')
    //   .trigger('mousedown', {
    //     which: 1,
    //     button: 0,
    //   })
    //   .trigger('dragstart')
    //   .wait(10)
    //   .then(() => {
    //     // .trigger('mousemove', { x: 20, y: 180, force: true })
    //     cy.get('.handle')
    //       .eq(2)
    //       .trigger('dragover', { force: true })
    //       .trigger('drop', { force: true })
    //       // .trigger('mouseup', { x: 20, y: 180, force: true })
    //       .wait(10)
    //   })
  })
})
