class Shoping_card {
    get items(){
        return  cy.get('.cart_item')}
    get checkout() {
        return cy.get('#checkout');
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

let shoping_card = new Shoping_card
export default shoping_card;