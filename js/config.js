export const config = {
    apiUrl: "http://localhost:9000",
    endPoints() {
        return{
            users: `${this.apiUrl}/users`,
            orders: `${this.apiUrl}/orders`,
            products: `${this.apiUrl}/products`
        }
        
    }
}