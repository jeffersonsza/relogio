let valoresDoTempoDeJogo = [];
let TempoDasBrancasMi;
let TempoDasPretasMi;
let controle = -1;
let b = document.getElementsByClassName('tempo');

document.getElementsByTagName('button')[0].addEventListener('click',setTempodeJogo);
document.getElementsByTagName('button')[1].addEventListener('click',iniciaJogo);

function setTempodeJogo(){
    let a = document.querySelectorAll('.tempodejogo');
    
    for (let i = 0; i< a.length;i++){
            valoresDoTempoDeJogo.push(Number(a[i].value));
        }
    if (valoresDoTempoDeJogo.every(checkValues) == true){
        for (let i = 0; i< b.length;i++){
             b[i].innerHTML = `${valoresDoTempoDeJogo[0]}h: ${valoresDoTempoDeJogo[1]}m:  ${valoresDoTempoDeJogo[2]}s`;
        }
    }
    if (valoresDoTempoDeJogo.every(checkValues) == false){
        window.alert('valores inválidos');
        resetarValores(a);
    }     
    TempoDasBrancasMi = ((((60 * valoresDoTempoDeJogo[0]) + valoresDoTempoDeJogo[1])*60) + valoresDoTempoDeJogo[2]) * 10;     
    TempoDasPretasMi =  ((((60 * valoresDoTempoDeJogo[0]) + valoresDoTempoDeJogo[1])*60) + valoresDoTempoDeJogo[2]) * 10;       
}

function checkValues(valoresDoTempoDeJogo){
    return valoresDoTempoDeJogo >= 0 && valoresDoTempoDeJogo <=60;
}
function resetarValores(inputs){
    for (let i = 0; i< valoresDoTempoDeJogo.length;i){
        valoresDoTempoDeJogo.pop();
    }
    for (let i = 0; i< inputs.length;i++){
        inputs[i].value = '';
    }
}
function iniciaJogo(){
    document.body.addEventListener('keydown', trocaDeJogador);
    let areadeclick = document.querySelectorAll('.cronometro')
    for (let i = 0;i<areadeclick.length; i++){
        areadeclick[i].addEventListener('click',trocaDeJogador);
    }
    document.querySelector('.relogio').style.display = 'none';
    cronometro();
}
function cronometro(){
    setTimeout(()=>{
        if (controle == 1){
            TempoDasBrancasMi--;
            cronometro(TempoDasBrancasMi) ;
            tempoDecomposto(TempoDasBrancasMi,b[0]);  
        }else if(controle == -1){ 
            TempoDasPretasMi--
            cronometro(TempoDasPretasMi)
            tempoDecomposto(TempoDasPretasMi,b[1])  
        }
    },100)
}
function trocaDeJogador(){
    controle *= -1;
     if (controle == -1){
         TempoDasBrancasMi += (10 * valoresDoTempoDeJogo[3]);
         tempoDecomposto(TempoDasBrancasMi,b[0]);  
     }else if(controle == 1){
        TempoDasPretasMi += (10 * valoresDoTempoDeJogo[3]);
        tempoDecomposto(TempoDasPretasMi,b[1])  
     }  
}

function tempoDecomposto (tempoDeJogo, lugar){  
    let h = parseInt(tempoDeJogo/(3600*10));
    let m = parseInt(((tempoDeJogo/10)%3600)/60);
    let seg = parseInt(((tempoDeJogo/10)%3600)%60);
    let mil = (((((tempoDeJogo/10)%3600)%60)));
    let mil2c = mil.toFixed(3);
    let milstring = mil2c.toString();
    let dividido = milstring.split('.');
    
    if (h > 0){
        lugar.innerHTML = `${h}h:${m}m`;
    }
    if (h == 0){
        lugar.innerHTML = `${m}m:${seg}s: ${dividido[1]}mi`;
    }

    if (TempoDasBrancasMi == 0 || TempoDasPretasMi == 0){
        window.alert('acabou o tempo');
    }
}
