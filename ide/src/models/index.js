import AuthService from './AuthService.js';

module.exports = {
	init: function(Vue) {

		window.$resource = Vue.resource;
		
		window.$Model = {};
		$Model.AuthService = AuthService;
	}
}