// 1. Cadastrar cliente: O usuário pode inserir um nome e um email para salvar na API.
// 2. Listar clientes: Todos os clientes cadastrados são exibidos na tela.
// 3. Excluir cliente: Criar um botão para remover um cliente da API.

// Cadastro de clientes
const apiUrl = 'http://localhost:3000/api/clientes';
const clientList = document.getElementById('client-list');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addButton = document.getElementById('add-client');

// Função para listar clientes
function listClients() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(clients => {
            clientList.innerHTML = '';
            clients.forEach(client => {
                const li = document.createElement('li');
                li.textContent = `${client.name} (${client.email}) `;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.onclick = () => deleteClient(client._id);
                li.appendChild(deleteButton);
                clientList.appendChild(li);
            });
        });
}

// Função para adicionar cliente
function addClient() {
    const name = nameInput.value;
    const email = emailInput.value;
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(client => {
            listClients();
            nameInput.value = '';
            emailInput.value = '';
        });
}

// Função para excluir cliente
function deleteClient(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        console.log(`Tentando deletar cliente com ID: ${id}`);
        console.log(`URL: ${apiUrl}/${id}`);

        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(`Status da resposta: ${response.status}`);
                console.log(`Response OK: ${response.ok}`);

                // Para DELETE, geralmente não há body na resposta (204) ou é vazio (200)
                if (response.status === 204 || response.status === 200) {
                    // Sucesso
                    return Promise.resolve();
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            })
            .then(() => {
                console.log('Deletado com sucesso. Recarregando lista...');
                listClients();
                alert('Cliente excluído com sucesso!');
            })
            .catch(error => {
                console.error('Erro na exclusão:', error);
                console.error('Stack:', error.stack);
                alert(`Erro ao excluir: ${error.message}\n\nVerifique o console (F12) para mais detalhes.`);
            });
    }
}

// Inicializar
addButton.onclick = addClient;
listClients();