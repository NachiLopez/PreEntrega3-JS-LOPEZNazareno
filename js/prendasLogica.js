function agregarPrendas() {
  // Busco el nombre de la persona y la prenda para guardarlo.
  const nombrePersona = document.getElementById('inputNombre').value;
  const tipoPrenda = document.getElementById('inputPrenda').value;
  const nombrePrenda = obtenerNombrePrenda();

  if (nombrePersona && tipoPrenda && nombrePrenda) {
    const listaPrendas = document.getElementById('listaPrendas');
    const nuevaPrenda = document.createElement('li');
    nuevaPrenda.textContent = `Comprador: ${nombrePersona}. Tipo de prenda: ${tipoPrenda}. Nombre de la prenda: ${nombrePrenda}`;
    const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => eliminarPrenda(btnEliminar));
      nuevaPrenda.appendChild(btnEliminar);
      listaPrendas.appendChild(nuevaPrenda);

    // Guardar datos en el Storage
    const prendasGuardadas = localStorage.getItem('prendas');
    let prendas = prendasGuardadas ? JSON.parse(prendasGuardadas) : [];
    prendas.push({
      nombrePersona,
      tipoPrenda,
      nombrePrenda
    });
    localStorage.setItem('prendas', JSON.stringify(prendas));
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
      nuevaPrenda.textContent = `Comprador: ${prenda.nombrePersona}. Tipo de prenda: ${prenda.tipoPrenda}. Nombre de la prenda: ${prenda.nombrePrenda}`;
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => eliminarPrenda(btnEliminar));
      nuevaPrenda.appendChild(btnEliminar);
      listaPrendas.appendChild(nuevaPrenda);
    });
  }
}

function eliminarPrenda(btnEliminar) {
  const listaPrendas = document.getElementById('listaPrendas');
  const indice = Array.prototype.indexOf.call(listaPrendas.children, btnEliminar.parentNode);

  if (indice != -1) {
    const prendasGuardadas = localStorage.getItem('prendas');
    const prendas = prendasGuardadas ? JSON.parse(prendasGuardadas) : [];

    prendas.splice(indice, 1);
    localStorage.setItem('prendas', JSON.stringify(prendas));
    cargarPrendasGuardadas();

    btnEliminar.parentNode.remove();
  }
}

function obtenerNombrePrenda() {
  const prenda = document.getElementById('inputPrenda').value;
  let nombrePrenda = '';

  switch (prenda) {
    case 'Camisetas':
      nombrePrenda = document.getElementById('inputNombreCamiseta').value;
      break;
    case 'Hoddies':
      nombrePrenda = document.getElementById('inputNombreHoddie').value;
      break;
    case 'Camperas':
      nombrePrenda = document.getElementById('inputNombreCampera').value;
      break;
    case 'Pantalones':
      nombrePrenda = document.getElementById('inputNombrePantalon').value;
      break;
    default:
      break;
  }
  return nombrePrenda;
}

document.getElementById('btnAgregar').addEventListener('click', agregarPrendas);

window.addEventListener('load', cargarPrendasGuardadas);
