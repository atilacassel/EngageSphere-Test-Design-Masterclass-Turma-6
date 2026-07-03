describe('EngageSphere - Customer List', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted')
    
    cy.intercept('GET', '**/customers*', {
      statusCode: 200,
        body: {
          customers: [
            {
            id: 1,
            name: 'Cliente Padrão',
            employees: 100,
            industry: 'Retail',
            contactInfo: null,
            address: {
              street: 'Rua Principal',
              city: 'Cidade',
              state: 'Estado',
              zipCode: '00000',
              country: 'Country'
            },
            size: 'Medium'
          }
          ],
          pageInfo: { currentPage: 1, totalPages: 1, totalCustomers: 0 }
        }
    }).as('getInitialCustomers')

    cy.visit('/')
    cy.wait('@getInitialCustomers')
  })

  it('should keep the selected filters when returns from the details page', () => {
    cy.intercept('GET', '**/customers?*size=Small&industry=HR*', {
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

    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('[data-testid="industry-filter"]').select('HR')

    cy.wait('@getFilteredCustomers')

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

  it('should display the footer with the correct text and links', () => {
    cy.get('[data-testid="footer"]')
      .should('contain', 'Copyright 2026 - Talking About Testing')
      .and('be.visible')

    cy.contains('a', 'Podcast')
      .should(
        'have.attr',
        'href',
        'https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo',
      )
      .and('have.attr', 'target', '_blank')

    cy.contains('a', 'Courses')
      .should('have.attr', 'href', 'https://talking-about-testing.vercel.app/')
      .and('have.attr', 'target', '_blank')

    cy.contains('a', 'Blog')
      .should('have.attr', 'href', 'https://talkingabouttesting.com')
      .and('have.attr', 'target', '_blank')

    cy.contains('a', 'YouTube')
      .should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
      .and('have.attr', 'target', '_blank')
  })

  it('should display the default greeting when the name field is empty', () => {
    cy.get('[data-testid="name"]').clear()

    cy.get('[data-testid="table"]').should('contain.text', 'Hi there!')
  })

  it('should display the name when provided', () => {
    cy.get('[data-testid="name"]').type('Átila')

    cy.get('[data-testid="table"]').should('contain.text', 'Hi Átila!')
  })
})
