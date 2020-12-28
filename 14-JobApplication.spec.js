/// <reference types="cypress" />
describe('File upload for Different application', () => {
  let loginData;
  let userData;
  let keystate;
  before(() => {
    cy.fixture('Login').then(function (data) {
      loginData = data;
    })
    cy.fixture('Adminuserdata').then(function (data) {
      userData = data;
    })
  })
  
  it('upload File', () => {
     cy.visit('/externalforms?id=BuF7IeWNwS6rSycHr4j0hqFCfYsJsXmeCNZVFmkV')
     cy.wait(3000)
          let todaysDate = Cypress.moment().format('MM-DD-YYYY')
          const filePath = "AutomationApplication.pdf";
         
          cy.get('mat-select[formcontrolname="form"]').click();
          cy.get('mat-select[formcontrolname="form"]')
            .get('mat-option').contains('Job Application').click();
          
          cy.get('input[formControlName="firstName"]').type('Automation');
          cy.get('input[formControlName="lastName"]').type('Testing');
          cy.get('input[formControlName="middleName"]').type('AutomationMiddle');
       //   cy.get('input[formcontrolname="date"]').should('have.text', todaysDate)
         
          
          cy.get('input[formControlName="position"]').type('Staff');
          cy.get('#autofileselect').attachFile(filePath)
         // cy.readFile('AutomationApplication.pdf'). then(function(fileContent){
         // cy.get('.file-upload-button').attachFile({fileContent, fileName, MimeType: 'application/pdf'})
         
          cy.get('.file-upload-button').attachFile(filePath);
        cy.wait(3000)
       
         cy.contains('button', 'Upload').click({force:true})
         cy.wait(3000)
         cy.get('input[formControlName="firstName"]').should('contain.text', '')
         
       // cy.get('#jobform').submit();
      //})
    })
    
  

})