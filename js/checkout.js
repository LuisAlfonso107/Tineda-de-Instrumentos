import { cart } from "../components/cart/cart.js"

const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // VALIDACIÓN DEL PAGO 
  const nombreTarjeta = document.getElementById("cname").value.trim();
  const numeroTarjeta = document.getElementById("ccnum").value.trim();
  const mes = document.getElementById("expmonth").value.trim();
  const año = document.getElementById("expyear").value.trim();
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
    año === "" ||
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
const añoActual = new Date().getFullYear();

// Obtener el año ingresado por el usuario y convertirlo a número
const añoIngresado = Number(document.getElementById("expyear").value);

// Verificar si el año ingresado es menor que el año actual o no es un número válido
if (isNaN(añoIngresado) || añoIngresado < añoActual) {
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
  // CREAR OBJETO ORDEN
  const orden = {
    cliente: {
      nombre,
      email,
      direccion,
      ciudad,
      estado,
      zip
    },
    pago: {
      nombreTarjeta,
      numeroTarjeta,
      mes,
      año,
      cvv
    }
  };

  // GUARDAR EN LOCALSTORAGE
  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];git

  // Evitar duplicar emails
 if (ordenes.some(o => o.cliente.email === orden.cliente.email)) {
  return alert("Este email ya ha sido registrado. Por favor usa otro.");
}
  // Guardar el cliente
 /* const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  clientes.push(orden.cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));*/

  ordenes.push(orden);
  localStorage.setItem("ordenes", JSON.stringify(ordenes));

 form.reset();

  alert("Pago aceptado. ¡Gracias por su compra!");
  console.log(localStorage.getItem("ordenes"));

});