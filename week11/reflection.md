1: Session is a way for a server to remember a user between requests 
2: The server stores user data like login info inside the session
3: The client stores a session ID in a cookie.
4: /profile fails as there is no user session in existance yet
5: /profile works afer logging in as the user is stored in session
6: /profile fails after logout as the user is destoryed during logout