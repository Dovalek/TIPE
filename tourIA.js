// On implémente les situations avec un arbre.
// Cependant pour éviter des structures trop volumineuses
// a chaque tour on redéfinira la nouvelle racine 
// comme un fils de la racine actuelle
let arbre = new Object();
/**
 * @param {arbre} x - Nouvelle racine de l'arbre
 */
function nvRacine(x) {
    this.fils = x.fils;
    this.actuel = x.actuel;
}
function score(tab) {

}
function collision(data, x, y) {
    for(i=0; i<32; i++) {
        if(data[i].x==x&&data[i].y==y) {
            data[i].capture=true;
        }
    }
}
function genere(noeud, couleur, profondeur, limite){
    if(profondeur==limite) { // EDIT
        return;
    }
    const data=noeud[0];
    let a=0, b=16;
    if(couleur=='b') {
        a=16;
        b=32;
    }
    for(i=a; i<b; i++) { // Pour toutes les pièces alliées pouvant bouger
        if(!data[i].capture) { 
            const t = data[i].type,
                  c = data[i].couleur,
                  x = data[i].x,
                  y = data[i].y;
            const fct=mvtFonc[mouvementsPiece[t]];
            const mvt = fct(x, y, c);
            
            for(j=0; j<mvt.length; j++) { // Pour chaque mouvement de pièce alliée
                var score=0;
                var dataTmp = data;
                collision(dataTmp, x, y);
                dataTmp[i].x=parseInt(mvt[j][0]);
                dataTmp[i].y=parseInt(mvt[j][1]);
                a=(a+b)*parseInt(16/(a+b)); // donne 16 si a=0, 0 si a=16
                b=2*b*0.25*(1+3*parseInt(16/b)); // donne 16 si b=32, 32 si b=16

                for(k=a; k<b; k++) { // Pour toutes les pièces ennemies pouvant bouger
                    if(!data[k].capture) {
                        const tk = data[k].type,
                          ck = data[k].couleur,
                          xk = data[k].x,
                          yk = data[k].y;
                        const fctk = mvtFonc[mouvementsPiece[tk]];
                        const mvtk = fctk(xk, yk, ck);

                        for(l=0; l<mvtk.length; l++) { // Pour chauqe mouvement de pièce ennemie
                            var scorek = score;
                            var dataTmpK = dataTmp;
                            collision(dataTmpK, x, y);
                            dataTmpK[k].x=parseInt(mvtk[l][0]);
                            dataTmpK[k].y=parseInt(mvtk[l][1]);
            
                            
                            arbre.fils.push(dataTmpK, scorek);
                        }
                    }
                }
            }
        }
    }
}
function tour() {
    var data = localStorage.getItem('data');
    data=JSON.parse(data);
    if(arbre.actuel==null) { // lors du premier tour
        arbre.actuel = data, 0;
        arbre.fils = [];
        genere(data, 'n', 0, 2);
    }
    else {
        for(i=0; i<arbre.fils.length; i++) {
            genere(data.fils[i], 'n', 1, 2);
        }
    }

}