function mostrarCampoCorrespondiente() {
    const campoCamisetas = document.getElementById('campoCamisetas');
    const campoCamperas = document.getElementById('campoCamperas');
    const campoHoddies = document.getElementById('campoHoddies');
    const campoPantalones = document.getElementById('campoPantalones');
    const inputPrenda = document.getElementById('inputPrenda');

    if (inputPrenda.value == 'Camisetas') {
        campoCamisetas.classList.remove('hidden');
        campoCamperas.classList.add('hidden');
        campoPantalones.classList.add('hidden');
        campoHoddies.classList.add('hidden');
    } else if (inputPrenda.value == 'Camperas') {
        campoCamperas.classList.remove('hidden');
        campoCamisetas.classList.add('hidden');
        campoPantalones.classList.add('hidden');
        campoHoddies.classList.add('hidden');
    } else if (inputPrenda.value == 'Hoddies') {
        campoHoddies.classList.remove('hidden');
        campoCamisetas.classList.add('hidden');
        campoCamperas.classList.add('hidden');
        campoPantalones.classList.add('hidden');
    } else if (inputPrenda.value == 'Pantalones') {
        campoPantalones.classList.remove('hidden');
        campoCamisetas.classList.add('hidden');
        campoCamperas.classList.add('hidden');
        campoHoddies.classList.add('hidden');
    } else {
        campoCamisetas.classList.add('hidden');
        campoCamperas.classList.add('hidden');
        campoPantalones.classList.add('hidden');
        campoHoddies.classList.add('hidden');
    }
}