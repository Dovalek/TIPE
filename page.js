function afficher(i, j, data) {
    for(var k=0; k<32; k++) {
        if ((data[k].x==i)&&(data[k].y==j)/*&&(data[k].capture==false)*/) {
            return `${data[k].type}${data[k].couleur}`;
        }
    }
    return " "; 
}
function load() {
    fetch("http://dovalek.github.io/TIPE/positions.json");
    .then(response => response.json())
    .then(data => {
        var table = document.getElementById('table');
        table.innerHTML=" ";
        for(var i = 0;i < 8; i++){
            var str = "<tr style=\"height:100px\">";
            for(var j=0; j<8; j++) {
                str += `<td id="${i}${j}">`+ afficher(i, j, data) + "</td>";
            }
            str+="</tr>";
            table.innerHTML += str;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function verifCase(tab, caseMvt, c) { // case à ajouter, tableau dans lequel il faut ajouter, couleur de la pièce
    for(j=0; j<tab.length; j++) {
        const x=document.getElementById(tab[j]);
        if (x==null) {
            return;
        }
        else if(x.innerHTML!=" ") {
            if(c==="n"&&x.innerHTML[1]==="b") {
                caseMvt.push(tab[j]);
            }
            else if(c==="b"&&x.innerHTML[1]==="n") {
                caseMvt.push(tab[j]);
            }
            return;
        }
        caseMvt.push(tab[j]);
    }
}
function mvtPion(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[];
    if(c=='n') {
        totalMvt=[[`${x+1}${y}`, `${x+2}${y}`], [`${x+1}${y+1}`, `${x+1}${y-1}`]];
    }
    else {
        totalMvt=[[`${x-1}${y}`, `${x-2}${y}`], [`${x-1}${y+1}`, `${x-1}${y-1}`]];
    }
    for(j=0; j<totalMvt[0].length; j++) {
        const x=document.getElementById(totalMvt[0][j]);
        if ((x==null)||x.innerHTML!=" ") {
            break;
        }
        caseMvt.push(totalMvt[0][j]);
    }
    for(j=0; j<totalMvt[0].length; j++) {
        const x=document.getElementById(totalMvt[0][j]);
        if (x==null) {}
        else if(x.innerHTML!=" ") {
            if(c==="n"&&x.innerHTML[1]==="b") {
                caseMvt.push(totalMvt[0][j]);
            }
            else if(c==="b"&&x.innerHTML[1]==="n") {
                caseMvt.push(totalMvt[0][j]);
            }
        }
    }
    return caseMvt;
}
function mvtTour(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[[], [], [], []];
    for(i=0; i<8; i++) {
        totalMvt[0].push(`${x}${y-i}`);
        totalMvt[1].push(`${x+i}${y}`);
        totalMvt[2].push(`${x}${y+i}`);
        totalMvt[3].push(`${x-i}${y}`);
    } 
    for(i=0; i<totalMvt.length; i++) {
        verifCase(totalMvt[i], caseMvt, c);
    }
    return caseMvt;
}
function mvtCav(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[[`${x-2}${y-1}`], [`${x-2}${y+1}`], [`${x-1}${y+2}`], [`${x-1}${y-2}`], [`${x+1}${y-2}`], [`${x+1}${y+2}`], [`${x+2}${y-1}`], [`${x+2}${y+1}`]];
    for(i=0; i<totalMvt.length; i++) {
        verifCase(totalMvt[i], caseMvt, c);
    }
    return caseMvt;
}
function mvtFou(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[[], [], [], []];
    for(i=0; i<8; i++) {
        totalMvt[0].push(`${x+i}${y-i}`);
        totalMvt[1].push(`${x+i}${y+i}`);
        totalMvt[2].push(`${x-i}${y+i}`);
        totalMvt[3].push(`${x-i}${y-i}`);
    } 
    for(i=0; i<totalMvt.length; i++) {
        verifCase(totalMvt[i], caseMvt, c);
    }
    return caseMvt;
}
function mvtRei(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[[], [], [], [], [], [], [], []];
    for(i=0; i<8; i++) {
        totalMvt[0].push(`${x+i}${y-i}`);
        totalMvt[1].push(`${x+i}${y+i}`);
        totalMvt[2].push(`${x-i}${y+i}`);
        totalMvt[3].push(`${x-i}${y-i}`);
        totalMvt[4].push(`${x}${y-i}`);
        totalMvt[5].push(`${x+i}${y}`);
        totalMvt[6].push(`${x}${y+i}`);
        totalMvt[7].push(`${x-i}${y}`);
    } 
    for(i=0; i<totalMvt.length; i++) {
        verifCase(totalMvt[i], caseMvt, c);
    }
    return caseMvt;
}
function mvtRoi(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[[], [], [], [], [], [], [], []];
    for(i=0; i<1; i++) {
        totalMvt[0].push(`${x+i}${y-i}`);
        totalMvt[1].push(`${x+i}${y+i}`);
        totalMvt[2].push(`${x-i}${y+i}`);
        totalMvt[3].push(`${x-i}${y-i}`);
        totalMvt[4].push(`${x}${y-i}`);
        totalMvt[5].push(`${x+i}${y}`);
        totalMvt[6].push(`${x}${y+i}`);
        totalMvt[7].push(`${x-i}${y}`);
    } 
    for(i=0; i<totalMvt.length; i++) {
        verifCase(totalMvt[i], caseMvt, c);
    }
    return caseMvt;
}

const mouvementsPiece={p:0, t:1, c:2, f:3, q:4, k:5};
const mvtFonc=[mvtPion, mvtTour, mvtCav, mvtFou, mvtRei, mvtRoi];
var tabMvt=[];
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
function f(e) { // id = coord, innerhtml = type
    if (e.target.getAttribute('id') in tabMvt) {

    }
    if ( (e.target.getAttribute('id')!=null) && (e.target.innerHTML!==" ") )  {
        const x=e.target.innerHTML[0], 
              c=e.target.innerHTML[1];
        const fct=mvtFonc[mouvementsPiece[x]];
        for(i=0; i<tabMvt.length; i++) {
            var cell = document.getElementById(tabMvt[i]);
            cell.style.backgroundColor = "white";
        }
        const tabTmp=fct(e, c);
        if(egalTab(tabMvt, tabTmp)) {
            tabMvt=[];
        }
        else {
            tabMvt=tabTmp;
            for(i=0; i<tabMvt.length; i++) {
                var cell = document.getElementById(tabMvt[i]);
                cell.style.backgroundColor = "red";
            }         
        }
    }
}
window.addEventListener("load", load);
window.addEventListener("click", function (e) {f(e)});
/*
        fs.writeFile('http://localhost:8000/positions.json', modifiedJson, (error) => {
            if (error) {
                console.error('Error writing JSON file:', error);
            } else {
                console.log('JSON file successfully updated.');
            }
        });
        load();
*/
