describe('Login Page', () => {   
 let loginData;
    before(() => {
        cy.setCredentialBasedonEnv();
        cy.fixture('Login').then(function(data){
            loginData = data;
            cy.login(loginData.AccountCode, loginData.Username, loginData.password);
        })
    });
    beforeEach(() => {
        cy.readLogin(loginData.AccountCode)
        //cy.visit('/')
    })
    it('Clear Tested Data from DB - Sanity', () =>{
        cy.clearData()
    })
    it('Should perform login correctly - Sanity', () => {
        cy.visit('/userlogin')
        
        cy.get('input[formControlName="password"]').type(loginData.password)
        
        cy.contains('Login').click()
        cy.url().should('include', '/apps/admin')
        // cy.visit('https://www.google.com/', { timeout: 8000npm run cypress0 })
        // cy.get('input[title="Search"]').type('cypress{enter}')
        // cy.url().should('include', '/search')
        // cy.contains( 'div', 'All')
       // cy.log(cy.url())
        //
    })
    
})

