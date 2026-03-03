1: my project is based upon a blog and allows for users to make posts and for them to be documented and stored locally, seeing as this blog doesnt have a specific niche it can be used for any number of reasons making its target user anyone who wants to make apost, The main resources and posts and categories
2: There is no node version mentioned, to install the npm you must run the command npm install this will install express and create a node_modules folder. To start the server you can simply run npm start. and there are no required environment variables
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
