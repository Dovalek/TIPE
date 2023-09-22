function afficher(i, j, data) {
    for(var k=0; k<32; k++) {
        if ((data[k].x==i)&&(data[k].y==j)&&(data[k].capture==false)) {
            return `${data[k].type}${data[k].couleur}`;
        }
    }
    return " "; 
}
function load(adress) {
    if(adress.type=="load") { 
        // Pour le premier tour
        localStorage.clear();
        fetch("https://dovalek.github.io/TIPE/positions.json")
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById('table');
            table.innerHTML=" ";
            for(var i = 0;i < 8; i++){
                var str = "<tr style=\"height:100px\">";
                for(var j=0; j<8; j++) {
                    str += `<td style="width:100px; height:100px" id="${i}${j}">`+ afficher(i, j, data) + "</td>";
                }
                str+="</tr>";   
                table.innerHTML += str;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else {
        // Pour les tours suivants
        var data = localStorage.getItem('data');
        var table = document.getElementById('table');
        data=JSON.parse(data)
        table.innerHTML=" ";
        for(var i = 0;i < 8; i++){
            var str = "<tr style=\"height:100px\">";
            for(var j=0; j<8; j++) {
                str += `<td style="width:100px; height:100px" id="${i}${j}">`+ afficher(i, j, data) + "</td>";
            }
            str+="</tr>";
            table.innerHTML += str;
        }
    }
}

const mouvementsPiece={p:0, t:1, c:2, f:3, r:4, k:5};
const mvtFonc=[mvtPion, mvtTour, mvtCav, mvtFou, mvtRei, mvtRoi];
var tabMvt=[[], []]; // pièce sélectionnée (id, coord) * mouvements possibles
function egalTab(t1, t2) {
    if(t1.length!=t2.length){
        return false;
    }
    for(i=0; i<t1.length; i++) {
        if(t1[i]!=t2[i]){
            return false;
        }
    }
    return true;
}

function Pourquoi_In_NeMarchePas(x, l) {
    for(i=0; i<l.length; i++) {
        if(l[i]==x) {
            return true;
        }
    }
    return false;
}
function f(e) { // id = coord, innerhtml = type
    if (Pourquoi_In_NeMarchePas(`${e.target.getAttribute('id')}`, tabMvt[1])) {
        // Permet de faire jouer le bot
        const abs = parseInt(e.target.getAttribute('id')[0]),
              ord = parseInt(e.target.getAttribute('id')[1]);
        if(localStorage.length==0) { 
            // Pour le premier tour
            fetch('https://dovalek.github.io/TIPE/positions.json')
            .then(response => response.json())
            .then(data => {
                for(i=16; i<data.length; i++) {
                    const [id, coord] = tabMvt[0];
                    if((data[i].x==coord[0])&&(data[i].y==coord[1])&&(data[i].type==id[0])) {
                        // Pour jouer contre le bot
                        data[i].x = abs;
                        data[i].y = ord;
                        tabMvt=[[], []];
                        const [tabN, tabB] = tour(data);
                        // Pour jouer contre le bot
                        let ind = 0;
                        // Vérifie l'absence de collision entre les pièces qui bougent
                        while(tabN[ind][4]==abs && tabN[ind][5]==ord) {
                            ind++;
                        }
                        let a = tabN[ind];
                        //console.log(a.actuel, a);
                        data[a.actuel[3]].x = a.actuel[4];
                        data[a.actuel[3]].y = a.actuel[5];
                        // Pour un jeu bot contre bot

                        const modifiedJson = JSON.stringify(data);
                        localStorage.setItem('data', modifiedJson);

                        load(localStorage);
                        break;
                    }
                }
            })
            .catch(error => {
                console.error('Error reading JSON file:', error);
            });    
        }
        else {
            // Pour les tours suivants
            var data = localStorage.getItem('data');
            data=JSON.parse(data)
            for(i=16; i<data.length; i++) {
                const [id, coord] = tabMvt[0];
                if((data[i].x==coord[0])&&(data[i].y==coord[1])&&(data[i].type==id[0])) {
                    data[i].x = abs;
                    data[i].y = ord;
                    tabMvt=[[], []];
                    const [tabN, tabB] = tour(data);
                    // Pour jouer contre le bot
                    let ind = 0;
                    // Vérifie l'absence de collision entre les pièces qui bougent
                    while(tabN[ind][4]==abs && tabN[ind][5]==ord) {
                        ind++;
                    }
                    data[tabN[ind][3]].x = tabN[ind][4];
                    data[tabN[ind][3]].y = tabN[ind][5];
                    const modifiedJson = JSON.stringify(data);
                    localStorage.setItem('data', modifiedJson);
                    load(localStorage);
                    break;
                }
            }
        }
    }
    // Permet d'afficher les mouvements possibles pour la pièce sélectionnée
    else if ( (e.target.getAttribute('id')!=null) && (e.target.innerHTML!==" ") )  {
        const t=e.target.innerHTML[0], 
              c=e.target.innerHTML[1];
        const x=parseInt(e.target.getAttribute('id')[0]), 
              y=parseInt(e.target.getAttribute('id')[1]);
        const fct=mvtFonc[mouvementsPiece[t]];
        for(i=0; i<tabMvt[1].length; i++) {
            var cell = document.getElementById(tabMvt[1][i]);
            cell.style.backgroundColor = "white";
        }
        const [tabTmp, s]=fct(x, y, c);
        if(egalTab(tabMvt[1], tabTmp)) {
            tabMvt[0]=[];
            tabMvt[1]=[];
        }
        else {
            tabMvt[1]=tabTmp;
            tabMvt[0]=[e.target.innerHTML, e.target.getAttribute('id')];
            for(i=0; i<tabMvt[1].length; i++) {
                var cell = document.getElementById(tabMvt[1][i]);
                cell.style.backgroundColor = "red";
            }
        }
    }
}
window.addEventListener("load", load);
window.addEventListener("click", function (e) {f(e)});
