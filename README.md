# TIPE

## Objectifs
> Créer une variante unique des échecs pour ce TIPE

> Implémenter, en ligne si possible, cette variante des échecs

> Trouver, s'il en existe, des relations mathématiques (probabilités, combinatoires...) dans l'optique de mieux comprendre les stratégies propres à cette variante

> Développer un alogrithme ou une IA utilisant ces propriétés pour jouer contre un autre joueur
   
>Tenter, si possible, d'occtroyer à ce joueur non humain différentes stratégies que le joueur adversaire (humain) pourra choisir (style défensif, modéré, aggressif)

## Outils
> Usage de divers moyens de développement informatique, dépendant de l'implémentation (html/css si le jeu est en ligne, javascript, python...)

## Principe
> Contrairement à la version traditionnelle, les deux joueurs jouent ici en même temps durant un tour

- Exemple : IMAGE A METTRE

> Pour des raisons évidentes, un tour doit avoir une durée limitée pour garantir une fin de partie, cette durée sera fixée si possible durant l'implémentation

- Remarque : cette condition est nécessaire mais pas suffisante

> Il sera aussi ajouté le choix de ne jouer aucune pièce durant un tour, pour contrebalancer la simultanéité des coups des deux joueurs

- Remarque : cela ajoute une autre condition nécessaire à la terminaison, les joueurs ne peuvent pas ne faire aucun coup à chaque tour, ainsi il y aura un nombre limité de tours passés consécutifs fixé pour l'implémentation

- Remarque : Durant toute la phase de recherche de propriétés, ces deux conditions ci dessus seront supposées remplies

> Pour simplifier, les éventuelles collisions entre pièces ennemies (soit lorsque deux pièces de déplacent vers la même case) lors d'un même tour résultera en un retour aux cases initiales
