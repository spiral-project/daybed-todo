# daybed-todo

This is a small Todo list Daybed UI app

## Install

### Database setup

Run daybed server on localhost:8000 and then create a token:

#### Verify if the database is ready

    curl -D - http://localhost:8000/models/todo/definition | head -n1

    HTTP/1.1 404 Not Found: Then you need to create the todo models as described below
	HTTP/1.1 401 Unauthorized: Then you need to PATCH the todo models with Everyone permissions
    HTTP/1.1 200 OK: You are all set and you can jump to the "Serve the app files" section.


#### Create an admin token

    curl -XPOST http://localhost:8000/tokens | python -m json.tool
    {
        "credentials": {
            "algorithm": "sha256",
            "id": "2bcb4025e4199b14be3dc64261fa2d1f2499895f63af71e7838f1693ecbd6f84",
            "key": "0ecd210255a836aaeaf58c16f065ce47fbf86d3a92627d1f1030a51da9ae0bbe"
        },
        "token": "4b68611a764ac1b0e5bd63f85f854fb8940f9115685fdfb366b525cd24bb80a7"
    }

	Then store this token as your todo model admin token and create
	the definition:


#### Create the todo models with the right permissions

	./create_definition.sh 4b68611a764ac1b0e5bd63f85f854fb8940f9115685fdfb366b525cd24bb80a7


### Serve the app files:

    python -m SimpleHTTPServer 8080

or

    ./serve.sh

## Contributors

- [Rémy Hubscher](https://github.com/Natim/)
- [Alexis Metaireau](https://github.com/ametaireau/)
- [Mathieu Leplatre](https://github.com/leplatrem/)


## Interface from jQuery TodoMVC app

Created by [Sindre Sorhus](https://github.com/sindresorhus)
