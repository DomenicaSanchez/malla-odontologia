const requisitos = {
  anatomia: ['biologia'],
  idp1: ['fundamentos1'],
  histologia: ['biologia'],
  bioquimica: ['quimica', 'biologia'],
  fisiologia: ['biologia'],
  embrio: ['biologia'],
  cs_sociales2: ['cs_sociales1'],
  investigacion1: ['mate']
};

let aprobados = [];

function aprobar(id) {
  if (!aprobados.includes(id)) {
    aprobados.push(id);
    const ramo = document.getElementById(id);
    ramo.style.background = '#2e7d32';
    ramo.style.opacity = '1';
    ramo.classList.add('aprobado'); // 👈 esto aplica el tachado

    for (let sig in requisitos) {
      const reqs = requisitos[sig];
      const cumplido = reqs.every(r => aprobados.includes(r));
      if (cumplido) {
        const siguiente = document.getElementById(sig);
        siguiente.classList.remove('bloqueado');
        siguiente.onclick = () => aprobar(sig);
      }
    }
  }
}

      }
    }
  }
}
