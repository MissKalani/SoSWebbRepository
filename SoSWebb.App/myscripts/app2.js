$(function () {
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

    var subarea = "";
    var selectedSubarea = "";

    $('#btn_Next').click(function (e) {
        e.preventDefault();
        subarea = document.getElementById('menu');
        selectedSubarea = subarea.options[subarea.selectedIndex].value;
        $('.nav a[href="#tab-insatser"]').tab('show');
        var chosenDelomrade = document.getElementById('chosenDelomrade');
        chosenDelomrade.innerHTML = selectedSubarea;
        showInsatserList();
    });

    function showInsatserList() {
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            $('#accordion ul li').remove();
            for (var i in insatserlist) {
                console.log(insatserlist[i]);
                $('#accordion #insatserlist').append('<li><a id="insats' + i + '" data-toggle="collapse" data-parent="accordion" href="#collapse' + i + '" aria-expanded="true">' + insatserlist[i].title + '</a> '
                    + '<div id="collapse' + i + '" class="collapse" ><div class ="list-group">'
                    + ' <ul id="questionlist' + i + '"></ul></div></li></li>');
            }
            appendQuestionList();

        });
    }

    $(document).on('change', 'input[type="checkbox"]',function () {
        $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);
    });

    function appendQuestionList() {
        $('.list-group ul').append('<li id="q1">Kan insatsen möta behoven? '
            + '<input type="checkbox" class="group1" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group1" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group1" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group1" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group1" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group1" value="5"><label>Varierar</label>'
            + '</li>');
        $('.list-group ul').append('<li id="q2">Vilken prioritering har insatsen i NR? '
            + '<input type="checkbox" class="group2" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group2" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group2" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group2" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group2" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group2" value="5"><label>Varierar</label>'
            +'</li>');
        $('.list-group ul').append('<li id="q3">Är insatsen värderingsmässigt acceptabel för de flesta aktörer? '
            + '<input type="checkbox" class="group3" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group3" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group3" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group3" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group3" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group3" value="5"><label>Varierar</label>'
            + '</li>');
        $('.list-group ul').append('<li id="q4">Är de förväntade oönskade effekterna av insatsen små? '
            + '<input type="checkbox" class="group4" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group4" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group4" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group4" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group4" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group4" value="5"><label>Varierar</label>'
            + '</li>');
        $('.list-group ul').append('<li id="q5">Är insatsen möjlig att implementera utan anpassning? '
            + '<input type="checkbox" class="group5" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group5" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group5" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group5" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group5" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group5" value="5"><label>Varierar</label>'
            + '</li>');
        $('.list-group ul').append('<li id="q6">Är behovet av resurser (tid, pengar, kunskap, personal) för att genomföra insatsen lågt? '
            + '<input type="checkbox" class="group6" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group6" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group6" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group6" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group6" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group6" value="5"><label>Varierar</label>'
            + '</li>');
        $('.list-group ul').append('<li id="q7">Är insatsen hållbar på lång sikt? '
            + '<input type="checkbox" class="group7" value="0"><label>Nej</label>'
            + '<input type="checkbox" class="group7" value="1"><label>Sannolikt inte</label>'
            + '<input type="checkbox" class="group7" value="2"><label>Osäkert</label>'
            + '<input type="checkbox" class="group7" value="3"><label>Sannolikt Ja</label>'
            + '<input type="checkbox" class="group7" value="4"><label>Ja</label>'
            + '<input type="checkbox" class="group7" value="5"><label>Varierar</label>'
            + '</li>');
    }
   
    function getSelectedSubareaInsatslist() {
        var insatserlistPromise = jQuery.Deferred();
        $.getJSON('data/data2.json', function (data) {
            $.each(data, function (index, data) {
                $.each(data.subareas, function (index, subareas) {
                    selectedSubarea = document.getElementById('chosenDelomrade').innerHTML;
                    if (subareas.title == selectedSubarea) {
                        insatserlistPromise.resolve(subareas.insatslist);
                    };
                });
            });
        });
        return insatserlistPromise.promise();
    }
});


