1: my project is based upon a blog and allows for users to make posts and for them to be documented and stored locally, seeing as this blog doesn't have a specific niche it can be used for any number of reasons making its target user anyone who wants to make a post, The main resources and posts and categories

2: There is no node version mentioned, to install the npm you must run the command npm install this will install express and create a node_modules folder. To start the server you can simply run npm start. and there are no required environment variables, also use the command npm run lint.

3: | Method | Endpoint                 | Description                                |
| ------ | ------------------------ | ------------------------------------------ |
| GET    | /categories              | Retrieve all categories                    |
| GET    | /categories/{categoryId} | Retrieve a specific category               |
| POST   | /categories              | Create a new category                      |
| PUT    | /categories/{categoryId} | Replace an existing category               |
| DELETE | /categories/{categoryId} | Delete a category                          |
| GET    | /posts                   | Retrieve all posts                         |
| GET    | /posts/{postId}          | Retrieve a specific post by ID             |
| POST   | /posts                   | Create a new post                          |
| PATCH  | /posts/{postId}          | Update specific fields of an existing post |
| DELETE | /posts/{postId}          | Delete a post                              |

4: successful post request 

POST /categories
Content-Type: application/json

{
  "name": "Technology"
} 
would return:
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "name": "Technology"
}

validation error: 

POST /categories
Content-Type: application/json

{
  "name": 123
}
would return:

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "status": 400,
  "code": "INVALID_INPUT",
  "message": "Name is required and must be a string"
}
