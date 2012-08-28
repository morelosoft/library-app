/**
 * @author Angel Vazquez
 */
window.FormBooks = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('formBooks-view'));
    },

    render:function (eventName) {
    	var modeltojson = this.model.toJSON();
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
	events: {
		"click #btnSaveBook": "btnAddNewBookOnClick"
	},
	
	btnAddNewBookOnClick: function() {
		this.model.save( null,
			{
				success: function( event ){
					alert( event );
				},
				error: function( event ){
					alert('Error');
				}
			});
	}
});