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
Les fils seront considérés comme une liste (ou si possible une table de hachage) de Noeuds



Ainsi en garnant l'exemple précédent, on notera la racine de l'arbre de la mainère suivante
