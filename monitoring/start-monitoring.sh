#!/bin/bash

cd $(dirname "$0")

echo "Démarrage de la stack de monitoring..."
docker-compose up -d

echo ""
echo "Stack de monitoring démarrée avec succès !"
echo "Accès aux interfaces:"
echo "- Prometheus: http://localhost:9090"
echo "- Grafana: http://localhost:3001 (admin/admin)"
echo "- Loki: http://localhost:3100"

echo ""
echo "Pour visualiser les métriques, accédez à Grafana et connectez-vous avec admin/admin"
echo "Des dashboards préconfigurés sont disponibles."
