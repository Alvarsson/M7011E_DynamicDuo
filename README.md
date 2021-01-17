# M7011E_DynamicDuo

# Deploy the system (Docker-compose)
Requirements: Download and install Docker and NodeJS. See links for Docker below.

 - Clone this repository. 
There are secret key files on the VPS named awskey.json and simkey.json. These need to be manually added in the same directories as on the VPS before deployment.

 - `cd` into root folder, you should be in the same directory as the docker-compose.yaml file.
 - Run `docker-compose -f production.yaml up` to start the system.
 - Navigate to http://localhost:8080.
 
Note: The system auto-creates a Manager account with the **user-name** "Manager" and **password** "supaSecret".

# Downloading Docker and NodeJS

## NodeJS 
https://nodejs.org/en/

## Docker for MacOS
https://docs.docker.com/docker-for-mac/install/
We are using docker-compose to run multiple services with one command. Docker desktop for mac has this "feature" built in. So just download the Docker desktop.

## Docker for Linux
https://docs.docker.com/compose/install/
