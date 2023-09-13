let targetAC = parseInt(document.getElementById("targetAC").value);
let attackBonus = parseInt(document.getElementById("attackBonus").value);
let critMin = parseInt(document.getElementById("critMin").value);
let attacksPerTurn = parseInt(document.getElementById("attacksPerTurn").value);
let hitChance = ( 21 + attackBonus - targetAC ) / 20;
let hitChanceA = 1 - (( targetAC - attackBonus - 1 ) * ( targetAC - attackBonus - 1 )) / 400;
let hitChanceD = (( 21 + attackBonus - targetAC ) * ( 21 + attackBonus - targetAC )) / 400;
let critChance = ( 21 - critMin ) / 20;
let critChanceA = 1 - ( 1 - ( 21 - critMin ) / 20 ) * ( 1 - ( 21 - critMin ) / 20 );
let critChanceD = ( 21 - critMin ) / ( 21 - critMin ) / 400
let hitChancePct = ( hitChance - critChance ) * 100;
let hitChancePctA = ( hitChanceA - critChanceA ) * 100;
let hitChancePctD = ( hitChanceD - critChanceD ) * 100;
let critChancePct = critChance * 100;
let critChancePctA = critChanceA * 100;
let critChancePctD = critChanceD * 100;
let missChancePct = ( 1 - hitChance ) * 100;
let missChancePctA = ( 1 - hitChanceA ) * 100;
let missChancePctD = ( 1 - hitChanceD ) * 100;
let damageRoll = parseInt(document.getElementById("damageRoll").value);
let damageBonus = parseInt(document.getElementById("damageBonus").value);
let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit").value);
let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul").value) * 2;
let damageOnMiss = parseInt(document.getElementById("damageOnMiss").value);
let damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;
let damageAvgA = ( hitChanceA * ( damageRoll + damageBonus ) + critChanceA * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChanceA )) * attacksPerTurn;
let damageAvgD = ( hitChanceD * ( damageRoll + damageBonus ) + critChanceD * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChanceD )) * attacksPerTurn;

document.getElementById("targetAC").addEventListener("input", () => { hitChanceOutput("hitChanceOutput") });
document.getElementById("attackBonus").addEventListener("input", () => { hitChanceOutput("hitChanceOutput") });

document.getElementById("targetAC").addEventListener("input", () => { hitChanceOutputA("hitChanceOutputA") });
document.getElementById("attackBonus").addEventListener("input", () => { hitChanceOutputA("hitChanceOutputA") });

document.getElementById("targetAC").addEventListener("input", () => { hitChanceOutputD("hitChanceOutputD") });
document.getElementById("attackBonus").addEventListener("input", () => { hitChanceOutputD("hitChanceOutputD") });

document.getElementById("critMin").addEventListener("input", () => { hitChanceOutput("critChanceOutput") });

document.getElementById("hitChanceOutput").addEventListener("change", () => { hitChanceOutput("hitChancePctOutput") });
document.getElementById("critChanceOutput").addEventListener("change", () => { hitChanceOutput("hitChancePctOutput") });

document.getElementById("critChanceOutput").addEventListener("change", () => { hitChanceOutput("critChancePctOutput") });

document.getElementById("hitChanceOutput").addEventListener("change", () => { hitChanceOutput("missChancePctOutput") });

document.getElementById("damageRoll").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageBonus").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageBonusCrit").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageBonusCritMul").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageOnMiss").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });

document.getElementById("damageRoll").addEventListener("input", () => { damageAvgOutputA("damageAvgOutputA") });
document.getElementById("damageBonus").addEventListener("input", () => { damageAvgOutputA("damageAvgOutputA") });
document.getElementById("damageBonusCrit").addEventListener("input", () => { damageAvgOutputA("damageAvgOutputA") });
document.getElementById("damageBonusCritMul").addEventListener("input", () => { damageAvgOutputA("damageAvgOutputA") });
document.getElementById("damageOnMiss").addEventListener("input", () => { damageAvgOutputA("damageAvgOutputA") });

document.getElementById("damageRoll").addEventListener("input", () => { damageAvgOutputD("damageAvgOutputD") });
document.getElementById("damageBonus").addEventListener("input", () => { damageAvgOutputD("damageAvgOutputD") });
document.getElementById("damageBonusCrit").addEventListener("input", () => { damageAvgOutputD("damageAvgOutputD") });
document.getElementById("damageBonusCritMul").addEventListener("input", () => { damageAvgOutputD("damageAvgOutputD") });
document.getElementById("damageOnMiss").addEventListener("input", () => { damageAvgOutputD("damageAvgOutputD") });

function hitChanceOutput(outputID) {
    let targetAC = parseInt(document.getElementById("targetAC").value);
    let attackBonus = parseInt(document.getElementById("attackBonus").value);
    let hitChance = ( 21 + attackBonus - targetAC ) / 20;
    if (hitChance < 0.05){
        hitChance = 0.05;
    }
    else if (hitChance > 0.95){
        hitChance = 0.95;
    }
    document.getElementById(outputID).value = hitChance;
}

