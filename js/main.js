var eventManager = {};

Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};


var AppRouter = Backbone.Router.extend({ 
	 	
 	initialize:function () {
   		
    //$('#tab3').html(new SidebarFormPropView().render().el);	
	},
	
	routes:{
	    "":"main",
	    "designer":"designer"
	},
	main:function () {
		
		
		
 		$('#appContainer').html(new DesignerView().render().el);
		$('#header').html(new HeaderView().render().el);
   		$('#mainContainer').html(new RegistryBookLoans().render().el);
   		//$('#tab1').html(new SidebarMainView().render().el);
   		//$('#tab2').html(new SidebarFieldPropView().render().el);
 },
	designer: function() {
		
		var bookModel = new BookModel();
		
		$('#appContainer').html(new DesignerView().render().el);
		$('#mainContainer').html(new GridBooks({model:bookModel}).render().el);
		// var forms = new FormsCollection();
// 		
		// forms.fetch ({
			// success: function( event ) {
				// $('#formListContainer').html(new FormListView({model:forms}).render().el);
// 				
				// var idForm = $("#cmbDatabases").prop('selectedIndex');
				// eventManager.trigger("renderFields", idForm);
			// }
		// });
	}
});


$(document).ready(function () {
	
	var sortOptions = {
		axis: "y",
		cursor: "move",
		distance: 30
	};
	
	//$('.sortables').sortable(sortOptions);
	$('#myModal').modal({show:false});
	
	_.extend(eventManager, Backbone.Events);
	
	// eventManager.on("showModal", function ( paramModel, isEdit ){
// 		
		// $('#myModal').html(new FormPropertiesView({model:paramModel, editMode:isEdit}).render().el);
		// $('#myModal').modal('show');
		// //$('.formName').focus();
	// });
	
	eventManager.on("showFormBooks", function ( paramModel, isEdit ){
		
		//alert("dentro del evento");
		$('#myModal').html(new FormBooks({model:paramModel, editMode:isEdit}).render().el);
		$('#myModal').modal('show');
		//$('.formName').focus();
	});
});

// Aquí se añade el array de vistas que se vayan a renderizar
tpl.loadTemplates(['header-view','designer-view','registryBookLoans-view', 'formBooks-view', 'gridBooks-view'], function () {
    app = new AppRouter();
    Backbone.history.start();
});