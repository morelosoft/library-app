/**
 * @author Salvador Rojas
 */
window.AuthorModel = Backbone.Model.extend({
	urlRoot: "http://192.168.24.182:8098/author/",
	defaults: {
		'"id"':null,
		'"name"': " ",
		'"birth_day"': " ",
		'"country"': " ",
		'"status"':true
	}
	
});

window.AuthorCollection = Backbone.Collection.extend({
	model:AuthorModel,
	url:"http://192.168.24.182:8098/author/"
}); 