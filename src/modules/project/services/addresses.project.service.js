'use strict';
angular.module('repo')
    .factory('AddressProjectService', function ($http) {

        var services = {
            getProjectList: getProjectList,
            getProjectByAddress: getProjectByAddress,
            getProjectIdsToDelete: getProjectIdsToDelete,
            deleteProjectWithAddress: deleteProjectWithAddress,
            refreshProjDictionary: refreshProjDictionary,
            projectExporting:projectExporting

        };
        return services;

        function getProjectList() {

            var promise = $http({
                method: "GET",
                url: "http://localhost:3002/Projects/",

            });

            return promise;

        }
        function getProjectByAddress(address) {

            var promise = $http({
                method: "POST",
                url: "http://localhost:3002/projects/Address/",
                data: JSON.stringify({ address: address })
            })

            return promise;

        }

        function getProjectIdsToDelete(address) {

            var promise = $http({
                method: "POST",
                url: "http://localhost:3002/projects/ids",
                data: JSON.stringify({ address: address })

            });

            return promise;

        }
        function deleteProjectWithAddress(ids, address) {



            var promise = $http({
                method: "POST",
                url: "http://localhost:3001/api/projects/delete",
                data: { ids: ids, address: address }
            })

            return promise;

        }

        function refreshProjDictionary() {

            var promise = $http({
                method: "GET",
                url: "http://localhost:3002/pers",

            })

            return promise;

        }

        function projectExporting(_projectids) {

                    var csvRows = [];

        for (var i = 0, l = _projectids.length; i < l; ++i) {
            csvRows.push(_projectids[i]);
            
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var time = today.toTimeString();


        var time_c = time.substring(0, 7)
        today = mm + '/' + dd + '/' + yyyy + '-' + time_c;

        var filename = "Projects-".concat(today)

        var csvString = csvRows.join(",");
        var a = document.createElement('a');
        a.href = 'data:attachment/csv,' + csvString;
        a.target = '_blank';
        a.download = filename + '.csv';

        document.body.appendChild(a);
        a.click();




        }



    });

