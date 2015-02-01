angular.module('badgerApp')
  .controller('SearchCtrl', function($scope, $http, $location) {
    //determine whether on worker or contract search screen
    var path = $location.path();
    path === '/worker/search' ? $scope.isWorkerSearch = false : $scope.isWorkerSearch = true;

    $scope.entry = {};
    $scope.clear = function() {
      $scope.entry.selected = undefined;
    };

    $scope.refreshTypeahead = function(entry) {
      entry = entry || "";
      if($scope.isWorkerSearch) {
        return $http.get('/api/worker?q=' + entry).then(function(response) {
          $scope.entries = response.data;
        });
      } else {
        return $http.get('/api/contract?q=' + entry).then(function(response) {
          $scope.entries = response.data;
        });
      }
    };

    $scope.doSearch = function(item) {
      var query = item ? item.name : "";
      if($scope.isWorkerSearch) {
        return $http.get('/api/worker?q=' + query).then(function(response) {
          $scope.searchResults = response.data;
        });
      } else {
        return $http.get('/api/contract?q=' + query).then(function(response) {
          $scope.entries = response.data;
        });
      }
    };

    //init
    $scope.doSearch();
  })

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */
  .filter('propsFilter', function() {
    return function(items, props) {
      var out = [];

      if(angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for(var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if(item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if(itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    }
  });
