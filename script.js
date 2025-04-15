// Lista de dados mockados (simulação de dados reais)
const usuarios = [
  { nome: 'Ana Clara', email: 'ana@email.com' },
  { nome: 'Bruno Souza', email: 'bruno@email.com' },
  { nome: 'Carlos Henrique', email: 'carlos@email.com' },
  { nome: 'Daniela Silva', email: 'daniela@email.com' },
  { nome: 'Eduardo Costa', email: 'eduardo@email.com' },
  { nome: 'Aline Silva', email: 'aline@email.com'}
];

// Pegamos a referência do campo de busca e da UL
const campoBusca = document.getElementById('search');
const lista = document.getElementById('lista');

// Função que renderiza a lista na tela
function renderizarLista(filtrados) {
  // Limpamos a lista antes de adicionar os itens
  lista.innerHTML = '';

  // Se nenhum resultado, mostramos uma mensagem
  if (filtrados.length === 0) {
    const item = document.createElement('li');
    item.classList.add('no-result');
    item.textContent = 'Nenhum resultado encontrado';
    lista.appendChild(item);
    return;
  }

  // Para cada usuário, criamos um <li> com nome e email
  filtrados.forEach(usuario => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${usuario.nome}</strong><br><small>${usuario.email}</small>`;
    lista.appendChild(item);
  });
}

// Função que filtra os usuários conforme o que foi digitado
function filtrarUsuarios() {
  const termo = campoBusca.value.toLowerCase().trim();

  const filtrados = usuarios.filter(usuario => {
    const partes = usuario.nome.toLowerCase().split(' '); // Divide nome e sobrenome

    const nome = partes[0];         // Primeiro nome
    const sobrenome = partes[1] || ''; // Segundo nome (caso exista)

    // Verifica se começa com o termo OU se o sobrenome começa com o termo
    return nome.startsWith(termo) || sobrenome.startsWith(termo);
  });

  renderizarLista(filtrados);
}

// Ao digitar no campo, chamamos a função de filtro
campoBusca.addEventListener('input', filtrarUsuarios);

// Ao carregar a página, mostramos a lista completa
renderizarLista(usuarios);