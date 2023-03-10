# Idées de structures pour l'implémentation

## Backtracking

On pourra implémenter la totalité des coups possibles par un arbre de couples plateau * constante associée

Les plateaux seront sous la forme de tableaux ou de matrices, où l'on aura la nomenclature suivante
| Code | Signification |
|----|------------|
|'v'|Case vide|
|'p'|Pion|
|'t'|Tour|
|'c'|Cavalier|
|'f'|Fou|
|'r'|Reine|
|'k'|Roi|

A ces pièces on associera la couleur.
Ainsi une case sur laquelle est situé un fou noir sera de la forme
```
('f', 'n')
```
> Remarque : pour les cases vides, on mettra par convention ' ' en second caractère

Ainsi par exemple, si est choisie une implémentation en OCaml avec une matrice, on aura pour le plateau de début de partie
```
p0 ->
[|
[|('t', 'n'); ('c', 'n'); ('f', 'n'); ('r', 'n'); ('k', 'n'); ('f', 'n'); ('c', 'n'); ('t', 'n')|];
.....
|]
```
A ce plateau sera associé une constante. Ce couple sera ce qui sera ajouté à l'arbre.
Un Noeud sera constitué du couple mentionné ci dessus et des fils.
Les fils seront considérés comme une liste de Noeuds

Ainsi en gardant l'exemple précédent, on aura
```
type arb = Vide | Noeud of ( (char*char Array)*int) * arb list;;
let exemple = Noeud((p0, 0), [Vide]);;
```
> On associe par convention 0 au plateau p0

## Plateau

Le plateau sera implémenté à l'aide d'une base de données qui aura l'une des 2 spécifications suivantes :
  - Soit la base gardera les informations de toutes les cases (coordonnées, pièces éventuelle)
  
  - Soit la base gardera les informations de toutes les pièces (type, position, capturé ou non)

On se basera sur les données enregistrées pour rafraichir le plateau à chauqe tour.
