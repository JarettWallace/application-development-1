A standard error format would be in a JSON structse so it should look like this
{
    "error": {
        "code":400,
        "message": "invalid request data",
        "details": "the 'title field is required."
    }
} 

error 404 happens when a requested resource does not exist 
{
  "error": {
    "code": 404,
    "message": "Resource not found",
    "details": "Post with ID 123 does not exist."
  }
} 

erroe 409 happens when a request in some way conflicts with the current state of a resource
{
  "error": {
    "code": 409,
    "message": "Conflict",
    "details": "A category with the name 'Technology' already exists."
  }
}