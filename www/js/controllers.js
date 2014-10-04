angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebase) {
  
  // Form data for the login modal
  $scope.speakerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeForm = function() {
    $scope.modal.hide();
  };

  // Open the add speaker modal
  $scope.addSpeaker = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.saveSpeaker = function() {
    var ref = new Firebase('https://webafternoon.firebaseio.com/speakers');
    var sync = $firebase(ref);
    var speakersArray = sync.$asArray();

    speakersArray.$add($scope.speakerData);
    

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.speakerData = {};
      $scope.closeForm();
    }, 1000);
  };
})

.controller('SpeakersCtrl', function($scope, $firebase) {
  var ref = new Firebase('https://webafternoon.firebaseio.com/speakers');
  var sync = $firebase(ref);
  var speakersArray = sync.$asArray();
  
  $scope.speakers = speakersArray;
})

.controller('SpeakerCtrl', function($scope, $stateParams, $firebase) {
  var ref = new Firebase('https://webafternoon.firebaseio.com/speakers/' + $stateParams.speakerId);
  var sync = $firebase(ref);
  var speaker = sync.$asObject();
  $scope.speaker = speaker;
  
});
