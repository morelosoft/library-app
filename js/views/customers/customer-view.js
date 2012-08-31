/**
 * @author Salvador Rojas
 */
window.CustomerView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('customer-view'));
    },
	
    render:function (eventName){
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
    
    events:{
    	"click #btnCreateCustomer":"btnCreateCustomerOnclick"
    },
    
    btnCreateCustomerOnclick: function (){
    	eventManager.trigger("showFormCustomer", new CustomerModel(),false);
    	
    }
    
    
	// events: {
		// "click #btnAddNewForm": "btnAddNewFormOnClick"
	// },
// 	
	// btnAddNewFormOnClick: function() {
		// eventManager.trigger("showModal", new FormModel(), false);
	// }
});