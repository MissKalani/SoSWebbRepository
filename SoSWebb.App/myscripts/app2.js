$(function () {
    'use strict';
    $('#reportStorage').hide();
    $('#nav_tab-insatser').hide();
    $('#insatserDivP2').hide();

    //following functions are arranged according to process flow of data
    //show menu items and click next
    var json = $.getJSON('data/data2.json', function (data) {
        $.each(data, function (index, data) {
            $.each(data.subareas, function (index, subareas) {
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
        $('#nav_tab-insatser').show();
        $('#nav_tab-delomrade').hide();
    });

    //reading data2.json and return as promise
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
    //show promise
    function showInsatserList() {
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            $('#accordion ul li').remove();
            for (var i in insatserlist) {
                checkTitle(insatserlist[i].title);
                $('#insatserlist').append('<div class="panel-heading" role="tab" id="insats' + i + '">'
                    + '<h4 class="panel-title"><a role="button" class="insatserListBtn"'
                    + 'data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">'
                    + '<span class="glyphicon glyphicon-arrow-down insatsArrow"></span> ' + insatserlist[i].title + '<span class="insatsMarkering"></span></a></h4></div> '
                    + '<input type="hidden" value="' + insatserlist[i].title + '" />'
                    + '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapse' + i + '"><div class ="panel-body list-group">'
                    + ' <div id="questionlist' + i + '"></div>'
                    + ' </div></div>');
                appendQuestionList(i);
                oneCheckboxAtATime(i);
            }
        });
    }

    //bedömning av insatser functions
    function checkTitle(insatsTitle) {
        if (insatsTitle.indexOf('*') > -1) {
            $('#insatserDivP2').show();
        }
    }
    function appendQuestionList(i) {
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q1"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Kan insatsen möta behoven? </strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group1_a' + i + '" class="group1_' + i + '" value="0"><label for="group1_a' + i + '"> Nej</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group1_b' + i + '" class="group1_' + i + '" value="0"><label for="group1_b' + i + '"> Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group1_c' + i + '" class="group1_' + i + '" value="0"><label for="group1_c' + i + '"> Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group1_d' + i + '" class="group1_' + i + '" value="2"><label for="group1_d' + i + '"> Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group1_e' + i + '" class="group1_' + i + '" value="3"><label for="group1_e' + i + '"> Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group1_f' + i + '" class="group1_' + i + '" value="1"><label for="group1_f' + i + '"> Varierar</label></div>'
            + '</div></div>');
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q2"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Vilken prioritering har insatsen i NR?</strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group2_a' + i + '" class="group2_' + i + '" disabled value="5"><label for="group2_a' + i + '"> 1</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group2_b' + i + '" class="group2_' + i + '" disabled value="4"><label for="group2_b' + i + '"> 2</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group2_c' + i + '" class="group2_' + i + '" disabled value="3"><label for="group2_c' + i + '"> 3</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group2_d' + i + '" class="group2_' + i + '" disabled value="2"><label for="group2_d' + i + '"> 4</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group2_e' + i + '" class="group2_' + i + '" disabled value="1"><label for="group2_e' + i + '"> 5</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group2_f' + i + '" class="group2_' + i + '" disabled value="0"><label for="group2_f' + i + '"> Annan</label></div>'
            + '</div></div>');
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q3"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Är insatsen värderingsmässigt acceptabel för de flesta aktörer?</strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group3_a' + i + '" class="group3_' + i + '" disabled value="0"><label for="group3_a' + i + '"> Nej</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group3_b' + i + '" class="group3_' + i + '" disabled value="0"><label for="group3_b' + i + '" > Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group3_c' + i + '" class="group3_' + i + '" disabled value="0"><label for="group3_c' + i + '"> Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group3_d' + i + '" class="group3_' + i + '" disabled value="2"><label for="group3_d' + i + '"> Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group3_e' + i + '" class="group3_' + i + '" disabled value="3"><label for="group3_e' + i + '"> Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group3_f' + i + '" class="group3_' + i + '" disabled value="1"><label for="group3_f' + i + '"> Varierar</label></div>'
            + '</div></div>');
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q4"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Är de förväntade oönskade effekterna av insatsen små?</strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group4_a' + i + '" class="group4_' + i + '" disabled value="0"><label for="group4_a' + i + '"> Nej</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group4_b' + i + '" class="group4_' + i + '" disabled value="0"><label for="group4_b' + i + '"> Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group4_c' + i + '" class="group4_' + i + '" disabled value="0"><label for="group4_c' + i + '"> Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group4_d' + i + '" class="group4_' + i + '" disabled value="2"><label for="group4_d' + i + '"> Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group4_e' + i + '" class="group4_' + i + '" disabled value="3"><label for="group4_e' + i + '"> Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group4_f' + i + '" class="group4_' + i + '" disabled value="1"><label for="group4_f' + i + '"> Varierar</label></div>'
            + '</div></div>');
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q5"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Är insatsen möjlig att implementera utan anpassning?</strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group5_a' + i + '" class="group5_' + i + '" disabled value="0"><label for="group5_a' + i + '"> Nej</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group5_b' + i + '" class="group5_' + i + '" disabled value="0"><label for="group5_b' + i + '"> Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group5_c' + i + '" class="group5_' + i + '" disabled value="0"><label for="group5_c' + i + '"> Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group5_d' + i + '" class="group5_' + i + '" disabled value="2"><label for="group5_d' + i + '"> Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group5_e' + i + '" class="group5_' + i + '" disabled value="3"><label for="group5_e' + i + '"> Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group5_f' + i + '" class="group5_' + i + '" disabled value="1"><label for="group5_f' + i + '"> Varierar</label></div>'
            + '</div></div>');
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q6"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Är behovet av resurser (tid, pengar, kunskap, personal) för att genomföra insatsen lågt?</strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group6_a' + i + '" class="group6_' + i + '" disabled value="0"><label for="group6_a' + i + '"> Nej</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group6_b' + i + '" class="group6_' + i + '" disabled value="0"><label for="group6_b' + i + '"> Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group6_c' + i + '" class="group6_' + i + '" disabled value="0"><label for="group6_c' + i + '"> Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group6_d' + i + '" class="group6_' + i + '" disabled value="2"><label for="group6_d' + i + '"> Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group6_e' + i + '" class="group6_' + i + '" disabled value="3"><label for="group6_e' + i + '"> Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group6_f' + i + '" class="group6_' + i + '" disabled value="1"><label for="group6_f' + i + '"> Varierar</label></div>'
            + '</div></div>');
        $('.list-group #questionlist' + i + '').append('<div class="row" id="q7"><div id="question' + i + '" class="question col-xs-12 col-md-3"><strong>Är insatsen hållbar på lång sikt?</strong></div>'
            + '<div class="qoptions col-xs-12 col-md-9">'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group7_a' + i + '" class="group7_' + i + '" disabled value="0"><label for="group7_a' + i + '"> Nej</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group7_b' + i + '" class="group7_' + i + '" disabled value="0"><label for="group7_b' + i + '"> Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group7_c' + i + '" class="group7_' + i + '" disabled value="0"><label for="group7_c' + i + '"> Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group7_d' + i + '" class="group7_' + i + '" disabled value="2"><label for="group7_d' + i + '"> Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group7_e' + i + '" class="group7_' + i + '" disabled value="3"><label for="group7_e' + i + '"> Ja</label></div>'
            + '<div class="checkboxDiv col-xs-4 col-md-2"><input type="checkbox" id="group7_f' + i + '" class="group7_' + i + '" disabled value="1"><label for="group7_f' + i + '"> Varierar</label></div>'
            + '</div></div>');
    }
    function oneCheckboxAtATime(i) {
        $('input.group1_' + i + '').on('click', function () {
            if ($('input.group1_' + i + '').is(':checked')) {
                $('input.group1_' + i + '').not(this).prop('checked', false);
                var value = $(this).val();
                if (value == 1 || value == 2 || value == 3) {
                    unlockCheckboxes(i);
                } else {
                    lockCheckboxes(i);
                }
            } else {
                lockCheckboxes(i);
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
    function insatserMenuHeight() {
        $('.list-group').height('auto');
        $('.stepB-tabcontent').height('auto');
        var a = $(".stepB-tabcontent").height(),
        b = $(".list-group").height();
        a > b ? $(".list-group").css("height", a) : $(".stepB-tabcontent").css("height", b);

    }

    window.unlockCheckboxes = function (i) {
        $('input.group2_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group3_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group4_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group5_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group6_' + i + '').removeAttr('disabled', 'disabled');
        $('input.group7_' + i + '').removeAttr('disabled', 'disabled');

        $('#questionlist' + i + ' #q2').css('opacity', '1');
        $('#questionlist' + i + ' #q3').css('opacity', '1');
        $('#questionlist' + i + ' #q4').css('opacity', '1');
        $('#questionlist' + i + ' #q5').css('opacity', '1');
        $('#questionlist' + i + ' #q6').css('opacity', '1');
        $('#questionlist' + i + ' #q7').css('opacity', '1');

    }
    window.lockCheckboxes = function (i) {
        $('input.group2_' + i + '').attr('disabled', 'disabled');
        $('input.group3_' + i + '').attr('disabled', 'disabled');
        $('input.group4_' + i + '').attr('disabled', 'disabled');
        $('input.group5_' + i + '').attr('disabled', 'disabled');
        $('input.group6_' + i + '').attr('disabled', 'disabled');
        $('input.group7_' + i + '').attr('disabled', 'disabled');

        $('#questionlist' + i + ' #q2').css('opacity', '0.2');
        $('#questionlist' + i + ' #q3').css('opacity', '0.2');
        $('#questionlist' + i + ' #q4').css('opacity', '0.2');
        $('#questionlist' + i + ' #q5').css('opacity', '0.2');
        $('#questionlist' + i + ' #q6').css('opacity', '0.2');
        $('#questionlist' + i + ' #q7').css('opacity', '0.2');
    }

    var answers = [];
    function getAnswers(insatsTitle, listgroup) {
        //alert('here!');

        //console.log('show list group');
        //console.log(listgroup);

        var questionslist = $(listgroup).find('.row');
        //console.log('show list group questions');
        //console.log(questionslist);

        var firstQuestion = questionslist[0];
        var checked = $(firstQuestion).find('input[type="checkbox"]:checked').val();

        //console.log('show list group q1 checked value');
        //console.log(checked);
        var answersGroup = [];
        answersGroup.isComplete = true;
        if (checked > 0) {

            questionslist.each(function (index, div) {
                var question = {
                    questionText: $(div).find('.question').text(),
                    value: $(div).find('input[type="checkbox"]:checked').first().val(),
                    valueText: $(div).find('input[type="checkbox"]:checked').first().next().text(),
                }
                answersGroup.push(question);
                //console.log(question);
            });
        };
        if (answersGroup.length == 0) {
            answersGroup.isComplete = false;
        }
        $(answersGroup).each(function (key, data) {
            var value = data.value;
            if (!value) {
                answersGroup.isComplete = false;
            }
        });
        checkIfAnswered(questionslist, answersGroup);
        answers[insatsTitle] = answersGroup;
        console.log('show qgroup answers');
        console.log(answers);
        return answers;
    }
    function checkIfAnswered(element, answersGroup) {
        var span = $(element).closest('div').parent().closest('.collapse').prev().prev().find('.insatsMarkering');
        //console.log('showing span');
        //console.log(span);
        if (answersGroup.length > 0 && answersGroup.isComplete) {
            $(span).text('Klarmarkerad');
            $(span).css('color', '#3c763d');
        } else {
            $(span).text('Ej klarmarkerad');
            $(span).css('color', 'red');
        }
    }
    function getCompleteAnswers(answers) {
        var completeAnswers = [];
        for (var key in answers) {
            var answergroup = answers[key];
            if (answergroup.length > 0 && answergroup.isComplete) {
                completeAnswers[key] = answergroup;
            }
        }
        return completeAnswers;
    }

    $(document).on('show.bs.collapse', '#accordion .collapse', function () {
        $(this).prev().find('span:first-child').addClass('glyphicon-arrow-up').removeClass('glyphicon-arrow-down');
    });

    $(document).on('hide.bs.collapse', '#accordion .collapse', function (e) {
        var div = $(this).prev();
        $(div).find('span:first-child').addClass('glyphicon-arrow-down').removeClass('glyphicon-arrow-up');

        var insatsTitle = $(this).prev().val();
        //console.log(insatsTitle);

        var listgroup = $(this).find('.list-group div').first();
        var answers = getAnswers(insatsTitle, listgroup);
    });

    //creating insatsprioritering report functions
    $('#btn_createReport').click(function (e) {
        e.preventDefault();
        hideElements();
        var completeAnswers = getCompleteAnswers(answers);
        //var sorted_completeAnswers = getSortedCompleteAnswers(completeAnswers);
        var sortedbyNR_completeAnswers = getSortedInsatsAccordingToNR(completeAnswers);
        console.log(sortedbyNR_completeAnswers);
        //createInsatsPrioriteringReport(sorted_completeAnswers);
        createInsatsPrioriteringReport(sortedbyNR_completeAnswers);
    });

    function getSortedInsatsAccordingToNR(completeAnswers) {
        var answergroupAndNRValue = [];
        for (var key in completeAnswers) {
            var answerlist = completeAnswers[key];
            console.log(answerlist[1].value);
            for (var i = 0; i < answerlist.length; i++) {
                var valueNR = answerlist[1].value;                
            }
            var answerWithNrValue = {
                insats: key,
                obj: completeAnswers[key],
                value_NR: valueNR,
            };
           
            answergroupAndNRValue.push(answerWithNrValue);
            var sorted_answerGroupByNRValue = answergroupAndNRValue.sort(function (value1, value2) {
                return value2.value_NR - value1.value_NR;
            });           
        }
        return sorted_answerGroupByNRValue;
    }

    function getSortedCompleteAnswers(completeAnswers) {
        var answergroupAndTotalValue = [];
        for (var key in completeAnswers) {
            var totalValue = 0;
            var answerlist = completeAnswers[key];
            console.log('getting values for ' + key);
            for (var i = 0; i < answerlist.length; i++) {
                var total = parseInt(answerlist[i].value, 10);
                totalValue += total
            };
            var answerWithTotalValue = {
                insats: key,
                obj: completeAnswers[key],
                total: totalValue
            };
            console.log(answerWithTotalValue);
            answergroupAndTotalValue.push(answerWithTotalValue);
        };
        var sorted_answerGroupAndTotalValue = answergroupAndTotalValue.sort(function (value1, value2) {
            return value2.total - value1.total;
        });
        return sorted_answerGroupAndTotalValue;
    }
    function showSubareaTitleInInsatsReport() {
        var chosenDelomrade2 = document.getElementById('chosenDelomrade2');
        var selectedSubarea = document.getElementById('chosenDelomrade').innerHTML;
        var text = selectedSubarea;
        chosenDelomrade2.innerHTML = text;
        $('#insatsprioriteringReport tr:gt(2)').remove();
    }
    function hideElements() {
        $('.tab-content').hide();
        $('#tabs').hide();
    }

    function createInsatsPrioriteringReport(sorted_completeAnswers) {
        var counter = 0;
        $('#reportStorage').show();
        showSubareaTitleInInsatsReport();
        for (var obj in sorted_completeAnswers) {
            var tr = document.createElement('tr');
            tr.setAttribute('class', 'insatsprioriteringTr');
            var tdInsats = document.createElement('td');
            tdInsats.setAttribute('scope', 'row');
            var tdPrioritering = document.createElement('td');
            var tdAcceptabel = document.createElement('td');
            var tdEffekter = document.createElement('td');
            var tdImplementeras = document.createElement('td');
            var tdBehovet = document.createElement('td');
            var tdHallbar = document.createElement('td');
            var tdInforas = document.createElement('td');
            var tdMotivering = document.createElement('td');
            tdMotivering.setAttribute('class', 'comment');
            tdMotivering.setAttribute('id', 'comment' + counter);

            tdInsats.innerHTML = sorted_completeAnswers[obj].insats;
            tdPrioritering.innerHTML = sorted_completeAnswers[obj].obj[1].valueText;
            tdAcceptabel.innerHTML = sorted_completeAnswers[obj].obj[2].valueText;
            if (sorted_completeAnswers[obj].obj[2].valueText == "Osäkert") {
                $(tdAcceptabel).css('color', 'red');
            };
            tdEffekter.innerHTML = sorted_completeAnswers[obj].obj[3].valueText;
            if (sorted_completeAnswers[obj].obj[3].valueText == "Osäkert") {
                $(tdEffekter).css('color', 'red');
            };
            tdImplementeras.innerHTML = sorted_completeAnswers[obj].obj[4].valueText;
            if (sorted_completeAnswers[obj].obj[4].valueText == "Osäkert") {
                $(tdImplementeras).css('color', 'red');
            };
            tdBehovet.innerHTML = sorted_completeAnswers[obj].obj[5].valueText;
            if (sorted_completeAnswers[obj].obj[5].valueText == "Osäkert") {
                $(tdBehovet).css('color', 'red');
            };
            tdHallbar.innerHTML = sorted_completeAnswers[obj].obj[6].valueText;
            if (sorted_completeAnswers[obj].obj[6].valueText == "Osäkert") {
                $(tdHallbar).css('color', 'red');
            };
            tdInforas.innerHTML = '<input type="checkbox">';
            tdMotivering.innerHTML = 'Skriv motivering'

            tr.appendChild(tdInsats);
            tr.appendChild(tdPrioritering);
            tr.appendChild(tdAcceptabel);
            tr.appendChild(tdEffekter);
            tr.appendChild(tdImplementeras);
            tr.appendChild(tdBehovet);
            tr.appendChild(tdHallbar);
            tr.appendChild(tdInforas);
            tr.appendChild(tdMotivering);
            $('#insatsprioriteringReport').find('tbody').append(tr);

            //document.getElementById('comment' + counter).addEventListener('click', addInsatsMotivering(counter));
            counter++;
        }

        var counter = 1;

        $(document).on('click', '.comment', function () {
            var td = $(this).first();
            if ($(td).text().trim() == 'Skriv motivering') {
                td.text(counter);
                td.css('color', '#000');
                td.css('text-decoration', 'none');
                td.css('cursor', 'default');
                createTextField(counter);
                counter++;
            }
        });
    }

    $('#btn_printInsatsReport').click(function (e) {
        window.print();
    });


    function createTextField(counter) {
        //if textfield and p element does not exist then create them
        if (!$('#textfield' + counter).length && !$('#textfieldP' + counter).length) {
            //alert('inside createTextfield');
            var p = document.createElement('p');
            p.setAttribute('class', 'textfieldP');
            p.setAttribute('id', 'textfieldP' + counter);
            $(p).text(counter);
            $('#reportStorage').append(p);
            var textfield = document.createElement('textarea');
            textfield.setAttribute('id', 'textfield' + counter);
            textfield.setAttribute('type', 'text');
            textfield.setAttribute('class', 'insatserReportTextfield');
            $('#reportStorage').append(textfield);
            $('.insatserReportTextfield').css('overflow', 'hidden').autogrow({ vertical: true, horizontal: false });
        }
    }

    function deleteTextField(counter) {
        if ($('#textfield' + counter).length && $('#textfieldP' + counter).length) {
            alert('element to delete exists');
            var textfield = document.getElementById('textfield' + counter);
            var p = document.getElementById('textfieldP' + counter);
            if (textfield != null && p != null) {
                textfield.parentNode.removeChild(textfield);
                p.parentNode.removeChild(p);
            }
        }

    }

    function clearTextfields() {
        $('#reportStorage textarea').remove();
        $('#reportStorage p').remove();
    }


});


