/**
 * @author Angel Vazquez
 */
window.GridBooks = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('gridBooks-view'));
    },
    
    _selectedIndex: 2,
	_currentModelSelected: {},

    render:function (eventName) {
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
	
	events: {
		"click #tblBooks": "tblBooksOnClick",
		"click #btnCreateBook": "btnAddNewBookOnClick",
		"click #btnEditBook": "btnEditBookOnClick",
		"click #btnDeleteBook": "btnDestroyBookClick"
	},
	tblBooksOnClick: function() {
		eventManager.trigger("selectRowBooks", null);
	},
	
	btnAddNewBookOnClick: function() {
		eventManager.trigger("showFormBooks", new BookModel(),false);
	},
	
	btnEditBookOnClick: function() {
		eventManager.trigger("showFormBooks", this.model.models[indexBooks],true);
	},
	
	btnDestroyBookClick: function(event){
		_currentModelSelected = this.model.models[indexBooks];
		
		if ( _currentModelSelected != null  ) {
            _currentModelSelected.destroy( {
                success: function() {
                    alert("Si se eliminó");
                    eventManager.trigger("reloadGridBooks", null);
                },
                error: function() {
                    alert("No se eliminó");
                }
            });
        } else {
            alert("No hay datos seleccionada.");
        }
	} 
});