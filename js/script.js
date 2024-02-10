let menus = [
  {
    name: "Pizza Magarita",
    information: "mit Tomatensauce, Büffelmozzarella und Basilikum",
    price: 9.95,
  },

  {
    name: "Pizza Salami",
    information: "mit Tomatensauce, Fior di latte und neapolitanischer Salami",
    price: 10.85,
  },

  {
    name: "Pizza Fungi",
    information: "mit frischen Pilzen <br> Wahl aus: mit Ananas, mit Auberginen, <br> gegrillt, mit Ei, mit Gemüse, mit Gorgonzola und mehr.",
    price: 12.85,
  },

  {
    name: "Pizza di Mare",
    information: "mit Meeresfrüchten und Knoblauch",
    price: 13.85,
  },

  {
    name: "Pizza Capri",
    information: "mit Tomatensauce, Fior di latte, Salami, <br> Schinken, Pilzen, Oliven und Artischocken",
    price: 13.95,
  },
  {
    name: "Pizza Tonno",
    information: "mit Thunfisch und frischen Pilzen.",
    price: 11.85,
  },

  {
    name: "Pizza Calzone",
    information: "gefüllt mit leckeren Champignons, saftigem Schinken, pikanter Salami.",
    price: 14.85,
  },

  {
    name: "Pizza Hawaii",
    information: "mit saftigem Schinken, fruchtiger Ananas, sonnengereiften Tomaten,<br> feinem Mozzarella und Edamer.",
    price: 12.95,
  },
];


let basketDishes = [];
let basketPrices = [];
let basketAmounts = [];

load();


function render(){
    renderMenu();
    renderBasket();
}


function renderMenu() {
  let menu = document.getElementById("menu");
  menu.innerHTML = "";
  for (let i = 0; i < menus.length; i++) {
    let product = menus[i];
    menu.innerHTML += generateMenuHTML(product);
  }
}


function renderBasket() {
  let basket = document.getElementById("basket");
  basket.innerHTML = "";
  if (basketDishes.length == 0) {
    basket.innerHTML = generateBasketEmptyHTML();
  } else {
    for (let i = 0; i < basketDishes.length; i++) {
      const name = basketDishes[i];
      const price = basketPrices[i];
      const amount = basketAmounts[i];
      let sum = price * amount;
      basket.innerHTML += generateBasketHTML(name, price, sum, amount, i);
    }
    calcBasketTotal(basket);
  }
}


function renderRespBasket() {
  let basketResp = document.getElementById("resp-basket");
  basketResp.innerHTML = "";
  if (basketDishes.length == 0) {
    basketResp.innerHTML = generateBasketEmptyHTML();
  } else {
    for (let i = 0; i < basketDishes.length; i++) {
      const name = basketDishes[i];
      const price = basketPrices[i];
      const amount = basketAmounts[i];
      let sum = price * amount;
      basketResp.innerHTML += generateRespBasketHTML(name, price, sum, amount, i);
    }
    calcBasket(basketResp, basket);
}


function calcBasket(){
  if (screen.width <= 970) {
      calcRespBasketTotal(basketResp);
      document.getElementById("resp-basket-btn").innerHTML = generateRespButtonHTML();
    }else{
      calcBasketTotal(basket);
    }
  }
}


function calcBasketTotal(basket){
  let subTotal = calcBasketSubTotal();
  if (subTotal>25) {
    shippingCosts = 0;
  }else{
    shippingCosts = 4.90;
  }
  let total = subTotal + shippingCosts;
    basket.innerHTML += generateBasketInvoiceHTML(subTotal, total, shippingCosts);
  if (subTotal<15) {
    hide('btn');
  }
}


function calcRespBasketTotal(basketResp){
  let subTotal = calcBasketSubTotal();
  if (subTotal>25) {
    shippingCosts = 0;
  }else{
    shippingCosts = 4.90;
  }
  let total = subTotal + shippingCosts;
  basketResp.innerHTML += generateRespBasketInvoiceHTML(subTotal, total, shippingCosts);
  if (subTotal<15) {
    hide('btn');
  }
}


function order(){
  basketDishes = [];
  basketPrices = [];
  basketAmounts = [];
  save();
  document.getElementById("basket").innerHTML = generateOrderHTML();
}


function orderResp(){
  basketDishes = [];
  basketPrices = [];
  basketAmounts = [];
  save();
  document.getElementById("resp-basket").innerHTML = generateOrderHTML();
}


function hide(id){
  document.getElementById(id).classList.add('d-none');
}


function show(id){
  document.getElementById(id).classList.add('d-flex');
}


function calcBasketSubTotal() {
    let subTotal = 0;
    for (let j = 0; j < basketDishes.length; j++) {
        let price = basketPrices[j];
        let amount = basketAmounts[j];
        subTotal += price * amount; 
    }
    return subTotal;
}


function addToBasket(name, price) {
    let index = basketDishes.indexOf(name);
    if (index == -1) {
        basketDishes.push(name);
        basketPrices.push(price);
        basketAmounts.push(1);
    } else {
      addAmount(index);
    }
    if (screen.width < 970) {
      renderRespBasket();
    }else{
      renderBasket();
    }
   save();
}


function addAmount(i) {
    let amount = basketAmounts[i];
    let newAmount = amount +1;
    basketAmounts.splice(i, 1, newAmount);
    if (screen.width < 970) {
      renderRespBasket();
    }else{
      renderBasket();
    }
    save();
}


function reducedAmount(i) {
    let amount = basketAmounts[i];
    if (amount > 1) {
     let newAmount = amount -1;
     basketAmounts.splice(i, 1, newAmount);
     }else{
        deleteAllDishes(i);
     }   
     if (screen.width <= 970) {
      renderRespBasket();
    }else{
      renderBasket();
    }
    save();
}


function deleteAllDishes(i) {
    basketDishes.splice(i, 1);
    basketPrices.splice(i, 1);
    basketAmounts.splice(i, 1);  
    if (screen.width <= 970) {
      renderRespBasket();
    }else{
      renderBasket();
    }
    save();
}


function save() {
  let basketDishesAsText = JSON.stringify(basketDishes);
  let basketPricesAsText = JSON.stringify(basketPrices);
  let basketAmountsAsText = JSON.stringify(basketAmounts);
  localStorage.setItem("basketDishes", basketDishesAsText);
  localStorage.setItem("basketPrices", basketPricesAsText);
  localStorage.setItem("basketAmounts", basketAmountsAsText);
}


function load() {
  let basketDishesAsText = localStorage.getItem("basketDishes");
  let basketPricesAsText = localStorage.getItem("basketPrices");
  let basketAmountsAsText = localStorage.getItem("basketAmounts");
  if (basketDishesAsText && basketPricesAsText && basketAmountsAsText) {
    basketDishes = JSON.parse(basketDishesAsText);
    basketPrices = JSON.parse(basketPricesAsText);
    basketAmounts = JSON.parse(basketAmountsAsText);
  }
}


function openRespBasket() {
  document.getElementById("basket-resp").classList.remove('d-none');
  renderRespBasket();
}


function closeRespBasket() {
  document.getElementById("basket-resp").classList.add('d-none');
  document.getElementById("resp-basket-btn").innerHTML = '';
}