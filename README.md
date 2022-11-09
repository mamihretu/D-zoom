Doom
=======


Doom is a peer to peer video chat application created to allow multiple
clients participate in a single video chat session. It is implemented using
WEBRTC with a custom built django-channels signaling server.





### Below is a screen shot of the application, with camera facing a cat picture

=======
![catsTalking](https://user-images.githubusercontent.com/71546703/199851148-467a4940-d944-493a-a800-455d81d7c93e.png)




note on WEBRTC
-----

WebRTC is a set of javascript API's that can be used to send messages in-between browsers without the need for a middleman a.k.a a server.

To set the initial connection between the browsers a signaling server(one time message broker) is needed. For this purpose I have used Django and the channels library but other other options may be used including purpose built signaling services.

For the initial setup two sets of information are exchanged. First, a Session Discription Protocol(SDP), which is an object containing information about the session connection is sent by the browser offering the connection and the browser on the other hand will respond with it's own SDP answer. Secondly, both browsers exchange ICE candidates(a discription of their puplic IP address) to establish the connection.



Running this project without Docker
-----

```
git clone https://github.com/mamihretu/Doom.git
cd requirements
pip install -r base.txt # or local.txt if django_debug_toolbar is desired
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





