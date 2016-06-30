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
        //get the selected option from the dropdown menu
        selectedSubarea = subarea.options[subarea.selectedIndex].value;
        $('.nav a[href="#tab-insatser"]').tab('show');
        var chosenDelomrade = document.getElementById('chosenDelomrade');
        chosenDelomrade.innerHTML = selectedSubarea;
        showInsatserList();
    });

    var element = document.getElementsByClassName('collapse');
    $(document).on('click', '#insats', function () {
        //alert('hej!');
        document.getElementById('questionlist');
        showQuestionsList();
    });

    function showInsatserList() {
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            $('#accordion div').remove();
            for (var i in insatserlist) {
                $('#accordion').append('<div><a id="insats" data-toggle="collapse" data-parent="accordion" href="#collapse'+i+'" aria-expanded="true">' + insatserlist[i].title + '</a> '
                    + '<div id="collapse'+i+'" class="collapse" ><div class ="list-group">'
                    + ' <ul id="questionlist"></ul></div></div></li>');              
            }            
        });
    }

    function showQuestionsList() {
  
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            //var questions = insatserlist.questions;
            //console.log(insatserlist);
            
            for (var i in insatserlist) {
                var questions = insatserlist[i].questions;
                $('#questionlist li').remove();
                for (var j in questions) {
                    var question = questions[j].questionstatement;
                    console.log(questions[j].questionstatement);
                    $('#questionlist').append('<li>'+question+'</li>');
                }
            }
            
        });
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


