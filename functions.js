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

function initialValues(){
    document.getElementById("targetAC"+counter).value = 8;
    document.getElementById("attackBonus"+counter).value = 0;
    document.getElementById("critMin"+counter).value = 20;
    document.getElementById("attacksPerTurn"+counter).value = 1;
    document.getElementById("hitChanceOutput"+counter).value = hitChance;
    document.getElementById("critChanceOutput"+counter).value = critChance;
    document.getElementById("hitChancePctOutput"+counter).value = hitChancePct;
    document.getElementById("critChancePctOutput"+counter).value = critChancePct;
    document.getElementById("missChancePctOutput"+counter).value = missChancePct;
    document.getElementById("damageRollAvg"+counter).value = 0;
    document.getElementById("damageBonusAvg"+counter).value = 0;
    document.getElementById("damageBonusCritAvg"+counter).value = 0;
    document.getElementById("damageBonusCritMulAvg"+counter).value = 0;
    document.getElementById("damageOnMissAvg"+counter).value = 0;
    document.getElementById("damageRollAvg"+counter).value = 0;
    document.getElementById("damageRollAvg"+counter).value = 0;
    document.getElementById("damageRollAvg"+counter).value = 0;
    document.getElementById("damageAvgOutput"+counter).value = damageAvg;
}
initialValues();

function allOutputs(){
    hitChanceOutput("hitChanceOutput"+counter),
    critChanceOutput("critChanceOutput"+counter),
    hitChancePctOutput("hitChancePctOutput"+counter),
    critChancePctOutput("critChancePctOutput"+counter),
    missChancePctOutput("missChancePctOutput"+counter),
    damageAvgOutput("damageAvgOutput"+counter)
}
allOutputs();

function allEventListeners(){
    // event listener for accuracy type
    document.getElementById("accuracyType"+counter).addEventListener("change", () => { allOutputs() });
    
    // event listener for target AC
    document.getElementById("targetAC"+counter).addEventListener("input", () => { allOutputs() });
    
    // event listener for attack bonus
    document.getElementById("attackBonus"+counter).addEventListener("input", () => { allOutputs() });
    
    // event listener for min. to crit
    document.getElementById("critMin"+counter).addEventListener("input", () => { allOutputs() });
    
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
    if ( accuracyType == "Advantage" ) {
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
    else if ( accuracyType == "Disadvantage" ) {
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
    if ( accuracyType == "Advantage" ) {
        critChance = 1 - ( 1 - ( 21 - critMin ) / 20 ) * ( 1 - ( 21 - critMin ) / 20 );
        // output
        document.getElementById(outputID).value = critChance;
    }
    // chance to crit with disadvantage
    else if ( accuracyType == "Disadvantage" ) {
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
    document.getElementById(outputID).value = hitChancePct.toFixed(2);
}

// calculate chance to crit as a percentage
function critChancePctOutput(outputID) {
    let critChance = parseFloat(document.getElementById("critChanceOutput"+counter).value);
    critChancePct = critChance * 100;
    // output
    document.getElementById(outputID).value = critChancePct.toFixed(2);
}

// calculate chance to miss as a percentage
function missChancePctOutput(outputID) {
    let hitChance = parseFloat(document.getElementById("hitChanceOutput"+counter).value);
    missChancePct = ( 1 - hitChance ) * 100;
    // output
    document.getElementById(outputID).value = missChancePct.toFixed(2);
}

function avgRoll (s, m, n, f, a) {
    m = parseInt( m );
    if( isNaN( m ) ) m = 1;
    n = parseInt( n );
    if( isNaN( n ) ) n = 1;
    f = parseInt( f );
    a = typeof(a) == 'string' ? parseInt( a.replace(/\s/g, '') ) : 0;
    if( isNaN( a ) ) a = 0;
    let r = 0;
    for( let i=0; i<n; i++ )
        r += ( m + f ) / 2;
    return r + a;
}

function parseAvgRoll( de ) {
    return avgRoll.apply( this, de.match(/(?:(\d+)\s*\*\s*)?(\d*)d(\d+)(?:\s*([\+\-]\s*\d+))?/i) );
}

// calculate damage per turn
function damageAvgOutput(outputID) {
    let attacksPerTurn = parseInt(document.getElementById("attacksPerTurn"+counter).value);
    let damageRoll = parseFloat(document.getElementById("damageRoll"+counter).value);
    let damageRollDice = parseAvgRoll(document.getElementById("damageRoll"+counter).value);
    if ( !isNaN(damageRollDice) ) {
        damageRoll = damageRollDice;
    }
    else if ( Number.isNaN(damageRoll) ) {
        damageRoll = 0;
    }
    let damageBonus = parseFloat(document.getElementById("damageBonus"+counter).value);
    let damageBonusDice = parseAvgRoll(document.getElementById("damageBonus"+counter).value);
    if ( !isNaN(damageBonusDice) ) {
        damageBonus = damageBonusDice;
    }
    else if ( Number.isNaN(damageBonus) ) {
        damageBonus = 0;
    }
    let damageBonusCrit = parseFloat(document.getElementById("damageBonusCrit"+counter).value);
    let damageBonusCritDice = parseAvgRoll(document.getElementById("damageBonusCrit"+counter).value);
    if ( !isNaN(damageBonusCritDice) ) {
        damageBonusCrit = damageBonusCritDice;
    }
    else if ( Number.isNaN(damageBonusCrit) ) {
        damageBonusCrit = 0;
    }
    let damageBonusCritMul = parseFloat(document.getElementById("damageBonusCritMul"+counter).value);
    let damageBonusCritMulDice = parseAvgRoll(document.getElementById("damageBonusCritMul"+counter).value);
    if ( !isNaN(damageBonusCritMulDice) ) {
        damageBonusCritMul = damageBonusCritMulDice;
    }
    else if ( Number.isNaN(damageBonusCritMul) ) {
        damageBonusCritMul = 0;
    }
    let damageOnMiss = parseFloat(document.getElementById("damageOnMiss"+counter).value);
    let damageOnMissDice = parseAvgRoll(document.getElementById("damageOnMiss"+counter).value);
    if ( !isNaN(damageOnMissDice) ) {
        damageOnMiss = damageOnMissDice;
    }
    else if ( Number.isNaN(damageOnMiss) ) {
        damageOnMiss = 0;
    }
    document.getElementById("damageRollAvg"+counter).value = damageRoll;
    document.getElementById("damageBonusAvg"+counter).value = damageBonus;
    document.getElementById("damageBonusCritAvg"+counter).value = damageBonusCrit;
    document.getElementById("damageBonusCritMulAvg"+counter).value = damageBonusCritMul;
    document.getElementById("damageOnMissAvg"+counter).value = damageOnMiss;
    let damageAvg = ( hitChance * ( damageRoll + damageBonus ) + critChance * ( damageRoll + damageBonusCrit + damageBonusCritMul ) + damageOnMiss * ( 1 - hitChance )) * attacksPerTurn;
    // output
    if ( !isNaN(damageAvg.toFixed(2)) ) {
        document.getElementById(outputID).textContent = damageAvg.toFixed(2);
    }
    else {
        document.getElementById(outputID).textContent = 0;
    }
}