# SurfBoardBoard

## Running
To run this project all you need to do is run `node bin/www` from the command line.

## Git Workflow
1. Before starting work make sure you are up-to-date with the main repo using `git pull upstream master`.
2. In case the libraries changes run `npm install`
3. Now do some work
4. Add your changes with `git add .`
5. Commit them with `git commit -m "YOUR COMMIT MSG HERE"`.
6. Now push them with `git push origin master`

## Environmental Variables
Running this requires the following environmental variables to be set:

* **MONGOURI** URI for a MongoDB database version 3.0 or higher
* **FBSECRET** Secret for Facebook integration
* **S3KEY** Key for Amazon S3
* **S3SECRET** Secret for Amazon S3
* **SENDGRID** API key for SendGrid with permissions to send emails