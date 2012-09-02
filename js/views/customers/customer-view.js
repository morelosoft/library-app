/**
 * @author Salvador Rojas
 */
window.CustomerView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('customer-view'));
    },
	
    render:function (eventName){
        $(this.el).html(this.template({model:this.model.models}));
        //$(this.el).html(this.template(this.model.toJSON()));

        return this;
    },
    
    events:{
    	"click #tblCustomer": "tblCustomerOnClick",
    	"click #btnCreateCustomer":"btnCreateCustomerOnclick",
    	"click #btnEdithCustomer":"btnEdithCustomerOnclick",
    	"click #btnDeleteCustomer":"btnDeleteCustomerOnclick"
    },
    
    tblCustomerOnClick: function() {
    	
		eventManager.trigger("selectRowTblCustomer", null);
	},
	
    btnCreateCustomerOnclick: function (){
    	eventManager.trigger("showFormCustomer", new CustomerModel(),false);
    },
	
	btnEdithCustomerOnclick: function(){
		eventManager.trigger("showFormCustomer", this.model.models[indexCustomer],true);
	},
	
	btnDeleteCustomerOnclick : function( event ) {
		
		_currentModelSelected = this.model.models[indexCustomer];
		
		if ( _currentModelSelected != null  ) {
			_currentModelSelected.destroy( {
				success: function() {
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