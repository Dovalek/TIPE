function verifCase(tab, caseMvt, c) { // case à ajouter, tableau dans lequel il faut ajouter, couleur de la pièce
    for(j=0; j<tab.length; j++) {
        const x=document.getElementById(tab[j]);
        if (x==null) {
            return;
        }
        else if(x.innerHTML!=" ") {
            if(c==="n"&&x.innerHTML[1]==="b") {
                caseMvt.push(tab[j]);
                return;
            }
            else if(c==="b"&&x.innerHTML[1]==="n") {
                caseMvt.push(tab[j]);
                return;
            }
            else if(c===x.innerHTML[1]) {
                return;
            }
        }
        caseMvt.push(tab[j]);
    }
}
function mvtPion(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[];
    if(c=='n') {
        totalMvt=[[`${x+1}${y}`], [`${x+1}${y+1}`, `${x+1}${y-1}`]];
        if(x==1) {
            totalMvt[0].push(`${x+2}${y}`);
        }
    }
    else {
        totalMvt=[[`${x-1}${y}`], [`${x-1}${y+1}`, `${x-1}${y-1}`]];
        if(x==6) {
            totalMvt[0].push(`${x-2}${y}`);
        }
    }
    for(j=0; j<totalMvt[0].length; j++) {
        const x=document.getElementById(totalMvt[0][j]);
        if ((x==null)||x.innerHTML!=" ") {
            break;
        }
        caseMvt.push(totalMvt[0][j]);
    }
    for(j=0; j<totalMvt[1].length; j++) {
        const x=document.getElementById(totalMvt[1][j]);
        if (x==null) {}
        else if(x.innerHTML!=" ") {
            if(c==="n"&&x.innerHTML[1]==="b") {
                caseMvt.push(totalMvt[1][j]);
            }
            else if(c==="b"&&x.innerHTML[1]==="n") {
                caseMvt.push(totalMvt[1][j]);
            }
        }
    }
    return caseMvt;
}
function mvtTour(e, c) { // id = coord, innerhtml = type
    var caseMvt=[];
    const x=parseInt(e.target.getAttribute('id')[0]), y=parseInt(e.target.getAttribute('id')[1]);
    var totalMvt=[[], [], [], []];
    for(i=1; i<=7; i++) {
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
    for(i=1; i<=7; i++) {
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
    for(i=1; i<=7; i++) {
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
    for(i=1; i<=1; i++) {
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