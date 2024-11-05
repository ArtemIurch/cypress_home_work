class Login {
    get setUserName(){
        return  cy.get("input[placeholder='Username']")}
    get setPassword(){
        return  cy.get("input[placeholder='Password']")}
    get clickSubmit(){
        return  cy.get("input[type='submit']")}

    performLogin(username) {
         this.setUserName.type(username);}
    performpassword(Password) {
        this.setPassword.type(Password);}
    PerformclickSubmit() {
        this.clickSubmit.click();}
    verifyLogin() {
        cy.get(".app_logo").should('have.text', 'Swag Labs');
      }
}
let login = new Login
export default login;