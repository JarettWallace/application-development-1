1 RESOURCE CATEGORIES:
endpoint: /categories, /categories/:id, /categories/:categoryid/posts
method: GET pull the categories and all revelent info, post creates a new category, patch update a field of a category, DELETE deletes a category
Request body: none
success response: 200 OK
possible error: 500 unecpected server error, 400 bad request, 404 not found, 409 conflict.
status codes: 200 successful request, 201 successfully created  

2:  RESOURCE POSTS:
endpoint: /posts, /posts/:id, /posts/:postid/media-files
Method: GET to retrieve a post, POST to create a post, PATCH to update a field such as a title, DELETE to delete a post
Body: NONE
Success response: 200 ok
possible errors: 400 bad request/invalid input, 404 not found/The resource doesnt exist, 500 an internal server/ unexpected error 