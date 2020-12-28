/// <reference types="cypress" />

describe('Home DashBoard', () => {
  let loginData;
  let addPersonData;
  let userData;
  let personname;
  let staffadduserdata;

  before(() => {
    cy.fixture('Login').then(function (data) {
      loginData = data;
      cy.login(loginData.AccountCode, loginData.Username, loginData.password);
    })
    cy.fixture('Adminuserdata').then(function (data) {
      userData = data;
    })
    cy.fixture('AddPerson').then(function (data) {
      addPersonData = data;
      personname = addPersonData.firstname + " " + addPersonData.lastname
  })
  cy.fixture('StaffUserData').then(function (data) {
    staffadduserdata = data;
  })
  })
  beforeEach(() => {
    cy.readLogin()
  })
   
  it('Search Person should perform correctly', function() {
    cy.visit('/apps/admin');
    cy.wait(3000)
    cy.url().should('include', '/apps/admin')
    cy.get('[data-cy="patientlistcy"]').find('mat-card-header').find('input').type(addPersonData.firstname)
    cy.get('[data-cy="patientlistcy"]').find('mat-row').first().find('mat-cell').first().should('contain.text', addPersonData.firstname)
    //   cy.get('mat-table:first').contains('mat-cell', 'Dunk')
  })
  it('Search Staff should perform correctly', () => {
    cy.visit('/apps/admin');
    cy.url().should('include', '/apps/admin')
    cy.get('[data-cy="stafflistcy"]').find('mat-card-header').find('input').type(userData.firstName)
    cy.get('[data-cy="stafflistcy"]').find('mat-row').first().find('mat-cell').first().should('contain.text', userData.firstName)
    //cy.get('[placeholder="Search"])').type('Darrien Long')
  })

  it('Should perform get form correctly', () => {
    cy.visit('/apps/admin');
    cy.url().should('include', '/apps/admin')
    cy.wait(3000)
    cy.get('[data-cy="allform"]').contains('mat-row', 'Nursing Form').find('mat-cell:nth-child(4)').click();
  })
  it('Submit a Nursing Form - Sanity', () => {
    cy.login(loginData.AccountCode, staffadduserdata.userName, staffadduserdata.password);
    cy.visit('/apps/admin');
    cy.wait(3000)
    cy.get('[data-cy="allform"]').contains('mat-row', 'Nursing Form').find('mat-cell:nth-child(4)').click();  
    cy.wait(10000)
    cy.get('.formio-component-personId').get('.formio-choices:first').click()
    cy.wait(3000)
    cy.get('.formio-component-personId').get('.formio-choices:first').get('.choices__input--cloned:first').type(personname)
    cy.wait(3000)
    cy.get('.formio-component-personId').get('.formio-choices:first').contains(personname).click()
    cy.wait(3000)
    cy.get('button').contains('Submit', { force: true }).click()
    cy.wait(3000)
  })
  it('Submit a Nursing Flow Sheet - Sanity', () => {
    cy.visit('/apps/admin');
    cy.wait(3000)
    cy.get('[data-cy="allform"]').contains('mat-row', 'Nursing Flow Sheet').find('mat-cell:nth-child(4)').click();
    cy.wait(10000)
    cy.get('.formio-component-personId').get('.formio-choices:first').click()
    cy.wait(3000)
    cy.get('.formio-component-personId').get('.formio-choices:first').get('.choices__input--cloned:first').type(personname)
    cy.wait(3000)
    cy.get('.formio-component-personId').get('.formio-choices:first').contains(personname).click()
    cy.wait(3000)
    cy.get('button').contains('Submit', { force: true }).click({force:true})
    cy.wait(3000)
  })
  it('Submitted form should be there in ALL Person Page', () => {
    cy.visit('/apps/person');
    cy.wait(3000)
    cy.url().should( 'include','/apps/person')
    const todaysDate = Cypress.moment().format('MM-DD-YYYY')
    cy.get('[data-cy="personSubmittedForm"]').find('mat-table').find('mat-row').first().should('contain.text', 'Nursing Form')
    cy.get('[data-cy="personSubmittedForm"]').find('mat-table').find('mat-row').first().should('contain.text', todaysDate)
    cy.get('[data-cy="personSubmittedForm"]').find('mat-table').find('mat-row').last().should('contain.text', 'Nursing Flow Sheet')
    cy.get('[data-cy="personSubmittedForm"]').find('mat-table').find('mat-row').last().should('contain.text', todaysDate)
  })
  it('Submitted form should be there in Home page Frequently used widget for the particular admin', () => {
    
    cy.visit('/apps/admin');
    cy.wait(3000)
    cy.url().should( 'include','/apps/admin')
    const todaysDate = Cypress.moment().format('MM-DD-YYYY')
    cy.get('[data-cy="homefrequsedform"]').find('mat-table').find('mat-row').first().should('contain.text', 'Nursing Flow Sheet')
    cy.get('[data-cy="homefrequsedform"]').find('mat-table').find('mat-row').last().should('contain.text', 'Nursing Form')
  })
  
  it('Login as admin user and check the presence of upcoming widdget and fre. used widget', () => {
    
    cy.visit('/apps/admin')
    cy.wait(2000)
    cy.url().should( 'include','/apps/admin')
    cy.get('[data-cy="upcomingcardcy"]').find('.mat-card-title').should('contain.text', "Upcoming Schedules");
    cy.get('[data-cy="homefrequsedform"]').find('.mat-card-title').should('contain.text', "Frequently Used Forms");
    
  })
  
})