// On implémente les situations avec un arbre.
// Cependant pour éviter des structures trop volumineuses
// a chaque tour on redéfinira la nouvelle racine 
// comme un fils de la racine actuelle

// Un arbre possède la structure suivante :
// Actuel : array * int
// Fils : arbre array
let arbre = new Object();
/**
 * @param {arbre} x - Nouvelle racine de l'arbre
 */
function nvRacine(x) {
    this.fils = x.fils;
    this.actuel = x.actuel;
}
function collision(data, x, y) {
    for(i=0; i<32; i++) {
        if(data[i].x==x&&data[i].y==y) {
            data[i].capture=true;
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
        a=(a+b)*parseInt(16/(a+b)); // donne 16 si a=0, 0 si a=16
        b=2*b*0.25*(1+3*parseInt(16/b)); // donne 16 si b=32, 32 si b=16

        for(j=a; j<b; i++) { // Pour toutes les pièces ennemies
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
    if(profondeur==limite) {
        return;
    }
    const data=noeud[0];
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
                var dataTmp = data;
                collision(dataTmp, parseInt(mvt[j][0]), parseInt(mvt[j][1]) );
                dataTmp[i].x=parseInt(mvt[j][0]);
                dataTmp[i].y=parseInt(mvt[j][1]);
                
                a=(a+b)*parseInt(16/(a+b));
                // donne 16 si a=0, 0 si a=16
                b=2*b*0.25*(1+3*parseInt(16/b)); 
                // donne 16 si b=32, 32 si b=16
                
                for(k=a; k<b; k++) { 
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

                            const nvNoeud = arbre ( actuel = (dataTmpK, score(dataTmpK, couleur)), fils = [] );
                            noeud.fils.push(nvNoeud);
                            genere(nvNoeud, couleur, profondeur+1, limite)
                            return;
                        }
                    }
                }
            }
        }
    }
}

function triParScore(tab) {

}

function tour() {
    var data = localStorage.getItem('data');
    data=JSON.parse(data);
    if(arbre.actuel==null) { // lors du premier tour
                             // création de 2 générations 
                             // pour toujours avoir 1 tour d'avance
        arbre.actuel = data, 0;
        arbre.fils = [];
        genere(data, 'n', 0, 2);
    }
    else { 
        // lors des autres tours
        for(i=0; i<arbre.fils.length; i++) {
            genere(data.fils[i], 'n', 1, 2);
        }
    }
    var meilleures_dispos = [];
    for(i=0; i<arbre.fils.length; i++) {
        for(j=0; j<arbre.fils[i].length; j++) {
            
        }
    }
}
