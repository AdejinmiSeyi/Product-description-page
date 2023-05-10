class CartItem {
    constructor(name, img, desc, price){
        this.name = name
        this.img = img
        this.desc = desc
        this.price = price
        this.quantity = 1
    }
}

class LocalCart{
    static key = 'cartItems'

    static getLocalCartItems(){
        let cartMap = new Map()
    const cart = localStorage.getItem(LocalCart.key)
    if (cart===null || cart.length===0) {
        return cartMap
    } return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity += 1
            cart.set(id, mapItem)
        } else cart.set(id, item)
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }

    static removeItemFromCart(id){
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)){
            let mapItem = cart.get(id)
            if (mapItem.quantity > 1){
                mapItem.quantity --
                cart.set(id, item)
            } else cart.delete(id)
        }
        if (cart.length === 0){
        localStorage.clear()
    }   else
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
            updateCartUI
    }
}

    


const cartIcon = document.querySelector(".cart-icon")
const wholeCart = document.querySelector(".cart-box")
wholeCart.inWindow = 0
const addToCartBtn = document.querySelector('.add-to-cart')
// addToCartBtn.forEach((btn) => {
//     btn.addEventListener('click', addItemFunction)
    
// });

addToCartBtn.addEventListener('click', addItemFunction)

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    const name = e.target.parentElement.parentElement.children[1].textContent;
    const img = e.target.parentElement.parentElement.parentElement.children[0].children[1].children[0].src
    const desc = e.target.parentElement.parentElement.children[2].textContent;
    const price = e.target.parentElement.parentElement.children[3].children[1].previousSibling.textContent
    const quantity = e.target.parentElement.children[0].textContent
    
    const item = new CartItem(name, img, desc, price, quantity)
    LocalCart.addItemToLocalCart(id, item)
    // console.log(quantity)

}

// Show cart when mouse moves over the cart icon
cartIcon.addEventListener('mouseover', ()=>{
    if (wholeCart.classList.contains('hide'))
    wholeCart.classList.remove('hide')

})

// Cart disappears when mouse leaves the cart icon but
cartIcon.addEventListener('mouseleave', ()=>{
    setTimeout(()=>{
        if (wholeCart.inWindow ===0){
        wholeCart.classList.add('hide')
        }
    },500)

})

wholeCart.addEventListener('mouseover', ()=>{
    wholeCart.inWindow =1
})

wholeCart.addEventListener('mouseleave', ()=>{
    // wholeCart.inWindow =0
    wholeCart.classList.add('hide')
})



function updateCartUI(){
    const cartBox = document.querySelector('.cart-box')
    cartBox.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if (items===null) return
    let quantity = 0
    let total = 0
    for (const [key, value] of items.entries()) {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')

        let price = value.price*value.quantity
        quantity ++
        total += price
        cartItem.innerHTML = `

        <img src=${value.img} alt="" class="cart-item-image" />
            <div class="desc">
              <p class="item-name">${value.name}</p>
              <p class="item-price">
                $${value.price}<span>x</span>
                <span class="quantity">${value.quantity}&nbsp;</span>
                <span class="total-price bold">$${price} </span>
              </p>
            </div>
            <svg class="delete-item" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
            
            
        `
        cartItem.lastChild.addEventListener('click', ()=>{
            LocalCart.removeItemFromCart()
            // console.log(cartItem.lastChild)
        })

        cartBox.append(cartItem)
    }
    if (quantity > 0) {
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${quantity}"`)
        // const subtotal = document.querySelector('.subtotal')
        // subtotal.innerHTML =`Subtotal: $${total}`
    } else cartIcon.classList.remove('non-empty')
}

document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})

/*

let productCount = 0
let incrementBtn = document.getElementById("plus-btn")
let decrementBtn = document.getElementById("minus-btn")

incrementBtn.addEventListener("click", function(){
    productCount ++
    document.getElementById("product-count").innerText = productCount
})

decrementBtn.addEventListener("click", function(){
    productCount --
    document.getElementById("product-count").innerText = productCount
})

*/
