/**
 * @author Angel Vazquez
 */
window.FormBooksLoans = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('formBooksLoans-view'));
    },

    render:function (eventName) {
    	var modeltojson = this.model.toJSON();
        $(this.el).html(this.template(this.model.toJSON()));
        
        // bookID
        // customerID

        
        return this;
    },
	events: {
		"change" : "change",
		"click #btnSaveBookLoans": "btnAddNewBookOnClick",
		"click #btnCloseBook": "btnCloseBookOnClick"
	},
	 
	change: function ( event ){
    	
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change["currentdate"] = dateNow
        change[target.name] = target.value;
        this.model.set(change);
    },
    
	btnAddNewBookOnClick: function() {
		this.model.save( null,
			{
				success: function( event ){
					//alert( event );
					eventManager.trigger("hideModal", null);
					eventManager.trigger("reloadGridBooksLoans", null);
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