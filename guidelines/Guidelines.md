**EDH Project Guidelines**

## Projet : Système de Gestion des Pannes et Interventions

**Version 1.0** - Fonctionnalités internes (Admin, Agent, Technicien)  
**Espace client réservé pour Version 2**

---

## Règles Générales

### Organisation du Code

- **Un composant par fichier** - Garder les fichiers petits et focalisés
- **Nommage cohérent** :
  - Composants React : `PascalCase` (ex: `GestionPannes.tsx`)
  - Hooks : `camelCase` avec prefix `use` (ex: `useNotification.ts`)
  - Services : `camelCase` (ex: `notificationService.ts`)
  - Types/Interfaces : `PascalCase` avec suffix (ex: `PanneType`, `UserInterface`)

### Imports

- **Toujours utiliser les aliases** configurés dans `tsconfig.json` :

  ```tsx
  // Correct
  import { Button } from "@/components/ui/button";
  import { useNotification } from "@/hooks/useNotification";

  // Incorrect
  import { Button } from "../../../components/ui/button";
  ```

### Structure des Fichiers

```bash
src/
├── app/
│   ├── components/     # Composants React
│   │   └── ui/        # Composants shadcn/ui
│   ├── contexts/      # Contexts React
│   ├── hooks/         # Hooks personnalisés
│   ├── pages/         # Pages de l'application
│   ├── services/      # Services API
│   └── routes.tsx     # Configuration routing
├── imports/           # Images et assets
└── styles/            # CSS global
```

---

## Design System EDH

### Palette de Couleurs

```css
:root {
  /* Couleurs principales */
  --color-primary: #0066cc; /* Bleu électricité */
  --color-primary-light: #3b82f6;
  --color-primary-dark: #004c99;

  /* Alertes et statuts */
  --color-danger: #ef4444; /* Rouge - Urgent */
  --color-warning: #f59e0b; /* Jaune - En cours */
  --color-success: #22c55e; /* Vert - Résolu */
  --color-info: #3b82f6; /* Bleu - Info */

  /* Neutres */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}
```

### Typography

- **Font principale** : Inter ou système sans-serif
- **Tailles** :
  - Titres de page : `text-2xl font-bold`
  - Sous-titres : `text-lg font-semibold`
  - Corps : `text-sm` ou `text-base`
  - Labels : `text-xs font-medium uppercase`

### Composants UI

Utiliser exclusivement les composants de `src/app/components/ui/` :

- **Layout** : Card, Tabs, Sheet, Dialog, Collapsible
- **Formulaires** : Input, Select, Checkbox, Textarea, Label
- **Feedback** : Toast, Alert, Badge, Progress
- **Navigation** : Button, Dropdown Menu, Breadcrumb
- **Data** : Table, Pagination

### Responsive Design

- **Mobile-first** : Basculer vers `md:` et `lg:` pour desktop
- **Breakpoints** :
  - `sm` : 640px
  - `md` : 768px
  - `lg` : 1024px
  - `xl` : 1280px

---

## Collaboration

### Branches Git

- **main** : Branche de production (PR obligatoire)
- **marithza** : Gestion pannes/interventions
- **christopher** : Notifications temps réel
- **enriquez** : Clients et factures
- **narcisse** : Dashboards
- **structure-initiale** : Config et architecture

### Commits

Format : `[nom] Description concise`

```bash
# Exemples
git commit -m "[marithza] Ajout formulaire création panne"
git commit -m "[christopher] Fix reconnexion WebSocket"
git commit -m "[enriquez] CRUD clients complet"
```

### RÈGLE IMPORTANTE - Espace Client

**NE PAS développer dans `src/app/pages/client/` pour l'instant**

Cette fonctionnalité est réservée pour la **Version 2** du projet.

Priorités Version 1 :

1. Dashboard Admin/Agent
2. Gestion pannes et interventions
3. Système notifications
4. Gestion clients (admin uniquement)
5. Facturation

---

## Bonnes Pratiques React

### Composants Fonctionnels

```tsx
// Correct - TypeScript avec props typées
interface PanneCardProps {
  panne: Panne;
  onUpdate: (id: string) => void;
}

export function PanneCard({ panne, onUpdate }: PanneCardProps) {
  // ...
}
```

### Hooks

```tsx
// Correct - Hook personnalisé
export function usePannes() {
  const [pannes, setPannes] = useState<Panne[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPannes();
  }, []);

  return { pannes, loading };
}

// Utilisation dans composant
export function GestionPannes() {
  const { pannes, loading } = usePannes();
  // ...
}
```

### Gestion d'État

- **Context** pour état global (auth, notifications)
- **useState** pour état local
- **Jamais de prop drilling** profond (> 2 niveaux)

### Performance

- Utiliser `useMemo` pour calculs coûteux
- Utiliser `useCallback` pour fonctions passées aux enfants
- Lazy loading des pages avec `React.lazy()`
- Images optimisées (format WebP, lazy loading)

---

## Testing et Qualité

### Avant de commit

1. **Vérifier TypeScript** : `npm run type-check`
2. **Linter** : `npm run lint` (si configuré)
3. **Tests manuels** :
   - Responsive (mobile + desktop)
   - Navigation entre pages
   - Formulaires (validation, erreurs)

### Code Review Checklist

- [ ] Pas d'erreurs TypeScript
- [ ] Composants réutilisables quand pertinent
- [ ] Pas de `console.log` en production
- [ ] Gestion des erreurs (try/catch, états d'erreur)
- [ ] Accessibilité (alt sur images, labels sur inputs)

---

## Ressources

### Documentation Projet

- [COLLABORATORS.md](../COLLABORATORS.md) - Tâches par collaborateur
- [NOTIFICATIONS_GUIDE.md](../NOTIFICATIONS_GUIDE.md) - Système notifications
- [SERVER_SETUP.md](../SERVER_SETUP.md) - Backend WebSocket

### Technologies

- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Bonne contribution au projet EDH ! 🚀**
