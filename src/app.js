//----  Declaring module, passing module name and Router parameter for Routing purpose --------------

var app = angular.module("repo", ['ui.router']);


//----  Registering states  with $stateProvider in a config block.--------------

 app.config(function ($stateProvider) {

      $stateProvider.state('show', {
      template: '<ui-view></ui-view>',
      abstract: true
    })
    .state('show.companies', {
      url: '/show/companies',
      templateUrl: 'src/modules/company/views/address-companies.html',
      controller: 'CompanyCtrl',
     
    })

      .state('show.companiesDelete', {
      url: '/show/companiesDelete',
      templateUrl: 'src/modules/company/views/address-companies.html',
      controller: 'CompanyDeleteCtrl',
     
    })

      .state('show.companiesList', {
      url: '/show/companies/list',
      templateUrl: 'src/modules/company/views/address-companies-list.html',
      controller: 'CompanyListCtrl',
      params: {
        address: null,
        count: '0'
      }
    })
    .state('show.projects', {
      url: '/show/projects',
      templateUrl: 'src/modules/project/views/address-projects.html',
      controller: 'ProjectCtrl',
     
    })
      .state('show.projectList', {
      url: '/show/project/list',
      templateUrl: 'src/modules/project/views/address-projects-list.html',
      controller: 'ProjectListCtrl',
      params: {
        address: null,
          count: '0'
      }
    })



 });

