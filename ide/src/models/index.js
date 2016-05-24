import AuthService from './AuthService.js';

module.exports = {
	init: function(Vue) {

		window.$http = Vue.$http;

		window.$Resource = {};
		$Resource.AuthService = AuthService;
	}
}