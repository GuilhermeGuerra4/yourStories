from app.functions.notify import notify_android_users


header = {"en":"YourStories"}
content = {"en": "{0} commented on your post".format("guilherme")}
users = ["a9e21474-35f5-4821-a305-066ac300b788"]
data = {'story_id': 1}
notify_android_users(content, header, users, data)