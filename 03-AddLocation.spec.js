//import "./command";


describe('Location Module', () => {
  let locationData;
  let loginData;
  before(function(){
    cy.fixture('AddLocation').then(function(data){
      locationData = data;
    })
    cy.fixture('Login').then(function(data){
      loginData = data;
      cy.login(loginData.AccountCode, loginData.Username, loginData.password);
  })
  //cy.clearData()
  })
    beforeEach(() => {
      cy.readLogin()
    })
   
    it('Should add location correctly - Sanity', () => {
      
      cy.visit('/apps/settings/addeditlocation').url().should('include','/apps/settings/addeditlocation') 
      cy.get('input[formControlName="locationName"]').type(locationData.locationName) ;
      cy.get('textarea[formControlName="Address"]').type(locationData.Address) ;
      cy.get('textarea[formControlName="ConfirmAddress"]').type(locationData.ConfirmAddress) ;
      cy.get('input[formControlName="City"]').type(locationData.City) ;

      cy.get('mat-select[formcontrolname="State"]', {force: true}).click();
       
        cy.get('mat-select[formcontrolname="State"]', {force: true})
        .get('mat-option', {force: true}).contains(locationData.State).click();


      cy.get('input[formControlName="ZipCode"]').type(locationData.ZipCode) ;
      cy.get('.primary-Matbtn').click();
      cy.url().should('include','/apps/settings/managelocation') 
      cy.get('mat-card').find('mat-row').last().find('mat-cell').should('contain.text', locationData.locationName)
      
    }) 
    it('Location in user', () => {
      cy.visit('/apps/settings/newuser').url().should('include','/apps/settings/newuser') 
      cy.get('mat-select[formcontrolname="locationId"]').click();
      cy.wait(2000)
      cy.get('mat-option').should('contain.text', 'Indiana')
    })
    it('Location in person ', () => {
      cy.visit('/apps/settings/addeditperson').url().should('include','/apps/settings/addeditperson') 

    //  cy.get('mat-select[formcontrolname="locationId"]').click();
    cy.get('mat-select[formControlName=location]').should('contain.text', 'Location').as('locationfield')
    cy.get('@locationfield').click()
    cy.get('mat-option').should('contain.text', 'Indiana')

    })
    it('Should Edit location correctly', () => {
      cy.visit('/apps/settings/managelocation').url().should('include','/apps/settings/managelocation')
      cy.get('mat-table').contains('mat-row', 'Indiana').click();
      cy.wait(2000);
      cy.get('input[formControlName="ZipCode"]').clear();
      cy.get('input[formControlName="ZipCode"]').type('60002');
      cy.get('.primary-Matbtn').click();
    })
})