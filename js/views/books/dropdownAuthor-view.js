window.DropdownAuthor = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('dropdownAuthor-view'));
    },
    render:function (event) {
    	//var modeltojson = this.model.toJSON();
    	
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
	events: {
	},
});