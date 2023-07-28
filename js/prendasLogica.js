let prendasDisponibles = [];

async function obtenerPrendasDisponibles() {
  try {
    const response = await fetch('../jsons/prendasDisponibles.json');
    if (!response.ok) {
      throw new Error('Error al obtener archivo JSON');
    }
    prendasDisponibles = await response.json();
    return prendasDisponibles;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function actualizarPrendasDisponibles() {
  const tipoPrenda = document.getElementById('inputPrenda').value;
  const inputNombrePrenda = document.getElementById('inputNombrePrenda');
  inputNombrePrenda.innerHTML = '';

  const optionEmpty = document.createElement('option');
  optionEmpty.value = 'empty';
  optionEmpty.textContent = 'Seleccionar';
  inputNombrePrenda.appendChild(optionEmpty);

  if (tipoPrenda != null) {
    const prendasFiltradas = prendasDisponibles.filter(prenda => prenda.categoria == tipoPrenda);
    const precioPrenda = document.getElementById("precioPrenda");

    for (const prenda of prendasFiltradas) {
      const option = document.createElement('option');
      option.value = prenda.nombre;
      option.textContent = prenda.nombre;
      inputNombrePrenda.appendChild(option);
    }

    inputNombrePrenda.addEventListener('change', () => {
      const selectedPrenda = inputNombrePrenda.value;
      const prendaSeleccionada = prendasDisponibles.find(prenda => prenda.nombre == selectedPrenda);
      if (prendaSeleccionada != null) {
        precioPrenda.textContent = `Precio: ${prendaSeleccionada.precio}`;
      } else {
        precioPrenda.textContent = 'Precio: ';
      }
    });
  }
}

function cargarPrendasGuardadas() {
  const prendasGuardadas = localStorage.getItem('prendas');
  if (prendasGuardadas != null) {
    const prendas = JSON.parse(prendasGuardadas);
    const listaPrendas = document.getElementById('listaPrendas');
    listaPrendas.innerHTML = ''
    prendas.forEach((prenda) => {
      const nuevaPrenda = document.createElement('li');
      nuevaPrenda.textContent = `Comprador: ${prenda.nombrePersona}. Tipo de prenda: ${prenda.tipoPrenda}. Nombre de la prenda: ${prenda.nombrePrenda}. Precio: ${prenda.precioPrenda}`;
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => eliminarPrenda(btnEliminar));
      nuevaPrenda.appendChild(btnEliminar);
      listaPrendas.appendChild(nuevaPrenda);
    });
  }
}

function agregarPrendas() {
  const nombrePersona = document.getElementById('inputNombre').value;
  const tipoPrenda = document.getElementById('inputPrenda').value;
  const nombrePrenda = document.getElementById('inputNombrePrenda').value;

  if (nombrePersona == '') {
    mostrarAlert("falta", "ingresar nombre");
  } else if (tipoPrenda == 'empty') {
    mostrarAlert("falta", "seleccionar categoría de prenda");
  } else if (nombrePrenda == 'empty') {
    mostrarAlert("falta", "seleccionar una prenda")
  }
  if (nombrePersona != '' && tipoPrenda != 'empty' && nombrePrenda != 'empty') {
    const precioPrenda = prendasDisponibles.find(prenda => prenda.nombre == nombrePrenda).precio;
    const listaPrendas = document.getElementById('listaPrendas');
    const nuevaPrenda = document.createElement('li');
    nuevaPrenda.textContent = `Comprador: ${nombrePersona}. Tipo de prenda: ${tipoPrenda}. Nombre de la prenda: ${nombrePrenda}. Precio: ${precioPrenda}`;
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarPrenda(btnEliminar));
    nuevaPrenda.appendChild(btnEliminar);
    listaPrendas.appendChild(nuevaPrenda);


    const prendasGuardadas = localStorage.getItem('prendas');
    let prendas = prendasGuardadas ? JSON.parse(prendasGuardadas) : [];
    prendas.push({
      nombrePersona,
      tipoPrenda,
      nombrePrenda,
      precioPrenda
    });
    localStorage.setItem('prendas', JSON.stringify(prendas));
    mostrarAlert("guardado");
  }
}

async function eliminarPrenda(btnEliminar) {
  const listaPrendas = document.getElementById('listaPrendas');
  const indice = Array.prototype.indexOf.call(listaPrendas.children, btnEliminar.parentNode);
  const prendasGuardadas = localStorage.getItem('prendas');
  const prendas = prendasGuardadas ? JSON.parse(prendasGuardadas) : [];
  const confirmDelete = await mostrarAlert("eliminar");
  if (confirmDelete.isConfirmed) {
    if (indice != -1) {

      prendas.splice(indice, 1);
      localStorage.setItem('prendas', JSON.stringify(prendas));
      cargarPrendasGuardadas();

      btnEliminar.parentNode.remove();
    }
  }
}

function mostrarAlert(opt, info) {
  return new Promise((resolve, reject) => {
    switch (opt) {
      case "falta":
        Swal.fire({
          title: `<strong>Falta ${info}</strong>`,
          icon: 'info',
          html: 'Completa los campos vacios antes de <b>guardar</b>.',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
          cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        })
        break;

      case "guardado":
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La compra ha sido realizada',
          showConfirmButton: false,
          timer: 1200
        })
        break;

      case "eliminar":
        confirmacion();

        function confirmacion() {
          Swal.fire({
            title: 'Estas seguro de eliminar esta prenda?',
            text: "No vas a poder recuperar la compra!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
          }).then((result) => {
            resolve(result);
          });
        }
        break;
    }
  });
}

document.getElementById('btnAgregar').addEventListener('click', agregarPrendas);

window.addEventListener('load', () => {
  obtenerPrendasDisponibles()
  actualizarPrendasDisponibles();
  cargarPrendasGuardadas();
});