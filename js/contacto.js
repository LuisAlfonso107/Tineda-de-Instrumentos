
// Obtiene el formulario por su ID del documento
const form = document.getElementById("contactForm");

// Obtiene el contenedor donde se mostrará el mensaje de confirmación
const result = document.getElementById("result");
   
// Agrega un evento al formulario que se ejecuta cuando se presiona "submit"
form.addEventListener("submit", function(e) {
    // Evita que el formulario recargue la página al enviarse
    e.preventDefault();

    // Obtiene los valores de los campos del formulario
    const nombre = form.nombre.value;
    const correo = form.correo.value;
    const telefono = form.telefono.value;
    const mensaje = form.mensaje.value;

    // Crea un objeto con los datos del formulario
    const data = {
        nombre,
        correo,
        telefono,
        mensaje,
        fecha: new Date().toLocaleString()
    };
    
    // Recupera los mensajes guardados anteriormente en localStorage
    // Si no hay mensajes guardados, se inicia un arreglo vacío
    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
    
    // Agrega el nuevo mensaje al arreglo
    mensajes.push(data);

    // Guarda nuevamente el arreglo actualizado en localStorage
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
   
    // Limpia los campos del formulario
    form.reset();
    
    // Muestra un mensaje de confirmación en pantalla
    mostrarMensajeEnviado();
});

  // NO BORRAR: Traduce los productos nuevos
        if (window.idioma) {
            window.idioma.translatePage();  
        }

    // Función que muestra un mensaje de confirmación al usuario
    function mostrarMensajeEnviado() {

    result.innerHTML = `<h3 style="color:red;">Su mensaje ha sido enviado <i class="fa-regular fa-thumbs-up"></i></h3>`; 


}


