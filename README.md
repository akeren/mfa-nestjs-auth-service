# A NestJS Microservice Authentication service 

This is a response to a challenge that calls for developing a user authentication micro-service that can handle 100,000 requests per second of traffic without experiencing any downtime. The service that has been implemented offers HTTP and TCP as two communication channels. 


## Endpoints implemented

- POST /users => Account creation
- GET /users/me => Getting an authenticated user profile
- POST /auth/login => Login