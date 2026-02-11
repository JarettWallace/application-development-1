I chose posts, categories, and media files for my resources as I felt that they represented the core aspects of a blog. 

I chose patch as itll help reduce the payload size and reduce the risk of unintentionally overwriting a field. 

The API avoides breaking clients through the use of standard HTTP status codes, returning predictable JSON response structure, using a consistent pattern of URLs and naming conventions, and avoiding removing fileds with new fields can be added without affecting exisiting clients.

One trade off I made was using page/limit pagination istead of cursor based pagination, the page/limit I used was easier to implement but as the dataset will being to expand it will eventually become less efficent when compared to the cursor based pagination 