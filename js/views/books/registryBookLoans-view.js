/**
 * @author Angel Vazquez
 */
window.RegistryBookLoans = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('registryBookLoans-view'));
    },

    render:function (eventName) {
    
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
	
	events: {
		"click #tblBooksLoans": "tblBooksLoansOnClick",
		"click #btnAvailableBook": "btnAddNewBookOnClick",
		"click #btnEditBookLoans": "btnEditBookLoansOnClick",
		"click #btnDeleteBookLoans": "btnDestroyBookLoansClick"
	},
	
	tblBooksLoansOnClick: function() {
		eventManager.trigger("selectRowBooksLoans", null);
	},
	
	btnAddNewBookOnClick: function() {
		eventManager.trigger("showFormBooksLoans",new BookLoansModel(), false);
	},
	
	btnEditBookLoansOnClick: function() {
		eventManager.trigger("showFormBooksLoans", this.model.models[indexBooksLoans],true);
	},
	
	btnDestroyBookLoansClick: function(event){
		_currentModelSelected = this.model.models[indexBooksLoans];
		
		if ( _currentModelSelected != null  ) {
            _currentModelSelected.destroy( {
                success: function() {
                    alert("Si se eliminó");
                    eventManager.trigger("reloadGridBooksLoans", null);
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