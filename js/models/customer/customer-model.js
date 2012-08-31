/**
 * @author Salvador Rojas
 */
window.CustomerModel = Backbone.Model.extend({
	urlRoot: "api/customer",
	defaults: {
		"id": null,
		"name": "",
		"age": "",
		"address": "",
		"phone": "",
		"status": ""
	}
});

window.CustomerCollection = Backbone.Collection.extend({
	model:CustomerModel,
	url:"api/customer"
});