$(function () {
    'use strict';
    $('#reportStorage').hide();
    $('#nav_tab-insatser').hide();

    var json = $.getJSON('data/data2.json', function (data) {
        $.each(data, function (index, data) {
            $.each(data.subareas, function (index, subareas) {
                var subareaTitle = subareas.title;
                $('#menu').append('<option>' + subareaTitle + '</option>');
            });
        });
    });

    //tab-delomrade button click function
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

    //function for reading data2.json and getting all the subarea actions
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

    //tab-insatser functions
    function showInsatserList() {
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            $('#accordion ul li').remove();
            for (var i in insatserlist) {
                $('#insatserlist').append('<li><button class="insatserListBtn" id="insats' + i + '" data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="true">' + insatserlist[i].title + '</button> '
                    + '<div id="collapse' + i + '" class="collapse" ><div class ="list-group">'
                    + ' <ul id="questionlist' + i + '"></ul></div></li></li>');
                appendQuestionList(i);
                oneCheckboxAtATime(i);
            }
        });
    }
    function appendQuestionList(i) {
        $('.list-group #questionlist' + i + '').append('<li id="q1"><div id="question' + i + '" class="question col-xs-6">Kan insatsen möta behoven? </div><div class="qoptions col-xs-6">'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="uncheckAll" class="group1_' + i + '" value="0"><label>Nej</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="uncheckAll" class="group1_' + i + '" value="1"><label class="longlabel">Sannolikt inte</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="uncheckAll" class="group1_' + i + '" value="2"><label>Osäkert</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group1" class="group1_' + i + '" value="3"><label class="longlabel">Sannolikt Ja</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group1" class="group1_' + i + '" value="4"><label>Ja</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group1" class="group1_' + i + '" value="5"><label>Varierar</label></span>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q2"><div id="question' + i + '" class="question col-xs-6"">Vilken prioritering har insatsen i NR? </div><div class="qoptions col-xs-6">'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="0"><label>1</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="1"><label>2</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="2"><label>3</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="3"><label>4</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="4"><label>5</label></span>'
            + '<span class="checkboxDiv col-xs-2"><input type="checkbox" id="group2" class="group2_' + i + '" disabled value="5"><label>Annan</label></span>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q3"><div id="question' + i + '" class="question col-xs-6"">Är insatsen värderingsmässigt acceptabel för de flesta aktörer? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group3" class="group3_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q4"><div id="question' + i + '" class="question col-xs-6"">Är de förväntade oönskade effekterna av insatsen små? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group4" class="group4_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q5"><div id="question' + i + '" class="question col-xs-6"">Är insatsen möjlig att implementera utan anpassning? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group5" class="group5_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q6"><div id="question' + i + '" class="question col-xs-6"">Är behovet av resurser (tid, pengar, kunskap, personal) för att genomföra insatsen lågt? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group6" class="group6_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
        $('.list-group #questionlist' + i + '').append('<li id="q7"><div id="question' + i + '" class="question col-xs-6"">Är insatsen hållbar på lång sikt? </div><div class="qoptions col-xs-6">'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="0"><label>Nej</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="1"><label class="longlabel">Sannolikt inte</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="2"><label>Osäkert</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="3"><label class="longlabel">Sannolikt Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="4"><label>Ja</label></div>'
            + '<div class="checkboxDiv col-xs-2"><input type="checkbox" id="group7" class="group7_' + i + '" disabled value="5"><label>Varierar</label></div>'
            + '</div></li>');
    }
    function oneCheckboxAtATime(i) {
        $('input.group1_' + i + '').on('change', function () {
            $('input.group1_' + i + '').not(this).prop('checked', false);
            var value = $(this).val();
            if (value == 3 || value == 4 || value == 5) {
                unlockCheckboxes(i);
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

    //$(document).on('click', '.insatserListBtn', function (e) {
    //    $('.insatserListBtn').slideDown('normal', function () {
    //        insatserMenuHeight();
    //    });
    //});
    //$('.insatserListBtn').click(function (e) {
    //    button.slideUp('normal', function () {
    //        insatserMenuHeight();
    //    });
    //});

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
        $(listgroup).each(function (index, element) {
            var answersGroup = [];
            answersGroup.isComplete = true;
            var listItems = $(element).find('li');
            var firstQuestion = listItems[0];
            var checked = $(firstQuestion).find('input[type="checkbox"]:checked').val();
            if (checked > 2) {
                listItems.each(function (idx, li) {
                    var question = {
                        questionText: $(li).find('.question').text(),
                        value: $(li).find('input[type="checkbox"]:checked').first().val(),
                        valueText: $(li).find('input[type="checkbox"]:checked').first().next().text(),
                    };
                    answersGroup.push(question);
                    //console.log(question);
                });
            };
            if (answersGroup.length == 0) {
                answersGroup.isComplete = false;
            };
            $(answersGroup).each(function (key, data) {
                var value = data.value;
                if (!value) {
                    answersGroup.isComplete = false;
                }
            });
            answers[insatsTitle] = answersGroup;
            //console.log(answers);
        });
        return answers;
    }
    function getCompleteAnswers(answers) {
        var completeAnswers = [];
        for (var key in answers) {
            var answergroup = answers[key];
            //console.log(key);
            //console.log(answergroup);
            if (answergroup.length > 0 && answergroup.isComplete) {
                completeAnswers[key] = answergroup;
            }
        }
        return completeAnswers;
    }


    $(document).on('show.bs.collapse', '#accordion .collapse', function () {
        var all = $('#accordion').find('.collapse');
        var actives = $('#accordion').find('.in, .collapsing');
        all.each(function (index, element) {
            $(element).collapse('hide');
        });
        actives.each(function (index, element) {
            $(element).collapse('show');
        });
    });
    $(document).on('hide.bs.collapse', '#accordion .collapse', function (e) {
        var insatsTitle = $(this).closest('li').first().find('button').first().html();
        var listgroup = $(this).find('.list-group ul').first();
        var answers = getAnswers(insatsTitle, listgroup);
    });

    $('#btn_createReport').click(function (e) {
        e.preventDefault();
        hideElements();
        var completeAnswers = getCompleteAnswers(answers);
        var sorted_completeAnswers = getSortedCompleteAnswers(completeAnswers);
        console.log('getting sorted answergroup');
        console.log(sorted_completeAnswers);
        createInsatsPrioriteringReport(sorted_completeAnswers);
    });

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
    //insatsprioriteringReport functions
    function createInsatsPrioriteringReport(sorted_completeAnswers) {
        $('#reportStorage').show();
        showSubareaTitleInInsatsReport();      
        
        for (var obj in sorted_completeAnswers) {
            var tr = document.createElement('tr');
            var tdInsats = document.createElement('td');
            var tdPrioritering = document.createElement('td');
            var tdAcceptabel = document.createElement('td');
            var tdEffekter = document.createElement('td');
            var tdImplementeras = document.createElement('td');
            var tdBehovet = document.createElement('td');
            var tdHallbar = document.createElement('td');
            var tdInforas = document.createElement('td');
            var tdMotivering = document.createElement('td');

            tdInsats.innerHTML = sorted_completeAnswers[obj].insats;
            tdPrioritering.innerHTML = sorted_completeAnswers[obj].obj[1].valueText;
            tdAcceptabel.innerHTML = sorted_completeAnswers[obj].obj[2].valueText;
            tdEffekter.innerHTML = sorted_completeAnswers[obj].obj[3].valueText;
            tdImplementeras.innerHTML = sorted_completeAnswers[obj].obj[4].valueText;
            tdBehovet.innerHTML = sorted_completeAnswers[obj].obj[5].valueText;
            tdHallbar.innerHTML = sorted_completeAnswers[obj].obj[6].valueText;
            tdInforas.innerHTML = '<input type="checkbox">';
            tdMotivering.innerHTML = '<textarea class="comment" ></textarea>';

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
        }
    }














    //var counter = 1;
    ////event listener for checkboxes in the report
    //$(document).on('change', '#insatsprioriteringReport input[type=checkbox]', function (e) {
    //    var td = $(this).closest('td').next();
    //    if ($(this).prop('checked') == true) {
    //        //alert('inside checkbox true');
    //        td.html(counter);
    //        createTextField(counter);
    //        counter++;
    //    } else {
    //        td.html('');


    //        //deleteTextField(counter);

    //    };
    //    return counter;
    //});



    function createTextField(counter) {
        //if textfield and p element does not exist then create them
        if (!$('#textfield' + counter).length && !$('#textfieldP' + counter).length) {
            //alert('inside createTextfield');
            var p = document.createElement('p');
            p.setAttribute('class', 'textfieldP');
            p.setAttribute('id', 'textfieldP' + counter);
            p.innerHTML = counter;
            $('#reportStorage').append(p);
            var textfield = document.createElement('textarea');
            textfield.setAttribute('id', 'textfield' + counter);
            textfield.setAttribute('type', 'text');
            textfield.setAttribute('class', 'insatserReportTextfield');
            $('#reportStorage').append(textfield);
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

        //alert('inside deleteTextfield');
        //var div = document.getElementById('reportStorage');
        //var tf = document.getElementById('textfield' + counter);
        //var p = document.getElementById('textfieldP' + counter);
        //console.log(tf);
        //div.removeChild(tf);
        //div.removeChild(p);

        //if textfield and p element exist then delete them
        //if ($('#textfield' + counter).length && $('#textfieldP' + counter).length) {
        //    alert('inside deleteTextfield');
        //    var textfield = document.getElementById('textfield' + counter);
        //    var p = document.getElementById('textfieldP' + counter);
        //    console.log(p);
        //    console.log(textfield);
        //    //$('#textfield' + counter).remove();
        //    //$('#textfieldP' + counter).remove();
        //    textfield.parentNode.removeChild(textfield);
        //    p.parentNode.removeChild(p);
        //};

    }

    function clearTextfields() {
        $('#reportStorage textarea').remove();
        $('#reportStorage p').remove();
    }
    function addPdfButton() {
        var pdfButton = document.createElement('button');
        pdfButton.innerHTML = 'Spara som PDF'
        pdfButton.setAttribute('class', 'button');
        pdfButton.setAttribute('id', 'insatsReportPdfButton');
        $('.row').append(pdfButton);
        document.getElementById('insatsReportPdfButton').addEventListener('click', createPDF);
    }
    function createPDF() {
        var pdf = new jsPDF({
            orientation: 'l',
            unit: 'mm',
            format: 'a4'
        });

        pdf.addHTML($('#report')[1], 1, 1, {

        }, function () {
            pdf.save('test.pdf');
        });
    }

});


