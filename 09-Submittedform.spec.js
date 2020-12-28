
describe('Submitted forms', () => {
  let loginData;
  let addPersonData;
  let personname;
  before(() => {
    cy.fixture('Login').then(function (data) {
      loginData = data;
      cy.login(loginData.AccountCode, loginData.Username, loginData.password);
    })
    cy.fixture('AddPerson').then(function (data) {
      addPersonData = data;
      personname = addPersonData.firstname + " " + addPersonData.lastname
    })
    // cy.visit(Cypress.env('UIUrl'))
    //cy.visit(Cypress.env('UIUrl'))

    // cy.visit('/#/apps/submittedform');
  })
  beforeEach(() => {
    cy.readLogin()
  })

  it('Should perform form type filter correctly', () => {
    cy.viewport(1366, 768)
    cy.visit('/apps/submittedform');

    cy.url().should('include', '/apps/submittedform')
    // cy.get('mat-select').click()
    // cy.get('mat-select').get('mat-option').contains('ISP').click()
    // cy.get('button').contains('Search').click()
    // cy.get('button').contains('Clear').click()

    cy.get('mat-form-field').find('.mat-form-field-wrapper').find('.mat-form-field-infix').find('[data-cy="formnameselect"]').click()
    cy.wait(3000)
    cy.get('#cdk-overlay-0').find('mat-option', 'Nursing Form').first().click()
    var contractMoment = Cypress.moment().format('MM/DD/YYYY');
    var stDate = Cypress.moment(contractMoment).format('DD')
    var endDate = Cypress.moment(contractMoment).format('DD')
    if (stDate < 10) {

      stDate = Cypress.moment(contractMoment).subtract(1, 'days').format('D')

    } else {
      stDate = Cypress.moment(contractMoment).subtract(1, 'days').format('DD')
    }
    if (endDate < 10) {
      endDate = Cypress.moment(contractMoment).add(1, 'days').format('D')

    } else {
      endDate = Cypress.moment(contractMoment).add(1, 'days').format('DD');
    }

    // cy.get('daterange-toggle').parent().click()
    // cy.get('daterange-toggle').get('mat-calendar:first').contains('.mat-calendar-body-cell-content', stDate).click()
    // cy.get('daterange-toggle').get('mat-calendar:last').find('.mat-calendar-next-button').click()
    // cy.get('daterange-toggle').get('mat-calendar:last').contains('td', '1').click()
    // cy.get('button').contains('Search').click({ force: true })
    // cy.wait(2000)
    cy.get('mat-table').find('mat-row').first().should('contain.text', 'Nursing Form')


  })
  it('Should get particular submitted form  - Sanity', () => {
    cy.visit('/apps/submittedform');
    cy.wait(20000)
    cy.url().should('include', '/apps/submittedform')
    const todaysDate = Cypress.moment().format('MM-DD')
    cy.wait(7000)
    cy.get('#search').type(todaysDate, { force: true });
    cy.get('[data-cy="submitform"]').contains('mat-cell', personname).parent().find('mat-cell:nth-child(6)').click();

    cy.wait(3000)
    cy.get('.formio-component-personId').get('.formio-choices:first').click()
    cy.wait(3000)
    cy.get('button').contains('Submit', { force: true }).click({force: true})
    //   cy.get('[data-cy="submitform"]').contains('mat-cell', personname).parent().find('mat-cell:nth-child(7)').click();
  })
  it('Open up the Nursing Flow Sheet and update a value  - Sanity', () => {
    cy.visit('/apps/submittedform');
    cy.wait(20000)
    cy.url().should('include', '/apps/submittedform')
    const todaysDate = Cypress.moment().format('MM-DD')
    cy.wait(7000)
    cy.get('#search').type(todaysDate, { force: true });
    cy.get('[data-cy="submitform"]').contains('mat-cell', "Nursing Flow Sheet").parent().find('mat-cell:nth-child(7)').click();

    //   cy.get('[data-cy="submitform"]').contains('mat-cell', personname).parent().find('mat-cell:nth-child(7)').click();
  })
  
})