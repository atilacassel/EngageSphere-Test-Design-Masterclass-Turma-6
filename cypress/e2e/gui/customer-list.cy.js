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
})
