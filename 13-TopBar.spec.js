/// <reference types="cypress" />
describe('Top Bar', () => {
  let loginData;
    before(()=>{
      cy.fixture('Login').then(function(data){
        loginData = data;
        cy.login(loginData.AccountCode, loginData.Username, loginData.password);
    })
      })
        beforeEach(() => {
          cy.readLogin()
        })
        
        it('Should perform topbar settings icon', () => {
            cy.visit('/apps/admin').url().should('include','/apps/admin')  
            cy.get('.navbar-list > div').get('img:last').should('have.attr', 'src', 'assets/images/admin.svg').click()
            cy.contains('ul', 'Logout').should('have.class', 'show')
        }) 
        it('Should perform topbar zoom icon', () => {
            cy.visit('/apps/admin').url().should('include','/apps/admin')  
            cy.contains('li', 'zoom_out_map').click()
            cy.contains('li', 'fullscreen_exit')
        }) 
        it('Should perform topbar menu open icon', () => {
            cy.visit('/apps/admin').url().should('include','/apps/admin')  
            cy.get('.navbar-list > li').get('#openicon').click()
            cy.get('mat-sidenav').should('have.attr', 'style', 'width: 3.3em; box-shadow: none; visibility: hidden;')
            
          }) 
})