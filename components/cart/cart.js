import { cartView } from "./view.js"
import { cartViewResume } from "./viewResume.js"
import { cartController } from "./controller.js"

export const cart = {
    idBtnCart: cartView.idBtnCart,
    idBtnCloseCart: cartView.idBtnCloseCart,
    init(){
        cartController.init()
        cartView.updateCartCount()
        cartViewResume.init()
    },
    toggle(){
        cartView.toggle()
    },
    addItem(id){
        cartView.addItem(id)
    }
};