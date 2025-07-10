const prerequisitos = {
  'integracion1': ['fundamentos1'],
  'bioquimica': ['quimica', 'biologia'],
  'anatomia': ['biologia'],
  'fisiologia': ['biologia', 'fisica'],
  'biodesarrollo': ['biologia'],
  'histologia': ['biologia'],
  'investigacion1': ['mate', 'fisica'],
  'educacion2': ['educacion1'],
  'cs_sociales2': ['cs_sociales1'],
  'ingles2': ['ingles1'],
  'saludcom1': [],
  'fundamentos2': ['fisiologia', 'anatomia', 'histologia', 'integracion1'],
  'obstetricia1': ['fisiologia', 'anatomia', 'histologia', 'biodesarrollo', 'integracion1'],
  'neonatologia1': ['fisiologia', 'anatomia', 'histologia', 'biodesarrollo', 'integracion1'],
  'fisiologia_sis': ['fisiologia'],
  'agentes': ['fisiologia', 'anatomia', 'histologia'],
  'cs_sociales3': ['cs_sociales2'],
  'ingles3': ['ingles2'],
  'neonatologia2': ['neonatologia1'],
  'obstetricia2': ['obstetricia1'],
  'gineco1': ['histologia', 'fisiologia_sis'],
  'fisiopato': ['fisiologia_sis'],
  'infectologia': ['agentes'],
  'farmacologia': ['fisiologia_sis', 'bioquimica'],
  'integracion2': ['fisiologia_sis'],
  'clinica_neonatal1': ['neonatologia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_partos1': ['obstetricia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_ap1': ['obstetricia2', 'gineco1', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_puerperio': ['obstetricia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_saludcom': ['integracion2'],
  'modulo1': [],
  'neonatologia3': ['farmacologia', 'fisiopato', 'obstetricia2'],
  'saludcom2': ['saludcom1'],
  'obstetricia_pat': ['obstetricia2', 'farmacologia', 'fisiopato'],
  'gestion1': ['investigacion1'],
  'investigacion2': ['investigacion1'],
  'enfermeria_mq': ['neonatologia3', 'obstetricia_pat'],
  'reproduccion': ['fisiologia_sis'],
  'gineco_pat': ['clinica_ap1'],
  'gestion2': ['gestion1'],
  'investigacion3': ['investigacion2'],
  'cs_sociales4': ['cs_sociales3'],
  'clinica_neonatal2': ['neonatologia3', 'enfermeria_mq'],
  'clinica_partos2': ['obstetricia_pat', 'enfermeria_mq'],
  'clinica_ap2': ['obstetricia_pat', 'gineco_pat', 'saludcom2'],
  'alto_riesgo': ['obstetricia_pat', 'enfermeria_mq'],
  'clinica_mq': ['gineco_pat', 'enfermeria_mq'],
  'modulo2': ['modulo1'],
  'seminario1': ['investigacion3'],
  'internado_neonatologia': ['clinica_neonatal2'],
  'internado_obstetricia': ['clinica_partos2', 'alto_riesgo'],
  'internado_ap': ['clinica_ap2'],
  'internado_gineco': ['clinica_mq'],
  'internado_electivo': [],
  'seminario2': ['seminario1'],
  
  // inmunologia sin prerrequisito
  'inmunologia': []
};

function actualizarDesbloqueos() {
  const aprobados = Array.from(document.getElementsByClassName('aprobado')).map(r => r.id);
  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;
    const puedeDesbloquear = reqs.every(r => aprobados.includes(r));
    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) elem.classList.remove('bloqueado');
      else elem.classList.add('bloqueado');
    } else {
      // Un ramo aprobado no debe estar bloqueado
      elem.classList.remove('bloqueado');
    }
  }
}

function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;
  ramo.classList.toggle('aprobado');
  actualizarDesbloqueos();
}

window.addEventListener('DOMContentLoaded', () => {
  // Agregar event listeners a todos los ramos
  const todosRamos = document.querySelectorAll('.ramo');
  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', aprobar);
  });
  actualizarDesbloqueos();
});

