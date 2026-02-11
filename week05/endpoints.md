Resource: Posts

1. GET (collection)

Method: GET

URL: /posts

Purpose: Retrieve a list of all posts

Returns: 200 OK

2. GET (single resource)

Method: GET

URL: /posts/{postId}

Purpose: Retrieve a specific post by ID

Returns: 200 OK

3. POST

Method: POST

URL: /posts

Purpose: Create a new post

Returns: 201 Created

4. PATCH (partial update)

Method: PATCH

URL: /posts/{postId}

Purpose: Update specific fields of an existing post

Returns: 200 OK

5. DELETE

Method: DELETE

URL: /posts/{postId}

Purpose: Delete a post

Returns: 204 No Content


Resource: Media Files

1. GET (collection)

Method: GET

URL: /media-files

Purpose: Retrieve all media files

Returns: 200 OK

2. GET (single resource)

Method: GET

URL: /media-files/{mediaFileId}

Purpose: Retrieve a specific media file

Returns: 200 OK

3. POST

Method: POST

URL: /media-files

Purpose: Upload a new media file

Returns: 201 Created

4. PATCH

Method: PATCH

URL: /media-files/{mediaFileId}

Purpose: Update metadata of a media file

Returns: 200 OK

5. DELETE

Method: DELETE

URL: /media-files/{mediaFileId}

Purpose: Delete a media file

Returns: 204 No Content 


Resource: Categories

1. GET (collection)

Method: GET

URL: /categories

Purpose: Retrieve all categories

Returns: 200 OK

2. GET (single resource)

Method: GET

URL: /categories/{categoryId}

Purpose: Retrieve a specific category

Returns: 200 OK

3. POST

Method: POST

URL: /categories

Purpose: Create a new category

Returns: 201 Created

4. PUT (full update)

Method: PUT

URL: /categories/{categoryId}

Purpose: Replace an existing category

Returns: 200 OK

5. DELETE

Method: DELETE

URL: /categories/{categoryId}

Purpose: Delete a category

Returns: 204 No Content