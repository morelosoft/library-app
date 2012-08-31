window.DropdownCustomers = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('dropdownCustomer-view'));
    },
    render:function (event) {
    	//var modeltojson = this.model.toJSON();
    	
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
	events: {
		//"click #btnSaveBook": "btnAddNewBookOnClick"
	},
});