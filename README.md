## To Run

Frontend development:
```
gulp
```

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