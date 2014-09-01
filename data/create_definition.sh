#!/usr/bin/env bash
TOKEN=$1
DEFINITION=$(cat <<EOF
{
 "definition": {
    "title": "todo",
    "description": "A list of my stuff to do",
    "fields": [
        {
            "name": "item",
            "type": "string",
            "label": "The item"
        },
        {
            "name": "status",
            "type": "enum",
            "choices": [
                "done",
                "todo"
            ],
            "label": "is it done or not"
        }
     ]
  }
}
EOF
)
echo $DEFINITION | python -m json.tool
echo $DEFINITION | http PUT http://localhost:8000/models/todo --auth-type=hawk --auth="${TOKEN}:" --verify=no

PERMISSIONS=$(cat <<EOF
{
  "Everyone": ["read_definition", "create_record", "read_own_records",
               "update_own_records", "delete_own_records"]
}
EOF
)
echo $PERMISSIONS | python -m json.tool
echo $PERMISSIONS | http PATCH http://localhost:8000/models/todo/permissions --auth-type=hawk --auth="${TOKEN}:" --verify=no
