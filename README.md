# M7011E_DynamicDuo



# Deploy the system (Docker-compose)
 - Requirements: Download and install Docker. See links for Docker below.

 - Clone this repository. 
 - `cd` into root folder, you should be in the same directory as the docker-compose.yaml file.
 - Run `docker-compose up --build` to build the containers defined in the docker-compose.yaml file.
 - Then running `docker-compose up` to run the system.
 - Navigate to http://localhost:8080


# Running the backend (locally)
 - Clone the Repo
 - navigate to the gateway folder and start it with the following.
 - `npm install` To get the required packages on your local machine.
 - run the program with `npm start` 
 - navigate to http://localhost:8080/graphql

# Using and abusing the GraphQL API

- Once you have the project up and running either with docker or just locally, you are ready start using the project.

- If you have navigated to http://localhost:8080/graphql, you might see something similar to this.
  
  ![Picture](https://raw.githubusercontent.com/graphql/graphiql/main/packages/graphiql/resources/graphiql.jpg)

- You can use the schema to the right and you can also click around to look at the different types. 
- Or copy and paste this into the left-most window and query the API for some user defined data: 

```
# Set a value
mutation {
  set(key: "aStateInAmericas", value: "texas")
}
```

```
{
#get that value
  get(key: "aStateInAmericas")
}
```

# Downloading Docker

## For MacOS
https://docs.docker.com/docker-for-mac/install/
We are using docker-compose to run multiple services with one command. Docker desktop for mac has this "feature" built in. So just download the Docker desktop.

## For Linux
https://docs.docker.com/compose/install/
