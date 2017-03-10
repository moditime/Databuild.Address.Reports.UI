$(function () {

    $.ajax({
        url: "http://localhost:3000/",
        type: 'GET',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    })
        .done(function (data) {
            var htmlMarkup = ["<table><tbody>"];
            
             
            data.forEach(function(item){
                htmlMarkup.push(`
    <tr>
    <td>${item.count}</td>
    <td>${item.fulladdress}</td>
    <td><button type="button" class="btn btn-primary">Show</button></td>

  </tr>`)
      
  
            })
            
             htmlMarkup.push("</tbody></table>");

             $('#table-project').append(htmlMarkup.join(''));
        });
});