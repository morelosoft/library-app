window.LoginModel = Backbone.Model.extend({
	urlRoot: "api/login",
	defaults : {
		"id": null,
   		"name": "",
   		"last1":"",
   		"last2": "",
   		"fullName":"",
   		"email":"",
   		"password": "",
	},
	
});

window.LoginCollection = Backbone.Collection.extend({
	model:LoginModel,
	url:"api/login"
});