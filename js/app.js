(function (angular) {
	'use strict';
	// Your starting point. Enjoy the ride!
	//应用程序主模块
	var myApp = angular.module('myTodoMVC',[]);
	//主控制器
	myApp.controller('mainController',['$scope',function($scope){
		//生成随机id函数
		function getId (){
			var id = Math.random();
			for (var i = 0; i < $scope.todos.length; i++) {
				if($scope.todos[i].id === id){
					id = getId();
					break;
				}				
			}
			return id;
		};
		//文本框模型
		$scope.text = '';
		//任务列表模型
		//每个任务的结构	{id: 1,text: '吃饭',completed: false}
		$scope.todos = [];
		//添加todo
		$scope.add = function(){
			$scope.todos.push({
				id: getId(),
				text: $scope.text,
				completed: false
			});
			//清空文本框
			$scope.text = '';
		}
		$scope.remove = function(id){
			for (var i = 0; i < $scope.todos.length; i++) {
				if(id === $scope.todos[i].id){
					$scope.todos.splice(i,1);
					break;
				}
			}
		};
		//清空已完成todo
		$scope.clear = function(){
			var result = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if(!$scope.todos[i].completed){
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		}
		//是否已经有完成的
		$scope.existCompleted = function(){
			for (var i = 0; i < $scope.todos.length; i++) {
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}
		//当前编辑那个元素
		$scope.currentEditingId = -1;
		$scope.editing = function(id){
			$scope.currentEditingId = id;
		}
		//回车取消编辑
		$scope.save = function(){
			$scope.currentEditingId = -1;
		}
		//全选/取消全选
		var now = true;
		$scope.toggleAll = function(){
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = now
			}
			now = !now;
		}
		//隐藏底部
		$scope.ifShow = function(){
			if($scope.todos.length==0){
				return false;
			} else {
				return true;
			}
		}
	}]);
})(angular);
