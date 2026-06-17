describe('GET /customers', () => {
  let apiUrl

  beforeEach(() => {
    apiUrl = Cypress.expose('apiUrl')
  })

  it('should return a list of customers', () => {
    cy.request('GET', `${apiUrl}/customers`).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('customers')
      expect(body.customers).to.be.an('array')
      expect(body.customers.length).to.be.greaterThan(0)
      expect(body.customers[0]).to.have.property('id')

      expect(body).to.have.property('pageInfo')
      expect(body.pageInfo).to.have.property('currentPage')
      expect(body.pageInfo).to.have.property('totalPages')
      expect(body.pageInfo).to.have.property('totalCustomers')
    })
  })

  it('should return 400 for invalid page parameter', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/customers?page=-1`,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.eq(
        'Invalid page or limit. Both must be positive numbers.',
      )
    })
  })
})
