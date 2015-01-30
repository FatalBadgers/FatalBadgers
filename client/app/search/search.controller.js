angular.module('badgerApp')
  .controller('SearchCtrl', function($scope, $http, $location) {
    //determine whether on worker or contract search screen
    $location.path() === '/worker/search' ? $scope.isWorkerSearch = true :  $scope.isWorkerSearch = false;

    $scope.entry = {};
    $scope.clear = function() {
      $scope.entry.selected = undefined;
    };

    $scope.refreshTypeahead = function(entry) {
      return $http.get('/api/workers?q=' + entry).then(function(response) {
          $scope.entries = response.data.results
        });
    };

    $scope.doSearch = function(item, model) {
      return $http.get('/api/workers?q=' + item).then(function(response) {
        $scope.searchResults = response.data.results
      });
    };
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
