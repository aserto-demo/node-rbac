# Node RBAC Examples
This repository contains a number of Node.JS applications, each demonstrates a different approach to implementing Resource-Based Authorization (RBAC) for a simple HTTP API.

## Running the Examples
To run an example, cd to its directory and run: 

```sh
npm install
npm start
```
## Testing

To test the application, you can make a set of requests to the routes and check the responses:

```
curl -X <HTTP Verb> --location 'http://localhost:8080/api/<asset>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": {
        "id": "beth@the-smiths.com"
    }

}'
```

Where `<HTTP Verb>` is either `GET`, `PUT`, or `DELETE` and `<asset>` is either `megaSeeds` or `timeCrystals`.
