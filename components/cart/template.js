export const cartTemplate = {

    init(obj, html){
        return `
            <aside id="cart" class="cart">
                <div id="cartDiv" class="cartDiv">
                    <div class="cartHeader">
                        <h2 data-idioma="cart.title">Tu carrito</h2>
                        <a id="btnCloseCart" class="btnCloseCart" href="#">
                            <i class="fa-solid fa-xmark"></i>
                        </a>
                    </div>                    
                    <div id="cartItems" class="cartBody">
                            <div class="cartCoutItems">
                                <h3><span id="cartCountNumber" class="cartCountNumber">${obj.cartCount}</span> <span data-idioma="cart.items">Artículos</span></h3>
                            </div>
                        ${html.items ? html.items : this.isEmpty()}
                    </div>
                    ${html.items ? html.footer : ``}

                </div>
            <aside>
        `
    },
    item(obj) {
        const translatedName = (window.idioma && idioma.getTranslation(`products.name.${obj.id}`)) || obj.nombre;
        return `
        <div class="cartItem" id="${obj.id}">
            <div class="cartItemTitle">
                <h3 data-idioma="products.name.${obj.id}">${translatedName}</h3>
            </div>
            <div class="cartItemContent">
                <div class="cartItemImg">
                    <img src="../${obj.imagenes[0]}" alt="${obj.nombre}">
                </div>
                <div class="cartItemDetails">
                    <div class="cartItemPrice">
                        <p data-idioma="cart.priceUnit">Precio Unidad:</p>
                        <p>€${obj.precio.toFixed(2)}</p>
                    </div>
                    <div class="cartItemQuantity">
                        <p data-idioma="cart.quantity">Cantidad:</p>
                        <div class="cartQuantityControls">    
                            <a href="#" class="cartDecreaseItemBtn" data-id="${obj.id}"><i class="fa fa-minus"></i></a>
                            <input type="text" class="cartItemQuantityInput" data-id="${obj.id}" value="${obj.quantity}"/>
                            <a href="#" class="cartIncreaseItemBtn" data-id="${obj.id}" data-action="increment"><i class="fa fa-plus"></i></a>
                        </div>
                    </div>
                    <div class="cartItemQuantity">
                        <p class="cartQuantityMsg"></p>
                    </div>
                    <div class="cartItemIva">
                        <p data-idioma="cart.iva">IVA:</p>
                        <p class="totalIvaPriceItem" >€${obj.totalIvaPriceItem.toFixed(2)} </p>
                    </div>
                    <div class="cartItemTotalPrice">
                        <p data-idioma="cart.totalItem">Total:</p>
                        <p class="totalPriceItem">€${obj.totalPriceItem.toFixed(2)}</p>
                    </div>
                </div> 
            </div>
            <div class="cartItemFooter">
                <a class="cartRemoveItemBtn" data-id="${obj.id}"><i class="fa fa-trash"></i> <span data-idioma="cart.remove">Eliminar</span></a>
            </div>
        </div>
        `
    },
    isEmpty() {
        return `
            <div class="cartEmpty">
                <h3 data-idioma="cart.empty">Tu carrito está vacío. Explora nuestros productos y añade algo.</h3>
            </div>
        `
    },
    footer(obj){
        return `
            <div class="cartFooter">
                <div class="cartTotalRow">
                    <div class="cartSubTotal" data-idioma="cart.subTotalIva">Subtotal IVA:</div>
                    <div id="cartSubTotalIva" class="cartSubTotalPrice">€${obj.subTotalIva.toFixed(2)}</div>
                </div>
                <div class="cartTotalRow">
                    <div class="cartSubTotal" data-idioma="cart.subTotalProducts">Subtotal Productos:</div>
                    <div id="cartSubTotal" class="cartSubTotalPrice">€${obj.subTotalItems.toFixed(2)}</div>
                </div>
                <div class="cartTotalRow">
                    <div class="cartSubTotal" data-idioma="cart.total">Total:</div>
                    <div id="cartTotal" class="cartSubTotalPrice">€${obj.totalOrder.toFixed(2)}</div>
                </div>
                <div id="cartCheckoutMsg" class="cartCheckoutMsg"></div>
                <div class="">
                    <a id="cartCheckoutBnt" class="cartCheckoutBtn" disabled data-idioma="cart.checkout">Finalizar compra</a>
                </div>
            </div>
        `
    },
    resumeCheckout(obj, html){
        return `
            <aside id="cartCheckout" class="cartCheckout">
                <div id="cartCheckoutDiv" class="cartDiv">
                    <div class="cartCheckoutHeader">
                        <h2 data-idioma="cart.summaryTitle">Resumen de Pedido</h2>
                    </div>                    
                    <div id="cartItemsCheckout" class="cartBody">
                        <div class="cartCoutItems">
                            <h3><span id="cartCheckoutCountNumber" class="cartCountNumber">${obj.cartCount}</span> <span data-idioma="cart.items">Artículos</span></h3>
                        </div>
                        ${html.items ? html.items : this.isEmpty()}
                    </div>
                    ${html.items ? html.footer : ``}
                </div>
            <aside>
        `
    },
    itemResume(obj) {
        const translatedName = (window.idioma && idioma.getTranslation(`products.name.${obj.id}`)) || obj.nombre;
        return `
        <div class="cartItem" id="${obj.id}">
            <div class="cartItemTitle">
                <h3 data-idioma="products.name.${obj.id}">${translatedName}</h3>
            </div>
            <div class="cartItemContent">
                <div class="cartItemImg checkout">
                    <img src="../${obj.imagenes[0]}" alt="${obj.nombre}">
                </div>
                <div class="cartItemDetails">
                    <div class="cartItemPrice">
                        <p data-idioma="cart.priceUnit">Precio Unidad:</p>
                        <p>€${obj.precio.toFixed(2)}</p>
                    </div>
                    <div class="cartItemQuantity">
                        <p data-idioma="cart.quantity">Cantidad:</p>
                        <div class="cartQuantityControls">    
                            <a href="#" class="cartDecreaseItemBtn checkout" data-id="${obj.id}"><i class="fa fa-minus"></i></a>
                            <input type="text" class="cartItemQuantityInput checkout" data-id="${obj.id}" value="${obj.quantity}"/>
                            <a href="#" class="cartIncreaseItemBtn checkout" data-id="${obj.id}" data-action="increment"><i class="fa fa-plus"></i></a>
                        </div>
                    </div>
                    <div class="cartItemQuantity">
                        <p class="cartQuantityMsg checkout"></p>
                    </div>
                    <div class="cartItemIva">
                        <p data-idioma="cart.iva">IVA:</p>
                        <p class="totalIvaPriceItem checkout" >€${obj.totalIvaPriceItem.toFixed(2)} </p>
                    </div>
                    <div class="cartItemTotalPrice">
                        <p data-idioma="cart.totalItem">Total:</p>
                        <p class="totalPriceItem checkout">€${obj.totalPriceItem.toFixed(2)}</p>
                    </div>
                </div> 
            </div>
            <div class="cartItemFooter">
                <a class="cartRemoveItemBtn checkout" data-id="${obj.id}"><i class="fa fa-trash"></i> <span data-idioma="cart.remove">Eliminar</span></a>
            </div>
        </div>
        `
    },
    footerResume(obj){
        return `
            <div class="cartFooter">
                <div class="cartTotalRow">
                    <div class="cartSubTotal" data-idioma="cart.subTotalIva">Subtotal IVA:</div>
                    <div id="cartCheckoutSubTotalIva" class="cartSubTotalPrice">€${obj.subTotalIva.toFixed(2)}</div>
                </div>
                <div class="cartTotalRow">
                    <div class="cartSubTotal" data-idioma="cart.subTotalProducts">Subtotal Productos:</div>
                    <div id="cartCheckoutSubTotal" class="cartSubTotalPrice">€${obj.subTotalItems.toFixed(2)}</div>
                </div>
                <div class="cartTotalRow">
                    <div class="cartSubTotal" data-idioma="cart.total">Total:</div>
                    <div id="cartCheckoutTotal" class="cartSubTotalPrice">€${obj.totalOrder.toFixed(2)}</div>
                </div>        
            </div>
        `
    },
}