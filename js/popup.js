function initPopup() {
    const popup = document.getElementById("popup-oferta");
    const btnCerrar = document.getElementById("popup-cerrar");

    if (!popup || !btnCerrar) return;

    const yaLaVio = sessionStorage.getItem("ofertaVista");

    if (yaLaVio === "true") {
        return;
    }

    // Aparece después de 5 segundos
    setTimeout(() => {
        popup.classList.add("activo");

        sessionStorage.setItem("ofertaVista", "true");
    }, 5000);

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








