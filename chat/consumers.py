





from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.group_room_name = 'Test-Room'

		await self.channel_layer.group_add(
			self.group_room_name,
			self.channel_name
			)

		await self.accept()

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.group_room_name,
			self.channel_name
			)
		print(disconnected)

	async def receive(self, dict_data):
		recieve_dict = json.loads(dict_data)
		message = recieve_dict['message']

		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': '',
			}
			)


	async def send_message(self, event):