import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Import your intelligent prompts
from prompts import (
    SKILLS_PROMPT,
    OBJECTIVE_PROMPT,
    PROJECTS_PROMPT,
    EDUCATION_PROMPT,
    AWARDS_PROMPT,
    COMPETENCIES_PROMPT,
    LANGUAGES_PROMPT
)

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configuration with API Key
OLLAMA_URL = "https://ollama.com/api/chat"
MODEL_NAME = "gpt-oss:120b"
OLLAMA_API_KEY = os.getenv("OLLAMA_API_KEY")

# Headers for authentication
HEADERS = {
    "Authorization": f"Bearer {OLLAMA_API_KEY}",
    "Content-Type": "application/json"
}

def call_ollama(system_prompt, user_input):
    """Sends authenticated request to the AI model."""
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ],
        "stream": False,
        "options": {"temperature": 0.4}
    }
    try:
        # Added headers back into the post request
        response = requests.post(OLLAMA_URL, headers=HEADERS, json=payload, timeout=90)
        response.raise_for_status()
        return response.json()["message"]["content"]
    except Exception as e:
        return f"Authentication/Connection Error: {str(e)}"

@app.route("/generate/<category>", methods=["POST"])
def generate(category):
    data = request.json
    raw_text = data.get('input', '')

    if not raw_text:
        return jsonify({"error": "No input provided"}), 400

    prompt_map = {
        "skills": SKILLS_PROMPT,
        "objective": OBJECTIVE_PROMPT,
        "projects": PROJECTS_PROMPT,
        "education": EDUCATION_PROMPT,
        "awards": AWARDS_PROMPT,
        "competencies": COMPETENCIES_PROMPT,
        "languages": LANGUAGES_PROMPT
    }

    selected_prompt = prompt_map.get(category)
    if not selected_prompt:
        return jsonify({"error": "Invalid section"}), 400

    processed_result = call_ollama(selected_prompt, raw_text)
    return jsonify({"result": processed_result})

if __name__ == "__main__":
    app.run(debug=True, port=5000)