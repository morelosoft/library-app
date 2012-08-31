/**
 * @author Angel Vazquez
 */
window.BookModel= Backbone.Model.extend({
	urlRoot: "api/book",
	//urlRoot: "api/fields",
	defaults: {
		"id": null,
		"title": "",
		"author": "",
		"genre": "",
		"status": "",
		"available": "",
	}
});

window.BookCollection = Backbone.Collection.extend({
    model:BookModel,
    url:"api/book"
});



window.BookLoansModel= Backbone.Model.extend({
	urlRoot: "api/bookLoans",
	//urlRoot: "api/fields",
	defaults: {
		"id": null,
		"bookID": "",
		"customerID": "",
		"currentdate": "",
		"date": "",
	}
});

window.BookLoansCollection = Backbone.Collection.extend({
    model:BookLoansModel,
    url:"api/bookLoans"
});