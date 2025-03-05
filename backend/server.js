const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Test direct de la connexion MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestion_etablissement')
  .then(() => console.log('MongoDB Connected directly'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const etudiantsRoutes = require('./routes/etudiantsRoutes');

// Routes API
app.use('/api/etudiants', etudiantsRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement' });
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ 
    message: 'Erreur serveur', 
    error: err.message 
  });
});

// Configuration du port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});