const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Dados em memória (será perdido ao reiniciar)
let clientes = [
    { _id: 1, name: 'João Silva', email: 'joao@example.com' },
    { _id: 2, name: 'Maria Santos', email: 'maria@example.com' }
];
let nextId = 3;

// Servir arquivos estáticos
app.use(express.static('.'));

// GET - Listar todos os clientes
app.get('/api/clientes', (req, res) => {
    res.json(clientes);
});

// POST - Adicionar novo cliente
app.post('/api/clientes', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    const novoCliente = {
        _id: nextId++,
        name,
        email
    };

    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

// DELETE - Remover cliente
app.delete('/api/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c._id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clienteRemovido = clientes.splice(index, 1);
    res.json(clienteRemovido[0]);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 Abra http://localhost:${PORT} no navegador`);
});
