// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
  actualizarProgreso();
}

// Función para aprobar/desaprobar una materia
function aprobar(materiaId) {
  const elemento = document.getElementById(materiaId);

  if (!elemento || elemento.classList.contains('bloqueado')) {
    return;
  }

  const aprobados = obtenerAprobados();
  const index = aprobados.indexOf(materiaId);

  if (index === -1) {
    // Agregar sonido o feedback táctil aquí si se desea
    aprobados.push(materiaId);
    elemento.classList.add('aprobado');
  } else {
    aprobados.splice(index, 1);
    elemento.classList.remove('aprobado');
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos();
}

// Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    const puedeDesbloquear = reqs.every(r => aprobados.includes(r));

    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) {
        elem.classList.remove('bloqueado');
      } else {
        elem.classList.add('bloqueado');
      }
    } else {
      elem.classList.remove('bloqueado');
    }
  }
}

// Actualizar barra de progreso
function actualizarProgreso() {
  const aprobados = obtenerAprobados();
  const totalMaterias = document.querySelectorAll('.ramo').length;
  const porcentaje = Math.round((aprobados.length / totalMaterias) * 100);

  document.getElementById('progressFill').style.width = `${porcentaje}%`;
  document.getElementById('progressText').textContent = `${porcentaje}% completado`;
}

// Prerrequisitos de cada ramo
// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  // 2° año
  'ingles_tecnico': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'anatomia': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'bioquimica': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'histologia': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'inmunologia': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'biologia_bucal': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'biofisica_aplicada': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'clinica': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'diagnostico': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],


  // 3° año
  'fisiologia': ['biologia_bucal', 'biofisica_aplicada'],           // N201
  'patologia_general': ['inmunologia', 'biologia_bucal'],          // N202
  'materiales1': ['biofisica_aplicada'],                            // N203
  'preclinica1': ['anatomia', 'clinica', 'biologia_bucal'],        // N204
  'preventiva1': ['anatomia', 'inmunologia', 'biologia_bucal', 'clinica', 'diagnostico'],  // N206
  'preclinica_quirurgica': ['anatomia', 'clinica', 'inmunologia'], // N211
  'microbiologia2': ['inmunologia'],                               // N205
  'preventiva2': ['preclinica1', 'preventiva1', 'preclinica_quirurgica'], // N207
  'preclinica2': ['materiales1', 'preclinica1', 'preventiva1'],    // N208
  'endodoncia1': ['preclinica1', 'preventiva1', 'preclinica_quirurgica'], // N209
  'patologia_bucal': ['patologia_general'],                        // N210
  'materiales2': ['materiales1'],                                  // N212
  'bioetica': ['clinica'],                                         // N213
  'periodoncia': ['preventiva1'],                                 // N214


  // 4° año
  'preclinica_protesica': ['preclinica2', 'materiales2'],
  'farmacologia': ['fisiologia', 'patologia_general'],
  'medicina_interna': ['fisiologia', 'patologia_bucal', 'clinica'],
  'endodoncia2': ['microbiologia2', 'patologia_bucal', 'preclinica2', 'endodoncia1', 'preventiva2'],
  'periodoncia': ['microbiologia2', 'patologia_bucal', 'preventiva2', 'periodoncia'],
  'restauradora': ['preventiva2', 'preclinica2', 'materiales2'],
  'bioestadistica': ['ingles_tecnico'],
  'historia': ['quimica', 'matematica', 'fisica', 'biologia', 'pensamiento', 'sociedad'],
  'cirugia1': ['microbiologia2', 'preventiva2', 'patologia_bucal', 'preclinica_quirurgica'],

  // 5° año
  'rehabilitadora': ['preclinica_protesica', 'endodoncia2', 'periodoncia', 'restauradora'],
  'cirugia2': ['farmacologia', 'medicina_interna', 'cirugia1'],
  'integral_ninos': ['farmacologia', 'medicina_interna', 'endodoncia2', 'periodoncia', 'restauradora', 'cirugia1'],
  'materiales3': ['preclinica_protesica', 'restauradora'],
  'imagenes2': ['cirugia1'],
  'medicina_bucal': ['medicina_interna', 'farmacologia'],
  'epidemiologia': ['preventiva2', 'bioestadistica'],

  // 6° año
  'integral_adultos': ['rehabilitadora', 'cirugia2', 'medicina_bucal', 'materiales3'],
  'cirugia3': ['cirugia2', 'medicina_bucal'],
  'docencia_servicio': ['integral_ninos', 'epidemiologia'],
  'integral_mayores': ['rehabilitadora', 'medicina_bucal'],
  'ortodoncia1': ['integral_ninos', 'imagenes2'],
  'medicina_bucal2': ['medicina_bucal'],
  'forense': ['bioetica', 'rehabilitadora'],
  'sistema_gestion': ['epidemiologia', 'forense']
};


// Navegación horizontal con botones
document.addEventListener('DOMContentLoaded', function () {
  const mallaGrid = document.getElementById('mallaGrid');
  const scrollLeftBtn = document.getElementById('scrollLeft');
  const scrollRightBtn = document.getElementById('scrollRight');
  const btnReset = document.getElementById('btnReset');

  // Botones de navegación horizontal
  scrollLeftBtn.addEventListener('click', () => {
    mallaGrid.scrollBy({ left: -300, behavior: 'smooth' });
  });

  scrollRightBtn.addEventListener('click', () => {
    mallaGrid.scrollBy({ left: 300, behavior: 'smooth' });
  });

  // Reiniciar progreso
  btnReset.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
      localStorage.removeItem('mallaAprobados');
      document.querySelectorAll('.ramo').forEach(ramo => {
        ramo.classList.remove('aprobado');
      });
      actualizarDesbloqueos();
      actualizarProgreso();
    }
  });

  // Inicializar
  const aprobados = obtenerAprobados();
  aprobados.forEach(materiaId => {
    const elemento = document.getElementById(materiaId);
    if (elemento) {
      elemento.classList.add('aprobado');
    }
  });

  actualizarDesbloqueos();
  actualizarProgreso();

  // // Efectos de scroll suave para navegación con rueda del ratón
  // mallaGrid.addEventListener('wheel', (e) => {
  //   if (e.deltaY !== 0) {
  //     e.preventDefault();
  //     mallaGrid.scrollLeft += e.deltaY;
  //   }
  // });
});


