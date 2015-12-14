angular.module('tizen.controllers', [])

.controller('tizenStart', function ($scope, $ionicModal, $http,$ionicLoading,$ionicScrollDelegate) {
	$scope.term="";
	$scope.showInput=true;
	var mySwipe={};
	$scope.$watch('sliderWatcher',function(obj){
		mySwipe=obj;
	});
	var el=document.getElementsByClassName('swiper-container')[0];
	$scope.listOfLang=[{"label":"Arabic","value":"ara"},
	                   {"label":"Engish","value":"eng"},
	                   {"label":"French","value":"fra"},
	                   {"label":"German","value":"deu"},
	                   {"label":"Japanese","value":"jpn"},
	                   {"label":"Polish","value":"pol"},
	                   {"label":"Spanish","value":"spa"},
	                   {"label":"Hindi","value":"hin"},];

	$scope.defaultSrcLang=$scope.listOfLang[1].value;
	$scope.defaultDstLang=$scope.listOfLang[1].value;
	//$scope.message="it works";
$scope.slideHasChanged=function(data){
	console.log(data);
};

$scope.toggleInput=function(){
	$scope.showInput=!$scope.showInput;
};
$scope.resetSearch=function(){
	//$scope.message.length=0;
	$scope.showInput=true;
	mySwipe.slideTo(0);
	$ionicScrollDelegate.scrollTop();
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	
	el.scrollTop = 0;
	//console.log(el);
};

	$scope.doSearch=function(){
		if($scope.term.length>0){
			$ionicLoading.show();
			$http.jsonp('https://glosbe.com/gapi/translate?from='+$scope.defaultSrcLang+'&dest='+$scope.defaultDstLang+'&format=json&callback=JSON_CALLBACK&phrase='+$scope.term).then(function successCallback(response) {
				$scope.message=response.data.tuc;
				console.log(mySwipe);
				$scope.toggleInput();
				$ionicLoading.hide();
			console.log(JSON.stringify(response.data.tuc));
				// this callback will be called asynchronously
				// when the response is available
			}, function errorCallback(response) {
				$scope.message=response;
				$ionicLoading.hide();
				console.log(response);
				
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		else{
			console.log("empty term");

		}
	};
});