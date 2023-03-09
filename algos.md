# Idées d'algorithmes pour un mouvement de pièce

## Idée 1

L'algorithme examine pour toutes ses pièces 
- leurs mouvements possibles
- les possibles mouvements les menacant
A partir ce cela, on détermine une liste de mouvements dont celui joué est celui jugé le plus important
L'importance est déterminée par la nature de la pièce (reine, fou, pion...)

Inconvéniant : Très long...

## Idée 2

Pour toutes les pièces n'étant pas un pion, on a la liste de priorités suivante :
  - Roi
  - Reine
  - Auters pièces ayant un certain nombre de pièces ennemies dans un certain rayon (cette condition peut changer au fil de l'élaboration du TIPE)

Ainsi on divise par 2 (grossièrement) le nombre d'opérations

## Concernant l'importance des mouvements

- On pourra ajouter une constante liée à chauqe pièce, dans les calculs, pour signifier leur importance

## Concernant l'analyse des possibles mouvements adversaires

- On examine dans l'ordre ci-dessus (en excluant le roi) les possibles mouvements ennemis puis on examine les pions à côté des pièces.

## Inconvéniants

Ces algorithmes donnent une réponse court terme à une situatation.
Une solution à cela serait un algorithme backtracking.

## Backtracking 

On crée une structure de données contenant toutes les situation possibles pour que l'algorithme puisse l'exploiter pour jouer.
On la crée indépendemment pour éviter de la recréer à chaque tour.

```
tabl_coups (plateau) :
  Si mat : 
    on associe au plateau la constante de victoire / défaite
  sinon :
    on sélectionne une pièce blanche et noire
      on sélectionne une case
        tabl_coups (plateau)
      on déselectionne la case
    on déselectionne le couple de pièces choisies
```
