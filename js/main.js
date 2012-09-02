var eventManager = {};
var indexAuthor = 0;
var indexBooks = 0;
var seletedRowTable = 0;
var indexBooksLoans = 0;
var dateNow = "";
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
	},
	
	routes:{
	    "":"main",
	    "designer":"designer",
	    "author":"author",
	    "customer":"customer"
	},
	main:function () {
		$('#appContainer').html(new DesignerView().render().el);
		$('#header').html(new HeaderView().render().el);
		
		
   		var bookLoansList 	= new BookLoansCollection();
   		
   		bookLoansList.fetch({
   			success: function( event ){
   				$('#mainContainer').html(new RegistryBookLoans({model:bookLoansList}).render().el);
   			},
   			error: function(event) {
   				console.log(event);
   				$('#mainContainer').html(new RegistryBookLoans({model:booksList}).render().el);
   			}
   			
   		});
   		
   		//$('#tab1').html(new SidebarMainView().render().el);
   		//$('#tab2').html(new SidebarFieldPropView().render().el);
 },
	designer: function() {
		var booksList = new BookCollection();
		
		$('#appContainer').html(new DesignerView().render().el);
		
		booksList.fetch({
   			success: function( event ){
   				$('#mainContainer').html(new GridBooks({model:booksList}).render().el);   				
   			},
   			error: function(event) {
   				$('#mainContainer').html(new GridBooks({model:booksList}).render().el);
   			}
   			
   		});
	},
	
	customer: function() {
		$('#appContainer').html(new DesignerView().render().el);
		$('#header').html(new HeaderView().render().el);
		
		var customers = new CustomerCollection();
   		   		
   		console.log(customers);
   		customers.fetch({
   			success: function(event){
   				console.log(customers);
   				$('#mainContainer').html(new CustomerView({model:customers}).render().el);
   			},
   			error: function(event) {
   				console.log(event);
   				$('#mainContainer').html(new CustomerView({model:customers}).render().el);
   			}
   		});
	},
	
	author: function() {
		
		$('#appContainer').html(new DesignerView().render().el);
		$('#header').html(new HeaderView().render().el);
		
		var authors = new AuthorCollection();
		
   		console.log(authors);
   		
   		authors.fetch({
   			success: function(event){
   				$('#mainContainer').html(new AuthorView({model:authors}).render().el);
   			},
   			error: function(event) {
   				console.log(event);
   				$('#mainContainer').html(new AuthorView({model:authors}).render().el);
   			}
   		});
	}
});


