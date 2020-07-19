import requests
import json

def notify_android_users(content, title, users, data=[]):
    
    url = "https://onesignal.com/api/v1/notifications"
    app_id="ee55f1f7-08c2-43f9-9778-332d4841c436"

    header = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YzQ1ZjhhODMtMWM1My00YjE1LThlNjYtNDQzYjMxYmU2YmRk"
    }

    payload = {
        "app_id": app_id,
        "include_player_ids": users,
        "contents": content,
        "small_icon": "http://85.242.4.235:3000/static/notification_icon.png",
        "android_visibility": 0,
        "priority": 5,
        "android_sound":"notification",
        "data": data,
        "headings": title,
    }

    response = requests.post(url, headers=header, data=json.dumps(payload))