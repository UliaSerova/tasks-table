var myApp = angular.module('myApp', []);
myApp.controller("tableController", ['$scope', 'orderByFilter', function($scope, orderBy) {

    $scope.errorAdit = false;
    $scope.editingTable = false;
    $scope.selectNumber;
    $scope.prioritys = [{
        id: 1,
        text: "Низкий"
    }, {
        id: 2,
        text: "Средний"
    }, {
        id: 3,
        text: "Высокий"
    }]

    $scope.performers = [{
        id: 1,
        text: "Иванов"
    }, {
        id: 2,
        text: "Петров"
    }, {
        id: 3,
        text: "Сидоров"
    }]

    $scope.newTask = {
        name: '',
        desc: '',
        status: false,
        check: false,
        performer: ''
    }

    $scope.tasks = JSON.parse(localStorage.tasks);

    // добавление
    $scope.addItem = function(newTask, answerForm){
            var item = {
                name: $scope.newTask.name,
                desc: $scope.newTask.desc,
                status: false,
                check: false,
                performer: $scope.newTask.performer
            };
            $scope.tasks.push(item);

        $scope.newTask = {};
        $scope.raloadLocalStorage($scope.tasks);
    }

    // редактирование
    $scope.aditItem = function(){
        var selectItem;
        $scope.errorAdit = false;
        // получаем выбронную задачу
        for (item in $scope.tasks) {
            // проверяем сколько было введено значений
            if(selectItem && $scope.tasks[item].check){
                $scope.errorAdit = true;
                return;
            }

            if($scope.tasks[item].check){
                $scope.selectNumber = [item];
                selectItem = $scope.tasks[item];
            }

        }

        if(selectItem){
            // прячем кнопки и заголовок
            $scope.editingTable = true;
            // выводим выбранное на основную форму
            $scope.newTask = {
                name: selectItem.name,
                desc: selectItem.desc,
                status: selectItem.status,
                check: true,
                performer: selectItem.performer
            };
        }

        $scope.raloadLocalStorage($scope.tasks);
    }
    // пересохранение
    $scope.reloadItem = function(){
        $scope.tasks[$scope.selectNumber] = {
            name: $scope.newTask.name,
            desc: $scope.newTask.desc,
            status: $scope.newTask.status,
            check: false,
            performer: $scope.newTask.performer
        }

        $scope.newTask = {};
        $scope.editingTable = false;

        $scope.raloadLocalStorage($scope.tasks);
    }
    // отмена
    $scope.canselItem = function(){
        $scope.newTask = {};
        $scope.editingTable = false;
    }
    // удаление
    $scope.deleteItem = function(){
        $scope.tasks = $scope.tasks.filter(function(item) {
            return !item.check;
        });

        $scope.raloadLocalStorage($scope.tasks);
    }

    // смена статуса задачи
    $scope.itemMade = function(){
        var newArr = [];
        var newObj = {};

        for (item in $scope.tasks){
            newObj = $scope.tasks[item];

            if($scope.tasks[item].check)
                newObj.status =  $scope.tasks[item].check;

            newArr.push(newObj);
        }

        $scope.tasks = newArr;
        $scope.raloadLocalStorage($scope.tasks);
    }

    // запись в localStorage
    $scope.raloadLocalStorage = function (obj){
        localStorage.setItem( "tasks", JSON.stringify(obj) );
    }

    // сортировка
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
            ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.tasks = orderBy($scope.tasks, $scope.propertyName, $scope.reverse);
    };
}]);