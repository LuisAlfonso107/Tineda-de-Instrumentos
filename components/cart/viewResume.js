import { cartTemplate } from "./template.js"
import { cartController } from "./controller.js"
import { cartView } from "./view.js"

export const cartViewResume = {
    id: `cartCheckout`,
    divId: `cartCheckoutDiv`,
    idToDraw: `cartCheckoutInfo`,
    statusVisible: true,
    statusValid: true,
    
    exists(){
        return document.querySelector(`#${this.id}`) ? true : false
    },

    init() {
        if (!this.exists()) {
            this.draw()
        }
    },

    getTemplate() {
        try {
            const obj = cartController.getData()
            const html ={
                items: ``,
                footer:``
            }
            obj.items.forEach(function(value, index){
                html.items+=cartTemplate.itemResume(value)
            })
            html.footer = cartTemplate.footerResume(obj)            
            return cartTemplate.resumeCheckout(obj, html)
        } catch (error) {
            console.error('Error al cargar el template del carrito:', error)
        }
    },

    draw() {
        
        let outputToDraw = document.querySelector(`#${this.idToDraw}`)
        if (outputToDraw) {
            outputToDraw.innerHTML = this.getTemplate()
            this.statusVisible = true
            this.addListeners()
        }
    },

    updateCartCount() {
        const cartCount = document.querySelector(`#cartCount`)
        const cartCountNumber = document.querySelector(`#cartCheckoutCountNumber`)
        if (cartCount) {
            cartCount.textContent = cartController.cartCount
        }
        if (cartCountNumber) {
            cartCountNumber.textContent = cartController.cartCount           
        }
    },

    updateTotals(id, elementsHtml) {
        const item = cartController.getItemById(id).status ? cartController.getItemById(id).data[0] : cartController.getItemById(id).status
        elementsHtml.priceItem.textContent = `€${item.totalPriceItem.toFixed(2)}`
        elementsHtml.ivaPriceItem.textContent = `€${item.totalIvaPriceItem.toFixed(2)}` 
        const cartSubTotalIva = document.querySelector(`#cartCheckoutSubTotalIva`)
        const cartSubTotal = document.querySelector(`#cartCheckoutSubTotal`)
        const cartTotal = document.querySelector(`#cartCheckoutTotal`)
        if (cartSubTotalIva && cartSubTotal && cartTotal) {
            cartSubTotalIva.textContent = `€${cartController.subTotalIva.toFixed(2)}`  
            cartSubTotal.textContent = `€${cartController.subTotalItems.toFixed(2)}`  
            cartTotal.textContent = `€${cartController.totalOrder.toFixed(2)}`          
        }
        
    },

    removeItem(id){
        cartController.removeItem(id)
        this.updateCartCount()
        this.draw()
        cartController.cartCount === 0 ? window.location.assign('../index.html') : null
        cartView.statusVisible ? cartView.draw() : null
    },

    changeQuantity(id, elementsHtml){
        if (elementsHtml){
            let quantity = Number(elementsHtml.input.value)
            const product = cartController.getItemById(id).status ? cartController.getItemById(id).data[0] : cartController.getItemById(id).status
            let regex = /^\d+$/
            if (regex.test(quantity) && quantity !== '') {
                if (quantity > 0 && quantity <= product.stock) {
                    elementsHtml.msg.textContent = ``
                    this.statusValid = true
                }
                else {
                    elementsHtml.msg.textContent = `La cantidad debe estar entre 1 y ${product.stock}`
                    quantity = 1
                    this.statusValid = false
                }
            }
            else{
                quantity = 1
                elementsHtml.input.value = quantity  
                this.statusValid = true                      
            }
            cartController.changeQuantity(id, quantity)
            this.updateCartCount()
            this.updateTotals(id, elementsHtml)
            cartView.statusVisible ? cartView.draw() : null
        }
    },

    incrementQuantity(id, elementsHtml){
        const product = cartController.getItemById(id).status ? cartController.getItemById(id).data[0] : cartController.getItemById(id).status
        let quantity = Number(elementsHtml.input.value)
        quantity += 1
        if (quantity <= product.stock) {
            elementsHtml.input.value = quantity            
        } 
        this.changeQuantity(id, elementsHtml)
    },

    decrementQuantity(id, elementsHtml){
        let quantity = Number(elementsHtml.input.value)
        quantity -= 1
        if (quantity >= 1) {
            elementsHtml.input.value = quantity            
        }        
        this.changeQuantity(id, elementsHtml)
    },

    addListeners(){
        const thisArg = this
        const btnsRemoveItem = document.querySelectorAll(".cartRemoveItemBtn.checkout")
        if (btnsRemoveItem) {
            btnsRemoveItem.forEach(function(value, index){
                const bntElement = value
                let id = Number(value.dataset.id)
                bntElement.addEventListener("click", function(e){
                    e.preventDefault()
                    thisArg.removeItem(id)
                })                
            })                        
        } else {
            console.log(`no se encontraron los botones de eliminar items del carrito`);                        
        }
        const inputsQuantityItem = document.querySelectorAll(".cartItemQuantityInput.checkout")
        const decreaseItemsBtns = document.querySelectorAll(".cartDecreaseItemBtn.checkout")
        const increaseItemsBtns = document.querySelectorAll(".cartIncreaseItemBtn.checkout")
        const msgQuantityItem = document.querySelectorAll(".cartQuantityMsg.checkout")
        const totalIvaPriceItem = document.querySelectorAll(".totalIvaPriceItem.checkout")
        const totalPriceItem = document.querySelectorAll(".totalPriceItem.checkout")
        if (inputsQuantityItem) {
            inputsQuantityItem.forEach(function(value, index){
                const inputElement = value
                const elementsHtml = {
                    input: inputElement,
                    incrementBtn: increaseItemsBtns[index],
                    decrementBtn: decreaseItemsBtns[index],
                    msg: msgQuantityItem[index],
                    ivaPriceItem: totalIvaPriceItem[index],
                    priceItem: totalPriceItem[index]
                }
                let id = Number(value.dataset.id)
                inputElement.addEventListener("input", function(e){
                    e.preventDefault()
                    thisArg.changeQuantity(id, elementsHtml)
                })
                elementsHtml.incrementBtn.addEventListener("click", function(e){
                    e.preventDefault()
                    thisArg.incrementQuantity(id, elementsHtml)
                })
                elementsHtml.decrementBtn.addEventListener("click", function(e){
                    e.preventDefault()
                    thisArg.decrementQuantity(id, elementsHtml)
                })                
            })                        
        } else {
            console.log(`no se encontraron los inputs de cantidad de items del carrito`);                        
        }
    }

}