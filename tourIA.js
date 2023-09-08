// On implémente les situations avec un arbre.
// Cependant pour éviter des structures trop volumineuses
// a chaque tour on redéfinira la nouvelle racine 
// comme un fils de la racine actuelle

// Un arbre possède la structure suivante :
// Actuel : array * int * int * int * int  (plateau, score, indice piece bougée, nouveau x, nouveau y)
// Fils : arbre array

const vide = { actuel : [ [], -1, -1, -1, -1 ], fils : [] };
let arbre = vide;
/**
 * @param {arbre} x - Nouvelle racine de l'arbre
 * @param {int} iFils - Nouvelle racine de l'arbre
 */
function nvRacine(x, iFils) {
    const Fils = x.fils[iFils];
    x.fils = Fils.fils;
    x.actuel = Fils.actuel;
}
function collision(data, x, y) {
    for(o=0; o<32; o++) {
        if(data[o].x==x&&data[o].y==y) {
            data[o].capture=true;
        }
    }
}
const valeurs = {'p':1 , 't':3, 'c':5, 'f': 5, 'r': 10, 'k': 10};
function score(data, couleur) {
    var score=0;
    let a=0, b=16;
    if(couleur=='b') {
        a=16;
        b=32;
    }
    for(i=a; i<b; i++) {  // Pour toutes les pièces alliées
        if(!data[i].capture) {
            const x = data[i].x,
                  y = data[i].y,
                  c = data[i].couleur,
                  t = data[i].type;
            const fct=mvtFonc[mouvementsPiece[t]];
            const [mvt, s] = fct(x, y, c);
            score+=s;
        }
        newA=(a+b)*parseInt(16/(a+b)); // donne 16 si a=0, 0 si a=16
        newB=2*b*0.25*(1+3*parseInt(16/b)); // donne 16 si b=32, 32 si b=16

        for(j=newA; j<newB; i++) { // Pour toutes les pièces ennemies
            if(!data[j].capture) {
                const xj = data[j].x,
                      yj = data[j].y,
                      cj = data[j].couleur,
                      tj = data[j].type;
                const fctj=mvtFonc[mouvementsPiece[tj]];
                const [mvtj, sj] = fctj(xj, yj, cj);
                score-=sj;
            }
        }
    }
    return s;
}
/**
 * @param {arbre} noeud
 * @param {string} couleur
 * @param {int} profondeur 
 */
