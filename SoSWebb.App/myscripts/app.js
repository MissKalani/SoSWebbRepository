$(function () {
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
    function getSortedChosenSubareas() {
        var chosenSubareas = [];
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
        //console.log('getting chosen subareas');
        //console.log(chosenSubareas);
        var sortedChosenSubareas = chosenSubareas.sort(function (value1, value2) {
            if (value2.value - value1.value == 0) {
                return value1;
            } else {
                return value2.value - value1.value;
            }
        });
        console.log('getting sorted chosen subareas');
        console.log(sortedChosenSubareas);
        return sortedChosenSubareas;
    }
    var sortedChosenSubareas = [];
    function createPrioriteringsTable(sortedChosenSubareas) {
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

            var count = i;

            td2.innerHTML = '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + count + '" value="1" /> Mindre allvarliga <br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + count + '" value="2" /> Varierande<br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + count + '"  value="3" /> Allvarliga <br/>'
                + '<input class="konsekvensgradValue" checked  type="radio" name="konsekvensgrad' + count + '" value="0" /> Oklart';
            td3.innerHTML = '<input class="andelklientergradValue"  type="radio" name="andelklientergrad' + count + '" value="1" /> Liten andel<br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + count + '"  value="2" /> Varierande <br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + count + '" value="3" /> Stor andel <br/>'
               + '<input class="andelklientergradValue" checked type="radio" name="andelklientergrad' + count + '" value="0" /> Oklart';
            td4.innerHTML = '<textarea class="comment"/>'
            td5.innerHTML = '<input class="insatsergradValue"  type="radio" name="insatsergrad' + count + '" value="3" /> Mycket hög <br/>'
                + '<input class="insatsergradValue" type="radio" name="insatsergrad' + count + '" value="2" /> Hög<br/>'
                + '<input class="insatsergradValue" type="radio" name="insatsergrad' + count + '"  value="1" /> Låg <br/>'
                + '<input class="insatsergradValue" checked type="radio" name="insatsergrad' + count + '" value="0" /> Ingen';

            td.innerHTML += sortedChosenSubareas[i].title;
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            if (sortedChosenSubareas[count].value == 2) {
                tr.setAttribute('id', 'storbehovTr');
                if (!$('.storHeader').length) {
                    $('#prioriteringsTable > tbody').append('<th class="storHeader" colspan="5">Stort Behov</th>');
                }
                $('#prioriteringsTable > tbody').append(tr);
            } else {
                (tr).setAttribute('id', 'litetbehovTr');
                if (!$('.litetHeader').length) {
                    $('#prioriteringsTable > tbody').append('<th class="litetHeader" colspan="5">Litet Behov</th>');
                }
                $('#prioriteringsTable > tbody').append(tr);
            }
        }
        //make textarea autogrow
        $('.comment').css('overflow', 'hidden').autogrow({ vertical: true, horizontal: false });
    }

    $('#btn_submitChosenSubareas').click(function (e) {
        e.preventDefault();
        $('#nav_tab-prioritering').show();
        $('#nav_tab-behovsbedomning').hide();
        $('.nav a[href="#tab-prioritering"]').tab('show');
        deleteChosenSubareaRows();
        sortedChosenSubareas = getSortedChosenSubareas();        
        createPrioriteringsTable(sortedChosenSubareas);
    });
    
    //prioriteringstable functions
    function getFinalChosenSubAreas() {
        var i = 0;
        var finalChosenSubareas = [];
        finalChosenSubareas.length = 0; //reset to zero
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
    function getSortedFinalChosenSubareasWithTotalValues(finalChosenSubareas) {
        var value_bedomning = 0;
        var value_gradKonsekvens = 0;
        var value_gradAndelKlienter = 0;
        var value_gradInsatser = 0;

        var subareasWithTotalValue = [];
        subareasWithTotalValue.length = 0;

        for (var i = 0; i < finalChosenSubareas.length; i++) {            
            value_bedomning = finalChosenSubareas[i].subarea.value;
            value_gradKonsekvens = finalChosenSubareas[i].konsekvensValue;
            value_gradAndelKlienter = finalChosenSubareas[i].andelklienterValue;
            value_gradInsatser = finalChosenSubareas[i].insatserValue;

            var totalValue = 0;
            totalValue = parseInt(value_bedomning, 10)
                + parseInt(value_gradKonsekvens, 10)
                + parseInt(value_gradAndelKlienter, 10)
                + parseInt(value_gradInsatser, 10);

            var chosenSubarea_And_TotalValue = { subarea: finalChosenSubareas[i], totalValue: totalValue };
            chosenSubarea_And_TotalValue.subarea = finalChosenSubareas[i];
            chosenSubarea_And_TotalValue.totalValue = totalValue;
            subareasWithTotalValue.push(chosenSubarea_And_TotalValue);
        }

        var sorted_subareasWithTotalValue = subareasWithTotalValue.sort(function (value1, value2) {
            if (value2.totalValue - value1.totalValue == 0) {
                return value1;
            } else {
                return value2.totalValue - value1.totalValue;
            }
        });

        return sorted_subareasWithTotalValue;
    }
    

    $('#btn_submitGradedSubareas').click(function (e) {
        hideElements();
        var finalChosenSubareas = getFinalChosenSubAreas();
        console.log('getting final chosen subareas');
        console.log(finalChosenSubareas);

        var sorted_subareasWithTotalValue = getSortedFinalChosenSubareasWithTotalValues(finalChosenSubareas);
        console.log('getting sorted subareas with total values');
        console.log(sorted_subareasWithTotalValue);

        createBehovsbedomningReportTable(sorted_subareasWithTotalValue);

        createPDF();

    });
    


    //button click functions 
    $('#btn_printChosenSubareas').click(function (e) {
        e.preventDefault();
        window.print();
        //createPDF();
    });
    $('#btn_printGradedSubareas').click(function (e) {
        e.preventDefault();
        window.print();
    });
    $('#btn_savePdfFinalGradedSubareas').click(function (e) {
        e.preventDefault();
        createPDF();
    });



    function deleteChosenSubareaRows() {
        //chosenSubareas.length = 0;
        $("#prioriteringsTable td").parent().remove();
    };





    function elementIsEmpty() {
        if (!$('#storbehovTr').length) {
            $('#storBehovTh').hide();
        }
        if (!$('#litetbehovTr').length) {
            $('#litetBehovTh').hide();
        }
    }

    //functions used for creating the report 
    function hideElements() {
        $('.tab-content').hide();
        $('#tabs').hide();
    }



    function createBehovsbedomningReportTable(jsonObjArray) {
        //console.log(jsonObjArray);
        $('#reportStorage').show();
        for (var i = 0; i < jsonObjArray.length; i++) {
            var obj = jsonObjArray[i];
            //obj.subarea.subarea.konsekvensValue = jsonObjArray[i].subarea.konsekvensValue;

            var areaTitle = obj.subarea.subarea.area;
            var subareaTitle = obj.subarea.subarea.title;
            var prioriteringRank = i + 1;
            var konsekvensGrade = jsonObjArray[i].subarea.konsekvensValue;
            var andelklienterGrade = jsonObjArray[i].subarea.andelklienterValue;
            var kommentarText = obj.subarea.kommentar;
            var insatserValue = jsonObjArray[i].subarea.insatserValue;

            if (konsekvensGrade == 0)
                konsekvensGrade = 'Oklart';
            if (andelklienterGrade == 0)
                andelklienterGrade = 'Oklart';
            if (insatserValue == 0)
                insatserValue = 'Ingen';

            if (konsekvensGrade == 3)
                konsekvensGrade = 'Allvarliga';
            if (andelklienterGrade == 3)
                andelklienterGrade = 'Stor andel';
            if (insatserValue == 3)
                insatserValue = 'Mycket hög';


            if (konsekvensGrade == 2)
                konsekvensGrade = 'Varierande';
            if (andelklienterGrade == 2)
                andelklienterGrade = 'Varierande';
            if (insatserValue == 2)
                insatserValue = 'Hög';

            if (konsekvensGrade == 1)
                konsekvensGrade = 'Mindre allvarliga';
            if (andelklienterGrade == 1)
                andelklienterGrade = 'Liten andel';
            if (insatserValue == 1)
                insatserValue = 'Låg';


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
            tdExtraKommentar.innerHTML = '<textarea disabled class="comment"></textarea>';

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
        //make textarea autogrow
        //$('.comment').css('overflow', 'hidden').autogrow({ vertical: true, horizontal: false });
    }

    function createPDF() {
        var pdf = new jsPDF({
            orientation: 'l',
            unit: 'mm',
            format: 'a4'
        });

        pdf.addHTML($('#behovbedomningReport')[1], 1, 1, {

        }, function () {
            pdf.save('test.pdf');
        });
    }

});