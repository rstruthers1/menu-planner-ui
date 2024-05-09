REM TODO: build and push using CI/CD pipeline

cd ..

@echo off
REM Login to Docker Hub
echo Logging into Docker Hub...
docker login

REM Build the Docker image
echo Building Docker image...
docker build -t menuplanner-ui:latest .

REM Tag the image for upload to Docker Hub
echo Tagging image...
docker tag menuplanner-ui:latest rmstruthers1/menuplanner-ui:latest

REM Push the image to Docker Hub
echo Pushing image to Docker Hub...
docker push rmstruthers1/menuplanner-ui:latest

echo Done.
