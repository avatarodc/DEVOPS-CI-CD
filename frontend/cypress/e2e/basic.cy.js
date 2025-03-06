describe('Application de Gestion Établissement', () => {
    it('devrait charger la page d\'accueil', () => {
      cy.visit('/')
      cy.contains('h1', 'Gestion Établissement').should('be.visible')
    })
  
    it('devrait naviguer vers la page étudiants', () => {
      cy.visit('/')
      cy.contains('Étudiants').click()
      cy.url().should('include', '/etudiants')
      cy.contains('Liste des Étudiants').should('be.visible')
    })
  })