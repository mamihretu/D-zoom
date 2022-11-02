from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatRoomConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print("ENTERED CONNECT")
		self.group_room_name = 'Test-Room'

		await self.channel_layer.group_add(
			self.group_room_name,
			self.channel_name
			)

		await self.accept()

	async def disconnect(self, close_code):
		print("ENTERED DISCONNECT")
		await self.channel_layer.group_discard(
			self.group_room_name,
			self.channel_name
			)
		print('disconnected')

	async def receive(self, text_data):
		recieve_dict = json.loads(text_data)
		message = recieve_dict['message']
		action = recieve_dict['action']


		if (action == 'new-offer') or (action == 'new-answer'):

			receiver_channel_name = recieve_dict['message']['receiver_channel_name']
			recieve_dict['message']['receiver_channel_name'] = self.channel_name

			await self.channel_layer.send(
				receiver_channel_name,
				{
					'type': 'send.sdp',
					'recieve_dict': recieve_dict
				}
				)

			return


		recieve_dict['message']['receiver_channel_name'] = self.channel_name

		await self.channel_layer.group_send(
			self.group_room_name,
			{
				'type': 'send.sdp',
				'recieve_dict' : recieve_dict
			}
			)


	async def send_sdp(self, event):
		print("ENTERED SEND")
		recieve_dict = event['recieve_dict']

		await self.send(text_data = json.dumps(recieve_dict))



