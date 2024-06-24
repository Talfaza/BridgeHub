# BridgeHub : Web App To Control Remote Sever

## Tech Stack : 
- Frontend:

    - React

    - HTTP Client: Axios A promise-based HTTP client used for making HTTP requests to the backend API.(not used until now)

- API:

    - Web Framework: Fiber 

    - Authentication: JWT 

    - Middleware: Fiber Middleware: Custom middleware to handle authentication and request validation.

- Backend:
    - Go 
    - Database:
        - MySQL
        - GORM: An ORM (Object-Relational Mapping) library for Go, used to interact with the MySQL .

    - Security: bcrypt: For hashing and comparing passwords .

    - SSH Library: [golang.org/x/crypto/ssh]: A package that provides SSH client functionality, allowing the application to connect to remote servers and execute commands .

    - Environment Management: godotenv: A Go package to load environment variables from a .env file.

    - Utilities: Custom utility functions for JWT generation and parsing.
