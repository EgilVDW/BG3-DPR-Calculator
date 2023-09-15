function subButtonValue(inputid){
    let theIncreaseField = document.getElementById(inputid).value;
    parseInt(theIncreaseField);
    theIncreaseField--;
    document.getElementById(inputid).value = theIncreaseField.toString();
    allOutputs();
}

function addButtonValue(inputid){
    let theIncreaseField = document.getElementById(inputid).value;
    parseInt(theIncreaseField);
    theIncreaseField++;
    document.getElementById(inputid).value = theIncreaseField.toString();
    allOutputs();
}