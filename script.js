// ============================================
// Versao 2: dados persistidos no localStorage
// ============================================

// Nome da "chave" onde os dados ficam salvos no navegador
const CHAVE = 'alunos';

// Carrega o que ja foi salvo (ou comeca vazio)
let alunos = carregarAlunos();

const formulario = document.getElementById('form-aluno');
const corpoTabela = document.getElementById('corpo-tabela');
const aviso = document.getElementById('sem-registros');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const aluno = {
    nome: document.getElementById('campo-nome').value,
    curso: document.getElementById('campo-curso').value,
    ra: document.getElementById('campo-ra').value
  };

  alunos.push(aluno);
  salvarAlunos();      // grava no localStorage
  formulario.reset();
  renderizar();
});

function excluirAluno(indice) {
  alunos.splice(indice, 1);
  salvarAlunos();      // grava novamente apos a exclusao
  renderizar();
}

// Converte o array em texto (JSON) e salva no navegador
function salvarAlunos() {
  localStorage.setItem(CHAVE, JSON.stringify(alunos));
}

// Le o texto salvo e converte de volta para array
function carregarAlunos() {
  const dados = localStorage.getItem(CHAVE);

  if (dados === null) {
    return []; // primeira vez: nada salvo ainda
  }

  try {
    return JSON.parse(dados);
  } catch (erro) {
    return []; // dados corrompidos: recomeca do zero
  }
}

function renderizar() {
  corpoTabela.innerHTML = '';

  alunos.forEach((aluno, indice) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.ra}</td>
      <td><button class="excluir" onclick="excluirAluno(${indice})">Excluir</button></td>
    `;

    corpoTabela.appendChild(linha);
  });

  aviso.style.display = alunos.length === 0 ? 'block' : 'none';
}

renderizar();