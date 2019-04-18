let amount = 0;
let $total = $('<label>Total: $<span id="total"></span></label>');

$total.insertAfter(".activities");
$total.hide();

$("#name").focus();
$("#other-title").hide();

$("#title").on("change", $('option[value="other"]'), function() {
    if($("#title").val() == "other"){
        $("#other-title").show();
    }
});

$("#design").on("change", function(){

    if($(this).val() === "js puns"){
        $('#color option').removeAttr("selected");
        $("#color option").show();
        $("#color option").filter('[value="tomato"], [value="steelblue"], [value="dimgrey"]').hide();
        $('#color option[value="cornflowerblue"]').attr('selected', 'selected');
    }else if( $(this).val() === "heart js"){
        $('#color option').removeAttr("selected");
        $("#color option").show();
        $("#color option").filter('[value="darkslategrey"], [value="gold"], [value="cornflowerblue"]').hide();
        $('#color option[value="tomato"]').attr('selected', 'selected');
    }

});

function disableActivities(activity, other){
    const checked = $(`input[name=${activity}]`).prop("checked");
    if(checked){
        $(`input[name=${other}]`).attr("disabled", "disabled");
        $(`input[name=${other}]`).parent().css({"text-decoration":"line-through", "color":"grey"});
    }else if(!checked){
        $(`input[name=${other}]`).attr("disabled", false);
        $(`input[name=${other}]`).parent().css({"text-decoration":"", "color":"black"});
    }
}

function calcTotal(activity, dollar){
    const checked = $(`input[name=${activity}]`).prop("checked");
    if(checked){
        amount += dollar;
    }else if(!checked){
        amount -= dollar;
    }
    $("#total").text(amount);
}

$(".activities").on("change", "input", function() {
    $total.show();
    if($(this).attr("name") == "all"){
        calcTotal($(this).attr("name"), 200);
    }else if($(this).attr("name") == "js-frameworks"){
        disableActivities($(this).attr("name"), "express");
        disableActivities($(this).attr("name"), "build-tools");
        calcTotal($(this).attr("name"), 100);
    }
    else if($(this).attr("name") === "express"){
        disableActivities($(this).attr("name"), "js-frameworks");
        disableActivities($(this).attr("name"), "build-tools");
        calcTotal($(this).attr("name"), 100);
    }
    else if($(this).attr("name") === "build-tools"){
        disableActivities($(this).attr("name"), "express");
        disableActivities($(this).attr("name"), "js-frameworks");
        calcTotal($(this).attr("name"), 100);
    }
    else if($(this).prop("name") === "node"){
        disableActivities($(this).attr("name"), "js-libs");
        disableActivities($(this).attr("name"), "npm");
        calcTotal($(this).attr("name"), 100);
    }
    else if($(this).prop("name") === "js-libs"){
        disableActivities($(this).attr("name"), "node");
        disableActivities($(this).attr("name"), "npm");
        calcTotal($(this).attr("name"), 100);
    }
    else if($(this).prop("name") === "npm"){
        disableActivities($(this).attr("name"), "js-libs");
        disableActivities($(this).attr("name"), "node");
        calcTotal($(this).attr("name"), 100);
    }
});

function showDefaultPayment(){
    $("#payment").val("credit card");
    $('#payment option[value="credit card"]').attr("selected", "selected");
    $("#credit-card").show();
    $("p").hide();
}

showDefaultPayment();

$("#payment").on("change", function() {
    if($("#payment").val() == "paypal"){
        $("#credit-card").hide();
        $("p").eq(1).hide();
        $("p").eq(0).show();
    }else if($("#payment").val() == "bitcoin"){
        $("#credit-card").hide();
        $("p").eq(0).hide();
        $("p").eq(1).show();
    }else {
        showDefaultPayment();
    }
});

function nameIsValid(){
    const regEx = /\S+/;
    return regEx.test($("#name").val());
}

function emailIsValid(){
    const regEx = /^\w+@\w+\.\w+$/
    return regEx.test($("#mail").val());
}

function isChecked(){
         return $("input:checked").length > 0;
}

function creditCardisValid(){
    const creditNumberRegEx = /^\w{13,16}$/;
    const zipRegEx = /^\d{5}$/;
    const cvvRegEx = /^\d{3}$/;

    return (creditNumberRegEx.test($('#cc-num').val()) && zipRegEx.test($('#zip').val()) && cvvRegEx.test($('#cvv').val())); 
}

function renderError($error, where){
    $($error).insertAfter($(where));
    $(".error").css("color", "red")
}

$('form').on("submit", function(e) {
    if(!nameIsValid()){
        $("#name").css("border", "3px solid red");
        e.preventDefault();
    }else{
        $("#name").css("border", "");
    }

    if(!emailIsValid()){
        $("#mail").css("border", "3px solid red");
        e.preventDefault();
    }else {
        $("#mail").css("border", "");
    }

    if($("#payment").val() == "credit card" && !creditCardisValid()){
        $("#errorCredit").hide();
        renderError("<p id='errorCredit' class='error'>Please enter a valid Credit Card</p>", "#payment");
        e.preventDefault();
    }else {
        $("#errorCredit").hide();
    }
    
    if(!isChecked()){
        $("#errorCheckBox").hide();
        renderError("<p id='errorCheckBox' class='error'>Please chose atleast one Activity</p>", ".activities");
        e.preventDefault();
    }else{
        $("#errorCheckBox").hide();
    }
});


