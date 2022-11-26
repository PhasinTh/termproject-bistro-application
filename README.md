# Bistro4.0 Menu & Bistro

## Services
### API Gateway (Kong + gRPC gateway + CORS + JWT)
![enter image description here](https://grpc-ecosystem.github.io/grpc-gateway/assets/images/architecture_introduction_diagram.svg)
### Member Service
- Login
- Register
- User CRUD
### Menu Service
- Menu CRUD
- Get Menu By BistroID
### Order Service
- Get Orders By BistroID
- Create Orders
- Update Order Status
- CRUD
### Notification Service
- Send notification (only email now!)
### QRCode Service
- Get QRCode By Bistro
- QRCode Generate
- QRCode CRUD

## Architecture

![Bistro Architecture](https://res.cloudinary.com/dr7jgcz4b/image/upload/v1669484504/bistro_application_architecture_cim2kj.png)

## Deployment

 - [x] Modify your .env file
 - [x] Run deploy[.]sh

```bash deploy.sh
export COMPOSE_FILES=$(find .  | grep "docker-compose.yaml")
for  COMPOSE_FILE  in  $COMPOSE_FILES
do
docker-compose -f $COMPOSE_FILE up -d --build
done
```
