let accuracyType = document.getElementById("accuracyType").value
let targetAC = parseInt(document.getElementById("targetAC").value);
let attackBonus = parseInt(document.getElementById("attackBonus").value);
let critMin = parseInt(document.getElementById("critMin").value);
let attacksPerTurn = parseInt(document.getElementById("attacksPerTurn").value);
let hitChance = ( 21 + attackBonus - targetAC ) / 20;
let critChance = ( 21 - critMin ) / 20;
let hitChancePct = ( hitChance - critChance ) * 100;
let critChancePct = critChance * 100;
let missChancePct = ( 1 - hitChance ) * 100;
let damageRoll = parseInt(document.getElementById("damageRoll").value);
let damageBonus = parseInt(document.getElementById("damageBonus").value);
let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit").value);
let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul").value) * 2;
let damageOnMiss = parseInt(document.getElementById("damageOnMiss").value);
let damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;

// event listener for accuracy type
document.getElementById("accuracyType").addEventListener("change", () => {
    hitChanceOutput("hitChanceOutput"),
    critChanceOutput("critChanceOutput"),
    hitChancePctOutput("hitChancePctOutput"),
    critChancePctOutput("critChancePctOutput"),
    missChancePctOutput("missChancePctOutput"),
    damageAvgOutput("damageAvgOutput")
});

// event listener for target AC
document.getElementById("targetAC").addEventListener("input", () => {
    hitChanceOutput("hitChanceOutput"),
    hitChancePctOutput("hitChancePctOutput"),
    missChancePctOutput("missChancePctOutput"),
    damageAvgOutput("damageAvgOutput")
});

// event listener for attack bonus
document.getElementById("attackBonus").addEventListener("input", () => {
    hitChanceOutput("hitChanceOutput"),
    hitChancePctOutput("hitChancePctOutput"),
    missChancePctOutput("missChancePctOutput"),
    damageAvgOutput("damageAvgOutput")
});

// event listener for min. to crit
document.getElementById("critMin").addEventListener("input", () => {
    hitChanceOutput("hitChanceOutput"),
    critChanceOutput("critChanceOutput"),
    hitChancePctOutput("hitChancePctOutput"),
    critChancePctOutput("critChancePctOutput"),
    missChancePctOutput("missChancePctOutput"),
    damageAvgOutput("damageAvgOutput")
});

// event listeners for damage per turn
document.getElementById("attacksPerTurn").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageRoll").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageBonus").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageBonusCrit").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageBonusCritMul").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });
document.getElementById("damageOnMiss").addEventListener("input", () => { damageAvgOutput("damageAvgOutput") });

// calculate chance to hit (includes crit chance)
function hitChanceOutput(outputID) {
    let accuracyType = document.getElementById("accuracyType").value
    let targetAC = parseInt(document.getElementById("targetAC").value);
    let attackBonus = parseInt(document.getElementById("attackBonus").value);
    // chance to hit with advantage (roll two dice instead of one and choose the highest number)
    if ( accuracyType == "advantage" ) {
        hitChance = 1 - (( targetAC - attackBonus - 1 ) * ( targetAC - attackBonus - 1 )) / 400;
        // value limit
        if ( hitChance < 0.0025 ) {
            hitChance = 0.0025;
        }
        else if ( hitChance > 0.9975 ) {
            hitChance = 0.9975;
        }
        // output
        document.getElementById(outputID).value = hitChance;
    }
    // chance to hit with disadvantage (roll two dice instead of one and choose the lowest number)
    else if (accuracyType == "disadvantage") {
        hitChance = (( 21 + attackBonus - targetAC ) * ( 21 + attackBonus - targetAC )) / 400;
        // value limit
        if ( hitChance < 0.0025 ) {
            hitChance = 0.0025;
        }
        else if ( hitChance > 0.9975 ) {
            hitChance = 0.9975;
        }
        // output
        document.getElementById(outputID).value = hitChance;
    }
    // normal chance to hit
    else {
        hitChance = ( 21 + attackBonus - targetAC ) / 20;
        // value limit
        if ( hitChance < 0.05 ) {
            hitChance = 0.05;
        }
        else if ( hitChance > 0.95 ) {
            hitChance = 0.95;
        }
        // output
        document.getElementById(outputID).value = hitChance;
    }
}

// calculate chance to crit
function critChanceOutput(outputID) {
    let accuracyType = document.getElementById("accuracyType").value;
    let critMin = parseInt(document.getElementById("critMin").value);
    // chance to crit with advantage
    if ( accuracyType == "advantage" ) {
        critChance = 1 - ( 1 - ( 21 - critMin ) / 20 ) * ( 1 - ( 21 - critMin ) / 20 );
        // output
        document.getElementById(outputID).value = critChance;
    }
    // chance to crit with disadvantage
    else if ( accuracyType == "disadvantage" ) {
        critChance = ( 21 - critMin ) * ( 21 - critMin ) / 400;
        // output
        document.getElementById(outputID).value = critChance;
    }
    // normal chance to crit
    else {
        critChance = ( 21 - critMin ) / 20;
        // output
        document.getElementById(outputID).value = critChance;
    }
}

// calculate chance to hit as a percentage (excludes crit chance)
function hitChancePctOutput(outputID) {
    let hitChance = parseFloat(document.getElementById("hitChanceOutput").value);
    let critChance = parseFloat(document.getElementById("critChanceOutput").value);
    hitChancePct = ( hitChance - critChance ) * 100;
    // output
    document.getElementById(outputID).value = hitChancePct.toFixed(0);
}

// calculate chance to crit as a percentage
function critChancePctOutput(outputID) {
    let critChance = parseFloat(document.getElementById("critChanceOutput").value);
    critChancePct = critChance * 100;
    // output
    document.getElementById(outputID).value = critChancePct.toFixed(0);
}

// calculate chance to miss as a percentage
function missChancePctOutput(outputID) {
    let hitChance = parseFloat(document.getElementById("hitChanceOutput").value);
    missChancePct = ( 1 - hitChance ) * 100;
    // output
    document.getElementById(outputID).value = missChancePct.toFixed(0);
}

// calculate damage per turn
function damageAvgOutput(outputID) {
    let attacksPerTurn = parseInt(document.getElementById("attacksPerTurn").value);
    let damageRoll = parseInt(document.getElementById("damageRoll").value);
    let damageBonus = parseInt(document.getElementById("damageBonus").value);
    let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit").value);
    let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul").value);
    let damageOnMiss = parseInt(document.getElementById("damageOnMiss").value);
    let damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;
    // output
    document.getElementById(outputID).value = damageAvg.toFixed(2);
}

document.getElementById("hitChanceOutput").value = hitChance;
document.getElementById("critChanceOutput").value = critChance;
document.getElementById("hitChancePctOutput").value = hitChancePct;
document.getElementById("critChancePctOutput").value = critChancePct;
document.getElementById("missChancePctOutput").value = missChancePct;
document.getElementById("damageAvgOutput").value = damageAvg;