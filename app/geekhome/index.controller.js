(function () {
    'use strict';

    angular
        .module('app')
        .controller('Geekhome.IndexController', Controller);

    function Controller($window, HomepageService, FlashService, $location) {
        var vm = this;
		var userdata = null;
		var url = $location.absUrl().split('#')[0];
		
        vm.user = null;
        vm.homepage = null;
		vm.leftcornerimg = url + "app-content/images/leftcornertext.png";
		vm.midbtm = url + "app-content/images/midbtm.png";
        vm.saveUser = saveUser;
		vm.saveHomepage = saveHomepage;
        vm.deleteUser = deleteUser;
        /*vm.lefttopcornertext = lefttopcornertext;*/

        initController();

        function initController() {
            // get current user
            HomepageService.GetCurrent().then(function (user) {
                vm.user = user;
				userdata = user;
				
            });

            HomepageService.GetHomepagedata().then(function (user) {
                vm.homepage = user;
				vm.homepage.custuserid = userdata._id;
            });
			if(vm.user)	vm.homepage.custuserid = userdata._id;
        }

        function saveUser() {
            HomepageService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
		
		
		function saveHomepage() { 
			console.log("save home page clicked"); 
			vm.homepage.custuserid = userdata._id; 
			console.log(vm.homepage);
			
            HomepageService.Updatehomepage(vm.homepage)
                .then(function () {
                    FlashService.Success('Homepage updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }


        function deleteUser() {
            HomepageService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();