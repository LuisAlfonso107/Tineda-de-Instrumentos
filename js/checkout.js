/* import { cart } from "../components/cart/cart.js" */

const form = document.getElementById("checkoutForm");
const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async function(event){
  event.preventDefault();

  // VALIDACIÓN DEL PAGO 
  const nombreTarjeta = document.getElementById("cname").value.trim();
  const numeroTarjeta = document.getElementById("ccnum").value.trim();
  const mes = document.getElementById("expmonth").value.trim();
  const year = document.getElementById("expyear").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  // VALIDACIÓN DEL Cliente
  const nombre = document.getElementById("fname").value.trim();
  const email = document.getElementById("email").value.trim();
  const direccion =  document.getElementById("adr").value.trim();
  const ciudad = document.getElementById("city").value.trim();
  const estado = document.getElementById("state").value.trim();
  const zip =document.getElementById("zip").value.trim();

  // Validación de campos vacíos
  if (
    nombreTarjeta === "" ||
    numeroTarjeta === "" ||
    mes === "" ||
    year === "" ||
    cvv === "" ||
    nombre === "" ||
    email === "" ||
    direccion === "" ||
    ciudad === "" ||
    estado === "" ||
    zip === ""
  ) {
    alert("Pago rechazado: Por favor complete todos los campos.");
    return;
  }

 // Convertimos el valor a cadena y eliminamos espacios
  const numeroTarjetaLimpio = numeroTarjeta.split(' ').join('');

  // Verificamos que tenga exactamente 16 dígitos y que sea un número
  if (numeroTarjetaLimpio.length !== 16 || isNaN(Number(numeroTarjetaLimpio))) {
    alert("Pago rechazado: Número de tarjeta inválido.");
    return;
  }
    // Convertimos el mes ingresado a número
  const mesNumero = Number(mes);

  // Verificamos que sea un número entre 1 y 12
  if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
    alert("Pago rechazado: Mes de expiración inválido.");
    return;
  }
  // Obtener el año actual
  const yearActual = new Date().getFullYear();

  // Obtener el año ingresado por el usuario y convertirlo a número
  const yearIngresado = Number(document.getElementById("expyear").value);

  // Verificar si el año ingresado es menor que el año actual o no es un número válido
  if (isNaN(yearIngresado) || yearIngresado < yearActual) {
    alert("Pago rechazado: Año de expiración inválido.");
    return;
  }

  // Convertimos el CVV a número
  const cvvNumero = Number(cvv);

  // Verificamos que sea un número de 3 dígitos
  if (isNaN(cvvNumero) || cvv.length !== 3) {
    alert("Pago rechazado: CVV inválido.");
    return;
  }

  //obtener el resumen del carito
  const cartResume = JSON.parse(localStorage.getItem("cart")) || [];

  // CREAR OBJETO ORDEN
  const orden = {
    client: {
      name: nombre,
      email: email     
    },
    shipment:{
      address: direccion,
      city: ciudad,
      state: estado,
      zip: zip
    },
    paymentCard: {
      name: nombreTarjeta,
      number: numeroTarjeta,
      month: mes,
      year: year,
      cvv: cvv
    },
    order:cartResume
  };

  // GUARDAR EN backend
  /* const ordenes = JSON.parse(localStorage.getItem("ordenes")) || []; */
    async function existsClient(){
      const result={}
      try {
        const url = `http://localhost:9000/users?email=${email}`
        const response = await fetch(url)
        if(!response.ok){
          result.status=false
          result.msg="la red respondio con error"
          throw new Error ("la red respondio con error")
        }
        const usersData = await response.json()
          // Evitar duplicar emails  
        if(usersData.length > 0){
          result.status = true
          result.msg = "cliente existe"        
        }
        else{
          result.status = false
          result.msg = "cliente no existe"
        }
        
      } catch (error) {
        result.status = false
        result.msg = "un problema con existsClient"
        console.error("un problema con existsClient:", error);
      }
      return result
    }

    async function createClient(){
      const result={}
      try{
        const client = {
          name: orden.client.name,
          email: orden.client.email,
          role: "client",
          isActive: true,
        }
        const url = `http://localhost:9000/users`
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(client),
        }
        const response = await fetch(url, options)
        if(!response.ok){
          result.status=false
          result.msg="la red respondio con error"
          throw new Error ("la red respondio con error") 
        }
        result.status=true
        result.msg="cliente registrado correctamente"
        result.data = await response.json()
      }
      catch (error) {
        result.status=false
        result.msg="un problema con createClient"
        console.error("un problema con createClient:", error);
      }
      return result
    }

    async function createOrder() {
      const result = {}
      try {
        const url = `http://localhost:9000/orders`
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orden),
        }
        const response = await fetch(url, options)
        if(!response.ok){
          result.status=false
          result.msg="la red respondio con error: no se pudo registrar la orden"
          throw new Error ("la red respondio con error: no se pudo registrar la orden") 
        }
        result.status=true
        result.msg="orden creada"
        result.data = await response.json()        
      }
      catch (error) {
        result.status=false
        result.msg="un problema con createOrder"
        console.error("un problema con createOrder:", error);
      }  
      return result    
    }
  
  /* if (usersData.some(o => o.email === orden.client.email)) {
    return alert("Este email ya ha sido registrado. Por favor usa otro.");
  } */
    // Guardar el cliente
  /* const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(orden.cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));*/

    /* ordenes.push(orden);
    localStorage.setItem("ordenes", JSON.stringify(ordenes)); */
  async function generateOrder(){
    const existsClientR = await existsClient()
    const result = {}
    if(existsClientR.status){
      console.log(existsClientR.status);
      console.log(existsClientR.msg);
      
      const createOrderr = await createOrder()
      if (createOrderr.status){
        result.status = true
      }
      else{
        result.status = false
        result.msg = createOrderr.msg
      }   
    }
    else{
      console.log(existsClientR.status);
      console.log(existsClientR.msg);

      const createClientr = await createClient()
      const createOrderr = await createOrder()
      if(!createClientr.status){
        result.status=false
        result.msg= createClientr.msg
      }
      else if(!createOrderr.status){
        result.status = false
        result.msg = createOrderr.msg
      }
      else{
        result.status= true
      }
    }

    console.log(result);
    

    if(result.status){
      //form.reset();
      alert("Pago aceptado. Pedido generado. ¡Gracias por su compra!");
      return
      //form.reset();
    }
    else{
        alert(`${result.msg}`);
        return
        console.log(`${result.msg}`);
    }

  }
  await generateOrder()

});