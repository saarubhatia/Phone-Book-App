$(document).ready(function () {
    $("#toggle-form").click(function (event) {
        $("#phone_add").fadeIn(500, function () {
            $("#toggle-form").hide();
        });
        event.stopPropagation();
    });

    $("#toggle-form1").click(function (event) {
        $("#phone_add").fadeOut(500, function () {
            $("#toggle-form").show();
        });
        event.stopPropagation();
    });
    $("#toggle-form2").click(function (event) {
        $("#email_add").fadeIn(500, function () {
            $("#toggle-form2").hide();
        });
        event.stopPropagation();
    });

    $("#toggle-form21").click(function (event) {
        $("#email_add").fadeOut(500, function () {
            $("#toggle-form2").show();
        });
        event.stopPropagation();
    });

    //Click on delete
    $("#toggle-form3").click(function (event) {
        $("#phone_del").fadeOut(500, function () {
            $("#pnumb2").val("");
            $("#toggle-form4").show();
        });
        event.stopPropagation();
    });
    $("#toggle-form4").click(function (event) {
        $("#pnumb2").fadeIn(500, function () {
            $("#phone_del").show();
        });
        event.stopPropagation();
    });

    $("#toggle-form6").click(function (event) {
        $("#email_del").fadeOut(500, function () {
            $("#email2").val("");
            $("#toggle-form5").show();
        });
        event.stopPropagation();
    });
    $("#toggle-form5").click(function (event) {
        $("#email2").fadeIn(500, function () {
            $("#email_del").show();
        });
        event.stopPropagation();
    });
    $('#demo').pagination({
        dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 35],
        pageSize: 4,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function(data, pagination) {
            // template method of yourself
            var html = template(data);
            $("#dataContainer").html(html);
        }
    })
});