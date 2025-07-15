But : stocker les fonctions génériques, indépendantes de l’UI ou des appels API.

🔧 Contenu :
	•	Formatage de dates (formatDate.ts)
	•	Fonctions mathématiques ou de validation (isEmailValid.ts)
	•	Fonctions de manipulation de chaînes, tableaux, objets…

✅ Bon usage :
	•	Ces fonctions peuvent être testées facilement
	•	Elles sont pures (pas d’effet de bord) et réutilisables dans plusieurs parties du projet


  exemple : 

  // utils/formatCurrency.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}