let usuarios = [];

// Pegamos a referência dos elementos do HTML
const campoBusca = document.getElementById('search');
const lista = document.getElementById('lista');
const contador = document.getElementById('resultado-contagem');

// Função que renderiza a lista na tela
function renderizarLista(filtrados) {
  lista.innerHTML = '';

  // Atualiza a contagem de resultados
  contador.textContent = `${filtrados.length} resultado${filtrados.length === 1 ? '' : 's'} encontrado${filtrados.length === 1 ? '' : 's'}`;

  if (filtrados.length === 0) {
    const item = document.createElement('li');
    item.classList.add('no-result');
    item.textContent = 'Nenhum resultado encontrado';
    lista.appendChild(item);
    return;
  }

  // Cria os elementos da lista
  filtrados.forEach(usuario => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${usuario.nome}</strong><br>
      <small>${usuario.email}</small><br>
      <small>${usuario.telefone}</small>
    `;
    lista.appendChild(item);
  });
}

// Função que filtra os usuários conforme o termo digitado
function filtrarUsuarios() {
  const termo = campoBusca.value.toLowerCase().trim();

  const filtrados = usuarios.filter(usuario => {
    const nome = usuario.nome.toLowerCase();
    const email = usuario.email.toLowerCase();
    const telefone = usuario.telefone.toLowerCase();

    return (
      nome.includes(termo) ||
      email.includes(termo) ||
      telefone.includes(termo)
    );
  });

  // Ordena os resultados antes de renderizar
  filtrados.sort((a, b) => a.nome.localeCompare(b.nome));

  renderizarLista(filtrados);
}

// Evento: ao digitar, filtra usuários
campoBusca.addEventListener('input', filtrarUsuarios);

// Carrega os dados da API ao iniciar
fetch('https://randomuser.me/api/?results=20&nat=br')
  .then(res => res.json())
  .then(data => {
    usuarios = data.results.map(user => ({
      nome: `${user.name.first} ${user.name.last}`,
      email: user.email,
      telefone: user.phone
    }));

    // Ordena inicialmente por nome A-Z
    usuarios.sort((a, b) => a.nome.localeCompare(b.nome));

    renderizarLista(usuarios);
  });
