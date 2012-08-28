/**
 * @author Angel Vazquez
 */
window.RegistryBookLoans = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('registryBookLoans-view'));
    },

    render:function (eventName) {
    
        $(this.el).html(this.template());
        return this;
    },
	
	events: {
		"click #btnCreateBook": "btnAddNewBookOnClick"
	},
	
	btnAddNewBookOnClick: function() {
		eventManager.trigger("showFormBooks",new BookModel(), false);
	}
});