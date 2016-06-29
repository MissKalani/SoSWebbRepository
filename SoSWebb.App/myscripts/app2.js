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

    });

    $('.insatsDropdown').on('click', function (e) {
        showInsatserList();
    });

    $(document).on('click', '.trigger', function (e) {
    
        var current = $(this).next();
        current.toggle();

    });

    $(document).on('click', '.dropdown-submenu', function (e) {
        $(this).closest('.dropdown-submenu').find('.dropdown-menu').addClass('open');
        CollapsibleLists.applyTo(document.getElementById('dropdownmenu'));
    });


    CollapsibleLists.applyTo(document.getElementById('dropdownmenu'));

    function showInsatserList() {
        var promise = [];
        promise = getSelectedSubareaInsatslist();
        promise.done(function (insatserlist) {
            $('#dropdownmenu li').remove();
            for (var i in insatserlist) {
                $('#dropdownmenu').append('<li class="dropdown-submenu"><a href="#">' + insatserlist[i].title + '</a> '
                    + '<ul class="dropdown-menu collapsibleList"><li class="dropdown-submenu">HEJ</li></ul></li>');
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


