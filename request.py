import requests

r = requests.get('https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder')
print(r.text)