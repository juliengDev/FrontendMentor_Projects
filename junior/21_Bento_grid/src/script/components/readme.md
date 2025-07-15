But : organiser tes blocs d’interface (UI) en éléments autonomes et réutilisables.

🔧 Contenu :
	•	Fichiers HTML/TypeScript/CSS décrivant un composant unique (ex: Card.ts, Button.ts, Header.ts)
	•	Responsabilité unique : chaque fichier représente un morceau d’UI, comme une “brique Lego”.

✅ Bon usage :
	•	Tu factorises ton code (ex: un bouton utilisé plusieurs fois)
	•	Tu sépares visuellement la logique de chaque composant

🧠 Astuce : même sans React, tu peux créer des fonctions TypeScript qui retournent du HTML (HTMLElement) ou des templates injectables dans le DOM.


exemple :

// components/Button.ts
export function createButton(label: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.className = 'btn btn-primary';
  return btn;
}