/// <reference types="cypress" />
import login from "../page_obj/login_page.cy";
import inventory from "../page_obj/inventory_page.cy";
import utilitic from "../page_obj/utils.cy.js"
import shoping_card from "../page_obj/shoping_card_page.cy.js";
import checkout from "../page_obj/checkout.cy.js";

function sort_lohi(a){
    return a.sort((a, b) => a - b)}
function sort_gilo(a){
    return a.sort((a, b) => b - a);}
function sortZtoA(a) {
    return a.sort((a, b) => a.localeCompare(b));}
function sortAtoZ(a) {
    return a.sort((a, b) => b.localeCompare(a));}
function sort_array(a){
   return a.sort((item1, item2) => item1.name.localeCompare(item2.name));}

 
describe('example to-do app', () => {

    let obj = {za:[],az:[],lohi:[],gilo:[] } // складываем отфильтрованные данные в массив

    beforeEach(() => {
    const interceptUrl = 'https://events.backtrace.io/api/:eventType/submit?universe=UNIVERSE&token=TOKEN';// игнорируем 400 ошибки
    cy.intercept('POST', interceptUrl.replace(':eventType', 'summed-events'), { statusCode: 200 });
    cy.intercept('POST', interceptUrl.replace(':eventType', 'unique-events'), { statusCode: 200 });

    cy.visit('https://www.saucedemo.com')
    login.performLogin("standard_user")
    login.performpassword("secret_sauce")
    login.PerformclickSubmit()
    login.verifyLogin()
    cy.url().should('include', 'inventory');// Проверяем что попали на нужную страницу 

    obj = {za:[],az:[],lohi:[],gilo:[] } // после каждого it блока сбрасываем все данные до 0 чтобы не накапливали данные в массиве

    let masiv_filtrov = ['Name (Z to A)', 'Name (A to Z)', 'Price (low to high)','Price (high to low)']// создаем массив со списком фильтров

    const filterMapping = {
        'Name (Z to A)': 'za',
        'Name (A to Z)': 'az',
        'Price (low to high)': 'lohi',
        'Price (high to low)': 'gilo'
    };

    for( let item of masiv_filtrov){
        inventory.Performclic_filter(item)// кликаем на нужный фильт
        inventory.selected_filter.should('contain', item);// Проверяем что выбрали корректный фильтр
        
        inventory.title_product.then(($elements) => {
            let key = filterMapping[item];
            if(key == 'za' || key == 'az' ){
                $elements.each((index, element) => {
                    obj[key].push(Cypress.$(element).text()); // складываем текст элементов в соответствующий массив  Cypress.$(element): Используем jQuery от Cypress для работы с element. Это позволяет воспользоваться методами jQuery, такими как .text(), .val(), .attr() и др.
                });  
            }
        });
       
        inventory.price_product.then(($elements) => {
            let key = filterMapping[item];
            if(key == 'lohi' || key == 'gilo' ){
                $elements.each((index, element) => {
                    obj[key].push(+Cypress.$(element).text().slice(1)); // складываем текст элементов в соответствующий массив  Cypress.$(element): Используем jQuery от Cypress для работы с element. Это позволяет воспользоваться методами jQuery, такими как .text(), .val(), .attr() и др.
                });  
            }
        });
    }

    
    })

        it(`sort1`, ()=>{
            cy.then(() => {
                expect(obj.lohi).to.deep.equal(sort_lohi([...obj.lohi]));});
        })

        it(`sort2`, ()=>{
            cy.then(() => {
               expect(obj.gilo).to.deep.equal(sort_gilo([...obj.gilo]));
             });
        })
    
        it(`sort3`, ()=>{
            cy.then(() => {
                expect(obj.za).to.deep.equal(sortAtoZ([...obj.za]));
            });
        })
    
        it(`sort4`, ()=>{
            cy.then(() => {
                expect(obj.az).to.deep.equal(sortZtoA([...obj.az]));
             });
        })

        it("task2", ()=>{
            let length
            inventory.title_product.then(($elements) => {
                length = $elements.length // получаем количество товаров (длину объекта)
            });

            let actual_massiv 
            cy.then(() => {
                actual_massiv = utilitic.add_tovar(utilitic.rundom(utilitic.getRandomNumber, length))// складываем рандомные товары в корзину + создаем массив с этими товарами
            }) 
            cy.then(() => {
                inventory.shopping_cart_badge.should("have.text", `${actual_massiv.length}`);//проверям количество добавленых товаров на иконке корзина
            }) 

            inventory.shopping_cart_link.click()//переходим в шопинг кард

            let length_shop_card
            shoping_card.items.then(($elements) => {
                length_shop_card = $elements.length // получаем количество товаров (длину объекта) с шопинг карта 
            });

            let exep_array = []
            cy.then(() => {
                for(let i =1; i<=length_shop_card; i++){
                    shoping_card.get_all_information_by_item(i).then((itemInfo) => {exep_array.push(itemInfo);})}//  складываем данные в массив из шопинг кард
            })
            cy.then(() => { expect(sort_array(actual_massiv)).to.deep.equal(sort_array(exep_array));//  Сортируем массивы, приводим их к одному виду и сравниваем 2 массива 
            })
        })

        it("task3", ()=>{
                let length
                inventory.title_product.then(($elements) => {
                    length = $elements.length // Получаем количество товаров (длину объекта)
                });
    
                let actual_massiv 
                cy.then(() => {
                    actual_massiv = utilitic.add_tovar(utilitic.rundom(utilitic.getRandomNumber, length))// складываем рандомные товары в корзину + создаем массив с этими товарами
                })     
                inventory.shopping_cart_link.click()//переходим в шопинг кард
                shoping_card.checkout.click()//переходим в чекаут
                checkout.add_first_name("name")
                checkout.add_last_name("last name")
                checkout.add_postal_code(123123)
                checkout.continue_click()//Переходим на Checkout: Overview страницу

                let length_shop_card
                checkout.items.then(($elements) => {
                    length_shop_card = $elements.length // получаем количество товаров (длину объекта) с Checkout
                });
    
                let exep_array = []
                cy.then(() => {
                    for(let i =1; i<=length_shop_card; i++){
                        checkout.get_all_information_by_item(i).then((itemInfo) => {exep_array.push(itemInfo);})}//  Складываем данные в массив из шопинг кард
                })
                cy.then(() => { expect(sort_array(actual_massiv)).to.deep.equal(sort_array(exep_array));// сортируем массивы, приводим их к одному виду(сортируем) и сравниваем 2 массива 
                });

                let sum = 0;
                cy.then(() => { 
                    for(let item of exep_array){
                        sum += +(item.price.slice(1))// Складываем сумму товаров
                    }
                });

                let tax
                checkout.summary_tax_label.then(($element) => {
                    tax = $element.text(); // таким образом мы вытягиваем текст с элемента
                });

                checkout.summary_total_label.then(($element) => {
                    expect(+(sum + +tax.slice(6)).toFixed(2)).equal(+$element.text().slice(8))// сравниваем Total price фактический с ожидаемым Total price    
                });      
        })

})