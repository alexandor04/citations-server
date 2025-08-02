const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// POST /ajouter-citation
app.post('/ajouter-citation', (req, res) => {
    const { livre, citation, chapitre, page, commentaire } = req.body;

    if (!citation || !livre) {
        return res.status(400).send('Champs requis manquants.');
    }

    const ligne = `
Livre : ${livre}
Citation : ${citation}
Chapitre : ${chapitre || 'N/A'}
Page : ${page || 'N/A'}
Commentaire : ${commentaire || 'Aucun'}
---
`;

    const filePath = path.join(__dirname, 'citations.txt');
    fs.appendFile(filePath, ligne, (err) => {
        if (err) {
            console.error('Erreur d\'écriture:', err);
            return res.status(500).send('Erreur interne.');
        }
        res.status(200).send('Citation bien enregistrée.');
    });
});

// GET pour tester si le serveur tourne
app.get('/', (req, res) => {
    res.send('Serveur de citations opérationnel.');
});

// Démarrage
app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});
