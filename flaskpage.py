from flask import Flask, render_template, url_for
from speech_to_text import get_large_audio_transcription
# from summarization import summarize
from something import summarize

path = "content/male.wav"
whole_text = get_large_audio_transcription(path)

summ_text = str(summarize(whole_text))
print("SUMMARIZED: ", summ_text)

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html', transcript=whole_text, summary=summ_text)

# @app.route("/#transcript")
# def summary():
#     return render_template('index.html', transcript=whole_text, summary=summ_text)

if __name__=="__main__":
    app.run(debug=True)