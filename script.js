document.addEventListener('DOMContentLoaded', () => {
    const botonAuxilio = document.getElementById('botonAuxilio');

    botonAuxilio.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            alert('Tu navegador no soporta la geolocalización.');
        }
    });

    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Crear enlace de Google Maps
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank'); // Abre Google Maps en una nueva pestaña

        // Crear enlace de WhatsApp
        const mensaje = encodeURIComponent(`¡Auxilio! Mi ubicación es: ${googleMapsUrl}`);
        const telefonoDestino = '+524331087382'; // Reemplaza con el número de teléfono al que enviar el WhatsApp (con el código de país)
        const whatsappUrl = `https://wa.me/${telefonoDestino}?text=${mensaje}`;
        window.open(whatsappUrl, '_blank'); // Abre WhatsApp en una nueva pestaña (si está instalado)
    }

    function errorCallback(error) {
        let errorMessage = 'No se pudo obtener la ubicación.';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'El usuario denegó la solicitud de geolocalización.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'La información de ubicación no está disponible.';
                break;
            case error.TIMEOUT:
                errorMessage = 'Se agotó el tiempo de espera para obtener la ubicación.';
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = 'Ocurrió un error desconocido.';
                break;
        }
        alert(errorMessage);
    }
});