function genere(noeud, couleur, profondeur){
    const data=noeud.actuel[0];
    let a=0, b=16;
    if(couleur=='b') {
        a=16;
        b=32;
    }
    for(i1=a; i1<b; i1++) { 
        // Pour toutes les pièces alliées pouvant bouger
        if(!data[i1].capture) { 
            const t1 = data[i1].type,
                  c1 = data[i1].couleur,
                  x1 = data[i1].x,
                  y1 = data[i1].y;
            const fct1=mvtFonc[mouvementsPiece[t1]];
            const [mvt1, s] = fct1(x1, y1, c1);

            for(j1=0; j1<mvt1.length; j1++) { 
                // Pour chaque mouvement de pièce alliée
                const xi1 = parseInt(mvt[j1][0]),
                      yi1 = parseInt(mvt[j1][1]);
                var dataTmp1 = data;
                collision(dataTmp1, xi1, yi1);
                dataTmp1[i1].x=xi1;
                dataTmp1[i1].y=yi1;
                
                const newA=(a+b)*parseInt(16/(a+b));
                // donne 16 si a=0, 0 si a=16
                const newB=2*b*0.25*(1+3*parseInt(16/b)); 
                // donne 16 si b=32, 32 si b=16

                for(k1=newA; k1<newB; k1++) { 
                    // Pour toutes les pièces ennemies pouvant bouger
                    if(!data[k1].capture) {
                        const tk1 = data[k1].type,
                              ck1 = data[k1].couleur,
                              xk1 = data[k1].x,
                              yk1 = data[k1].y;
                        const fctk1 = mvtFonc[mouvementsPiece[tk1]];
                        const [mvtk1, sk] = fctk1(xk1, yk1, ck1);

                        for(l1=0; l1<mvtk1.length; l1++) { 
                            // Pour chauqe mouvement de pièce ennemie
                            var dataTmpK1 = dataTmp1;
                            collision(dataTmpK1, parseInt(mvtk1[l1][0]), parseInt(mvtk1[l1][1]));
                            dataTmpK1[k1].x=parseInt(mvtk[l1][0]);
                            dataTmpK1[k1].y=parseInt(mvtk[l1][1]);

                            const nvNoeud = { actuel : [dataTmpK1, 0, i1, xi1, yi1], fils : [] };
                            noeud.fils.push(nvNoeud);


                            if(profondeur>1) {
                                for(i2=a; i2<b; i2++) { 
                                    // Pour toutes les pièces alliées pouvant bouger
                                    if(!dataTmpK1[i2].capture) { 
                                        const t2 = dataTmpK1[i2].type,
                                              c2 = dataTmpK1[i2].couleur,
                                              x2 = dataTmpK1[i2].x,
                                              y2 = dataTmpK1[i2].y;
                                        const fct2=mvtFonc[mouvementsPiece[t2]];
                                        const [mvt2, s] = fct2(x2, y2, c2);
                            
                                        for(j2=0; j2<mvt2.length; j2++) { 
                                            // Pour chaque mouvement de pièce alliée
                                            const xi2 = parseInt(mvt[j2][0]),
                                                  yi2 = parseInt(mvt[j2][1]);
                                            var dataTmp2 = dataTmpK1;
                                            collision(dataTmp2, xi2, yi2);
                                            dataTmp2[i2].x=xi2;
                                            dataTmp2[i2].y=yi2;
                                            
                                            for(k2=newA; k2<newB; k2++) { 
                                                // Pour toutes les pièces ennemies pouvant bouger
                                                if(!dataTmp2[k2].capture) {
                                                    const tk2 = data[k2].type,
                                                          ck2 = data[k2].couleur,
                                                          xk2 = data[k2].x,
                                                          yk2 = data[k2].y;
                                                    const fctk2 = mvtFonc[mouvementsPiece[tk2]];
                                                    const [mvtk2, sk] = fctk2(xk2, yk2, ck2);
                            
                                                    for(l2=0; l2<mvtk2.length; l2++) { 
                                                        // Pour chauqe mouvement de pièce ennemie
                                                        var dataTmpK2 = dataTmp2;
                                                        collision(dataTmpK2, parseInt(mvtk2[l2][0]), parseInt(mvtk2[l2][1]));
                                                        dataTmpK2[k2].x=parseInt(mvtk[l2][0]);
                                                        dataTmpK2[k2].y=parseInt(mvtk[l2][1]);
                            
                                                        const nvNoeud2 = { actuel : [dataTmpK2, 0, i2, xi2, yi2], fils : [] };
                                                        nvNoeud.fils.push(nvNoeud2);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            console.log(noeud);
                        }
                    }
                }
            }
        }
    }
}

function inferieur(a, b) {
    return a.actuel[1]-b.actuel[1]<0
}

function triScore(arr, score) {
    const n = arr.length;
    const tempArray = Array(n).fill(0); // Temporary array for merging
  
    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * size) {
        const mid = Math.min(leftStart + size - 1, n - 1);
        const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

        fusion(arr, tempArray, leftStart, mid, rightEnd);
      }
    }
    if (score == -1) {
        arr.reverse();
    }
    return arr;
}
function fusion(arr, tempArray, leftStart, mid, rightEnd) {
    let leftIndex = leftStart;
    let rightIndex = mid + 1;
    let tempIndex = leftStart;
  
    // Merge elements from both halves into tempArray
    while (leftIndex <= mid && rightIndex <= rightEnd) {
      if (inferieur(arr[leftIndex], arr[rightIndex])) {
        tempArray[tempIndex] = arr[leftIndex];
        leftIndex++;
      } else {
        tempArray[tempIndex] = arr[rightIndex];
        rightIndex++;
      }
      tempIndex++;
    }
  
    // Copy the remaining elements from the left half, if any
    while (leftIndex <= mid) {
      tempArray[tempIndex] = arr[leftIndex];
      leftIndex++;
      tempIndex++;
    }
  
    // Copy the remaining elements from the right half, if any
    while (rightIndex <= rightEnd) {
      tempArray[tempIndex] = arr[rightIndex];
      rightIndex++;
      tempIndex++;
    }
  
    // Copy the sorted elements from tempArray back to arr
    for (let i = leftStart; i <= rightEnd; i++) {
      arr[i] = tempArray[i];
    }
}


function tour(data) {
    var tab = localStorage.getItem('data');
    if(tab==null) { // lors du premier tour
                    // création de 2 générations 
                    // pour toujours avoir 1 tour d'avance
        tab = data; 
        arbre.actuel = [tab, 0, -1, -1, -1];
        arbre.fils = [];
        genere(arbre, 'n', 2);
    }
    else { 
        // lors des autres tours
        for(i=0; i<arbre.fils.length; i++) {
            genere(tab.fils[i], 'n', 1);
        }
    }
    var min_fils = [];
    for(i=0; i<arbre.fils.length; i++) {
        let min = vide;
        for(j=0; j<arbre.fils[i].length; j++) {
            if( inferieur(arbre.fils[i][j], min) ) {
                min=arbre.fils[i][j];
            }
        }
        min_fils.push(min);
        triScore(min_fils, 1);
    }
    return min_fils;
}
