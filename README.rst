Daybed-UI
#########

Daybed-UI is a GUI for the Daybed backend.

It is fully written in HTML, Javascript and CSS.

It rely on the dform jQuery plugin, jquery-spore and of course on jQuery itself.

Definition UI
=============

The definition UI helps you to create a model definition.

Data UI
=======

The data UI helps you to verify data against your model and save them on CouchDB.

The interface for the data ui comes from TodoMVC_.

.. _TodoMVC: http://www.todomvc.com

To use this, you need to configure your nginx server using the
nginx.conf example and run it on http://daybed/ (You might also want
to add 127.0.0.1 daybed in your /etc/hosts or your DNS server)
