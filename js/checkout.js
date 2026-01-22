import { config } from "./config.js"
import { cart } from "../components/cart/cart.js"

const form = document.getElementById("checkoutForm");
const payBtn = document.getElementById("payBtn");

form.addEventListener("submit", async function(event){  

  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  try {
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
  
  
  /* if (usersData.some(o => o.email === orden.client.email)) {
    return alert("Este email ya ha sido registrado. Por favor usa otro.");
  } */
    // Guardar el cliente
  /* const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(orden.cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));*/

    /* ordenes.push(orden);
    localStorage.setItem("ordenes", JSON.stringify(ordenes)); */


    const result = await generateOrder(orden);
  
    if(result && result.status){
      //form.reset();
      const div = `<div class="divCompleteCheckout">LISTO</div>`
      const salida= document.querySelector("body")
      salida.innerHTML=div
      cart.resetEstate()
      window.location.assign('../index.html')
      //alert("Pago aceptado. Pedido generado. ¡Gracias por su compra!");
      //console.log("Pago aceptado. Pedido generado. ¡Gracias por su compra!");
      //form.reset();
    }
    else{
      alert(`${result.msg}`);
      console.log(`${result.msg}`)
    }
    
  } catch (error) {
    console.error("un problema con el evento click:", error);
  }
  
});

  async function existsClient(email){
    const result={}
    try {
      const url = `${config.endPoints().users}?email=${email}`
      const response = await fetch(url);
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

  async function createClient(orden){
    const result={}
    try{
      const client = {
        name: orden.client.name,
        email: orden.client.email,
        role: "client",
        isActive: true,
      }
      const url = `${config.endPoints().users}`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      }
      const response = await fetch(url, options);
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

  async function createOrder(orden) {
    const result = {}
    try {
      const url = `${config.endPoints().orders}`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orden),
      }
      const response = await fetch(url, options);
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

  async function generateOrder(orden){
    const result = {}
    try {
      const existsClientR = await existsClient(orden.client.email);
      if(existsClientR.status){
        console.log(existsClientR.status);
        console.log(existsClientR.msg);
        
        const createOrderr = await createOrder(orden);
        if (createOrderr.status){
          result.status = true
          result.msg = "orden registrada correctaente"
        }
        else{
          result.status = false
          result.msg = createOrderr.msg
        }   
      }
      else{
        console.log(existsClientR.status);
        console.log(existsClientR.msg);

        const createClientr = await createClient(orden);
        const createOrderr = await createOrder(orden);
        if(!createClientr.status){
          result.status=false
          result.msg= createClientr.msg
        }
        else if(!createOrderr.status){
          result.status = false
          result.msg = createOrderr.msg
        }
        else{
          result.status = true
          result.msg = "orden y cliente registrado correctaente"
        }
      }
      
    } catch (error) {
      result.status = false
      result.msg = "error en generateOrder"
      console.error("un problema con generateOrder:", error);  
    }
  
    console.log(result);
    return result    
  }