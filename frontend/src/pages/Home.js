import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ icon, title, description, to }) => (
  <div className="col-12 col-md-4 mb-4">
    <div className="card h-100 border-0 shadow-lg transform-hover">
      <div className="card-body text-center p-4">
        <div className="mb-3 d-flex justify-content-center">
          <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
            <i className={`${icon} text-primary fs-2`}></i>
          </div>
        </div>
        <h5 className="card-title mb-3 fw-bold">{title}</h5>
        <p className="card-text text-muted mb-4">{description}</p>
        <Link 
          to={to} 
          className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
        >
          Accéder
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  const modules = [
    {
      icon: 'bi bi-building',
      title: 'Gestion des Classes',
      description: 'Organisez et suivez vos différentes classes',
      to: '/classes'
    },
    {
      icon: 'bi bi-people',
      title: 'Gestion des Étudiants',
      description: 'Gérez les informations de tous les étudiants',
      to: '/etudiants'
    },
    {
      icon: 'bi bi-book',
      title: 'Gestion des Cours',
      description: 'Planifiez et suivez vos cours',
      to: '/cours'
    },
    {
      icon: 'bi bi-person-badge',
      title: 'Gestion des Professeurs',
      description: 'Suivez les informations du personnel enseignant',
      to: '/professeurs'
    },
    {
      icon: 'bi bi-clock',
      title: 'Emplois du Temps',
      description: 'Créez et gérez les emplois du temps',
      to: '/emploi-du-temps'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Statistiques',
      description: 'Visualisez les statistiques de l\'établissement',
      to: '/statistiques'
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3 text-dark">
          Tableau de Bord Académique
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
          Une solution complète pour la gestion de votre établissement scolaire. 
          Simplifiez l'administration et améliorez l'efficacité.
        </p>
      </div>

      <div className="row g-4">
        {modules.map((module, index) => (
          <HomeCard 
            key={index} 
            icon={module.icon}
            title={module.title}
            description={module.description}
            to={module.to}
          />
        ))}
      </div>

      <div className="text-center mt-5">
        <div className="bg-primary bg-opacity-10 p-4 d-inline-block rounded-3">
          <p className="mb-0 text-primary fw-semibold">
            🚀 Gérez votre établissement avec efficacité et simplicité
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;