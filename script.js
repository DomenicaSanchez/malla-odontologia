// Mapeo de prerrequisitos: cada ramo apunta a los ID que debe tener aprobados
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
  'enf

      else elem.classList.add('bloqueado');
    }
  }
}
