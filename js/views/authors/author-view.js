/**
 * @author Salvador Rojas
 */
window.AuthorView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('author-view'));
    },
	
    render:function (eventName){
        $(this.el).html(this.template({model:this.model.models}));
        //$(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
	events: {
		"click #tblAuthor": "tblAuthorOnClick",
		"click #btnCreateAuthor":"btnCreateAuthorOnclick",
		"click #btnEdithAuthor":"btnEdithAuthorOnclick",
		"click #btnDeleteAuthor":"btnDeleteAuthorOnclick"
	},
	
	tblAuthorOnClick: function() {
		eventManager.trigger("selectRowTblAuthor", null);
	},
	
	btnCreateAuthorOnclick: function(){
		eventManager.trigger("showFormAuthor", new AuthorModel(),false);
	},
	
	btnEdithAuthorOnclick: function(){
		eventManager.trigger("showFormAuthor", this.model.models[indexAuthor],true);
	},
	
	btnDeleteAuthorOnclick : function( event ) {
		
		_currentModelSelected = this.model.models[indexAuthor];
		
		if ( _currentModelSelected != null  ) {
			_currentModelSelected.destroy( {
				success: function() {
					alert("Si se eliminó");
					eventManager.trigger("reloadTableAuthor", null);
				},
				error: function() {
					alert("No se eliminó correctamente");
				}
			});
		} else {
			alert("No hay datos seleccionada.");
		}
		
	},
});