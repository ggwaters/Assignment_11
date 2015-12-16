// scripts for home page
$(document).ready(function () {
    
    // creating web worker to retrieve employee data
    var worker = new Worker("getJSON.js");  
    worker.postMessage("data/employees.json");
    
    // storing the employee data
    worker.onmessage = function (e) {
        sessionStorage.employees = JSON.stringify(e.data);  
    };
    window.console.log(worker);
    
    // json to load employee list on home page
    $.getJSON("../json/employees.json", function (data) {   
        window.console.log(data);
        $.each(data, function () {
            $.each(this, function (key, value) {
                $("#result").append(
                    '<li><a href="#employee" id="' + value.id + '"><img src="../images/' + value.image + '">' +
                        '<h2>' + value.name + '<span class="ui-li-count">' + value.subs + '</span></h2>' +
                        '<p>' + value.title + '</p></a></li>'
                );
            });
        });
        $("#result").listview("refresh");
    });
    
    // click event for employee 
    $("#result").on("click", "a", function () {
        var employeeID = $(this).attr("id");
//        sessionStorage.id = employeeID;
        window.console.log(employeeID);
//        var data = JSON.parse(sessionStorage.employees)
        // json to load employee list on home page
        $.getJSON("../json/employees.json", function (data) {   
            window.console.log(data);
//            $.pagecreate("refresh");
            $.each(data, function () {
                $.each(this, function (key, value) {
                    if (employeeID === value.id) {
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