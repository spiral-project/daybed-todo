#!/usr/bin/env bash
TOKEN=fe9107ae68307f61304a71c6d647b2a95a4ea337e11d2c693b69ed91586d192a
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
echo $DEFINITION | http PUT http://localhost:8000/models/todo_test --auth-type=hawk --auth="${TOKEN}:"

PERMISSIONS=$(cat <<EOF
{
  "Everyone": ["read_definition", "create_record", "read_own_records",
               "update_own_records", "delete_own_records"]
}
EOF
)
echo $PERMISSIONS | python -m json.tool
echo $PERMISSIONS | http PATCH http://localhost:8000/models/todo_test/permissions --auth-type=hawk --auth="${TOKEN}:"
