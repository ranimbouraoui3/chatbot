from flask import Flask, request, jsonify
import google.generativeai as genai
import json
import re
from difflib import get_close_matches

app = Flask(__name__)

# Configuration de l'API
genai.configure(api_key="AIzaSyBuhVu3rNq-KiWTnCOYWPMAV7RpfbIrhGg")

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

reponses_fixes = {
    "كيف يمكنني تشغيل التطبيق؟": "يا صغيري! اضغط على الأيقونة لفتح التطبيق.",
    "ماذا أفعل بعد فتح التطبيق؟": "يا صغيري! اختر القسم الذي تريده واضغط عليه.",
    "كيف أستخدم الميزات المختلفة؟": "يا صغيري! اضغط على الزر التوضيحي لكل ميزة لتعرف المزيد.",
    "هل يمكنني تغيير لغة التطبيق؟": "يا صغيري! اذهب إلى الإعدادات واختر اللغة التي تناسبك.",
    "كيف يمكنني مشاركة المحتوى مع أصدقائي؟": "يا صغيري! اضغط على زر المشاركة واختر الطريقة التي تفضلها.",
    "هل يمكنني تغيير الخلفية؟": "يا صغيري! اذهب إلى الإعدادات واختر الخلفية التي تحبها."
}

def analyser_message(texte):
    questions_connues = list(reponses_fixes.keys())
    question_proche = get_close_matches(texte, questions_connues, n=1, cutoff=0.6)
    
    chat_session = model.start_chat(history=[])
    
    if question_proche:
        prompt = f"Réponds en arabe d'une manière simple et amicale pour un enfant. Commencer la réponse par يا صغيري!. Répondre en بالعربية الفصحى. Formule ta réponse très proche de cette réponse donnée : '{reponses_fixes[question_proche[0]]}'\nMessage: '{texte}'"
    else:
        return "يا صغيري! لا أملك إجابة محددة، لكن يمكنك استكشاف التطبيق بنفسك! 😊"
    
    try:
        response = chat_session.send_message(prompt)
        return response.text.strip()
    except genai.types.generation_types.StopCandidateException:
        return "يا صغيري! لا أملك إجابة محددة، لكن يمكنك استكشاف التطبيق بنفسك! 😊"

@app.route("/talk", methods=["POST"])
def talk():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "Veuillez fournir un message."}), 400
    
    message = data["message"]
    response_text = analyser_message(message)
    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(debug=True)
