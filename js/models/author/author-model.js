/**
 * @author Salvador Rojas
 */
window.AuthorModel = Backbone.Model.extend({
	urlRoot: "api/author",
	defaults: {
		"id":null,
		"name": "",
		"birth_day": "",
		"country": "",
		"status":""
	}
	
});

window.AuthorCollection = Backbone.Collection.extend({
	model:AuthorModel,
	url:"api/author"
});