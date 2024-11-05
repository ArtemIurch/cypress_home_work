class Checkout {
    get first_name(){
        return  cy.get('#first-name')}
    get last_name() {
        return cy.get('#last-name');
        }
    get postal_code() {
        return cy.get('#postal-code');
        }
    get continue() {
        return cy.get('#continue');
        }
    get items(){
        return  cy.get('.cart_item')
    } 
    get summary_tax_label(){
        return  cy.get('.summary_tax_label')
    }
    get summary_total_label(){
        return  cy.get('.summary_total_label')
    }      

   
    

        
    add_first_name(name){
        this.first_name.type(name)
    }
    add_last_name(last){
        this.last_name.type(last)
    }
    add_postal_code(code){
        this.postal_code.type(code)
    }
    continue_click(){
        this.continue.click()
    }

    inventory_item_name (index) {
        return cy.xpath(`(//div[@class='inventory_item_name'])[${index}]`);// получаем все нейминги из одежды
     }
     
      inventory_item_desk (index) {
        return cy.xpath(`(//div[@class='inventory_item_desc'])[${index}]`);// получаем все описания
      }
      
       inventory_item_price (index) {
        return cy.xpath(`(//div[@class='inventory_item_price'])[${index}]`);// получаем все суммы
      }

      get_all_information_by_item(index) {
        return this.inventory_item_name(index).invoke('text').then((name) => {
          return this.inventory_item_desk(index).invoke('text').then((desk) => {
            return this.inventory_item_price(index).invoke('text').then((price) => {
              return { name, desk, price };
            });
          });
        });
      }
}

let checkout = new Checkout
export default checkout;