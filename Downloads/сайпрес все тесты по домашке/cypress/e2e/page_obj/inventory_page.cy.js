class Inventory {
    get fiters(){
        return  cy.get('.product_sort_container')}
    get selected_filter(){
        return  cy.get('.active_option')}
    get title_product(){
        return  cy.get('.inventory_item_name ')}
    get price_product(){
        return  cy.get('.inventory_item_price')}
    get shopping_cart_badge(){
        return  cy.get('.shopping_cart_badge')}
    get shopping_cart_link(){
        return  cy.get('.shopping_cart_link')}


        
    Performclic_filter(filter_name) {
        this.fiters.select(filter_name);}
        
    button_add_to_card(index) {
        return cy.xpath(`(//button[contains(@class, "btn_inventory")])[${index}]`);
    }

    inventory_item_name (index) {
        return cy.xpath(`(//div[@class='inventory_item_name '])[${index}]`);// получаем все нейминги из одежды
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
let inventory = new Inventory
export default inventory;