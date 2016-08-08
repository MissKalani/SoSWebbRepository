﻿$(function () {
    'use strict';
    var radioNameCounter = 1;   
    var jsonData = $.getJSON('data/data.json', function (data) {
        $.each(data, function (index, area) {
            $.each($(this), function (index, subarea) {
                var areaTitle = area.title;
                var areaSubarea = area.subarea;
                if (document.getElementById('behovsbedomningTable')) {
                    createAreaRow(areaTitle);
                }                  
                for (var prop in areaSubarea) if (areaSubarea.hasOwnProperty(prop)) {
                    var value = areaSubarea[prop];
                    var valuesBedomning = value.values_bedomning;                    
                    if (document.getElementById('behovsbedomningTable')) {
                        createSubAreaRow(value.title, valuesBedomning, radioNameCounter);
                    }                  
                    radioNameCounter++;
                }
            });
        });
    });

    //info icon popover
    $('[data-toggle="popover"]').popover({
        container: 'body',
        placement: 'top',
        html: true
    });
    $('#reportStorage').hide();
    $('#nav_tab-prioritering').hide();

    //array variables
    var chosenSubareas = [];
    var sortedChosenSubareas = [];
    var finalChosenSubareas = [];
    var finalChosenSubAreas_And_totalValue = [];
    var sorted_finalChosenSubAreas_And_totalValue = [];

    //button click functions 
    $('#btn_printChosenSubareas').click(function (e) {
        e.preventDefault();
        createPDF();
    });
    $('#btn_printGradedSubareas').click(function (e) {
        e.preventDefault();
        createPDF();
    });
    $('#btn_printFinalGradedSubareas').click(function (e) {
        e.preventDefault();
        createPDF();
    });
    $('#btn_submitChosenSubareas').click(function (e) {
        e.preventDefault();
        $('#nav_tab-prioritering').show();
        $('#nav_tab-behovsbedomning').hide();
        $('.nav a[href="#tab-prioritering"]').tab('show');
        deleteChosenSubareaRows();
        addChosenSubareas();
        createPrioriteringsTable();
    });
    $('#btn_submitGradedSubareas').click(function (e) {
        hideElements();
        finalChosenSubareas = getFinalChosenSubAreas();
        //get all the finaly chosen subareas together with their total values
        finalChosenSubAreas_And_totalValue = getFinalChosenSubareasWithTotalValues(finalChosenSubareas);

        //function for sorting chosen object array by the total value gathered
        var sortByValue = function (array) {
            return _.sortBy(array, 'totalValue').reverse();
        }
        sorted_finalChosenSubAreas_And_totalValue = sortByValue(finalChosenSubAreas_And_totalValue);
        var json = sorted_finalChosenSubAreas_And_totalValue;
        createBehovsbedomningReportTable(json);

        createPDF();
    });

    //behovsbedomningtable functions
    function createAreaRow(area) {
        var table = document.getElementById('behovsbedomningTable');
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'area');
        var td = document.createElement('td');
        td.setAttribute('class', 'areaTdTitle');
        td.innerHTML = area;
        tr.appendChild(td);
        table.appendChild(tr);
    };
    function createSubAreaRow(subarea, options, radioName) {
        var table = document.getElementById('behovsbedomningTable');
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'item');
        var tdSubarea = document.createElement('td');
        var tdSubareaEmpty = document.createElement('td');
        tdSubarea.setAttribute('class', 'subareaTdTitle');
        tdSubarea.innerHTML = subarea;
        tr.appendChild(tdSubareaEmpty);
        tr.appendChild(tdSubarea);
        var i = 0;
        for (var option in options) {
            var tdOption = document.createElement('td');
            tdOption.setAttribute('class', 'behovsbedomningTd');
            if (option == 0) {
                tdOption.innerHTML = '<input checked type="radio" name="radio_' + radioName + '" value="' + option + '">';
            } else {
                tdOption.innerHTML = '<input type="radio" name="radio_' + radioName + '" value="' + option + '">';
            }
            tr.appendChild(tdOption);
        };
        table.appendChild(tr);


    };

    //prioriteringstable functions
    function deleteChosenSubareaRows() {
        chosenSubareas.length = 0;
        $("#prioriteringsTable td").parent().remove();
    };
    function addChosenSubareas() {
        var area = $('tr.area');
        $('tr.item').each(function () {
            var td = $(this).closest('tr').find('td:nth-child(2)');
            var tdArea = $(this).prevAll('tr.area:first').find('td:first');
            var obj = { title: "text", value: "0", area: "area" };
            obj.area = tdArea[0].innerText;
            obj.title = td[0].innerText;
            obj.value = $(this).closest('tr').find($('input[type=radio]:checked')).val();
            if (obj.value == 1 || obj.value == 2) {
                chosenSubareas.push(obj);
            }
        });
       
        var sortByValue = function (array) {
            return _.sortBy(array, 'value').reverse();
        }
        sortedChosenSubareas = sortByValue(chosenSubareas);
        console.log(sortedChosenSubareas);
        return sortedChosenSubareas;
    }
    function createPrioriteringsTable() {
        for (var i = 0; i < sortedChosenSubareas.length; i++) {

            var tr = document.createElement("tr");
            tr.setAttribute("class", "prioriteringsTableTr");
            var td = document.createElement("td");
            td.setAttribute("class", "prioriteringsTableTdTitle");
            var td2 = document.createElement("td");
            td2.setAttribute("class", "prioriteringsTableTd");
            var td3 = document.createElement("td");
            td3.setAttribute("class", "prioriteringsTableTd");
            var td4 = document.createElement("td");
            td4.setAttribute("class", "prioriteringsTableTd");
            var td5 = document.createElement("td");
            td5.setAttribute("class", "prioriteringsTableTd");

            var name = i;

            td2.innerHTML = '<input class="konsekvensgradValue" checked type="radio" name="konsekvensgrad' + name + '" value="3" />Mindre Allvarliga <br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + name + '" value="2" /> Varierande<br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + name + '"  value="1" /> Alvarliga <br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + name + '" value="0" /> Oklart';
            td3.innerHTML = '<input class="andelklientergradValue" checked type="radio" name="andelklientergrad' + name + '" value="3" />Liten andel<br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + name + '"  value="2" /> Varierande <br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + name + '" value="1" /> Stor andel <br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + name + '" value="0" /> Oklart';
            td4.innerHTML = '<textarea class="form-control animated" id="comment"/>'
            td5.innerHTML = '<input class="insatsergradValue" checked type="radio" name="insatsergrad' + name + '" value="3" />Mycket hög <br/>'
                + '<input class="insatsergradValue" type="radio" name="insatsergrad' + name + '" value="2" /> Hög<br/>'
                + '<input class="insatsergradValue" type="radio" name="insatsergrad' + name + '"  value="1" /> Låg <br/>'
                + '<input class="insatsergradValue" type="radio" name="insatsergrad' + name + '" value="0" /> Ingen';

            td.innerHTML += sortedChosenSubareas[i].title;
            
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            if (sortedChosenSubareas[i].value == 2) {
                $(tr).insertAfter($('.trStortBehov'));
            } else {
                $(tr).insertAfter($('.trLitetBehov'));
            }      
        }
    }

    //functions used for creating the report 
    function hideElements() {
        $('.tab-content').hide();
        $('#tabs').hide();
    }
    function getFinalChosenSubAreas() {        
        var i = 0;       
        finalChosenSubareas.length = 0;        
        $('.prioriteringsTableTr').each(function () {
            var subarea = {
                subarea: sortedChosenSubareas[i],
                konsekvensValue: "0",
                andelklienterValue: "0",
                kommentar: "text",
                insatserValue: "0"
            };                  
            subarea.subarea = sortedChosenSubareas[i];
            subarea.konsekvensValue = $(this).closest('tr').find($('input[class = konsekvensgradValue]:checked')).val();
            subarea.andelklienterValue = $(this).closest('tr').find($('input[class = andelklientergradValue]:checked')).val();
            subarea.kommentar = $(this).find($('textarea')).val();
            subarea.insatserValue = $(this).closest('tr').find($('input[class = insatsergradValue]:checked')).val();
            finalChosenSubareas.push(subarea);
            i++;
        });
        return finalChosenSubareas;
    }
    function getFinalChosenSubareasWithTotalValues(subareaArray) {        
        var value_bedomning = 0;
        var value_gradKonsekvens = 0;
        var value_gradAndelKlienter = 0;
        var value_gradInsatser = 0;
       
        finalChosenSubAreas_And_totalValue.length = 0;
       
        for (var i = 0; i < finalChosenSubareas.length; i++) {
            value_bedomning = finalChosenSubareas[i].subarea.value;
            value_gradKonsekvens = finalChosenSubareas[i].konsekvensValue;
            value_gradAndelKlienter = finalChosenSubareas[i].andelklienterValue;
            value_gradInsatser = finalChosenSubareas[i].insatserValue;
          
            var finalChosenSubarea_totalValue = 0;
            finalChosenSubarea_totalValue = parseInt(value_bedomning, 10)
                + parseInt(value_gradKonsekvens, 10)
                + parseInt(value_gradAndelKlienter, 10)
                + parseInt(value_gradInsatser, 10);           

            var chosenSubarea_And_TotalValue = { subarea: finalChosenSubareas[i], totalValue: finalChosenSubarea_totalValue };
            chosenSubarea_And_TotalValue.subarea = finalChosenSubareas[i];
            chosenSubarea_And_TotalValue.totalValue = finalChosenSubarea_totalValue;
            finalChosenSubAreas_And_totalValue.push(chosenSubarea_And_TotalValue);
        }
        return finalChosenSubAreas_And_totalValue;
    }
    function createBehovsbedomningReportTable(jsonObjArray) {
        $('#reportStorage').show();
        for (var i = 0; i < jsonObjArray.length; i++) {
            var obj = jsonObjArray[i];
            var areaTitle = obj.subarea.subarea.area;
            var subareaTitle = obj.subarea.subarea.title;
            var prioriteringRank = i + 1;
            var konsekvensGrade = obj.subarea.subarea.konsekvensValue;
            var andelklienterGrade = obj.subarea.subarea.andelklienterValue;
            var kommentarText = obj.subarea.kommentar;
            var insatserValue = obj.subarea.subarea.insatserValue;

            var grade = 0;
            switch (grade) {
                case 0: konsekvensGrade = 'Oklart';
                    andelklienterGrade = 'Oklart';
                    insatserValue = 'Ingen';
                case 1: konsekvensGrade = 'Alvarliga';
                    andelklienterGrade = 'Stor andel';
                    insatserValue = 'Låg';
                case 2: konsekvensGrade = 'Varierande';
                    andelklienterGrade = 'Varierande';
                    insatserValue = 'Hög'
                case 3: konsekvensGrade = 'Mindre Allvarliga';
                    andelklienterGrade = 'Liten andel';
                    insatserValue = 'Mycket hög';
            };

            var tr = document.createElement('tr');
            tr.setAttribute('class', 'reportItems');

            var tdAreaTitle = document.createElement('td');
            tdAreaTitle.innerHTML = areaTitle;
            var tdSubareaTitle = document.createElement('td');
            tdSubareaTitle.setAttribute('class', 'subareaTitleReportTd');
            tdSubareaTitle.innerHTML = subareaTitle;
            var tdPrioriteringRank = document.createElement('td');
            tdPrioriteringRank.innerHTML = prioriteringRank;
            var tdKonsekvensgrade = document.createElement('td');
            tdKonsekvensgrade.innerHTML = konsekvensGrade;
            var tdAndelKlienterGrade = document.createElement('td');
            tdAndelKlienterGrade.innerHTML = andelklienterGrade;
            var tdKommentar = document.createElement('td');
            tdKommentar.innerHTML = kommentarText;
            var tdInsatserValue = document.createElement('td');
            tdInsatserValue.innerHTML = insatserValue;
            var tdExtraKommentar = document.createElement('td');
            tdExtraKommentar.setAttribute('class', 'extraKommentarReportTd');
            tdExtraKommentar.innerHTML = '<textarea class="form-control animated"></textarea>';

            tr.appendChild(tdAreaTitle);
            tr.appendChild(tdSubareaTitle);
            tr.appendChild(tdPrioriteringRank);
            tr.appendChild(tdKonsekvensgrade);
            tr.appendChild(tdAndelKlienterGrade);
            tr.appendChild(tdKommentar);
            tr.appendChild(tdInsatserValue);
            tr.appendChild(tdExtraKommentar);
            $('#behovsbedomningReport').find('tbody').append(tr);
        };
    }

    function createPDF() {
        var pdf = new jsPDF({
            orientation: 'l',
            unit: 'mm',
            format: 'a4'
        });

        var specialElementHandlers = {
            '#report': function (element, renderer) {
                return true;
            }
        };

        pdf.addHTML($('#report')[1], 1, 1, {
            //'width':800,
            'elementHandlers': specialElementHandlers
        }, function () {
            pdf.save('test.pdf');
        });
    }
});