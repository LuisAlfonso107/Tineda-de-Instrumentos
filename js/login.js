import { loginTemplate } from "../components/login.template.js"

export const login = {

    loginF () {
        const loElement = document.querySelector('#login')
        if (loElement) {
        
        loElement.innerHTML = loginTemplate.init()
        console.log("esto");
    
        } 
            
        
    }


}