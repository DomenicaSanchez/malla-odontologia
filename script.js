
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


// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos y créditos especiales
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    let puedeDesbloquear = reqs.every(r => aprobados.includes(r));

    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) elem.classList.remove('bloqueado');
      else elem.classList.add('bloqueado');
    } else {
      elem.classList.remove('bloqueado');
    }
  }
}


// Maneja el clic para aprobar o desaprobar un ramo (solo si no está bloqueado)
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const idx = aprobados.indexOf(ramo.id);
    if (idx > -1) aprobados.splice(idx, 1);
  }
  guardarAprobados(aprobados);

  actualizarDesbloqueos();
}

// Al cargar la página, asignar eventos, cargar progreso y actualizar desbloqueos
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');

  const aprobados = obtenerAprobados();
  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
  });

  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});
