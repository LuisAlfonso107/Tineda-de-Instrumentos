function initPopup() {
    const popup = document.getElementById("popup-oferta");
    const btnCerrar = document.getElementById("popup-cerrar");

    if (!popup || !btnCerrar) return;

    // Aparece después de 7  segundo
    setTimeout(() => {
        popup.classList.add("activo");
    }, 7000);

    // Cerrar al hacer clic en el botón
    btnCerrar.addEventListener("click", () => {
        popup.classList.remove("activo");
    });

    // Cerrar al hacer clic fuera del contenido (en el fondo oscuro)
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("activo");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initPopup();
});

// Exponer globalmente para poder llamarlo desde el fetch
window.initPopup = initPopup;








