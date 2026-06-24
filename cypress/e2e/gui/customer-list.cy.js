describe('EngageSphere - Customer List', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.contains('button', 'Accept').click()
  })

  it('should keep the selected filters when returns from the details page', () => {
    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('[data-testid="industry-filter"]').select('HR')
    cy.contains('button', 'View').click()

    cy.contains('button', 'Back').click()

    cy.get('[data-testid="size-filter"]').should('have.value', 'Small')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'HR')
  })

  it('should return to the customer list by clicking the Back button', () => {
    cy.get(':nth-child(1) > :nth-child(6) > strong > button').click()
    cy.contains('button', 'Back').click()

    cy.get('[data-testid="table"]').should('be.visible')
  })
})
