app.controller("ProjectListCtrl", function ($scope, $stateParams,AddressProjectService) {

    $scope.title = "Companies with same Addresses";

    $scope.companies = [];
    $scope._projectids=[];

       var address_keys="current_addresses";

    var address=$stateParams.address;
       var actual_address=address;

       
     if(address){
        localStorage.setItem("address_keys",JSON.stringify(address));
    }else
    {
       address=JSON.parse(localStorage.getItem('address_keys')) ;
    }


       function formatAddress() {
                                return [actual_address.StreetNumber, actual_address.Street, actual_address.Suburb, actual_address.City, actual_address.Province, actual_address.Country]
                                    .map(function(x) {
                                        return x || ''
                                    }).filter(function(x) {
                                        return x;
                                    }).join(', ');
                            }

    if(address)
    {
         loadProjectsWithSameAddresses(address);
    }

    //loadCompaniesWithSameAddresses();
    
console.log("State",$stateParams);

    function loadProjectsWithSameAddresses(address) {
        // console.log("To load companies", AddressCompanyService.getCompanyList());
        var promise = AddressProjectService.getProjectByAddress(address);
        promise.then(function (response,index) {
            $scope._projectids[index] = response.data;
            $scope.projects=response.data;
            $scope.address=formatAddress();
            $scope.count=$stateParams.count;
            console.log("Response", response);
        }).catch(function(){


        })
    }

       $scope.exportProjects = function () {
        console.log("Ready to export Projects");

        var _projectids = $scope.projects.map(function (item) {
            return item.Id;
        });
        console.log("Check Projects", _projectids);


        AddressProjectService.projectExporting(_projectids);

    }



})