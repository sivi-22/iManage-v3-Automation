/// <reference types="cypress" />
describe('Schedules Module', () => {
  let addPersonData;
  var loginData;
  let userData;
  let personname
  before(() => {
    cy.fixture('Adminuserdata').then(function (data) {
      userData = data;
    })
    cy.fixture('AddPerson').then(function (data) {
      addPersonData = data;
      personname = addPersonData.firstname + " " + addPersonData.lastname
    })
    cy.fixture('Login').then(function (data) {
      loginData = data;
      cy.login(loginData.AccountCode, loginData.Username, loginData.password);
    })
    

  })
  beforeEach(() => {
    cy.readLogin()
  })

  it('Should perform Schedules Add Event - Smoke, Sanity', () => {
    cy.visit('/apps/schedule').url().should('include', '/apps/schedule')
    
    let todaysDate = Cypress.moment().format('DD')
    if (todaysDate < 10) {
      todaysDate = Cypress.moment().format('D')
    }
    cy.get('.e-schedule-table .e-content-table').find('.e-current-date').contains('td', todaysDate).click({ force: true })
    cy.get('.e-quick-popup-wrapper').get('.e-popup-footer > button').get('[title="More Details"]').click({ force: true })
    cy.get('[data-cy="eventnamecy"]').type('Automation')
    cy.get('[data-cy="personnamecy"]').find('.e-float-input').click({ force: true })

    cy.get(".e-list-parent > li").contains(personname).click({ force: true })
    cy.get('[data-cy="staffnamecy"]').find('.e-float-input').click({ force: true })
    cy.wait(2000)
    cy.get(".e-list-parent > li:first").click({ force: true })
    cy.get('[data-cy="eventdesccy"]').type("Event adding  - Automation")

    var contractMoment = Cypress.moment().format('MM/DD/YYYY');
    var endDate = Cypress.moment(contractMoment).add(3, 'days')
    const frm = endDate.format('MM/DD/YYYY')
    cy.get('#StartTime').clear().type(contractMoment)
    cy.get('#EndTime').clear().type(frm)
    cy.contains('Save').click({ force: true })
    cy.get('.e-appointment-details').should('contain.text', 'Automation')
    cy.wait(3000)
    cy.get('.e-appointment-details').contains('Automation').click({ force: true })
  })

  it('should perform schedules Day view correctly', () => {
    cy.dayView('Automation')
  })
  it('should perform schedules Week view correctly', () => {
    cy.visit('/apps/admin')
    cy.wait(2000)
    cy.visit('/apps/schedule')
    cy.wait(20000)
    // cy.get('.e-schedule-toolbar-container').find('#_nav').invoke('show').click()
    cy.url().should('include', '/apps/schedule')

    cy.get('.e-schedule-toolbar-container').get('.e-week').click()
    cy.get('.e-subject').should('contain.text', 'Automation')
  })
  it('should perform schedules Month Agenda view correctly', () => {
    cy.monthAgendaView('Automation')
  })
  it('should perform schedules Agenda view correctly', () => {
    cy.visit('/apps/admin')
    cy.wait(2000)
    cy.visit('/apps/schedule').url().should('include', '/apps/schedule')

    cy.get('.e-agenda').click()
    cy.get('.e-agenda-parent').find('.subject').should('contain.text', 'Automation')
  })

  it('Presence of added event in home dahsboard for the allocated staff', () => {
    cy.login("AutomationTesting", userData.userName, userData.password)
    cy.visit('/apps/admin').url().should('include', '/apps/admin')
    //cy.login('sevatest');
    cy.viewEventHome('Automation', personname)
  })
  it('Presence of added event in Individual person dahsboard', () => {
    cy.login("AutomationTesting", userData.userName, userData.password)
    cy.visit('/apps/admin').url().should('include', '/apps/admin')
    cy.viewEventAll('Automation')
  })
  
})