The endpoint that most supports pagination is GET /posts as it can be applied when retrieving a large collection of posts to help imporve performance and reduce the size of the response 

A blogs API would use the page/limit pagination

example of query parameters: GET/posts/page=2&limit=5 should return the secound page of results while limiting to 5 posts per page