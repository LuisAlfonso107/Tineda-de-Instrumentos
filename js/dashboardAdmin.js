import { dashboardAdminemplate } from "../components/dashboard.template"

export const dashboardAdmin = {

    init(){

        

        const output = document.querySelector('#app');

        if( output) {

            output.innerHTML = dashboardAdminTemplate.init();
        
        }




    },
   

    

}