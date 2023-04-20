let productCount = 0
let incrementBtn = document.getElementById("plus-btn")
let decrementBtn = document.getElementById("minus-btn")

incrementBtn.addEventListener("click", function(){
    productCount ++
    document.getElementById("counter").innerText = productCount
})

decrementBtn.addEventListener("click", function(){
    productCount --
    document.getElementById("counter").innerText = productCount
})

alert