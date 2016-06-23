$(function () {
    'use strict';
    var json = $.getJSON('data/data.json', function (data) {
        $.each(data, function (index, area) {
            var areaSubarea = area.subarea;
            for (var prop in areaSubarea) if (areaSubarea.hasOwnProperty(prop)) {
                var value = areaSubarea[prop];
                console.log(value.title);
                $('.dropdown-menu').append('<li><a href="#" data-value="'+value.title+'"> ' + value.title + '</a></li>');
            };
        });
    });

    //$('#dropdownlist').dropdownlist({
    //    dataTextfield: 'text',
    //    dataValueField: 'value',
    //    dataSource: [ text: val]
    //});

    //$('.dropdown-menu li').click(function (event) {
    //    alert('hej!');
    //    var $target = $(event.currentTarget);

    //    $target.closest('.dropdown')
    //       .find('[data-bind="label"]').text($target.text())
    //          .end()
    //       .children('.dropdown-toggle').dropdown('toggle');

    //    return false;
 
    //});


});


