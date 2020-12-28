/// <reference types="cypress" />


describe('Person - ALL', () => {
    let loginData;
    let addPersonData;
    let userData;
    let personname;

    beforeEach(() => {
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
    })
    it('Login Corretly', ()=>{
        cy.visit('/')
        cy.url().should('include','/userlogin')
    })
    it('Should perform search', () => {
        cy.visit('/apps/person');
        cy.url().should( 'include','/apps/person')
        cy.get('ng-select').click({force:true})
        cy.get('ng-select').type(personname + '{enter}')
        cy.get('.container-fluid:first').get('table').contains('td', personname).should('be.visible');
    })
    it('Should perform Doctor detail', () =>{
        cy.visit('/apps/person');
        cy.url().should( 'include','/apps/person')
        cy.get('.container-fluid:nth-child(2)').get('.mat-tab-label').click({ multiple: true })
        cy.wait(2000)
       cy.get('mat-tab-header').find('.mat-tab-labels').find('div').last().click()
    })
    it('AllForms - Search', () =>{
        cy.visit('/apps/person');
        cy.url().should( 'include','/apps/person') 
        cy.get('[data-cy="allformselect"]').click()
        cy.get('#cdk-overlay-0').contains('mat-option', 'Nursing Form').click()
        cy.get('[data-cy="allform"]').find('mat-row').first().should('contain.text', 'Nursing Form')
    })
    it('Should perform Form Submission', () =>{
        cy.visit('/apps/person');
        cy.url().should( 'include','/apps/person')
        cy.get('[data-cy="allform"]').contains('mat-row', 'Nursing Form').find('mat-cell:nth-child(4)').click();
     
        cy.wait(10000)
        cy.get('.formio-component-personId').get('.formio-choices:first').click()
        cy.wait(3000)
        cy.get('button').contains('Submit', { force: true }).click({ force: true })    
    })
    it('Submitted form should be present', () =>{
        cy.visit('/apps/person');
        cy.url().should( 'include','/apps/person') 

        cy.get('[data-cy="submittedFormSearch"]').click()
        cy.get('#cdk-overlay-0').contains('mat-option', 'Nursing Form').click()
        cy.get('[data-cy="allform"]').find('mat-row').first().should('contain.text', 'Nursing Form')
        
        cy.get('[data-cy="personSubmittedForm"]').find('mat-table').find('mat-row').should('contain.text', 'Nursing Form')
        const todaysDate = Cypress.moment().format('MM-DD-YYYY')
        cy.get('[data-cy="personSubmittedForm"]').find('mat-table').find('mat-row').should('contain.text', todaysDate)
    })
    it('Should perform form type filter correctly', () => {
        cy.visit('/apps/submittedform');
        
        cy.url().should('include','/apps/submittedform')
       
        const todaysDate = Cypress.moment().format('MM-DD')
        cy.get('#search').type(todaysDate, { force: true });
        const todaysDate1 = Cypress.moment().format('MM-DD-YYYY')
        cy.get('[data-cy="submitform"]').find('mat-row').should('contain.text', 'Nursing Form');
        cy.get('[data-cy="submitform"]').find('mat-row').should('contain.text', todaysDate1);
      })
    it('Should Perform Add Message to a person', () => {
        cy.visit('/apps/person');
        cy.url().should( 'include','/apps/person')
        cy.get('#addmessage').type('test message')
        cy.get('#addmsgBtn').click()
        cy.wait(2000)
        cy.get('.container-fluid:last').get('.notelist:last').contains('test message')
        cy.get('.container-fluid:last').get('.green_icon:last').click()
         cy.get('#addmessage').clear()
         cy.get('#addmessage').type('Edit test message')
         cy.get('#addmsgBtn').click()
         cy.wait(2000)
         cy.get('.container-fluid:last').get('.notelist:last').contains('Edit test message')
         cy.get('.container-fluid:last').get('.red_icon:last').click()
    })
})