function verifCase(tab, caseMvt, c) { // case à ajouter, tableau dans lequel il faut ajouter, couleur de la pièce
    for(j=0; j<tab.length; j++) {
        const x=document.getElementById(tab[j]);
        if (x==null) {
            return 0;
        }
        else if(x.innerHTML!=" ") {
            if(c==="n"&&x.innerHTML[1]==="b") {
                caseMvt.push(tab[j]);
                return valeurs[x.innerHTML[0]];
            }
            else if(c==="b"&&x.innerHTML[1]==="n") {
                caseMvt.push(tab[j]);
                return valeurs[x.innerHTML[0]];
            }
            else if(c===x.innerHTML[1]) {
                return 0;
            }
        }
        caseMvt.push(tab[j]);
    }
}
function mvtPion(x, y, c) { // id = coord, innerhtml = type
    var s=0;
    var caseMvt=[];
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
        const a=document.getElementById(totalMvt[0][j]);
        if ((a==null)||a.innerHTML!=" ") {
            break;
        }
        caseMvt.push(totalMvt[0][j]);
    }
    for(j=0; j<totalMvt[1].length; j++) {
        const a=document.getElementById(totalMvt[1][j]);
        if (a==null) {}
        else if(a.innerHTML!=" ") {
            if(c==="n"&&a.innerHTML[1]==="b") {
                caseMvt.push(totalMvt[1][j]);
                s+=valeurs[a.innerHTML[0]];;
            }
            else if(c==="b"&&a.innerHTML[1]==="n") {
                caseMvt.push(totalMvt[1][j]);
                s+=valeurs[a.innerHTML[0]];;
            }
        }
    }
    return [caseMvt, s];
}
function mvtTour(x, y, c) { // id = coord, innerhtml = type
    var s=0;
    var caseMvt=[];
    var totalMvt=[[], [], [], []];
    for(i=1; i<=7; i++) {
        totalMvt[0].push(`${x}${y-i}`);
        totalMvt[1].push(`${x+i}${y}`);
        totalMvt[2].push(`${x}${y+i}`);
        totalMvt[3].push(`${x-i}${y}`);
    } 
    for(i=0; i<totalMvt.length; i++) {
        s+=verifCase(totalMvt[i], caseMvt, c, true);
    }
    return [caseMvt, s];
}
function mvtCav(x, y, c) { // id = coord, innerhtml = type
    var s=0;
    var caseMvt=[];
    var totalMvt=[[`${x-2}${y-1}`], [`${x-2}${y+1}`], [`${x-1}${y+2}`], [`${x-1}${y-2}`], [`${x+1}${y-2}`], [`${x+1}${y+2}`], [`${x+2}${y-1}`], [`${x+2}${y+1}`]];
    for(i=0; i<totalMvt.length; i++) {
        s+=verifCase(totalMvt[i], caseMvt, c);
    }
    return [caseMvt, s];
}
function mvtFou(x, y, c) { // id = coord, innerhtml = type
    var s=0;
    var caseMvt=[];
    var totalMvt=[[], [], [], []];
    for(i=1; i<=7; i++) {
        totalMvt[0].push(`${x+i}${y-i}`);
        totalMvt[1].push(`${x+i}${y+i}`);
        totalMvt[2].push(`${x-i}${y+i}`);
        totalMvt[3].push(`${x-i}${y-i}`);
    } 
    for(i=0; i<totalMvt.length; i++) {
        s+=verifCase(totalMvt[i], caseMvt, c);
    }
    return [caseMvt, s];
}
function mvtRei(x, y, c) { // id = coord, innerhtml = type
    var s=0;
    var caseMvt=[];
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
        s+=verifCase(totalMvt[i], caseMvt, c, true);
    }
    return [caseMvt, s];
}
function mvtRoi(x, y, c) { // id = coord, innerhtml = type
    var s=0;
    var caseMvt=[];
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
        s+=verifCase(totalMvt[i], caseMvt, c, true);
    }
    return [caseMvt, s];
}
