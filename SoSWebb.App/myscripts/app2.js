$(function () {
    'use strict';
    var json = $.getJSON('data/data.json', function (data) {
        $.each(data, function (index, area) {
            var areaSubarea = area.subarea;
            for (var prop in areaSubarea) if (areaSubarea.hasOwnProperty(prop)) {
                var value = areaSubarea[prop];
                var option = document.createElement('option');
                option.value = value.title;
                option.textContent = value.title;
                var select = document.getElementById('menu');
                select.appendChild(option);
                //console.log(value.title);
              
            };
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


