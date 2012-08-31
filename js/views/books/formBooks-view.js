/**
 * @author Angel Vazquez
 */

var authorValue = 0;
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
		"change" : "change",
		"click #btnSaveBook": "btnAddNewBookOnClick",
		"click #btnCloseBook": "btnCloseBookOnClick"
	},
	 
	change: function ( event ){
    	
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        //console.log(this.model);
    },
    
	btnAddNewBookOnClick: function() {
		this.model.save( null,
			{
				success: function( event ){
					//alert( event );
					eventManager.trigger("hideModal", null);
					eventManager.trigger("reloadGridBooks", null);
				},
				error: function( event ){
					alert('Error');
				}
			});
	},
	
	btnCloseBookOnClick: function(){
		eventManager.trigger("hideModal", null);	
	}
});