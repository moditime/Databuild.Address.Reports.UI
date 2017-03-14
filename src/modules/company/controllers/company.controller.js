app.controller("CompanyCtrl", function($scope, $state, AddressCompanyService) {

    $scope.title = "Companies sharing same Addresses";

    $scope.companies = [];
    var dictionary = {};
    

    $scope.no = "No of Companies";
    $scope.add = "Address shared";
    $scope.det = "Details";
    $scope.act = "Action";




    loadDictionaries().then(loadCompaniesWithSameAddresses);



    $scope.showCompaniesThatShareThisAddress = function(address, count) {
        console.log("Address", address);
        $state.params.address = address;
        $state.params.count = count;
        $state.go("show.companiesList", $state.params);
    }

    function loadCompaniesWithSameAddresses() {
        // console.log("To load companies", AddressCompanyService.getCompanyList());
        var promise = AddressCompanyService.getCompanyList();
        promise.then(function(response) {

            // $scope.companies = response.data;

            response.data.forEach(function(item) {

                if (dictionary[item.fulladdress]) {
                    item.isDeleted = true;
                }
                else {
                    item.isDeleted = false;
                }
            });
            $scope.companies = response.data;
            console.log("Response", response);
        }).catch(function() {


        })
    }

    function loadDictionaries() {

        var promise = AddressCompanyService.refreshDictionary();

        promise.then(function(response) {

            dictionary_p = response.data;


        })
        return promise;

    }

    function deleteCompanyAddresses(ids, address) {
        return AddressCompanyService.deleteCompaniesWithAddress(ids, address);

    }


    $scope.DeleteCompaniesThatShareThisAddress = function(item) {

        var address = item.address;

        // $scope.companies / address;

        //address.isDeleted = true;
        // $scope.companies.

        console.log('button delete', address);



        // console.log("i got here");
        // console.log("Address", address);





        AddressCompanyService.getCompanyIdsToDelete(address)
            .then(function(response) {


                console.log(response.data, "response.data", response.data.error, "response.data.error");

                if (response.data.error) {
                    alert('Error from server');
                } else {
                    var ids = response.data;
                    return deleteCompanyAddresses(ids, address);
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