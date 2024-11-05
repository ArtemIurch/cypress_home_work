import inventory from "./inventory_page.cy";

function getRandomNumber(a) {
    return Math.floor(Math.random() * (a-1)) + 1;
  }


  function rundom(getRun, c){
    let a = [];
    for (let b = 0; b <= 2; b++) {
        let randomNumber = getRun(c); // Сохраняем случайное число в переменную
        if (!a.includes(randomNumber)) {
          a.push(randomNumber); // Используем сохраненное число для добавления
        }
      }
      return a;
  }

   function add_tovar(funk_rob){
    let actual_list_array = [];
    for(let items of funk_rob){         
        inventory.button_add_to_card(items).click()// Добавляю рандомные товары в корзину
        
        // actual_list_array.push( inventory.get_all_information_by_item(items))
        inventory.get_all_information_by_item(items).then((itemInfo) => {actual_list_array.push(itemInfo);}) // добавляем товары в массив 
    }
    return  actual_list_array 
}


module.exports = {getRandomNumber, rundom, add_tovar};