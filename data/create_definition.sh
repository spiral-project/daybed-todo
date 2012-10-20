#!/usr/bin/env bash
definition='{
"title": "todo",
"description": "A list of my stuff to do", 
"fields": [
    {
        "name": "item", 
        "type": "string",
        "description": "The item"
    }, 
    {
        "name": "done", 
        "type": "enum",
        "choices": [
            "true", 
            "false"
        ], 
        "description": "is it done or not"
    }
]}'

curl -XPUT http://localhost:8000/definitions/todo -d "${definition}"
