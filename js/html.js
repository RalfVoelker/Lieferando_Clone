function generateMenuHTML(product) {
    return /*html*/ `
          <div class="menu1" >
              <div class="hl">
                <p><b>${product.name}</b></p>
                <a onclick="addToBasket('${product.name}',${product.price})"><img src="./img/plus-taste.png" alt="" /></a>
              </div>
              <p>${product.information}</p>
              <b>${product.price.toFixed(2).replace('.',',')}€</b>
            </div>
      `;
  }


  function generateBasketEmptyHTML() {
    return /*html*/ `
      <div class="basketEmpty">
          <img src="./img/in-den-warenkorb-legen.png" alt="">
          <h3>Fülle deinen Warenkorb</h3>
          <p>"Füge leckere Gerichte aus der Speisekarte hinzu"</p>
      </div>
      `;
  }
  
  
  function generateBasketHTML(name, price, sum, amount, i) {
    return /*html*/ `
          <table class="basket-content">
              <tr>
                <th class="th3">${amount}x</th>
                <th id="name" class="th">${name}</th>
                <th><a href="#" onclick="reducedAmount(${i})"><img src="./img/minus-quadratischer-umrissknopf.png" alt=""></a></th>
                <th><a href="#" onclick="addToBasket('${name}',${price})"><img src="./img/plus (2).png" alt=""></a></th>
                <th id="price" class="th2"><p>${sum.toFixed(2).replace('.',',')}€</p></th>
                <th><a href="#" onclick="deleteAllDishes(${i})"><img src="./img/trash.svg" alt=""></a></th>
              </tr>
          </table>
      `;
  }


  function generateRespBasketHTML(name, price, sum, amount, i) {
    return /*html*/ `
          <table class="basket-resp-content">
              <tr class="p-l2" >
                <th class="th3-r">${amount}x</th>
                <th id="name-r" class="th-r">${name}</th>
                <th><a href="#" onclick="reducedAmount(${i})"><img src="./img/minus-quadratischer-umrissknopf.png" alt=""></a></th>
                <th><a href="#" onclick="addToBasket('${name}',${price})"><img src="./img/plus (2).png" alt=""></a></th>
                <th id="price" class="th2-r"><p>${sum.toFixed(2).replace('.',',')}€</p></th>
                <th><a href="#" onclick="deleteAllDishes(${i})"><img src="./img/trash.svg" alt=""></a></th>
              </tr>
          </table>
      `;
  }

  function generateRespButtonHTML(){
    return /*html*/ `
        <div id="" class="basket-btn">
          <button  onclick="openRespBasket()">
            Warenkorb (${basketAmounts.length})
          </button>
        </div>
        `;
  }


  function generateBasketInvoiceHTML(subTotal, total, shippingCosts) {
    return /*html*/ `
        <div class="calc">
            <div class="ca">
              <h3>Zwischensumme</h3>
              <h3>${subTotal.toFixed(2).replace('.',',')}€</h3>
            </div>
            <div class="ca">
              <h3>Lieferkosten</h3>
              <h3>${shippingCosts.toFixed(2).replace('.',',')}€</h3>
            </div>
            <div class="ca">
              <h3>Gesamt</h3>
              <h3>${total.toFixed(2).replace('.',',')}€</h3>
            </div>
            <p>Ab einem Mindestbestellwert von 15,00€ kannst du deine Bestellung abschliessen. Wir liefern kostenfrei ab 25,00€ Bestellwert.</p>
          </div>
          <button id="btn"onclick="order()">BESTELLEN</button>
        </div>
      `;
  }


  function generateRespBasketInvoiceHTML(subTotal, total, shippingCosts) {
    return /*html*/ `
        <div class="calc">
            <div class="ca">
              <h3>Zwischensumme</h3>
              <h3>${subTotal.toFixed(2).replace('.',',')}€</h3>
            </div>
            <div class="ca">
              <h3>Lieferkosten</h3>
              <h3>${shippingCosts.toFixed(2).replace('.',',')}€</h3>
            </div>
            <div class="ca">
              <h3>Gesamt</h3>
              <h3>${total.toFixed(2).replace('.',',')}€</h3>
            </div>
            <p>Ab einem Mindestbestellwert von 15,00€ kannst du deine Bestellung abschliessen. Wir liefern kostenfrei ab 25,00€ Bestellwert.</p>
          </div>
          <button id="btn"onclick="orderResp()">BESTELLEN</button>
        </div>
      `;
  }


  function generateOrderHTML(){
    return /*html*/ `
    <div class="basketEmpty">
        <img src="./img/lieferung.png" alt="">
        <h3>Deine Bestellung ist unterwegs...</h3>
        <p>"Die aktuelle Lieferzeit beträgt 25 Minuten."</p>
    </div>
    `;
  }