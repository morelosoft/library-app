// The in-memory Store. Encapsulates logic to access wine data.
window.store = {
	formsList: {},
    forms: {},
    books: {},
    authors:{},
    author:{},
    customer:{},
    bookLoans:{},
    
    /** BooksLoans **/
    populateBookLoans:function(){
    	this.bookLoans[1] = {
    		"id": 1,
    		"bookID": "1",
    		"customerID": "2",
    		"currentdate": "2012/01/02",
    		"date": "2012/04/02",
    	}
    	this.bookLoans[2] = {
    		"id": 2,
    		"bookID": "2",
    		"customerID": "1",
    		"currentdate": "2012/12/02",
    		"date": "2012/03/02",
    	}
    },
    
    booksLoansAll: function () {
		return _.values(this.bookLoans);
	},
	
	createBooksLoans: function (model) {
		this.lastId++;
		model.set('id', this.lastId);
		this.bookLoans[this.lastId] = model;
		alert("Book creado correctamente");
		return model;
	},
	
	updateBooksLoans: function (model) {
		this.bookLoans[model.id] = model;
		return model;
	},
	
	destroyBooksLoans: function (model) {
		delete this.bookLoans[model.id];
		return model;
	},
    
     /** Customers **/
    populateCustomer:function(){
    	
    	this.customer[1] = {
    		"id":1,
			"name": "Jessica Trapaga",
			"age": "21",
			"address": "Cuernavaca",
			"phone":"0447771234122",
			"status":"Activo"
    	};
    	
    	this.customer[2] = {
    		"id":2,
			"name": "Jose Ortiz",
			"age": "21",
			"address": "Temixco",
			"phone":"0447771234122",
			"status":"Activo"
    	};
    	
    	this.customer[3] = {
    		"id":3,
			"name": "Angel Vazquez",
			"age": "22",
			"address": "Civac",
			"phone":"0447771234122",
			"status":"Activo"
    	};
    	this.lastId = 3;
    },
    
    findCustomer: function (model) {
        return this.customer[model.id];
    },
    
    customerAll: function () {
		return _.values(this.customer);
	},
	
	createCustomer: function (model) {
		this.lastId++;
		model.set('id', this.lastId);
		this.customer[this.lastId] = model;
		alert("Cliente registrado correctamente");
		return model;
	},
	
	updateCustomer: function (model) {
		this.customer[model.id] = model;
		return model;
	},
	
	destroyCustomer: function (model) {
		delete this.customer[model.id];
		return model;
	},
    
     /** Authors **/
    populateAuthor:function(){
    	
    	this.author[1] = {
			"id": 1,
			"name": "Isaccson",
			"country": "USA",
			"birth_day": "10/04/2012",
			"status":""
		};
		this.author[2] = {
			"id": 2,
			"name": "Walker",
			"country": "USA",
			"birth_day": "10/08/1990",
			"status":""
		};
		this.lastId = 2;
    },
    
    findAuthor: function (model) {
        return this.author[model.id];
    },
    
    authorAll: function () {
		return _.values(this.author);
	},
	
	createAuthor: function (model) {
		this.lastId++;
		model.set('id', this.lastId);
		this.author[this.lastId] = model;
		alert("Autor registrado correctamente");
		return model;
	},
	
	updateAuthor: function (model) {
		this.author[model.id] = model;
		return model;
	},
	
	destroyAuthor: function (model) {
		delete this.author[model.id];
		return model;
	},
    
    /** Books **/
   populateBooks: function(){
   		this.books[1] = {
			"id": 1,
			"title": "Steve Jobs biography",
			"author": "3",
			"genre": "Contemporary",
			"status": "true",
			"available": "available"
		};
		this.books[2] = {
			"id": 2,
			"title": "ios 5 Development",
			"author": "1",
			"genre": "Multicultural",
			"status": "true",
			"available": "available"
		};
		this.lastId = 2;
	},
	
	booksAll: function () {
		return _.values(this.books);
	},
	
	createBooks: function (model) {
		this.lastId++;
		model.set('id', this.lastId);
		this.books[this.lastId] = model;
		alert("Book creado correctamente");
		return model;
	},
	
	updateBooks: function (model) {
		this.books[model.id] = model;
		return model;
	},
	
	destroyBooks: function (model) {
		delete this.books[model.id];
		return model;
		},
		
    find: function (model) {
    	
    	console.log(this.forms[model.id]);
    	
        return this.forms[model.id];
    },

    findAll: function () {
        return _.values(this.forms);
    },

    create: function (model) {
        this.lastId++;
        model.set('id', this.lastId);
        this.forms[this.lastId] = model;
        
        console.log("Se ha creado correctamente");
        
        return model;
    },

    update: function (model) {
        this.forms[model.id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.forms[model.id];
        return model;
    },
    
    pupulateFormList: function() {
    	 this.formsList[1] = {
	        "id": 1,
			"name": "Formulario 1"
			}
    	 this.formsList[2] = {
	        "id": 2,
			"name": "Formulario 2"
			}
    }

};

// store.populate();
store.populateBooks();
store.populateAuthor();
store.populateCustomer();
store.populateBookLoans();

// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {
    var resp;

	if ( model.url == "api/customer" || model.urlRoot == "api/customer")
	{
		switch (method) {
			case "read":
				 resp = store.customerAll();
				break;
	        case "create":
	             resp = store.createCustomer(model);
	            break;
	        case "update":
	             resp = store.updateCustomer(model);
	            break;
	        case "delete":
	            // resp = store.destroy(model);
	            break;
	    }
	}
	
	if ( model.url == "api/author" || model.urlRoot == "api/author")
	{
		switch (method) {
			case "read":
				 resp = model.id ? store.findAuthor(model) : store.authorAll();
				break;
	        case "create":
	             resp = store.createAuthor(model);
	            break;
	        case "update":
	             resp = store.updateAuthor(model);
	            break;
	        case "delete":
	            // resp = store.destroy(model);
	            break;
	    }
	}

	if ( model.url == "api/book" || model.urlRoot == "api/book")
	{
		switch (method) {
			case "read":
				 resp = store.booksAll();
				 //alert( resp );
				break;
	        case "create":
	             resp = store.createBooks(model);
	            break;
	        case "update":
	             resp = store.updateBooks(model);
	            break;
	        case "delete":
	             resp = store.destroyBooks(model);
	            break;
	    }
	}
	
	if ( model.url == "api/bookLoans" || model.urlRoot == "api/bookLoans")
	{
		switch (method) {
			case "read":
				 resp = store.booksLoansAll();
				break;
	        case "create":
	             resp = store.createBooksLoans(model);
	            break;
	        case "update":
	            resp = store.updateBooksLoans(model);
	            break;
	        case "delete":
	            resp = store.destroyBooksLoans(model);
	            break;
	     }
	}
	
	if ( model.url == "api/forms" || model.urlRoot == "api/forms")
	{
	    switch (method) {
	        case "read":
	            resp = model.id ? store.find(model) : store.findAll();
	            break;
	        case "create":
	            resp = store.create(model);
	            break;
	        case "update":
	            resp = store.update(model);
	            break;
	        case "delete":
	            resp = store.destroy(model);
	            break;
	    }
	} else if ( model.url == "api/fields" ) {
		alert("no se ha implementado de api fields");
	}

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};