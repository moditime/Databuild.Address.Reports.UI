'use strict';
angular.module('repo')
    .factory('AddressCompanyService', function ($http) {

        var services = {
            getCompanyList: getCompanyList,
            getCompaniesByAddress: getCompaniesByAddress,
            getCompanyIdsToDelete:getCompanyIdsToDelete,
            deleteCompaniesWithAddress:deleteCompaniesWithAddress,
            refreshDictionary:refreshDictionary,
            companyExporting:companyExporting

        };
        return services;

        function getCompanyList() {

            var promise = $http({
                method: "GET",
                url: "http://localhost:3002/Companies/",

            });

            return promise;

        }
        function getCompaniesByAddress(address) {

            var promise = $http({
                    method: "POST",
                    url: "http://localhost:3002/companies/Address/",
                   data: JSON.stringify({ address: address })
                })

            return promise;

        }


        
        function  getCompanyIdsToDelete(address) {

            var promise = $http({
                method: "POST",
                url: "http://localhost:3002/companies/ids",
                data:JSON.stringify({ address: address })

            });

            return promise;

        }
        function deleteCompaniesWithAddress(ids,address) {


       
            var promise = $http({
                    method: "POST",
                    url: "http://localhost:3001/api/companies/delete",
                   data:{ids:ids, address: address }
                })

            return promise;

        }

           function  refreshDictionary() {

             var promise = $http({
                    method: "GET",
                    url: "http://localhost:3002/persist",
                   
                })

            return promise;

    }


    function companyExporting(_companyids)
    {
        //var _companyids = ['1','2']; 
        var csvRows = [];

        for (var i = 0, l = _companyids.length; i < l; ++i) {
            csvRows.push(_companyids[i]);
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var time = today.toTimeString();

       
        var time_c = time.substring(0, 7)
        today = mm + '/' + dd + '/' + yyyy + '-' + time_c;



        var filename = "Companies-".concat(today)

        var csvString = csvRows.join(",");
        var a = document.createElement('a');
        a.href = 'data:attachment/csv,' + csvString;
        a.target = '_blank';
        a.download = filename + '.csv';

        document.body.appendChild(a);
        a.click();





    }







    });