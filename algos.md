# Idées d'algorithmes pour un mouvement de pièce

## Idée 1

L'algorithme examine pour toutes ses pièces 
- leurs mouvements possibles
- les possibles mouvements les menacant
A partir ce cela, on détermine une liste de mouvements dont celui joué est celui jugé le plus important
L'importance est déterminée par la nature de la pièce (reine, fou, pion...)

Inconvéniants : Très long...

## Idée 2

Pour toutes les pièces n'étant pas un pion, on a la liste de priorités suivante :
  - Roi
  - Reine
  - Auters pièces ayant un certain nombre de pièces ennemies dans un certain rayon (cette condition peut changer au fil de l'élaboration du TIPE)

Ainsi on divise par 2 (grossièrement) le nombre d'opérations

## Concernant l'analyse des possibles mouvements adversaires

On trouver différentes approches
- On examine dans l'ordre ci-dessus (en excluant le roi) les possibles mouvements ennemis.
