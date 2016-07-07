﻿$(function () {
    'use strict';

    var json = $.getJSON('data/data2.json', function (data) {
        //console.log(data[0].area);
        //console.log(data[1].area);
        $.each(data, function (index, data) {
            //console.log(data);
            //loop through all the areas' subarea titles
            $.each(data.subareas, function (index, subareas) {
                //console.log(subareas.title);
                //console.log(subareas);
                //append subarea titles to step 2's first dropdown menu
                var subareaTitle = subareas.title;
                $('#menu').append('<option>' + subareaTitle + '</option>');

            });
        });
    });


    $('#btn_Next').click(function (e) {
        e.preventDefault();
        var subarea = document.getElementById('menu');
        var selectedSubarea = subarea.options[subarea.selectedIndex].value;
        $('.nav a[href="#tab-insatser"]').tab('show');
        var chosenDelomrade = document.getElementById('chosenDelomrade');
        chosenDelomrade.innerHTML = selectedSubarea;
        showInsatserList();
    });

    window.unlockCheckboxes = function (i) {
        $('input.group2_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group3_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group4_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group5_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group6_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group7_' + i + '').removeAttr('disabled', 'disabled');
    }

    function getSelectedSubareaInsatslist() {
        var insatserlistPromise = jQuery.Deferred();
        $.getJSON('data/data2.json', function (data) {
            $.each(data, function (index, data) {
                $.each(data.subareas, function (index, subareas) {
                    var selectedSubarea = document.getElementById('chosenDelomrade').innerHTML;
                    if (subareas.title == selectedSubarea) {
                        insatserlistPromise.resolve(subareas.insatslist);
                    };
                });
            });
        });
        return insatserlistPromise.promise();
    }
    function showInsatserList() {
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            $('#accordion ul li').remove();
            for (var i in insatserlist) {
                $('#insatserlist').append('<li><a id="insats' + i + '" data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="true">' + insatserlist[i].title + '</a> '
                    + '<div id="collapse' + i + '" class="collapse" ><div class ="list-group">'
                    + ' <ul id="questionlist' + i + '"><li class="qlistHeader">Insatsens bedömning</li></ul></div></li></li>');
                appendQuestionList(i);
                oneCheckboxAtATime(i);              
            }     
        });
        
    }
    function appendQuestionList(i) {
        $('.list-group #questionlist' + i + '').append('<li id="q1"><div class="question col-xs-6">Kan insatsen möta behoven? </div><div class="qoptions col-xs-6">'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="uncheckAll" class="group1_'+i+'" value="0"><label>Nej</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="uncheckAll" class="group1_' + i + '" value="1"><label class="longlabel">Sannolikt inte</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="uncheckAll" class="group1_'+i+'" value="2"><label>Osäkert</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group1" class="group1_' + i + '" value="3"><label class="longlabel">Sannolikt Ja</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group1" class="group1_'+i+'" value="4"><label>Ja</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group1" class="group1_' + i + '" value="5"><label>Varierar</label></span>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q2"><div class="question col-xs-6"">Vilken prioritering har insatsen i NR? </div><div class="qoptions col-xs-6">'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="0"><label>1</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="1"><label>2</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="2"><label>3</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="3"><label>4</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="4"><label>5</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="5"><label>Annan</label></span>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q3"><div class="question col-xs-6"">Är insatsen värderingsmässigt acceptabel för de flesta aktörer? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q4"><div class="question col-xs-6"">Är de förväntade oönskade effekterna av insatsen små? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q5"><div class="question col-xs-6"">Är insatsen möjlig att implementera utan anpassning? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q6"><div class="question col-xs-6"">Är behovet av resurser (tid, pengar, kunskap, personal) för att genomföra insatsen lågt? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q7"><div class="question col-xs-6"">Är insatsen hållbar på lång sikt? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
    }
    function oneCheckboxAtATime(i) {
        $('input.group1_'+i+'').on('change', function () {
            $('input.group1_' + i + '').not(this).prop('checked', false);
            var value = $(this).val();            
            if (value == 3 || value == 4 || value == 5) {
                unlockCheckboxes(i);
            } else {
                lockCheckboxes();
            }
        });
        $('input.group2_' + i + '').on('change', function () {
            $('input.group2_' + i + '').not(this).prop('checked', false);
        });
        $('input.group3_' + i + '').on('change', function () {
            $('input.group3_' + i + '').not(this).prop('checked', false);
        });
        $('input.group4_' + i + '').on('change', function () {
            $('input.group4_' + i + '').not(this).prop('checked', false);
        });
        $('input.group5_' + i + '').on('change', function () {
            $('input.group5_' + i + '').not(this).prop('checked', false);
        });
        $('input.group6_' + i + '').on('change', function () {
            $('input.group6_' + i + '').not(this).prop('checked', false);
        });
        $('input.group7_' + i + '').on('change', function () {
            $('input.group7_' + i + '').not(this).prop('checked', false);
        });
    }



    //$(document).on('show.bs.collapse', '#accordion .collapse', function () {
    //    var all = $('#accordion').find('.collapse');
    //    var actives = $('#accordion').find('.in, .collapsing');
    //    all.each(function (index, element) {
    //        $(element).collapse('hide');
    //    });
    //    actives.each(function (index, element) {
    //        $(element).collapse('show');
    //    });
    //});
    


    //$(document).on('change', '#uncheckAll:checkbox', function () {
    //    var others = $('input:checkbox').not('#uncheckAll');
    //    if (this.checked) {
    //        others.prop('checked', false);
    //    }
    //});
    //$(document).on('change', '#group1', function () {
    //    $('input.group1').not(this).prop('checked', false);
 

  

    $(document).on('hide.bs.collapse', '#accordion .collapse', function () {
        alert('yolo!');
        getQuestionArray();
    });

    var questionsArray = [];

    function getQuestionArray() {
        var i = 0;
        if (i == i) i++;
        $('#questionlist' + i + '').each(function () {
            var question = {
                question: "text",
                value: "0"
            };
            question.question = $('.question').text();
            question.value = $(this).closest('input:checkbox').find($('input:checked')).val();
            questionsArray.push(question);
            //console.log(question.value);
            //console.log(question.question);
        });
        console.log(questionsArray);

    }

    window.lockCheckboxes = function () {
        $('.group2').attr('disabled', 'disabled');
    }

    window.toggleOpacity = function () {
        $('#q').toggleClass('opacity');
    }




});




//$('.collapse').on('show.bs.collapse', function () {
//    alert('hej');
//    $otherPanels = $(this).parents('.panel-group').siblings('.panel-group');
//    $('.collapse', $otherPanels).removeClass('in');
//});
