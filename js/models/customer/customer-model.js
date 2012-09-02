/**
 * @author Salvador Rojas
 */
window.CustomerModel = Backbone.Model.extend({
	urlRoot: "http://192.168.24.182:8098/clients/",
	defaults: {
		"id": null,
		"name": "",
		"age": "",
		"address": "",
		"phone": "",
		"status": true	
	}
});

window.CustomerCollection = Backbone.Collection.extend({
	model:CustomerModel,
	url:"http://192.168.24.182:8098/clients/"
});