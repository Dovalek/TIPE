// On implémente les situations avec un arbre.
// Cependant pour éviter des structures trop volumineuses
// a chaque tour on redéfinira la nouvelle racine 
// comme un fils de la racine actuelle

// Un arbre possède la structure suivante :
// Actuel : array * int * int * int * int  (plateau, score, indice piece bougée, nouveau x, nouveau y)
// Fils : arbre array
/**
 * @param {arbre} x - Nouvelle racine de l'arbre
 */
const vide = { actuel : [ [], -1, -1, -1, -1 ], fils : [] };
let arbre = vide;
function nvRacine(x) {
    this.fils = x.fils;
    this.actuel = x.actuel;
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
 * @param {int} limite 
 */
function genere(noeud, couleur, profondeur, limite){
    console.log(noeud);
    if(profondeur==limite) {
        return;
    }
    const data=noeud.actuel[0];
    let a=0, b=16;
    if(couleur=='b') {
        a=16;
        b=32;
    }
    for(i=a; i<b; i++) { 
        // Pour toutes les pièces alliées pouvant bouger
        if(!data[i].capture) { 
            var score=0;
            const t = data[i].type,
                  c = data[i].couleur,
                  x = data[i].x,
                  y = data[i].y;
            const fct=mvtFonc[mouvementsPiece[t]];
            const [mvt, s] = fct(x, y, c);

            for(j=0; j<mvt.length; j++) { 
                // Pour chaque mouvement de pièce alliée
                const xi = parseInt(mvt[j][0]),
                      yi = parseInt(mvt[j][1]);
                var dataTmp = data;
                collision(dataTmp, xi, yi);
                dataTmp[i].x=xi;
                dataTmp[i].y=yi;
                
                const newA=(a+b)*parseInt(16/(a+b));
                // donne 16 si a=0, 0 si a=16
                const newB=2*b*0.25*(1+3*parseInt(16/b)); 
                // donne 16 si b=32, 32 si b=16

                for(k=newA; k<newB; k++) { 
                    // Pour toutes les pièces ennemies pouvant bouger
                    if(!data[k].capture) {
                        const tk = data[k].type,
                              ck = data[k].couleur,
                              xk = data[k].x,
                              yk = data[k].y;
                        const fctk = mvtFonc[mouvementsPiece[tk]];
                        const [mvtk, sk] = fctk(xk, yk, ck);

                        for(l=0; l<mvtk.length; l++) { 
                            // Pour chauqe mouvement de pièce ennemie
                            var dataTmpK = dataTmp;
                            collision(dataTmpK, parseInt(mvtk[l][0]), parseInt(mvtk[l][1]));
                            dataTmpK[k].x=parseInt(mvtk[l][0]);
                            dataTmpK[k].y=parseInt(mvtk[l][1]);

                            const nvNoeud = { actuel : (dataTmpK, sk, i, xi, yi), fils : [] };
                            noeud.fils.push(nvNoeud);
                            genere(nvNoeud, couleur, profondeur+1, limite);
                            return;
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
        console.log('arbre :', arbre);
        genere(arbre, 'n', 0, 2);

    }
    else { 
        // lors des autres tours
        for(i=0; i<arbre.fils.length; i++) {
            genere(tab.fils[i], 'n', 1, 2);
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
