# Zettabyte_Backend_challenge

This is a submission for Zettabyte backend challenge. The stack used is NodeJs, Express and Mongoose to access mongodb database. 

## Setting Up
Git clone the repository and then install dependencies by running 
```
npm install
```

## Running the App
To Run the app, run the command
```
npm start
```


## Rest API
Below are some examples to run the CRUD operations using the api, in the case, the port use is 3000 but can be updated

### Get all articles and post articles
Req : http://localhost:3000/api/articles

### Get, update or delete articles by id

Req: http://localhost:3000/api/articles/:id
example:
```
http://localhost:3000/api/articles/6342a15b59782610b7ccf509
```

### Get all or create comments of a specific article
get for getting all and post for creating a new article
Req: http://localhost:3000/api/articles/{id}/comments
 example:
 ```
http://localhost:3000/api/articles/6342a15b59782610b7ccf509/comments
```

### Delete, update or get specific comments
http://localhost:3000/api/articles/{articleId}/comments/{commentId}
exmaple:
```
http://localhost:3000/api/articles/6342a15b59782610b7ccf509/comments/6342a1b459782610b7ccf50f
```

