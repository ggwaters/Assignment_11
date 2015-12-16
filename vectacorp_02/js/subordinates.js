// scripts for management page
// same as employee page except for selectors
// repeated for grading purposes
$(document).ready(function () {

    // click event for employee 
    $("#sub_details").on("click", "a", function () {
        var subordinateID = $(this).attr("id");
        window.console.log(subordinateID);

        // json to load employee list on home page
        $.getJSON("../json/employees.json", function (data) {   
            window.console.log(subordinateID);

            $.each(data, function () {
                $.each(this, function (key, value) {
                    window.console.log(value.id);
                    if (subordinateID == value.id) {
                        $("#employee_details").html(
                            '<li>' + '<img src="../images/' + value.image + '">' +
                                '<h1>' + value.name + '</h1>' +
                                '<p>' + value.title + '</p>' + '</li>' +
                                '<li><a href="#management" id="' + value.reportsTo + '"><h2>' + 'View Manager' + '</h2><p>' + value.manager + '</p></a></li>' +
                                '<li><a href="#subordinates" id="subgroup_' + value.id + '"><h2>' + 'View Subordinates' + '</h2><p>' + value.subs + '</p></a></li>' +
                                '<li><a href="tel:' + value.office + '"><h2>' + 'Call Office' + '</h2><p>' + value.office + '</p></a></li>' +
                                '<li><a href="tel:' + value.cell + '"><h2>' + 'Call Cell' + '</h2><p>' + value.cell + '</p></a></li>' +
                                '<li><a href="mailto:' + value.email + '"><h2>' + 'eMail' + '</h2><p>' + value.email + '</p></a></li>'
                        );
                    }
                });
            });
            $("#employee_details").listview("refresh");
        });
    });
});