$(document).ready(function () {
	
	 $.datepicker.setDefaults({ dateFormat: 'dd-mm-yy', 
                                   dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                                   dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                                   monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] });
 		
 		$('#datepicker').live('focus', function() {
 			$(this).datepicker().datepicker('show');
 			true;
 		});
 		
 		$('#datepicker').live('change', function() {
 			callReportService( $(this).val() );
 		});
 			
	var sortOptions = {
		axis: "y",
		cursor: "move",
		distance: 30
	};
	
	//$('.sortables').sortable(sortOptions);
	$('#myModal').modal({show:false});
	
	_.extend(eventManager, Backbone.Events);
	
	eventManager.on("showFormBooks", function ( paramModel, isEdit ){
		var authorList = new AuthorCollection();
		//alert("dentro del evento");
		$('#myModal').html(new FormBooks({model:paramModel, editMode:isEdit}).render().el);
		
		authorList.fetch({
			success: function( event ){
				$('#cmbAuthorContainer').html(new DropdownAuthor({model:authorList}).render().el);
			}
		});
		$('#myModal').modal('show');
		//$('.formName').focus();
	});
	
	eventManager.on("showFormAuthor", function ( paramModel, isEdit ){
		
		//alert("dentro del evento");
		$('#myModal').html(new FormAuthorView({model:paramModel, editMode:isEdit}).render().el);
		$('#myModal').modal('show');
		//$('.formName').focus();
	});
	
	eventManager.on("showFormCustomer", function ( paramModel, isEdit ){
		
		//alert("dentro del evento");
		$('#myModal').html(new FormCustomerView({model:paramModel, editMode:isEdit}).render().el);
		$('#myModal').modal('show');
		//$('.formName').focus();
	});
	
	eventManager.on("hideModal", function ( paramModel, msg ){
		$('#myModal').modal('hide');
	});
	
	eventManager.on("selectRowTblAuthor", function ( paramModel, msg ){
		$('#tblAuthor tbody tr').mouseover(function() {
	         	$(this).addClass('selectedRow');
	      	}).mouseout(function() {
	         	$(this).removeClass('selectedRow');
	      	}).click(function() {
				var authorID = $('td:first', this).text();
				
				var cont = 0;
	         	$("#tblAuthor tbody tr").each(function (index) {
              		var campo1;
              		$(this).children("td").each(function (index2) {
                  	if(index2==0) {
                          campo1 = $(this).text();
                          if(campo1 == authorID){
		              			indexAuthor = cont;
		              		}
		              		cont++;
                  		}
              		});
           		})
	      });
	});
	
	eventManager.on("selectRowTblCustomer", function ( paramModel, msg ){
		$('#tblCustomer tbody tr').mouseover(function() {
	         	$(this).addClass('selectedRow');
	      	}).mouseout(function() {
	         	$(this).removeClass('selectedRow');
	      	}).click(function() {
				var customerID = $('td:first', this).text();
				
				var contCustomer = 0;
	         	$("#tblCustomer tbody tr").each(function (index) {
              		var campo1;
              		$(this).children("td").each(function (index2) {
                  	if(index2==0) {
                          campo1 = $(this).text();
                          if(campo1 == customerID){
		              			indexCustomer = contCustomer;
		              		}
		              		contCustomer++;
                  		}
              		});
           		})
	      });
	});
	
	eventManager.on("reloadTableAuthor", function ( paramModel, msg ){
		var authors = new AuthorCollection();
   		
   		authors.fetch({
   			success: function(event){
   				$('#mainContainer').html(new AuthorView({model:authors}).render().el);
   			}
   		});
	});
	
	eventManager.on("reloadTableCustomer", function ( paramModel, msg ){
		var customers = new CustomerCollection();
   		   		
   		customers.fetch({
   			success: function(event){
   				$('#mainContainer').html(new CustomerView({model:customers}).render().el);
   			}
   		});
	});
	
	
	eventManager.on("reloadGridBooks", function ( paramModel, msg ){
		var booksList = new BookCollection();
		booksList.fetch({
			success: function( event ){
				$('#mainContainer').html(new GridBooks({model:booksList}).render().el);   				
   			}
   		});
	});
	
	eventManager.on("reloadGridBooksLoans", function ( paramModel, msg ){
		var booksLoansList = new BookLoansCollection();
		booksLoansList.fetch({
			success: function( event ){
				$('#mainContainer').html(new RegistryBookLoans({model:booksLoansList}).render().el);   				
   			}
   		});
	});
	
	eventManager.on("selectRowBooks", function ( msg ){
        $('#tblBooks tbody tr').mouseover(function() {
                 $(this).addClass('selectedRow');
              }).mouseout(function() {
                 $(this).removeClass('selectedRow');
              }).click(function() {
                var bookID = $('td:first', this).text();
                
                var cont = 0;
                 $("#tblBooks tbody tr").each(function (index) {
                      var campo1;
                      $(this).children("td").each(function (index2) {
                      if(index2==0) {
                          campo1 = $(this).text();
                          if(campo1 == bookID){
                                  indexBooks = cont;
                              }
                              cont++;
                          }
                      });
                   })
          });
    });
 
 
 
 eventManager.on("showFormBooksLoans", function ( paramModel, isEdit ){
 	
		var booksList 		= new BookCollection();
   		var customerList 	= new CustomerCollection();
		$('#myModal').html(new FormBooksLoans({model:paramModel, editMode:isEdit}).render().el);
		
		booksList.fetch({
   			success: function( event ){
   				$('#containerDown2').html(new DropdownBooksView({model:booksList}).render().el);
   			}
   		});
   		
   		customerList.fetch({
   			success: function( event ){
   				$('#containerDown').html(new DropdownCustomers({model:customerList}).render().el);
   			}
   		});
   		
   		 if( isEdit ){
   		 	// alert("id Book " + paramModel.attributes.bookID);
   		 	// alert("id Customer " + paramModel.attributes.customerID);
         	$("#cmbBooks option[value="+paramModel.attributes.bookID+"]").attr("selected",true);
         	$("#cmbCustomer option[value="+paramModel.attributes.customerID+"]").attr("selected",true);
         	$('#currentDate').val(paramModel.attributes.currentdate);
         	$('#datepicker').val(paramModel.attributes.date);
         }
         else{
         	 dateNow = $.datepicker.formatDate('dd-mm-yy', new Date());
         	 $('#currentDate').val(dateNow);
         }
         
         
		$('#myModal').modal('show');
	});
	
	eventManager.on("selectRowBooksLoans", function ( msg ){
        $('#tblBooksLoans tbody tr').mouseover(function() {
                 $(this).addClass('selectedRow');
              }).mouseout(function() {
                 $(this).removeClass('selectedRow');
              }).click(function() {
                var bookID = $('td:first', this).text();
                
                var cont = 0;
                 $("#tblBooksLoans tbody tr").each(function (index) {
                      var campo1;
                      $(this).children("td").each(function (index2) {
                      if(index2==0) {
                          campo1 = $(this).text();
                          if(campo1 == bookID){
                                  indexBooksLoans = cont;
                              }
                              cont++;
                          }
                      });
                   })
          });
    });
 
});

// Aquí se añade el array de vistas que se vayan a renderizar
tpl.loadTemplates(['header-view','designer-view','registryBookLoans-view', 'formBooks-view', 'gridBooks-view','dropdownCustomer-view'
					,'customer-view','author-view','form-author-view','form-customer-view','dropdownAuthor-view','dropdownBooks-view'
					,'formBooksLoans-view'], function () {
    app = new AppRouter();
    Backbone.history.start();
});