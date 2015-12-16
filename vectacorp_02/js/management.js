// scripts for management page
// same as employee page except for selectors
// repeated for grading purposes
$(document).ready(function () {
    
    // click event to find manager
    $("#manager_details").on("click", "a:first", function () {
        var managerID = $(this).attr("id");
        window.console.log(managerID);

        // json to load manager on management page
        $.getJSON("../json/employees.json", function (data) {   
            window.console.log(data);
            $.each(data, function () {
                $.each(this, function (key, value) {
                    if (managerID === value.id) {
                        $("#manager_details").html(
                            '<li>' + '<img src="../images/' + value.image + '">' +
                                '<h1>' + value.name + '</h1>' +
                                '<p>' + value.title + '</p></li>' +
                                '<li><a href="#management" id="' + value.reportsTo + '"><h2>' + 'View Manager' + '</h2><p>' + value.manager + '</p></a></li>' +
                                '<li><a href="#subordinates" id="subgroup_' + value.id + '"><h2>' + 'View Subordinates' + '</h2><p>' + value.subs + '</p></a></li>' +
                                '<li><a href="tel:' + value.office + '"><h2>' + 'Call Office' + '</h2><p>' + value.office + '</p></a></li>' +
                                '<li><a href="tel:' + value.cell + '"><h2>' + 'Call Cell' + '</h2><p>' + value.cell + '</p></a></li>' +
                                '<li><a href="mailto:' + value.email + '"><h2>' + 'eMail' + '</h2><p>' + value.email + '</p></a></li>'
                        );
                        $("#manager_details").listview("refresh");
                    }
                });
            });
        });
    });
    
    // click event to find subordinates
    $("#manager_details").on("click", "a:eq(1)", function () {
        var subgroupID = $(this).attr("id");
        var subgroupManagerID = subgroupID.substring(9, 12);
        window.console.log(subgroupID);
        window.console.log(subgroupManagerID);
    
     // json to load employee list on subordinates page
        $.getJSON("../json/employees.json", function (data) {   
            $.each(data, function () {
                $.each(this, function (key, value) {
                    if (subgroupManagerID === value.reportsTo) {
                        $("#sub_details").append(
                            '<li><a href="#employee" id="' + value.id + '"><img src="../images/' + value.image + '">' +
                                '<h3>' + value.name + '<span class="ui-li-count">' + value.subs + '</span></h3>' +
                                '<p>' + value.title + '</p></a></li>'
                        );
                    }
                });
            });
            $("#sub_details").listview("refresh");
        });
    });
});
