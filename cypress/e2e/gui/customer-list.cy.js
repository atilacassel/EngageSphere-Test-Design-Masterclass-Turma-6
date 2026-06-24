describe('EngageSphere - Customer List', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted')
    cy.visit('/')
  })

  it('should keep the selected filters when returns from the details page', () => {
    cy.intercept('GET', '**/customers*', {
      statusCode: 200,
      body: {
        customers: [
          {
            id: 999,
            name: 'Company Test LTDA',
            employees: 50,
            industry: 'HR',
            contactInfo: null,
            address: {
              street: 'Rua Fictícia, 123',
              city: 'Florianópolis',
              state: 'Santa Catarina',
              zipCode: '88000-000',
              country: 'Brazil',
            },
            size: 'Small',
          },
        ],
        pageInfo: {
          currentPage: 1,
          totalPages: 1,
          totalCustomers: 1,
        },
      },
    }).as('getFilteredCustomers')

    cy.wait('@getFilteredCustomers')

    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('[data-testid="industry-filter"]').select('HR')
    cy.contains('button', 'View').click()
    cy.contains('button', 'Back').click()

    cy.get('[data-testid="size-filter"]').should('have.value', 'Small')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'HR')
  })

  it('should return to the customer list by clicking the Back button', () => {
    cy.contains('button', 'View').click()
    cy.contains('button', 'Back').click()

    cy.get('[data-testid="table"]').should('be.visible')
  })
})
