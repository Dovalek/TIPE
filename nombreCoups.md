# Tentatives d'estimation de l'ordre du nombre de coups possibles

## Cas du tour initial

Au tour initial on a :
 - 8 pions pouvant faire 2 mouvements différents chacuns
 - 2 cavaliers pouvant faire 2 mouvements différents chacuns
> Les autres pièces sont bloquées, d'où leur absence

Ainsi on a pour un camp 20 mouvements possibles au premier tour.

Dans notre variante, les mouvements noirs et blancs étant simultanés, on a alors 400 ouvertures différentes possibles, et cela dés le premier tour!

## Cas d'un tour quelconque

Lors d'un tour, on a

$B = (b_1, ..., b_{16})$ les pièces blanches pouvant faire respectivement $M_B = (M_{b_1}, ..., M_{b_{16}})$ mouvements différents

$N = (n_1, ..., n_{16})$ les pièces noires pouvant faire respectivement $M_N = (M_{n_1}, ..., M_{n_{16}})$ mouvements différents

> Si une pièce $p\in N \cup B$ ne peut pas bouger, alors $M_p = 0$

On pose alors

$C_B = \sum_{m\in M_B}{m}$ le nombre de mouvements blancs possibles

$C_N = \sum_{m\in M_N}{m}$ le nombre de mouvements noirs possibles

On a donc

$\mathcal{P} = C_B C_N$ le nombre des différentes situations lors du prochain tour
