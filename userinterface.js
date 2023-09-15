let counter = 0;
counter = counter.toString();
 
//create button - input - button combination
function createHtml(spanid, text, button1id, inputid, button2id){
    let minSpan = document.createElement("SPAN");
    let para = document.createElement("P");
    let minButtonDown = document.createElement("BUTTON");
    let minInput = document.createElement("INPUT");
    let minButtonUp = document.createElement("BUTTON");
    
    //check if id is in use, if so +1 counter and add counter to id
    let newid = spanid + counter;
    if(document.body.contains(document.getElementById(newid))){
        counter++;
        newid = spanid + counter;
        minSpan.setAttribute("id", newid);
        minSpan.setAttribute("class", "non-edit"+counter)
    }else{
        minSpan.setAttribute("id", newid);
        minSpan.setAttribute("class", "non-edit"+counter)
    }
    
    //paragraph
    para.setAttribute("class", "infotext");
    para.textContent = text

    //button
    minButtonDown.setAttribute("type", "submit");
    minButtonDown.setAttribute("id", button1id+counter);
    minButtonDown.setAttribute("class", "buttons");
    minButtonDown.setAttribute("onclick", "subButtonValue("+"'"+inputid+counter+"'"+")")
    minButtonDown.textContent = "-";

    //input
    minInput.setAttribute("type", "text");
    minInput.setAttribute("id", inputid+counter);
    minInput.setAttribute("class", "inputfields");

    //button
    minButtonUp.setAttribute("type", "submit");
    minButtonUp.setAttribute("id", button2id+counter);
    minButtonUp.setAttribute("class", "buttons");
    minButtonUp.setAttribute("onclick", "addButtonValue("+"'"+inputid+counter+"'"+")")
    minButtonUp.textContent = "+";
    
    //append
    document.body.appendChild(minSpan);
    minSpan.append(para, minButtonDown, minInput, minButtonUp);

}

//create dropdown with 3 options chosen from paramater
function createDropdown(spanid, labelfor, dropdownid, option1, option2, option3){
    counter = counter.toString();
    let span = document.createElement("SPAN");
    let para = document.createElement("P");
    let label = document.createElement("LABEL");
    let dropdown = document.createElement("SELECT");
    let optiondis = document.createElement("OPTION");
    let optionstd = document.createElement("OPTION");
    let optionadv = document.createElement("OPTION");

    //span
    span.setAttribute("id", spanid+counter);
    span.setAttribute("class", "non-edit"+counter)

    //paragraph
    para.setAttribute("class", "infotext");
    para.textContent = "Accuracy type";

    //label
    label.setAttribute("for", labelfor);

    //dropdown
    dropdown.setAttribute("name", labelfor);
    dropdown.setAttribute("id", dropdownid+counter);
    dropdown.setAttribute("class", "accuracydropdown")

    //options
    optiondis.value = option1;
    optiondis.text = option1;

    optionstd.value = option2;
    optionstd.text = option2;

    optionadv.value = option3;
    optionadv.text = option3;

    //append
    document.body.appendChild(span);
    span.appendChild(para);
    span.appendChild(dropdown);
    dropdown.append(label, optiondis, optionstd, optionadv);
}

//miss, hit, crit output fields
function chances(spanid, text, inputid){
    let span = document.createElement("SPAN");
    let paragraph = document.createElement("P");
    let Chance = document.createElement("INPUT");

    span.setAttribute("id", spanid+counter);
    span.setAttribute("class", "non-edit"+counter)

    paragraph.textContent = text;
    Chance.setAttribute("id", inputid+counter);
    Chance.setAttribute("readonly", "true");
    Chance.setAttribute("class", "readclass")

    document.body.appendChild(span);
    span.append(paragraph, Chance);
}

//input damage fields with additional readonly output
function damage(spanid, text, inputid, outputid){
    let span = document.createElement("SPAN");
    let paragraph = document.createElement("P");
    let inputfield = document.createElement("INPUT");
    let readinput = document.createElement("INPUT");

    //span
    span.setAttribute("id", spanid+counter)
    span.setAttribute("class", "non-edit"+counter)

    //paragraph
    paragraph.setAttribute("class", "infotext");
    paragraph.textContent = text;

    //input
    inputfield.setAttribute("type", "text");
    inputfield.setAttribute("id", inputid+counter);

    //output
    readinput.setAttribute("type", "text");
    readinput.setAttribute("id", outputid+counter);
    readinput.setAttribute("readonly", "true");
    readinput.setAttribute("class", "readclass")

    //append
    document.body.appendChild(span);
    span.append(paragraph, inputfield, readinput);
}

