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
    //Edit Event  
    it('Should perform Schedules - Edit Event', () => {
      cy.visit('/apps/schedule').url().should('include', '/apps/schedule')
      cy.get('.e-appointment-details').contains('Automation').click().get('.e-edit').click()
      cy.get('[data-cy="eventnamecy"]').clear().type('Edit Automation')
      cy.get('[data-cy="personnamecy"]').click()
      cy.get(".e-list-parent > li:last").click()
      cy.get('[data-cy="eventdesccy"]').clear().type("Event Editing  - Automation")
      cy.contains('Save').click()
    })
    it('should perform schedules Day view correctly - Edit', () => {
      cy.dayView('Edit Automation')
    })
    it('should perform schedules Week view correctly - Edit', () => {
      cy.visit('/apps/admin')
      cy.wait(2000)
      cy.visit('/apps/schedule').url().should('include', '/apps/schedule')
      //  cy.wait(20000)
  
      cy.get('.e-schedule-toolbar-container').get('.e-week').click()
  
      cy.get('.e-subject').should('contain.text', 'Edit Automation')
    })
    it('should perform schedules Month Agenda view correctly - Edit', () => {
      cy.monthAgendaView('Edit Automation')
    })
    it('should perform schedules Agenda view correctly - Edit', () => {
      cy.visit('/apps/admin')
      cy.wait(2000)
      cy.visit('/apps/schedule').url().should('include', '/apps/schedule')
      cy.wait(20000)
      cy.get('.e-agenda').click()
      cy.get('.e-agenda-parent').find('.subject').should('contain.text', 'Edit Automation')
    })
  
    it('Presence of Edited event in home dahsboard for the allocated staff', () => {
      cy.login("AutomationTesting", userData.userName, userData.password)
      cy.visit('/apps/admin').url().should('include', '/apps/admin')
      cy.viewEventHome('Edit Automation', personname)
    })
    it('Presence of Edited event in Individual person dahsboard', () => {
      cy.login("AutomationTesting", userData.userName, userData.password)
      cy.visit('/apps/admin').url().should('include', '/apps/admin')
      cy.viewEventAll('Edit Automation')
    })
  })