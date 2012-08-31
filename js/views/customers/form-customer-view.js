/**
 * @author Salvador Rojas
 */
window.FormCustomerView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('form-customer-view'));
    },

    render:function (eventName) {
    
        var modeltojson = this.model.toJSON();
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    events: {
		"change" : "change",
		"click #btnSendCustomer":"btnCreateCustomerOnclick",
		"click #btnCancelCustomer": "btnCloseCustomerOnClick"

	},
	
	change: function ( event ){
    	
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },
    
	btnCreateCustomerOnclick: function(){
		//eventManager.trigger("showFormAuthor", new AuthorModel(),false);
		
		this.model.save ( null, {
    		success: function( event ) {
    			//Backbone.history.start();
    			eventManager.trigger("hideModal", null);
    			eventManager.trigger("reloadTableCustomer", null);
    			
    		}, 
    		error: function( event ) {
    			alert('Error');
    		}
    	});
	},
	
	btnCloseCustomerOnClick: function(){
		eventManager.trigger("hideModal", null);	
	}
}); 