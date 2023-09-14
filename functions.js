let accuracyType;
let targetAC;
let attackBonus;
let critMin;
let attacksPerTurn;
let hitChance;
let critChance;
let hitChancePct;
let critChancePct;
let missChancePct;
let damageRoll;
let damageBonus;
let damageBonusCrit;
let damageBonusCritMul;
let damageOnMiss;
let damageAvg;


accuracyType = document.getElementById("accuracyType"+counter).value;
targetAC = parseInt(document.getElementById("targetAC"+counter).value);
attackBonus = parseInt(document.getElementById("attackBonus"+counter).value);
critMin = parseInt(document.getElementById("critMin"+counter).value);
attacksPerTurn = parseInt(document.getElementById("attacksPerTurn"+counter).value);
hitChance = ( 21 + attackBonus - targetAC ) / 20;
critChance = ( 21 - critMin ) / 20;
hitChancePct = ( hitChance - critChance ) * 100;
critChancePct = critChance * 100;
missChancePct = ( 1 - hitChance ) * 100;
damageRoll = parseInt(document.getElementById("damageRoll"+counter).value);
damageBonus = parseInt(document.getElementById("damageBonus"+counter).value);
damageBonusCrit = parseInt(document.getElementById("damageBonusCrit"+counter).value);
damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul"+counter).value) * 2;
damageOnMiss = parseInt(document.getElementById("damageOnMiss"+counter).value);
damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;

// event listener for accuracy type
function allEventListeners(){
    document.getElementById("accuracyType"+counter).addEventListener("change", () => {
        hitChanceOutput("hitChanceOutput"+counter),
        critChanceOutput("critChanceOutput"+counter),
        hitChancePctOutput("hitChancePctOutput"+counter),
        critChancePctOutput("critChancePctOutput"+counter),
        missChancePctOutput("missChancePctOutput"+counter),
        damageAvgOutput("damageAvgOutput"+counter)
    });
    
    // event listener for target AC
    document.getElementById("targetAC"+counter).addEventListener("input", () => {
        hitChanceOutput("hitChanceOutput"+counter),
        hitChancePctOutput("hitChancePctOutput"+counter),
        missChancePctOutput("missChancePctOutput"+counter),
        damageAvgOutput("damageAvgOutput"+counter)
    });
    
    // event listener for attack bonus
    document.getElementById("attackBonus"+counter).addEventListener("input", () => {
        hitChanceOutput("hitChanceOutput"+counter),
        hitChancePctOutput("hitChancePctOutput"+counter),
        missChancePctOutput("missChancePctOutput"+counter),
        damageAvgOutput("damageAvgOutput"+counter)
    });
    
    // event listener for min. to crit
    document.getElementById("critMin"+counter).addEventListener("input", () => {
        hitChanceOutput("hitChanceOutput"+counter),
        critChanceOutput("critChanceOutput"+counter),
        hitChancePctOutput("hitChancePctOutput"+counter),
        critChancePctOutput("critChancePctOutput"+counter),
        missChancePctOutput("missChancePctOutput"+counter),
        damageAvgOutput("damageAvgOutput"+counter)
    });
    
    // event listeners for damage per turn
    document.getElementById("attacksPerTurn"+counter).addEventListener("input", () => { damageAvgOutput("damageAvgOutput"+counter) });
    document.getElementById("damageRoll"+counter).addEventListener("input", () => { damageAvgOutput("damageAvgOutput"+counter) });
    document.getElementById("damageBonus"+counter).addEventListener("input", () => { damageAvgOutput("damageAvgOutput"+counter) });
    document.getElementById("damageBonusCrit"+counter).addEventListener("input", () => { damageAvgOutput("damageAvgOutput"+counter) });
    document.getElementById("damageBonusCritMul"+counter).addEventListener("input", () => { damageAvgOutput("damageAvgOutput"+counter) });
    document.getElementById("damageOnMiss"+counter).addEventListener("input", () => { damageAvgOutput("damageAvgOutput"+counter) });
}
allEventListeners();

// calculate chance to hit (includes crit chance)
function hitChanceOutput(outputID) {
    let accuracyType = document.getElementById("accuracyType"+counter).value
    let targetAC = parseInt(document.getElementById("targetAC"+counter).value);
    let attackBonus = parseInt(document.getElementById("attackBonus"+counter).value);
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
    let accuracyType = document.getElementById("accuracyType"+counter).value;
    let critMin = parseInt(document.getElementById("critMin"+counter).value);
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
    let hitChance = parseFloat(document.getElementById("hitChanceOutput"+counter).value);
    let critChance = parseFloat(document.getElementById("critChanceOutput"+counter).value);
    hitChancePct = ( hitChance - critChance ) * 100;
    // output
    document.getElementById(outputID).value = hitChancePct.toFixed(0);
}

// calculate chance to crit as a percentage
function critChancePctOutput(outputID) {
    let critChance = parseFloat(document.getElementById("critChanceOutput"+counter).value);
    critChancePct = critChance * 100;
    // output
    document.getElementById(outputID).value = critChancePct.toFixed(0);
}

// calculate chance to miss as a percentage
function missChancePctOutput(outputID) {
    let hitChance = parseFloat(document.getElementById("hitChanceOutput"+counter).value);
    missChancePct = ( 1 - hitChance ) * 100;
    // output
    document.getElementById(outputID).value = missChancePct.toFixed(0);
}

// calculate damage per turn
function damageAvgOutput(outputID) {
    let attacksPerTurn = parseInt(document.getElementById("attacksPerTurn"+counter).value);
    let damageRoll = parseInt(document.getElementById("damageRoll"+counter).value);
    let damageBonus = parseInt(document.getElementById("damageBonus"+counter).value);
    let damageBonusCrit = parseInt(document.getElementById("damageBonusCrit"+counter).value);
    let damageBonusCritMul = parseInt(document.getElementById("damageBonusCritMul"+counter).value);
    let damageOnMiss = parseInt(document.getElementById("damageOnMiss"+counter).value);
    let damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;
    // output
    if(!isNaN(damageAvg.toFixed(2))){
        // document.getElementById(outputID).textContent = damageAvg.toFixed(2) / attacksPerTurn + " x " + attacksPerTurn;
        document.getElementById(outputID).textContent = damageAvg.toFixed(2);

    }else{
        document.getElementById(outputID).textContent = 0;
    }

}

document.getElementById("hitChanceOutput"+counter).value = hitChance;
document.getElementById("critChanceOutput"+counter).value = critChance;
document.getElementById("hitChancePctOutput"+counter).value = hitChancePct;
document.getElementById("critChancePctOutput"+counter).value = critChancePct;
document.getElementById("missChancePctOutput"+counter).value = missChancePct;
document.getElementById("damageAvgOutput"+counter).value = damageAvg;



