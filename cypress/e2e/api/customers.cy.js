describe('GET /customers', () => {
  it('should return a list of customers', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('customers')
      expect(response.body.customers).to.be.an('array')
      expect(response.body.customers.length).to.be.greaterThan(0)
      expect(response.body.customers[0]).to.have.property('id')

      expect(response.body).to.have.property('pageInfo')
      expect(response.body.pageInfo).to.have.property('currentPage')
      expect(response.body.pageInfo).to.have.property('totalPages')
      expect(response.body.pageInfo).to.have.property('totalCustomers')
    })
  })

  it('should return 400 for invalid page parameter', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers?page=-1`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq(
        'Invalid page or limit. Both must be positive numbers.',
      )
    })
  })
})