//hidden input fields for temp calculations
function hiddenInputs(inputid){
    let span = document.createElement("SPAN");
    let input = document.createElement("INPUT");

    //span
    span.setAttribute("class", "non-edit"+counter)

    //input
    input.setAttribute("id", inputid+counter);
    input.setAttribute("hidden", true);

    //apend
    document.body.appendChild(span);
    span.append(input);
}

//create tables and add cells if condition met
let dprtable;
let row;
let th;
let cell;
function createDprTable(tdid){
    dprtable = document.createElement("TABLE");
    row = dprtable.insertRow();
    th = document.createElement("TH");
    th.textContent = "Attack #"+1;
    cell = row.insertCell();
    cell.setAttribute("id", tdid+counter);
    row.appendChild(th);
    row.appendChild(cell);
    document.body.appendChild(dprtable);
}

createDprTable("damageAvgOutput");
let attackCounter=1;

function dprOutput(tdid){
    if(counter>=1){
        attackCounter++;
        row = dprtable.insertRow();
        th = document.createElement("TH");
        th.textContent = "Attack #"+attackCounter;
        cell = row.insertCell();
        cell.setAttribute("id", tdid+counter);
        row.appendChild(th);
        row.appendChild(cell);
    }
}
let internalCounter = 0;
// call all calculator html element functions with their paramaters
function addAttack(){
    createHtml("tacSpan", "Target's armor class", "tacButtonDown", "targetAC", "tacButtonUp");
    createHtml("abSpan", "Attack bonus", "abButtonDown", "attackBonus", "abButtonUp");
    createHtml("minCritSpan", "Min. to crit", "minCritButtonDown", "critMin", "minCritButtonUp");
    createHtml("attackturnSpan", "Attacks/turn", "attackButtonDown", "attacksPerTurn", "attackButtonUp");
    
    createDropdown("accuracyspan", "dropdown", "accuracyType", "Disadvantage", "Standard", "Advantage");
    document.getElementById("accuracyType"+counter).selectedIndex = "1";
    
    chances("missspan", "Miss % chance", "missChancePctOutput");
    chances("hitspan", "Hit % chance", "hitChancePctOutput");
    chances("critspan", "Crit % chance", "critChancePctOutput");
    
    damage("dohspan", "Damage on hit", "damageRoll", "damageRollAvg");
    damage("adnotspan", "Additional damage NOT multiplied Critical hit", "damageBonus", "damageBonusAvg");
    damage("dbnotmultispan", "Damage bonus on crit (not multiplied)", "damageBonusCrit", "damageBonusCritAvg");
    damage("dbdicemultispan", "Damage bonus on crit (dice multiplied)", "damageBonusCritMul", "damageBonusCritMulAvg");
    damage("dmissspan", "Damage dealt on miss", "damageOnMiss", "damageOnMissAvg");

    hiddenInputs("hitChanceOutput");
    hiddenInputs("critChanceOutput");
    dprOutput("damageAvgOutput");
    if(counter>0){
        [...document.getElementsByClassName('non-edit'+internalCounter)].forEach(el => {
            el.style.opacity = "0.3";
        });
        internalCounter++;
    }

}

//addattack button and call the addAttack function onclick
let addAttackButton = document.createElement("BUTTON");
addAttackButton.textContent = "Add attack";
addAttackButton.setAttribute("onclick", "addAttack();allEventListeners();initialValues();");
document.body.appendChild(addAttackButton);

//damage pr round button and output
let dmgoutput = document.createElement("DIV");
let dmgoutputbtn = document.createElement("BUTTON");
dmgoutputbtn.setAttribute("onclick", "getDamagePerRound();");
dmgoutputbtn.textContent = "Total damage pr round";
dmgoutput.setAttribute("id", "dmgprround");

document.body.appendChild(dmgoutput);
document.body.appendChild(dmgoutputbtn);

let oneAttackVal;
let temp;
function getDamagePerRound(){
    let sum = 0;
    for(var i=0; i<=counter; i++){
        oneAttackVal = parseFloat(document.getElementById("damageAvgOutput"+i).innerText);
        sum += oneAttackVal;
        console.log(parseFloat(document.getElementById("damageAvgOutput"+i).innerText));
    }
    dmgoutput.innerHTML = sum;
}
addAttack();