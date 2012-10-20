# daybed-ui data interface to validate the todo form an save data on CouchDB

# Since we are calling daybed API from Javascript, both site needs to be on the same server.

    <VirtualHost *:80>
    
    	ErrorLog ${APACHE_LOG_DIR}/error.log
    
    	# Possible values include: debug, info, notice, warn, error, crit,
    	# alert, emerg.
    	LogLevel warn
    
    	CustomLog ${APACHE_LOG_DIR}/access.log combined
    
    	<Location /daybed/>
    	    ProxyPass http://localhost:8000/
    	</Location>
    
    	<Location /daybed-ui/>
    	    ProxyPass http://localhost:8080/
    	</Location>
    
    </VirtualHost>


# Daybed Data UI

Created by [Rémy Hubscher](https://github.com/spiral-project/)


# Interface from jQuery TodoMVC app

Created by [Sindre Sorhus](https://github.com/sindresorhus)
