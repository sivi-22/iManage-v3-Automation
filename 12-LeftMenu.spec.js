/// <reference types="cypress" />
describe('Left Menu', () => {
  let userData;
  let loginData;
    before(()=>{
      cy.fixture('Login').then(function (data) {
        loginData = data;
        cy.login(loginData.AccountCode, loginData.Username, loginData.password);
      })
      cy.fixture('StaffUserData').then(function (data) {
        userData = data;
      })
      //cy.clearData()
    })
        beforeEach(() => {
          cy.readLogin()
        })
        it('Should perform left menu - Home', () => {
          cy.visit('/apps/admin')
         cy.wait(3000)
          cy.url().should('include', '/apps/admin')
          cy.viewport(1366,	768)
          cy.get('mat-list-item').get('[routerLink="/apps/admin"]').click().url().should('include','/apps/admin')
          //  cy.get('.navbar-list > li').get('#fullscreenicon').click()
          // cy.get('.navbar-list > li').get('#openicon').click()
          //cy.get('mat-list-item[routerLink="/apps/admin"]').and('be.visible')  .click()
            
          //   cy.get('mat-table:first').contains('mat-cell', 'Dunk')
        }) 
        it('Should perform left menu - Persons', () => {
            cy.visit('/apps/admin')
            cy.wait(3000)
            cy.url().should('include','/apps/admin')   
            cy.viewport(1366,	768) 
            cy.contains('accordion-group', 'Persons').click().contains('li', 'All').click()
            cy.wait(3000)
            cy.url().should('include','/apps/person')  
            cy.contains('accordion-group', 'Persons').click().contains('li', 'Submitted Forms').click()
            cy.wait(3000)
            cy.url().should('include','/apps/submittedform') 
        })
        it('Should perform left menu - Schedule', () => {
          cy.visit('/apps/admin')
          cy.url().should('include','/apps/admin') 
          cy.viewport(1366,	768)  
          cy.get('mat-list-item').get('[routerLink="/apps/schedule"]').click()
          cy.url().should('include','/apps/schedule')
          //  cy.get('.navbar-list > li').get('#fullscreenicon').click()
          // cy.get('.navbar-list > li').get('#openicon').click()
          //cy.get('mat-list-item[routerLink="/apps/admin"]').and('be.visible')  .click()
           
          //   cy.get('mat-table:first').contains('mat-cell', 'Dunk')
        })
        it('Should perform left menu - Settings', () => {
          cy.visit('/apps/admin')
          cy.url().should('include','/apps/admin')
          cy.viewport(1366,	768) 
          cy.contains('accordion-group', 'Settings').click().contains('li', 'Manage Users').click()
          cy.wait(3000)
          cy.url().should('include','/apps/settings/manageuser') 
          
          cy.contains('accordion-group', 'Settings').click().contains('li', 'Manage Locations').click()
          cy.wait(3000)
          cy.url().should('include','/apps/settings/managelocation') 
          cy.contains('accordion-group', 'Settings').click().contains('li', 'Manage Persons').click()
          cy.wait(3000)
          cy.url().should('include','/apps/settings/manageperson')
        })
        
        it('For staff settings menu should not visible', () => {
          cy.login(loginData.AccountCode, userData.userName, userData.password);
          cy.visit('/apps/admin').url().should('include', '/apps/admin')
          cy.get('accordion-group').last().should('not.be.visible')
        })
        
})