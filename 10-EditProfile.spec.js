/// <reference types="cypress" />
describe('Edit Profile', () => {
  let addPersonData;
    let loginData;
    let userData;
    let personname
    before(()=>{
      cy.fixture('Adminuserdata').then(function (data) {
        userData = data;
        
    })
    cy.fixture('AddPerson').then(function (data) {
        addPersonData = data;
        personname = addPersonData.firstname + " " + addPersonData.lastname
    })
    cy.fixture('Login').then(function (data) {
        loginData = data;
        cy.login(loginData.AccountCode, userData.userName, userData.password);
    })
      })
        beforeEach(() => {
          cy.readLogin()
        })
        it('Should perform Edit Prifile', () => {
            cy.visit('/apps/admin').url().should('include','/apps/admin') 
            cy.get('.navbar-list > div').get('img:last').should('have.attr', 'src', 'assets/images/admin.svg').click()
            // cy.wait(5000)
            cy.contains('li', 'Edit Profile').click()
            cy.wait(5000)
            cy.get('[data-cy="loggedUserName"]').contains(userData.userName)
            cy.get('[data-cy="loggedRoleName"] > small').contains(window.localStorage.getItem('userdata'))

           // cy.get('mat-card').should('have.class', 'sticked-card').get('h6:first').should('have.text', ' sevahealthtest ')
            cy.contains('mat-card-title', 'Personal Details').should('be.visible')  
            cy.contains('mat-list-item', 'Employment').click()
            cy.contains('mat-card-title', 'Employment Details').should('be.visible')  
            cy.contains('mat-list-item', 'Emergency Contact').click()
            cy.contains('mat-card-title', 'Emergency Contact').should('be.visible')  
        }) 
})