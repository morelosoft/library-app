window.DropdownBooksView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('dropdownBooks-view'));
    },

    render:function (event) {
    	
    	//var modeltojson = this.model.toJSON();
        $(this.el).html(this.template({model:this.model.models}));
        return this;
    },
    events: {
    	// "change" : "change",
    	// "click #btnSave" : "btnSaveOnClick"
    },
    // change: function ( event ){
//      	
        // // Apply the change to the model
        // var target = event.target;
        // var change = {};
        // change[target.name] = target.value;
        // this.model.set(change);
        // console.log(this.model);
//         
    // },
    // btnSaveOnClick: function (){    	
    	// this.model.save ( null, {
    		// success: function( event ) {
    			// //Backbone.history.start();
    			// eventManager.trigger("hideModal", null);
    			// //eventManager.trigger("reloadCombos", null);
    		// }, 
    		// error: function( event ) {
    			// alert('Error');
    		// }
    	// });
    // }
});