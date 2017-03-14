app.controller("ProjectCtrl", function ($scope,$state, AddressProjectService) {

    $scope.title = "Projects sharing same Addresses";

    $scope.projects = [];
    var dictionary_p = {};

      $scope.no="No of Projects";
       $scope.add="Address shared";
       $scope.det="Details";
       $scope.act="Action";

    loadProjectDictionaries().then(loadProjectsWithSameAddresses);
    
    $scope.showProjectsThatShareThisAddress = function(address,count){
        console.log("Address",address);
        $state.params.address=address;
         $state.params.count=count;
         $state.go("show.projectList", $state.params);
    }

    function loadProjectsWithSameAddresses() {
        // console.log("To load companies", AddressCompanyService.getCompanyList());
        var promise = AddressProjectService.getProjectList();
        promise.then(function (response) {

                  response.data.forEach(function(item) {

                if (dictionary_p[item.fulladdress]) {
                    item.isDeleted = true;
                }
                else {
                    item.isDeleted = false;
                }
            });





            $scope.project=response.data;
            console.log("Response", response);
        }).catch(function(){


        })
    }

      function loadProjectDictionaries() {

        var promise = AddressProjectService.refreshProjDictionary();

        promise.then(function(response) {

            dictionary_p = response.data;


        })
        return promise;

    }

    function deleteProjectAddresses(ids, address) {
        return AddressProjectService.deleteProjectWithAddress(ids, address);

    }


    $scope.DeleteProjectsThatShareThisAddress = function(item) {

        var address = item.address;

        // $scope.companies / address;

        //address.isDeleted = true;
        // $scope.companies.

        console.log('button delete', address);



        // console.log("i got here");
        // console.log("Address", address);





        AddressProjectService.getProjectIdsToDelete(address)
            .then(function(response) {


                console.log(response.data, "response.data", response.data.error, "response.data.error");

                if (response.data.error) {
                    alert('Error from server');
                } else {
                    var ids = response.data;
                    return deleteProjectAddresses(ids, address);
                }

            }).then(function(response) {

                if (response.data.error) {
                    alert('Error from server');
                } else if(response.data.message) {
                    item.isDeleted = true;
                }



            }).catch(function(error) {

                console.log("Error", error);

            })


    }











})