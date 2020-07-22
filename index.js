let carts =document.querySelectorAll('.btn-buy');

let products=[{
    name:'Aqua',
    tag:'aqua',
    price:40,
    inCart:0
},
{
    name:'Dolce $ Gabanna',
tag:'dolce',
price:50,
inCart:0

},{
name:'Lanvin',
tag:'jeanne-lanvin',
price:60,
inCart:0

},{
name:'Essentials',
tag:'essentials',
price:30,
inCart:0

},{
    name:'Lacoste',
tag:'lacoste-essential',
price:20,
inCart:0

},
{
    name:'Red Frag',
tag:'red-frag',
price:90,
inCart:0

},
{
    name:'Witz',
tag:'witz',
price:10,
inCart:0

},
{
    name:'Victoria Secret',
tag:'victoria',
price:55,
inCart:0

},


];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
    totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.select-price').textContent=productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.select-price').textContent = productNumbers - 1;
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1 );
        document.querySelector('.select-price').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.select-price').textContent = 1;
    }

    setItems(product);
}







function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    

    if(cartItems !=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1;
    }else{
        product.inCart=1;
        cartItems={
              [product.tag]:product
          }
    }
   
    
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product,action){
    // console.log(product.price);

    let cartCost = localStorage.getItem('totalCost');
  
    console.log(cartCost);
    if(action=="decrease"){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost-product.price);
    }else if
   (cartCost!=null){
          cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }
  

}


function displayCart(){
let cartItems=localStorage.getItem('productsInCart');
cartItems=JSON.parse(cartItems);

let productContainer=document.querySelector('.cart-items');
let cartCost = localStorage.getItem('totalCost');

if(cartItems && productContainer){
    productContainer.innerHTML='';
    Object.values(cartItems).map(item=>{
        productContainer.innerHTML+=`
        

      <div class="item">
        <div class="cart-pict">
          <img src="img/${item.tag}.jpg" alt="" />
          <div class="remove">
        <i class="fas fa-trash-alt"></i>
      </div>
          <p class="named-pic">${item.tag}</p>
        </div>
        <div class="price">
          <p>$${item.price},00</p>
        </div>
        <div class="qty">
          <i class="fas fa-minus-circle"></i>
          <p><span>${item.inCart}</span></p>
          <i class="fas fa-plus"></i>
        </div>
        <div class="calc-total">$${item.inCart * item.price},00</div>
      </div>
      <hr />
     
        `;
    });

    productContainer.innerHTML+=`
    <div class="total">
    <div class="total-price">
      <p>Total Price:$${cartCost},00</p>
    </div>
  </div> `
}
deleteButtons();
manageQuantity();
}

function deleteButtons(){
    let deleteButtons=document.querySelectorAll('.fa-trash-alt');
    let productName;
    let productNumbers =localStorage.getItem('cartNumbers');
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    let cartCost=localStorage.getItem('totalCost');
  
    for (let i=0; i<deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', ()=>{
         productName=deleteButtons[i].parentElement.parentElement.textContent.trim().toLowerCase().replace( / /g, '');
   

         localStorage.setItem('cartNumbers', productNumbers-cartItems[productName].inCart);
         localStorage.setItem('totalCost',cartCost-(cartItems[productName].price*cartItems[productName].inCart));
         delete cartItems[productName];
         localStorage.setItem('productsInCart', JSON.stringify(cartItems));
       
         displayCart();
         onLoadCartNumbers();
        })
    }

}

function manageQuantity(){
    let decreaseButtons=document.querySelectorAll('.fa-minus-circle');
    let increaseButtons=document.querySelectorAll('.fa-plus');

    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for(let i=0;i<decreaseButtons.length; i++){
        decreaseButtons[i].addEventListener('click',()=>{
            currentQuantity= decreaseButtons[i].parentElement.querySelector('span').textContent;
          
            console.log(currentQuantity);
            currentProduct=decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('.named-pic').textContent;
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart>1){
                cartItems[currentProduct].inCart-=1;
                cartNumbers( cartItems[currentProduct], "decrease" );

                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }

            
        });
    }

    for(let i=0;i<increaseButtons.length; i++){
        increaseButtons[i].addEventListener('click',()=>{
            console.log('increase');
            currentQuantity= increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);


            currentProduct=increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('.named-pic').textContent;
            console.log(currentProduct);

           
                cartItems[currentProduct].inCart+=1;
                cartNumbers( cartItems[currentProduct] );

                totalCost(cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
        })
    }

}
onLoadCartNumbers();
displayCart();