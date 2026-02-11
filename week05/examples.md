endpoint post
Ex request: 
POST /posts
Content-Type: application/json

{
  "title": "Getting Started with REST APIs",
  "content": "This post explains REST fundamentals...",
  "categoryId": 3,
  "status": "draft"
}

JSON Ex:
{
  "id": 101,
  "title": "Getting Started with REST APIs",
  "content": "This post explains REST fundamentals...",
  "categoryId": 3,
  "status": "draft",
  "createdAt": "2026-02-11T10:15:30Z"
} 

status code 201 created 

endpoint categories

ex request:
GET /categories/3

Json ex:
{
  "id": 3,
  "name": "Technology",
  "description": "Articles about software, hardware, and innovation",
  "createdAt": "2026-01-15T09:00:00Z"
}

status code 200 ok

endpoint media files

ex request:
DELETE /media-files/55

JSON ex:
{
    "message": "Media file successfully deleted"
}
Status code 204 no content