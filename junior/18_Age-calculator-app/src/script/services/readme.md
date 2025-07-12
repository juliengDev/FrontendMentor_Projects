But : centraliser toutes les requêtes fetch, éviter de les écrire dans ton UI.

🔧 Contenu :
	•	Un fichier par “ressource” de l’API (ex: user.ts, posts.ts)
	•	Typage des réponses
	•	Gestion des erreurs

✅ Bon usage :
	•	Tu sépares la logique réseau du reste de l’app
	•	Tu peux mocker facilement l’API pour les tests plus tard
	•	Plus facile de migrer vers React / Next.js ensuite


  exemple : 

// api/user.ts
import { User } from '../types';

export async function getUser(userId: number): Promise<User> {
  const res = await fetch(`https://api.example.com/users/${userId}`);
  if (!res.ok) throw new Error('Utilisateur introuvable');
  return res.json();
}