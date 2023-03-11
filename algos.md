# Idées d'algorithmes pour un mouvement de pièce

## Idée 1

L'algorithme examine pour toutes ses pièces 
- leurs mouvements possibles
- les possibles mouvements les menacant
A partir ce cela, on détermine une liste de mouvements dont celui joué est celui jugé le plus important
L'importance est déterminée par la nature de la pièce (reine, fou, pion...)

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

On crée une structure (probablement arborescente) de données associant toutes les situation possibles à une valeur numérique pour que l'algorithme puisse l'exploiter pour jouer.
On la crée indépendemment pour éviter de la recréer à chaque tour.

> Algorithme naturel
```
tabl_coups (plateau) :
  Si mat : 
    on associe au plateau la constante de victoire / défaite
  sinon :
    on sélectionne un couple de pièces blanche et noire pouvant bouger
      on sélectionne une case
        tabl_coups (plateau)
      on déselectionne la case
    on déselectionne le couple de pièces choisies
```
> Algorithme plus détaillé
```    
// On crée au préalable une structure stockant les différentes situations et leur constante associée
tabl_coups (père_plateau) : 
   Si le roi est en échec: 
      Si le roi ne peut pas bouger ou être protégé : 
          ajoute à la structure le plateau associé à la constante de victoire/défaite selon la couleur de l'algo
   Sinon :
      on associe à père_plateau sa constante associée
      Si le roi est en échec :
          pièces <- [*pièces alliées pouvant annuler l'état d'échec et pièces ennenies pouvant bouger*]
          couples <- [*tous les couples possibles entre pièces noires et blanches*]
      Sinon :
          pièces <- [*pièces pouvant bouger*]
          couples <- [*tous les couples possibles entre pièces noires et blanches*]
      Pour tous les couples faire :
          mouvements <- [*tous les mouvements possibles des pièces du couple*]
          Pour tous les mouvements faire :
              fils_plateau <- père_plateau avec les nouveaux mouvements // il s'agit donc d'un des nombreux fils
              tabl_coups (fils_plateau)
```
Ainsi on élaborera aussi des algoritmes permettant de déterminer les pièces pouvant bouger et les mouvements possbles dans le cas échéant

Par conséquant, il suffira à chaque coup de regarder les fils associés et répeter cela jusqu'à avoir la victoire la plus proche, ou le score le plus élevé, ou un match nul selon la situation...
