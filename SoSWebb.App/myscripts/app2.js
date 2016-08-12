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
    //tab-insatser button click function
    $('#btn_createReport').click(function (e) {
        e.preventDefault();
        hideElements();
        createInsatsPrioriteringReport(answers);
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

    $(document).on('click', '.insatserListBtn', function (e) {
        $('.insatserListBtn').slideDown('normal', function () {
            insatserMenuHeight();
        });
    });
    $('.insatserListBtn').click(function (e) {
        button.slideUp('normal', function () {
            menuHeight();
        });
    });

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



    function getAnswers(listgroup) {

        $(listgroup).each(function (index, element) {
            var answersGroup = [];
            answersGroup.isComplete = true;
            var listItems = $(element).find('li');
            var firstQuestion = listItems[0];
            var checked = $(firstQuestion).find('input[type="checkbox"]:checked').val();

            if (checked > 2) {
                alert('im here!');
                listItems.each(function (idx, li) {
                    var question = {
                        questionText: $(li).find('.question').text(),
                        value: $(li).find('input[type="checkbox"]:checked').first().val(),
                    };
                    answersGroup.push(question);
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
            return answersGroup;
            console.log(answersGroup);

            //if (answersGroup.length == 0) {
            //    answersGroup.isComplete = false;
            //}

            //$(answersGroup).each(function (key, data) {
            //    var value = data.value;
            //    if (!value) {
            //        answersGroup.isComplete = false;
            //    }
            //});
            //answers[insatsTitle] = answersGroup;
            //console.log(answers);
        });

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
        var answers = [];
        var answersGroup = getAnswers(listgroup);
        answers[insatsTitle] = answersGroup;
        //console.log(answers);


        //for (var answergroup in answers) {
        //    if (answers[answergroup].isComplete == true) {
        //        $(this).closest('li').first().css('background-color', '#299c29');
        //        $(this).closest('li').first().find('a').first().css('color', 'black');
        //    } else {
        //        $(this).closest('li').first().css('background-color', 'white');
        //    }
        //}
    });

    //insatsprioriteringReport functions
    function createInsatsPrioriteringReport(answers) {
        $('#reportStorage').show();
        showSubareaTitleInInsatsReport();
        var counter = 0;
        for (var key in answers) {
            var answerGroup = answers[key];
            if (answerGroup.length > 0 && answerGroup.isComplete) {
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'insatsTr');
                var tdInsats = document.createElement('td');
                tdInsats.setAttribute('class', 'insatsTitleTd');
                tdInsats.innerHTML = key;
                tr.appendChild(tdInsats);
                for (var i = 1; i < answerGroup.length; i++) {
                    var obj = answerGroup[i];
                    var tdInsatsQuestionValue = document.createElement('td');
                    tdInsatsQuestionValue.innerHTML = obj.value;
                    tr.appendChild(tdInsatsQuestionValue);
                }
                var tdInforasCheckbox = document.createElement('td');
                tdInforasCheckbox.innerHTML = '<input type="checkbox" name="inforCheckbox" id="inforCheckbox' + counter + '">';
                tr.appendChild(tdInforasCheckbox);
                var tdPrioriteringOchMotivering = document.createElement('td');
                tr.appendChild(tdPrioriteringOchMotivering);
                $('#insatsprioriteringReport').find('tbody').append(tr);

                //document.getElementById('inf+orCheckbox' + counter).addEventListener('change', addInsatsMotivering());
                counter++;
            }
        }
        addPdfButton();
    }

    var counter = 1;
    //event listener for checkboxes in the report
    $(document).on('change', '#insatsprioriteringReport input[type=checkbox]', function (e) {
        var td = $(this).closest('td').next();
        if ($(this).prop('checked') == true) {
            //alert('inside checkbox true');
            td.html(counter);
            createTextField(counter);
            counter++;
        } else {
            td.html('');


            //deleteTextField(counter);

        };
        return counter;
    });

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


