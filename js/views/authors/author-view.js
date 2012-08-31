/**
 * @author Salvador Rojas
 */
window.AuthorView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('author-view'));
    },

	_selectedIndex: 2,
	_currentModelSelected: {},
	
    render:function (eventName){
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
	events: {
		"dblclick #tblAuthor": "tblAuthorOnClick",
		"click #btnCreateAuthor":"btnCreateAuthorOnclick",
		"click #btnEdithAuthor":"btnCreateAuthorOnclick"

	},
// 	
	tblAuthorOnClick: function() {
		//eventManager.trigger("selectRow", null);
		
		eventManager.trigger("showFormAuthor", this.model.models[indexAuthor],true);
	},
	
	btnCreateAuthorOnclick: function(){
		eventManager.trigger("showFormAuthor", new AuthorModel(),false);
	}
});