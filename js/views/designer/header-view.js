window.HeaderView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('header-view'));
    },

    render:function (eventName) {
    
        $(this.el).html(this.template());
        return this;
    },
	
	events: {
		"click #btnAddNewForm": "btnAddNewFormOnClick"
	},
	
	btnAddNewFormOnClick: function() {
		//eventManager.trigger("showModal", new FormModel(), false);
	}
});