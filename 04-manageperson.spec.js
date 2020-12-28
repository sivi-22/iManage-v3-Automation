
describe('Person Module', () => {
    let addPersonData;
    let loginData;
    let userData;
    let personname
    before(function () {
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
       //    cy.clearData()
    })
    beforeEach(() => {
        cy.readLogin()
    })
    it('Should perform Add a new person correctly - Sanity', () => {
        cy.visit('/apps/settings/addeditperson');
        cy.wait(5000)
        cy.get('input[formControlName="firstname"]').clear().type(addPersonData.firstname);
        cy.get('input[formControlName="lastname"]').clear().type(addPersonData.lastname);
        cy.get('mat-select[formControlName=location]').type(addPersonData.location);
        cy.get('input[formControlName="dobpicker"]').clear({force:true}).type(addPersonData.dobpicker,{force:true});
        cy.get('mat-select[formControlName=personstatus]').click({force:true}).get('mat-option').contains(addPersonData.personstatus).click({force:true});

        cy.get('mat-tab-group').contains('Admission Details').click({force:true});
        cy.get('input[formControlName="MedicalIdno"]').clear({force:true}).type(addPersonData.MedicalIdno);
        cy.get('mat-select[formControlName=class]').click({force:true}).get('mat-option').contains(addPersonData.class).click({force:true});

        cy.get('input[formControlName="issuedate"]').clear({force:true}).type(addPersonData.issuedate);
        cy.get('input[formControlName="expdatepicker"]').clear({force:true}).type(addPersonData.expdatepicker);
        cy.get('input[formControlName="ISPdatepicker"]').clear({force:true}).type(addPersonData.ISPdatepicker);
        cy.get('input[formControlName="dischargedate"]').clear({force:true}).type(addPersonData.dischargedate);
        cy.get('mat-select[formControlName=staffname]').click({force:true}).get('mat-pseudo-checkbox').click({ multiple: true, force: true });
        cy.get('.cdk-overlay-backdrop').click( { force: true });

       


        cy.get('mat-tab-group').contains('Provider Details').click({ force: true });
        cy.get('input[formControlName="qidp"]').type(addPersonData.qidp, { force: true });
        cy.get('input[formControlName="qidpphone"]').type(addPersonData.qidpphone, { force: true });
        cy.get('input[formControlName="qidpfax"]').type(addPersonData.qidpfax, { force: true });

        cy.contains('Save').click({force:true});
        cy.url().should('include', '/apps/settings/manageperson')
        cy.get('mat-table').find('mat-row').last().should('contain.text', addPersonData.firstname)

    })
    it('person available at home dahsdoard', () => {
        cy.visit('/apps/admin').url().should('include', '/apps/admin')
        cy.get('[data-cy="patientlistcy"]').find('mat-row').last().find('mat-cell:first').should('contain.text', addPersonData.firstname)
    })
    it('person available at form', () => {
        cy.visit('/apps/admin').url().should('include', '/apps/admin')  
        cy.wait(3000)
        cy.get('[data-cy="allform"]').contains('mat-row', 'Nursing Form').find('mat-cell:nth-child(4)').click();  
        cy.wait(10000)
        cy.get('.formio-component-personId').get('.formio-choices:first').click()
        cy.wait(3000)
        cy.get('.formio-component-personId').get('.formio-choices:first').get('.choices__input--cloned:first').type(addPersonData.firstname + " " + addPersonData.lastname)
    })
    it('person available at ALL', () => {
        cy.visit('/apps/person').url().should('include', '/apps/person')
        cy.get('ng-select').click({force: true})
        cy.get('ng-select').type(personname + '{enter}')
        cy.get('.container-fluid:first').get('table').find('tr:first').find('td:last').should('contain.text', personname);
    })
    it('person available at Schedules', () => {
        cy.visit('/apps/person').url().should('include', '/apps/person')
        cy.visit('/apps/schedule').url().should('include', '/apps/schedule')
        cy.wait(10000)
        let todaysDate = Cypress.moment().format('DD')
        if(todaysDate < 10){
             todaysDate = Cypress.moment().format('D')
        }
        
        cy.get('.e-schedule-table .e-content-table').contains('td', todaysDate).click()
        cy.get('.e-quick-popup-wrapper').get('.e-popup-footer > button').get('[title="More Details"]').click()
        cy.get('[data-cy="personnamecy"]').click()
        cy.get(".e-list-parent > li").first().should('contain.text', personname)
    })
    it('Should perform Edit Person correctly', () => {
        cy.visit('/apps/settings/manageperson');
        cy.get('mat-paginator').get('.mat-paginator-navigation-last').click({ force: true });
        cy.get('mat-table').contains('mat-row', addPersonData.firstname).click();
        cy.contains('Save').click();
        cy.get('mat-table').find('mat-row').last().should('contain.text', addPersonData.firstname)
    })

})