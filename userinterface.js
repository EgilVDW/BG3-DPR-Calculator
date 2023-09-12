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
    }else{
        minSpan.setAttribute("id", newid);
    }
    
    //paragraph
    para.setAttribute("class", "infotext");
    para.textContent = text

    //button
    minButtonDown.setAttribute("type", "submit");
    minButtonDown.setAttribute("id", button1id+counter);
    minButtonDown.setAttribute("class", "buttons");
    minButtonDown.textContent = "<";

    //input
    minInput.setAttribute("type", "text");
    minInput.setAttribute("id", inputid+counter);
    minInput.setAttribute("class", "inputfields");

    //button
    minButtonUp.setAttribute("type", "submit");
    minButtonUp.setAttribute("id", button2id+counter);
    minButtonUp.setAttribute("class", "buttons");
    minButtonUp.textContent = ">";
    
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
    document.body.appendChild(dropdown);
    dropdown.append(label, optiondis, optionstd, optionadv);
}

//miss, hit, crit output fields
function chances(spanid, text, inputid){
    let span = document.createElement("SPAN");
    let paragraph = document.createElement("P");
    let Chance = document.createElement("INPUT");

    span.setAttribute("id", spanid+counter);

    paragraph.textContent = text;
    Chance.setAttribute("id", inputid+counter);
    Chance.setAttribute("readonly", "true");

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

    //append
    document.body.appendChild(span);
    span.append(paragraph, inputfield, readinput);
}

// call all calculator html element functions with their paramaters
function addAttack(){
    createHtml("minHitSpan", "Min. to hit", "minHitButtonDown", "minHitInput", "minHitButtonUp");
    createHtml("minCritSpan", "Min. to crit", "minCritButtonDown", "minCritInput", "minCritButtonUp");
    createHtml("attackturnSpan", "Attacks/turn", "attackButtonDown", "attackTurnInput", "attackButtonUp");
    
    createDropdown("accuracyspan", "dropdown", "accuracytype", "Disadvantage", "Standard", "Advantage");
    document.getElementById("accuracytype"+counter).selectedIndex = "1";
    
    chances("missspan", "Miss % chance", "miss");
    chances("hitspan", "Hit % chance", "hit");
    chances("critspan", "Crit % chance", "crit");
    
    damage("dohspan", "Damage on hit", "dohinput", "dohoutput");
    damage("adnotspan", "Additional damage NOT multiplied Critical hit", "adnotinput", "adnotoutput");
    damage("dbnotmultispan", "Damage bonus on crit (not multiplied)", "dbnotmultiinput", "dbnotmultioutput");
    damage("dbdicemultispan", "Damage bonus on crit (dice multiplied)", "dbdicemultiinput", "dbdicemultioutput");
    damage("dmissspan", "Damage dealt on miss", "dmissinput", "dmissoutput");
}

//addattack button and call the addAttack function onclick
let addAttackButton = document.createElement("BUTTON");
addAttackButton.textContent = "add attack";
addAttackButton.setAttribute("onclick", "addAttack()");
document.body.appendChild(addAttackButton);





