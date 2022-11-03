Doom
-----


Doom is a peer to peer video chat application created to allow multiple
clients participate in a single video chat session. It is implemented using
WEBRTC with a custom built django-channels signaling server.



Below is a screen shot of the application, with camera facing a cat picture

<<<<<<< HEAD
=======
![catsTalking](https://user-images.githubusercontent.com/71546703/199851148-467a4940-d944-493a-a800-455d81d7c93e.png)

>>>>>>> d8e5f0401645622bdc8eeb9890ff09abce94f202



note on WEBRTC
-----

WebRTC is a set of javascript API's that can be used to send messages in-between browsers without the need for a middleman a.k.a a server.

For setting the initial connection and establishing how the browsers will communicate with each other a signaling server(one time message broker) is needed. For this purpose I have used Django and the channels library but other this can be done in many other ways including purpose built signaling services.

At the initial setup two sets of information are exchanged. One is called a Session Discription Protocol(SDP), which is an object containing information about the session connection such as address and  media type. The second information is called an ICE candidate, which is the public IP address and port of the specific browser process.



Running this project without Docker
-----

```
git clone https://github.com/mamihretu/Doom.git
cd requirements
pip install -r local.txt
cd ..
python manage.py runserver

```




Running this project with Docker
-----

```
# This instructions will take a few minutes to complete on their first run

docker-compose -f local.yml build
docker-compose -f local.yml up

```





