function afficher(i, j, data) {
    for(var k=0; k<32; k++) {
        if ((data[k].x==i)&&(data[k].y==j)/*&&(data[k].capture==false)*/) {
            return `${data[k].type}${data[k].couleur}`;
        }
    }
    return " "; 
}
function load(adress) {
    if(adress.type=="load") {
        localStorage.clear();
        fetch("https://dovalek.github.io/TIPE/positions.json")
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
    else {
        var data = localStorage.getItem('data');
        var table = document.getElementById('table');
        data=JSON.parse(data)
        table.innerHTML=" ";
        for(var i = 0;i < 8; i++){
            var str = "<tr style=\"height:100px\">";
            for(var j=0; j<8; j++) {
                str += `<td id="${i}${j}">`+ afficher(i, j, data) + "</td>";
            }
            str+="</tr>";
            table.innerHTML += str;
        }
    }
}

const mouvementsPiece={p:0, t:1, c:2, f:3, r:4, k:5};
const mvtFonc=[mvtPion, mvtTour, mvtCav, mvtFou, mvtRei, mvtRoi];
var tabMvt=[[], []];
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
        const abs = parseInt(e.target.getAttribute('id')[0]),
              ord = parseInt(e.target.getAttribute('id')[1]);
        if(localStorage.length==0) {
            fetch('https://dovalek.github.io/TIPE/positions.json')
            .then(response => response.json())
            .then(data => {
                for(i=0; i<data.length; i++) {
                    if((data[i].x==tabMvt[0][1][0])&&(data[i].y==tabMvt[0][1][1])&&(data[i].type==tabMvt[0][0][0])) {
                        data[i].x = abs;
                        data[i].y = ord;
                        const modifiedJson = JSON.stringify(data);
                        localStorage.setItem('data', modifiedJson);
                        tabMvt=[[], []];
                        load(localStorage);
                    }
                }
            })
            .catch(error => {
                console.error('Error reading JSON file:', error);
            });    
        }
        else {
            var data = localStorage.getItem('data');
            data=JSON.parse(data)
            for(i=0; i<data.length; i++) {
                if((data[i].x==tabMvt[0][1][0])&&(data[i].y==tabMvt[0][1][1])&&(data[i].type==tabMvt[0][0][0])) {
                    data[i].x = abs;
                    data[i].y = ord;
                    localStorage.setItem('data', JSON.stringify(data));
                    tabMvt=[[], []];
                    load(localStorage);
                }
            }
        }
    }
    else if ( (e.target.getAttribute('id')!=null) && (e.target.innerHTML!==" ") )  {
        const x=e.target.innerHTML[0], 
              c=e.target.innerHTML[1];
        const fct=mvtFonc[mouvementsPiece[x]];
        for(i=0; i<tabMvt[1].length; i++) {
            var cell = document.getElementById(tabMvt[1][i]);
            cell.style.backgroundColor = "white";
        }
        const tabTmp=fct(e, c);
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
