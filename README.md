# My Web Application

## Project Setup

To get started with the project, follow these steps:

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/Vutjiya/cs-326-final-project.git
    cd cs-326-final-project
    ```

2. **Running the Project**

    ```sh
    npm install
    npm start
    ```

    The terminal should display the message `Server started at [http://localhost:3000](http://localhost:3000)`. Click on the url to open the application in the browser. From there, you can start interacting with the application.

## API Documentation

For our API, we provide the basic CRUD operations

### Create

Endpoint: /create
Method: POST
Description: Creates a new request

Request Body:
{
    "destination": "Destination of request" (string, required)
    "departure": "Departure time of request" (string, required)
}

Response Body:
{
    "message": "Request created!"
    "destination": (Destination of request)
    "departure": (Departure time of request)
}

Status Codes:

- 200 Created: Request successfully created
- 400 Bad Request: Invalid or missing data in the request body

### Read

Endpint: /read
Method: GET
Description: Reads a selected request

Request Body:
{
    "destination": "Destination of request" (string, required)
    "departure": "Departure time of request" (string, required)
}

Response Body:
{
    "message": "Request fetched!"
    "destination": (Destination of request)
    "departure": (Departure time of request)
}

Status Codes:

- 200 Read: Request successfully read
- 400 Bad Request: Invalid or missing data in the request body

### Update

Endpint: /update
Method: PUT
Description: updates a selected request

Request Body:
{
    "requestData": "Object containing destination and departure time of old request" (object, required)
    "newRequest": "Object containing destination and departure time of new request" (object, required)
}

Response Body:
{
    "message": "Request fetched!"
    "destination": (Destination of new request)
    "departure": (Departure time of new request)
}

Status Codes:

- 200 Read: Request successfully updated
- 400 Bad Request: Invalid or missing data in the request body

### Delete

Endpint: /delete
Method: DELETE
Description: deletes a selected request

Request Body:
{
    "destination": "Destination of request to be deleted" (string, required)
    "departure": "Departure time of request to be deleted" (string, required)
}

Response Body:
{
    "message": "Request fetched!"
    "destination": (Destination of deleted request)
    "departure": (Departure time of deleted request)
}

Status Codes:

- 200 Read: Request successfully deleted
- 400 Bad Request: Invalid or missing data in the request body
  