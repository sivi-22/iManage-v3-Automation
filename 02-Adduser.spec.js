//import "./command";

describe('User Module', () => {
  let userData;
  let edtuserdata;
  let loginData;
  let staffadduserdata;
  before(function () {
    cy.fixture('Adminuserdata').then(function (data) {
      userData = data;
    })
    cy.fixture('editUserData').then(function (data) {
      edtuserdata = data;
    })
    cy.fixture('Login').then(function (data) {
      loginData = data;
      cy.login(loginData.AccountCode, loginData.Username, loginData.password);
    })
    cy.fixture('StaffUserData').then(function (data) {
      staffadduserdata = data;
    })
    //cy.visit('/')
  })
  beforeEach(() => {
    cy.readLogin()
  })
  it('Display user list', () => {
    cy.visit('/apps/settings/manageuser').url().should('include', '/apps/settings/manageuser')
  })
  it('Should perform add user correctly - Sanity', () => {
    cy.visit('/apps/settings/newuser').url().should('include', '/apps/settings/newuser');
    cy.get('input[formControlName="firstName"]').type(userData.firstName);
    cy.get('input[formControlName="lastName"]').type(userData.lastName);
    cy.get('input[formControlName="userName"]').type(userData.userName);
    cy.get('input[formControlName="email"]').type(userData.email);
    cy.get('input[formControlName="phoneNumber"]').type(userData.phoneNumber);

    cy.get('mat-select[formcontrolname="locationId"]').click();
    cy.get('mat-select[formcontrolname="locationId"]').last().click()

    cy.get('mat-select[formcontrolname="roleId"]').click();
    cy.get('mat-select[formcontrolname="roleId"]')
      .get('mat-option').contains(userData.roleId).click();
    cy.get('input[formControlName="userpassword"]').type(userData.password);
    cy.get('input[formControlName="reenterpassword"]').type(userData.reenterpassword);
    cy.get('input[formControlName="reenterpassword"]').focused();
    cy.get('#adduserSaveBtn').click();
    cy.url().should('include', '/apps/settings/manageuser')

    cy.get('mat-paginator').get('.mat-paginator-navigation-last').click({ force: true })
    // cy.get('mat-paginator').should('').get('.mat-paginator-navigation-last').click();

    cy.get('mat-table').find('mat-row:last').find('mat-cell:nth-child(2)').should('contain.text', userData.userName)

  })
  it('Test the presence of added user in homedashboard', () => {
    cy.visit('/apps/admin').url().should('include', '/apps/admin')
    cy.get('[data-cy="stafflistcy"]').find('mat-card-content').find('mat-paginator').find('.mat-paginator-navigation-last').click({ force: true })
    cy.get('[data-cy="stafflistcy"]').find('mat-row:last').as('addedUser')
    cy.get('@addedUser').find('mat-cell:first').should('contain.text', userData.firstName + " " + userData.lastName)
  })
  it('Should be available in schedules', function() {
   
    cy.visit('/apps/schedule').url().should('include', '/apps/schedule')
    let todaysDate = Cypress.moment().format('DD')
    if(todaysDate < 10){
         todaysDate = Cypress.moment().format('D')
    }
    cy.get('.e-schedule-table .e-content-table').contains('td', todaysDate).click()
    cy.get('.e-quick-popup-wrapper').get('.e-popup-footer > button').get('[title="More Details"]').click()

    cy.get('[data-cy="staffnamecy"]').click()
    cy.get(".e-list-parent > li").last().should('contain.text', userData.firstName + " " + userData.lastName)
  })
  it('Login as currently added user - Sanity', () => {
    cy.login(loginData.AccountCode, userData.userName, userData.password);
    cy.visit('/')
    cy.get('input[formControlName="password"]').type(userData.password);
    cy.contains('Login').click();
    cy.url().should('include', '/apps/admin')
  })
  it('Should update edit user correctly', () => {
    cy.visit('/apps/settings/manageuser');
    
    cy.url().should('include', '/apps/settings/manageuser')
    //  cy.get('mat-row').last().click();
    cy.get('mat-paginator').get('.mat-paginator-navigation-last').click({ force: true });
    cy.get('mat-table').find('mat-row:last').find('mat-cell:nth-child(2)').should('contain.text', userData.userName).click();
    cy.get('input[formControlName="workPhoneNo"]').clear().type(edtuserdata.workPhoneNo);
    cy.get('input[formControlName="homePhoneNumber"]').clear().type(edtuserdata.homePhoneNumber);
    cy.get('input[formControlName="cellNumber"]').clear().type(edtuserdata.cellNumber);
    cy.get('input[formControlName="otherEmailid"]').clear().type(edtuserdata.otherEmailid);


    cy.get('input[formControlName="DOBpicker"]').clear()
      .type(edtuserdata.DOBpicker)

    cy.get('input[formControlName="ssn"]').clear()
    cy.get('input[formControlName="ssn"]').type(edtuserdata.ssn);
    cy.get('input[formControlName="city"]').clear()
      .type(edtuserdata.city);
    cy.get('textarea[formControlName="address1"]').clear()
      .type(edtuserdata.address1);
    cy.get('textarea[formControlName="address2"]').clear()
      .type(edtuserdata.address2);

    cy.get('mat-select[formcontrolname="country"]').click();
    cy.get('mat-select[formcontrolname="country"]')
      .get('mat-option').contains(edtuserdata.country).click();

    cy.get('mat-select[formcontrolname="state"]').click();
    cy.get('mat-select[formcontrolname="state"]').wait(2000)
      .get('mat-option').contains(edtuserdata.state).click();

    cy.get('input[formControlName="zipCode"]').clear().type(edtuserdata.zipCode);

    cy.get('mat-tab-header').contains('Employment').click();

    cy.get('mat-select[formcontrolname="employeeType"]').click();
    cy.get('mat-select[formcontrolname="employeeType"]')
      .get('mat-option').contains(edtuserdata.employeeType).click();

    cy.get('mat-select[formcontrolname="employeeStatus"]').click();
    cy.get('mat-select[formcontrolname="employeeStatus"]')
      .get('mat-option').contains(edtuserdata.employeeStatus).click();

    cy.get('mat-select[formcontrolname="job"]').click();
    cy.get('mat-select[formcontrolname="job"]')
      .get('mat-option').contains(edtuserdata.job).click();

    cy.get('input[formControlName="hireDate"]').clear()
      .type(edtuserdata.hireDate);

    cy.get('input[formControlName="rehireDate"]').clear()
      .type(edtuserdata.rehireDate)

    cy.get('input[formControlName="terminationDate"]').clear()
      .type(edtuserdata.terminationDate);

    cy.get('mat-select[formcontrolname="role"]', { force: true }).click();
    cy.get('mat-select[formcontrolname="role"]')
      .get('mat-option').contains(edtuserdata.role).click();

    cy.get('button').contains('Add').click();
    cy.get('input[formControlName="agencyName"]').clear().type('agency 1');
    cy.get('input[formControlName="startDate"]').clear()
      .type('2019-11-18T18:30:00.000Z');


    cy.get('mat-tab-header').contains('Emergency Contact Data').click();

    cy.get('input[formControlName="contactName"]').clear().type(edtuserdata.contactName);
    cy.get('input[formControlName="mobileNumber"]').clear().type(edtuserdata.mobileNumber);
    cy.get('#AddEmergencyBtn').click();
    cy.get('#mainform').submit();

  })
  it('Should perform add staff correctly - Sanity', () => {
    cy.visit('/apps/settings/manageuser');
    cy.visit('/apps/settings/newuser');
    cy.get('input[formControlName="firstName"]').type(staffadduserdata.firstName);
    cy.get('input[formControlName="lastName"]').type(staffadduserdata.lastName);
    cy.get('input[formControlName="userName"]').type(staffadduserdata.userName);
    cy.get('input[formControlName="email"]').type(staffadduserdata.email);
    cy.get('input[formControlName="phoneNumber"]').type(staffadduserdata.phoneNumber);

    // cy.get('mat-select[formcontrolname="locationId"]').click();
    // cy.get('mat-select[formcontrolname="locationId"]')
    //   .get('mat-option').contains(staffadduserdata.locationName).click();
    
    cy.get('mat-select[formcontrolname="locationId"]').click();
    cy.get('mat-select[formcontrolname="locationId"]').last().click()

    cy.get('mat-select[formcontrolname="roleId"]').click();
    cy.get('mat-select[formcontrolname="roleId"]')
      .get('mat-option').contains(staffadduserdata.roleId).click();
    cy.get('input[formControlName="userpassword"]').type(staffadduserdata.password);
    cy.get('input[formControlName="reenterpassword"]').type(staffadduserdata.reenterpassword);

    cy.get('#adduserSaveBtn').click();
    //cy.loginAsAdmin();
  })

})