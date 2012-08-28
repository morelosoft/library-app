// The in-memory Store. Encapsulates logic to access wine data.
window.store = {
	formsList: {},
    forms: {},
    books: {},
    authors:{},
    
    /** Books **/
   populateBooks: function(){
   		this.books[1] = {
			"id": 1,
			"title": "Steve Jobs biography",
			"author": 3,
			"genre": "Contemporary",
			"status": true,
			"available": "available"
		};
		this.books[2] = {
			"id": 2,
			"title": "ios 5 Development",
			"author": 1,
			"genre": "Multicultural",
			"status": true,
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
    
     /** authors **/
     populateAuthors: function(){
   		this.authors[1] = {
			"id": 1,
			"name": "Isaccson",
			"country": "USA",
			"birth_day": "10/04/2012",
		};
		this.authors[2] = {
			"id": 2,
			"name": "Walker",
			"country": "USA",
			"birth_day": "10/08/1990",
		};
		this.lastId = 2;
	},
	authorsAll: function () {
		return _.values(this.authors);
	},
    
    populate: function () {

        this.forms[1] = {
	        "id": 1,
			"name": "Empleados",
			"description": "Todos los empleados de Morelosoft",
			"password": "",
			"fields": [
						{
							"id": "c1",
							"title": "Date",
							"instructions": "Agregue info de campo",
							"typeOf": "date",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c2",
							"title": "Text 2",
							"instructions": "Agregue info de campo 2",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						}
					  ]
        };
        this.forms[2] = {
	        "id": 2,
			"name": "Inventario Firewalls",
			"description": "Todos los firewalls de Hova",
			"password": "123",
			"fields": [
						{
							"id": "c1",
							"title": "Date",
							"instructions": "Agregue info de campo",
							"typeOf": "date",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c2",
							"title": "Text 2",
							"instructions": "Agregue info de campo 2",
							"typeOf": "date",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c3",
							"title": "Text 3",
							"instructions": "Agregue info de campo 3",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c4",
							"title": "Text 4",
							"instructions": "Agregue info de campo 4",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
					  ]
        };


        this.lastId = 2;
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

store.populate();

// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {
    var resp;

	if ( model.url == "api/book" || model.urlRoot == "api/book")
	{
		switch (method) {
			case "read":
				 resp = store.booksAll();
				break;
	        case "create":
	             resp = store.createBooks(model);
	            break;
	        case "update":
	            // resp = store.update(model);
	            break;
	        case "delete":
	            // resp = store.destroy(model);
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