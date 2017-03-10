
/*$(function () {

    $.ajax({
        url: "http://localhost:3000/",
        type: 'GET',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    })
        .done(function (data) {
            var htmlMarkup = ["<table height='100px'><tbody>"];
            
             
            data.forEach(function(item){
                htmlMarkup.push(`
    <tr>
    <td>${item.count}</td>
    <td>${item.fulladdress}</td>
    <td><button type="button" class="btn btn-primary">Show</button></td>

  </tr>`)
      
  
            })
            
             htmlMarkup.push("</tbody></table>");

             $('#table-reports').append(htmlMarkup.join(''));
        });
});*/



$(function () {


    $("#projects").hide();
    $("#companies").hide();
    $("#company-list").hide();
     $("#Project-list").hide();

    var _addresses = [];
    //var _addressProj=[];

    //---------------------------------------------------- Companies ----------------------------------------------------------------------

    function GetCompanies() {


        $.ajax({
            url: "http://localhost:3000/Companies/",
            type: 'GET',
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        })
            .done(function (data) {
                _addresses = data;

               // alert("Returned Data"+ _addresses);
                console.log('Returned Data',data);
                
                var htmlMarkup = ["<table><tbody><th>No of Companies</th><th>Address shared</th><th>Details</th>"];

                data.forEach(function (item, index) {

                    htmlMarkup.push(`
                                    <tr>
                                    <td>${item.count}</td>
                                    <td>${item.fulladdress}</td>
                                    <td><button type="button" class="btn btn-primary show_list_com"  data-address=${index}>Show</button></td>

                                </tr>`)




                })

                htmlMarkup.push("</tbody></table>");

                $('#table-company').append(htmlMarkup.join(''));



                $('.show_list_com').click(function () {
                    const addressIndex = $(this).data('address');

                      var address = _addresses[addressIndex].address;
                     

                    console.log('JSON: address',  address);
                    $.ajax({
                        url: "http://localhost:3000/companies/Address/",
                        type: 'POST',
                        data: JSON.stringify({ address: address }),
                        crossDomain: true,
                        contentType: "application/json; charset=utf-8",
                        //dataType: "json",
                    })
                        .done(function (data) {
                          
                            //window.location="companylist.html";
                                    
                             
                    $("#companies").hide();
                   $("#company-list").show();

                   
                            console.log('DATA', data)
                            //

                            var htmlMarkup = ["<table><tbody><th>Company ID</th><th>Company Name</th>"];


                            data.forEach(function (item) {
                                htmlMarkup.push(`
    <tr>
    <td>${item.Id}</td>
    <td>${item.Name}</td>
     <td>${item.fulladdress}</td>

  </tr>`)


                            })


                            htmlMarkup.push("</tbody></table>");

                            $('#table-company1').append(htmlMarkup.join(''));



                        }).fail(function () {
                            alert('Request failed');
                        });


                })
            });

    }


//---------------------------------------------------- Projects ----------------------------------------------------------------------

    function GetProjects() {

        $.ajax({
            url: "http://localhost:3000/Projects/",
            type: 'GET',
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        })
            .done(function (data) {
                 _address = data;
                var htmlMarkup = ["<table><tbody><th>No of Companies</th><th>Address shared</th><th>Details</th>"];


                data.forEach(function (item, index) {
                    htmlMarkup.push(`
    <tr>
    <td>${item.count}</td>
    <td>${item.fulladdress}</td>
    <td><button type="button" class="btn btn-primary show_list_proj"  data-address=${index}>Show</button></td>

  </tr>`)


                })


                htmlMarkup.push("</tbody></table>");

                $('#table-project').append(htmlMarkup.join(''));

//Project binding and firing 

                $('.show_list_proj').click(function () {
                    const addressIndex = $(this).data('address');

                      var address = _address[addressIndex].address;
                     

                    console.log('JSON: address',  address);
                    $.ajax({
                        url: "http://localhost:3000/projects/Address/",
                        type: 'POST',
                        data: JSON.stringify({ address: address }),
                        crossDomain: true,
                        contentType: "application/json; charset=utf-8",
                        //dataType: "json",
                    })
                        .done(function (data) {
                          
                            //window.location="companylist.html";
                                    
                             
                    $("#projects").hide();
                   $("#Project-list").show();

                   
                            console.log('DATA', data)
                            //

                            var htmlMarkup = ["<table><tbody><th>Project ID</th><th>Project Name</th>"];


                            data.forEach(function (item) {
                                htmlMarkup.push(`
    <tr>
    <td>${item.Id}</td>
    <td>${item.Name}</td>
    

  </tr>`)


                            })


                            htmlMarkup.push("</tbody></table>");

                            $('#table-project-list').append(htmlMarkup.join(''));



                        }).fail(function () {
                            alert('Request failed');
                        });


                })









































            });

    }




    function ListCompaniesAddress(aa) {

        console.log(`aa`, aa);


        //     alert('I am working just fine');
        //     var one = "";

        //     var address =
        //         {
        //             "ErfNumber": null,
        //             "Street": "Logan Street",
        //             "StreetNumber": "",
        //             "Suburb": "Polokwane Ext 46",
        //             "City": "Polokwane",
        //             "PostalCode": null,
        //             "Province": "Limpopo",
        //             "Country": "South Africa",
        //             "type": "Point",
        //             "coordinates": [
        //                 29.46277,
        //                 -23.87865
        //             ],
        //             "Longitude": 29.46277,
        //             "Latitude": -23.87865
        //         }
        //         ;


        //     var asa = {
        //         "address": {
        //             "ErfNumber": null,
        //             "Street": "Logan Street",
        //             "StreetNumber": "",
        //             "Suburb": "Polokwane Ext 46",
        //             "City": "Polokwane",
        //             "PostalCode": null,
        //             "Province": "Limpopo",
        //             "Country": "South Africa",
        //             "type": "Point",
        //             "coordinates": [
        //                 29.46277,
        //                 -23.87865
        //             ],
        //             "Longitude": 29.46277,
        //             "Latitude": -23.87865
        //         }

        //     };



        //     var dataString = JSON.stringify(asa);

        //     //  putting our stringified json into a variable for posting
        //     var postArray = { json: dataString };

        //     alert(asa);

        //     $.ajax({
        //         url: "http://localhost:3000/companies/Address/",
        //         type: 'POST',
        //         data: dataString,
        //         crossDomain: true,
        //         contentType: "application/json; charset=utf-8",
        //         //dataType: "json",
        //     })
        //         .done(function (data) {
        //             alert('i am done');
        //             alert(data);
        //             /*var htmlMarkup = ["<table><tbody><th>No of Companies</th><th>Address shared</th><th>Details</th>"];


        //             data.forEach(function (item) {
        //                 htmlMarkup.push(`
        //     <tr>
        //     <td>${item.count}</td>
        //     <td>${item.fulladdress}</td>
        //     <td><button type="button" class="btn btn-primary">Show</button></td>

        //   </tr>`)


        //             })

        //             htmlMarkup.push("</tbody></table>");

        //             $('#table-project').append(htmlMarkup.join(''));*/
        //         }).fail(function () {
        //             alert('Request failed');
        //         });


    }




























    //   var CompanyDiv = document.getElementById('table-company');
    // var ProjectDiv = document.getElementById('table-project');

    //   var companyBtn = document.getElementById('showcompany');
    //   var projectBtn = document.getElementById('showproject');

    //Event for Company button
    //   companyBtn.onclick = function() {
    //      GetCompanies(); 

    //         // ProjectDiv.setAttribute('class', 'hidden');
    //         //  CompanyDiv.setAttribute('class', 'visible');
    //       }        

    $('#showcompany').on('click', function () {
         
        $("#projects").hide();
        $("#companies").show();
        GetCompanies();

    })

    $('#showproject').on('click', function () {

        $("#projects").show();
        $("#companies").hide();
        GetProjects();

    })

   $('#clear').on('click', function () {
    $("#company-list").hide();
  
    })

     $('#clear-proj').on('click', function () {
    $("#Project-list").hide();
  
    })

    //Event for show button

    //  //Event for Project button
    //     projectBtn.onclick = function() {
    //          GetProjects();
    //         // 
    //         // CompanyDiv.setAttribute('class', 'hidden');
    //         // ProjectDiv.setAttribute('class', 'visible');



    //     }  


});
