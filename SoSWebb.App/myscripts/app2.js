$(function () {
    'use strict';
    var json = $.getJSON('data/data2.json', function (data) {
        //console.log(data[0].area);
        //console.log(data[1].area);
        $.each(data, function (index, data) {
            //console.log(data);
            //loop through all the areas' subarea titles
            $.each(data.subareas, function (index, subareas) {
                console.log(subareas.title);
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

    });

 
});


