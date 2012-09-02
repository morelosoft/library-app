/**
 * @author Salvador Rojas
 */
window.FormAuthorView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('form-author-view'));
    },

    render:function (eventName) {
    
        var modeltojson = this.model.toJSON();
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
	
	events: {
		"change" : "change",
		"click #btnSendAuthor":"btnCreateAuthorOnclick",
		"click #btnCancelAuthor": "btnCloseAuthorOnClick"

	},
	
	change: function ( event ){
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },
    
	btnCreateAuthorOnclick: function(){
		
		this.model.save ( null, {
    		success: function( event ) {
    			//Backbone.history.start();
    			console.log(event);
    			eventManager.trigger("hideModal", null);
    			eventManager.trigger("reloadTableAuthor", null);
    		}, 
    		error: function( event ) {
    			console.log(event);
    			alert('Error');
    		}
    	});
	},
	
	btnCloseAuthorOnClick: function(){
		eventManager.trigger("hideModal", null);	
	}
});