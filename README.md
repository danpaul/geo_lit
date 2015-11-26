## To Run

Start MySQL

Start Mongo: `mongod`

Frontend development:
```
gulp
```

app available on: http://localhost:3000

Backend development (if you have [nodemon](https://github.com/remy/nodemon) installed):
```
NODE_ENV=development nodemon index.js
```
Without Nodemon:
```
NODE_ENV=development node index.js
```

Production:
```
NODE_ENV=production node index.js
```

## Global Events

geo-lit-place-click [_id: place id]
    Triggered when user cicks on place.

## Todo

+ you should be logged in after registering

update:
    /node_modules/sql_login_middleware/index.js
    /frontend_app/app/lib/geo_lit.js

user auth:
    /node_modules/sql_comments_middleware/index.js

/node_modules/sql_comments_middleware/node_modules/sql_comment/models/comment.js
/node_modules/sql_comments_middleware/node_modules/sql_comment/index.js
/node_modules/sql_comments_middleware/node_modules/sql_comment/index.js
/node_modules/sql_comments_middleware/index.js

???
sync /node_modules/sql_login_middleware/index.js with repo
sync /node_modules/sql_comments_middleware with repo