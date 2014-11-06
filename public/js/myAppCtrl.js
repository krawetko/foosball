var myApp = angular.module("myApp", []);

myApp.filter('teamName', function () {
    return function (teamId) {
        if (teamId == 1) {
            return "AC Pierdoły";
        } else if (teamId == 2) {
            return "FC Stulejorze";
        } else return "Invalid Data";
    }
})

myApp.filter('team1WinCount', function () {
    return function (matches) {
        if (matches == null) return 0;
        var winCount = 0;
        for (var i = 0; i < matches.length; i++) {
            if (matches[i].winner == 1) {
                winCount++;
            }
        }
        return winCount;
    }
})

myApp.filter('team2WinCount', function () {
    return function (matches) {
        if (matches == null) return 0;
        var winCount = 0;
        for (var i = 0; i < matches.length; i++) {
            if (matches[i].winner == 2) {
                winCount++;
            }
        }
        return winCount;
    }
})

myApp.filter('goals1', function () {
    return function (matches) {
        if (matches == null) return 0;
        var goalCount = 0;
        for (var i = 0; i < matches.length; i++) {
            goalCount += matches[i].goals_1
        }
        return goalCount;
    }
})

myApp.filter('goals2', function () {
    return function (matches) {
        if (matches == null) return 0;
        var goalCount = 0;
        for (var i = 0; i < matches.length; i++) {
            goalCount += matches[i].goals_2
        }
        return goalCount;
    }
})

myApp.filter('formatDate', function () {
    return function (date) {
        return new Date(Date.parse(date)).toLocaleDateString("pl-PL");
    };
})

myApp.filter('matchesFilter', function () {
    return function (matches, filterBy) {
        if (filterBy == null) return matches;

        var filteredMatches = [];
        var filterFunction = null;
        if (filterBy == 'Upokorzenie') {
            filterFunction = function (currentMatch) {
                return currentMatch.goals_1 == 0 || currentMatch.goals_2 == 0;
            }
        } else if (filterBy == "Dominacja") {
            filterFunction = function (currentMatch) {
                return currentMatch.goals_1 <= 3 || currentMatch.goals_2 <= 3;
            }
        } else if (filterBy == "Farty") {
            filterFunction = function (currentMatch) {
                return (Math.abs(currentMatch.goals_1 - currentMatch.goals_2) == 1);
            }
        }

        for (var i = 0; i < matches.length; i++) {
            var currentMatch = matches[i];

            if (filterFunction(currentMatch)) {
                filteredMatches.push(currentMatch)
            }
        }
        return filteredMatches;
    }
})

myApp.controller('FirstCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/matches'
    }).
        success(function (data, status, headers, config) {
            $scope.matches = data;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });
});