function hitChanceOutputA(outputID) {
    let targetAC = parseInt(document.getElementById("targetAC").value);
    let attackBonus = parseInt(document.getElementById("attackBonus").value);
    let hitChanceA = 1 - (( targetAC - attackBonus - 1 ) * ( targetAC - attackBonus - 1 )) / 400;
    if (hitChanceA < 0.0025){
        hitChanceA = 0.0025;
    }
    else if (hitChanceA > 0.9975){
        hitChanceA = 0.9975;
    }
    document.getElementById(outputID).value = hitChanceA;
}

function hitChanceOutputD(outputID) {
    let targetAC = parseInt(document.getElementById("targetAC").value);
    let attackBonus = parseInt(document.getElementById("attackBonus").value);
    let hitChanceD = (( 21 + attackBonus - targetAC ) * ( 21 + attackBonus - targetAC )) / 400;
    if (hitChanceD < 0.0025){
        hitChanceD = 0.0025;
    }
    else if (hitChanceD > 0.9975){
        hitChanceD = 0.9975;
    }
    document.getElementById(outputID).value = hitChanceD;
}

function critChanceOutput(outputID) {
    let critMin = parseInt(document.getElementById("critMin").value);
    let critChance = ( 21 - critMin ) / 20;
    document.getElementById(outputID).value = critChance;
}

function hitChancePctOutput(outputID) {
    let hitChance = parseInt(document.getElementById("hitChance").value);
    let critChance = parseInt(document.getElementById("critChance").value);
    let hitChancePct = ( hitChance - critChance ) * 100;
    document.getElementById(outputID).value = hitChancePct;
}

function damageAvgOutput(outputID) {
    let damageRoll = parseInt(document.getElementById("damageRoll").value);
    let damageBonus = parseInt(document.getElementById("damageBonus").value);
    let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit").value);
    let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul").value);
    let damageOnMiss = parseInt(document.getElementById("damageOnMiss").value);
    let damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;
    document.getElementById(outputID).value = damageAvg;
}

function damageAvgOutputA(outputID) {
    let damageRoll = parseInt(document.getElementById("damageRoll").value);
    let damageBonus = parseInt(document.getElementById("damageBonus").value);
    let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit").value);
    let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul").value);
    let damageOnMiss = parseInt(document.getElementById("damageOnMiss").value);
    let damageAvg = ( hitChanceA * ( damageRoll + damageBonus ) + critChanceA * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChanceA )) * attacksPerTurn;
    document.getElementById(outputID).value = damageAvg;
}

function damageAvgOutputD(outputID) {
    let damageRoll = parseInt(document.getElementById("damageRoll").value);
    let damageBonus = parseInt(document.getElementById("damageBonus").value);
    let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit").value);
    let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul").value);
    let damageOnMiss = parseInt(document.getElementById("damageOnMiss").value);
    let damageAvg = ( hitChanceD * ( damageRoll + damageBonus ) + critChanceD * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChanceD )) * attacksPerTurn;
    document.getElementById(outputID).value = damageAvg;
}

document.getElementById("hitChanceOutput").value = hitChance;
document.getElementById("hitChanceOutputA").value = hitChanceA;
document.getElementById("hitChanceOutputD").value = hitChanceD;

document.getElementById("critChanceOutput").value = critChance;
document.getElementById("critChanceOutputA").value = critChanceA;
document.getElementById("critChanceOutputD").value = critChanceD;

document.getElementById("hitChancePctOutput").value = hitChancePct;
document.getElementById("critChancePctOutput").value = critChancePct;
document.getElementById("missChancePctOutput").value = missChancePct;

// document.getElementById("critChanceOutput").value = critChance;
// document.getElementById("critChanceOutputA").value = critChanceA;
// document.getElementById("critChanceOutputD").value = critChanceD;
// document.getElementById("hitChancePctOutput").value = hitChancePct;
// document.getElementById("hitChancePctOutputA").value = hitChancePctA;
// document.getElementById("hitChancePctOutputD").value = hitChancePctD;
// document.getElementById("critChanceOutput").value = critChancePct;
// document.getElementById("critChanceOutputA").value = critChanceAPct;
// document.getElementById("critChanceOutputD").value = critChanceDPct;
// document.getElementById("hitChancePctOutput").value = missChancePct;
// document.getElementById("hitChancePctOutputA").value = missChancePctA;
// document.getElementById("hitChancePctOutputD").value = missChancePctD;

document.getElementById("damageAvgOutput").value = damageAvg;
document.getElementById("damageAvgOutputA").value = damageAvgA;
document.getElementById("damageAvgOutputD").value = damageAvgD;