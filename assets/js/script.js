// ====================================================
// =  Déclaration des variables globales              =
// ====================================================

var mdp;
var mdpScore;

var formulaire = document.getElementById("form-password");

var nouvMDP = document.getElementById("password");
var confMDP = document.getElementById("confirm-password");
var msgErrMDP = document.querySelector(".message-erreur");

var valideSpecIco = document.getElementById("valideSpec");
var valideSpec = document.getElementById("validation-caractere");

var valideNbCarIco = document.getElementById("valideCar");
var valideNbCar = document.getElementById("validation-longueur");

var valideCaseIco = document.getElementById("valideMaj");
var valideCase = document.getElementById("validation-majuscule");

var pm1 = document.getElementById("pw1");
var pm2 = document.getElementById("pw2");
var pm3 = document.getElementById("pw3");
var pm4 = document.getElementById("pw4");
var pm5 = document.getElementById("pw5");

var mdpPareil;
var carSpec;
var mdpLong;
var caseMdp;

// ====================================================
// =  Déclaration des événements                      =
// ====================================================

nouvMDP.addEventListener('input', changeMDP);
confMDP.addEventListener('input', changeMDP);
formulaire.addEventListener('submit', verif);

// ====================================================
// =  Code qui sera exécuté au chargement de la page  =
// ====================================================



// ====================================================
// =  Déclaration des fonctions                       =
// ====================================================

function changeMDP(){
    mdp = nouvMDP.value;
    mdpScore = zxcvbn(mdp);
    console.log(mdpScore.score);
    if(nouvMDP.value == confMDP.value){
        msgErrMDP.classList.add("hidden");
        mdpPareil = true
    } else if(nouvMDP.value != confMDP.value){
        msgErrMDP.classList.remove("hidden");
        msgErrMDP.style.color = "#b00";
        mdpPareil = false
    }

    if(checkCarSpec(nouvMDP.value)){
        valideSpecIco.classList.remove("fa-ban");
        valideSpecIco.classList.add("fa-check");
        valideSpec.style.color = "#0b0";
        carSpec = true;
    } else if(checkCarSpec(nouvMDP.value) == false){
        valideSpecIco.classList.add("fa-ban");
        valideSpecIco.classList.remove("fa-check");
        valideSpec.style.color = "#b00";
        carSpec = false;
    }

    if(mdp.length >= 8){
        valideNbCarIco.classList.remove("fa-ban");
        valideNbCarIco.classList.add("fa-check");
        valideNbCar.style.color = "#0b0";
        mdpLong = true;
    } else{
        valideNbCarIco.classList.add("fa-ban");
        valideNbCarIco.classList.remove("fa-check");
        valideNbCar.style.color = "#b00";
        mdpLong  = false;
    }

    if(checkCase(mdp)){
        valideCaseIco.classList.add("fa-check");
        valideCaseIco.classList.remove("fa-ban");
        valideCase.style.color = "#0b0";
        caseMdp = true;
    } else{
        valideCaseIco.classList.add("fa-ban");
        valideCaseIco.classList.remove("fa-check");
        valideCase.style.color = "#b00";
        caseMdp = false;
    }

    if(mdp.length == 0){
        pm1.style.backgroundColor = "#fff";
    }

    if(mdpScore.score == 0){
        pm1.style.backgroundColor = "#b00";
        pm2.style.backgroundColor = "#fff";
        pm3.style.backgroundColor = "#fff";
        pm4.style.backgroundColor = "#fff";
        pm5.style.backgroundColor = "#fff";
    } else if(mdpScore.score == 1){
        pm1.style.backgroundColor = "#b00";
        pm2.style.backgroundColor = "#b00";
        pm3.style.backgroundColor = "#fff";
        pm4.style.backgroundColor = "#fff";
        pm5.style.backgroundColor = "#fff";
    } else if(mdpScore.score == 2){
        pm1.style.backgroundColor = "#bb0";
        pm2.style.backgroundColor = "#bb0";
        pm3.style.backgroundColor = "#bb0";
        pm4.style.backgroundColor = "#fff";
        pm5.style.backgroundColor = "#fff";
    } else if(mdpScore.score == 3){
        pm1.style.backgroundColor = "#0b0";
        pm2.style.backgroundColor = "#0b0";
        pm3.style.backgroundColor = "#0b0";
        pm4.style.backgroundColor = "#0b0";
        pm5.style.backgroundColor = "#fff";
    } else if(mdpScore.score == 4){
        pm1.style.backgroundColor = "#0b0";
        pm2.style.backgroundColor = "#0b0";
        pm3.style.backgroundColor = "#0b0";
        pm4.style.backgroundColor = "#0b0";
        pm5.style.backgroundColor = "#0b0";
    }
}

function checkCarSpec(mdp){
    const caractereSpecial_regex = /[!@#$%^&*(),.?":{}|<>]/;
    return caractereSpecial_regex.test(mdp);
}

function checkCase(mdp){
    const caractCase_regex = /(?=.*[A-Z])(?=.*[a-z])/;
    return caractCase_regex.test(mdp);
}

function verif(e){
    e.preventDefault();

    if(mdpScore.score >= 3){
        if(mdpPareil){
            if(mdpLong){
                if(carSpec){
                    if(caseMdp){
                        formulaire.submit();
                    }
                }
            }
        }
    }
}