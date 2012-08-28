/**
 * @author Angel Vazquez
 */
window.BookModel= Backbone.Model.extend({
	urlRoot: "api/book",
	//urlRoot: "api/fields",
	defaults: {
		"id": null,
		"title": "",
		"genre": "",
		"status": "",
		"available": "",
	}
});

window.BookCollection = Backbone.Collection.extend({
    model:BookModel,
    url:"api/book"
    //url: "http://192.168.24.182:8098/users/create",
});