app.controller("CompanyListCtrl", function ($scope, $stateParams, AddressCompanyService) {

    $scope.title = "Companies with same Addresses";

    $scope.companies = [];
    $scope._companyids = [];

    

    var address_key="current_address";


   

    var address = $stateParams.address;
    var count = $stateParams.count;

     if(address){
        localStorage.setItem("address_key",JSON.stringify(address));
    }else
    {
       address=JSON.parse(localStorage.getItem('address_key')) ;
    }

    console.log('address::', address);

    var actual_address = address;

    function formatAddress() {
        return [actual_address.StreetNumber, actual_address.Street, actual_address.Suburb, actual_address.City, actual_address.Province, actual_address.Country]
            .map(function (x) {
                return x || ''
            }).filter(function (x) {
                return x;
            }).join(', ');
    }



    if (address) {
        loadCompaniesWithSameAddresses(address);
    }

    //loadCompaniesWithSameAddresses();

    console.log("State", $stateParams);

    function loadCompaniesWithSameAddresses(address) {
        // console.log("To load companies", AddressCompanyService.getCompanyList());
        var promise = AddressCompanyService.getCompaniesByAddress(address);
        promise.then(function (response, index) {

            $scope._companyids[index] = response.data;
            $scope.companies = response.data;
            $scope.address = formatAddress();
            $scope.count = $stateParams.count;
            console.log("Response", response);
        }).catch(function () {


        })
    }



    $scope.exportCompanies = function () {
        console.log("Ready to export");

        var _companyids = $scope.companies.map(function (item) {
            return item.Id;
        });
        console.log("Check", _companyids);


        AddressCompanyService.companyExporting(_companyids);

    }



})