import google.generativeai as genai
import json
import re
from difflib import get_close_matches

# Configuration de l'API
genai.configure(api_key="AIzaSyBuhVu3rNq-KiWTnCOYWPMAV7RpfbIrhGg")

# Configuration du modèle
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Base de connaissances avec des réponses fixes
reponses_fixes = {
    "كيف يمكنني تشغيل التطبيق؟": "يا صغيري! اضغط على الأيقونة لفتح التطبيق.",
    "ماذا أفعل بعد فتح التطبيق؟": "يا صغيري! اختر القسم الذي تريده واضغط عليه.",
    "كيف أستخدم الميزات المختلفة؟": "يا صغيري! اضغط على الزر التوضيحي لكل ميزة لتعرف المزيد.",
    "هل يمكنني تغيير لغة التطبيق؟" : "يا صغيري! اذهب إلى الإعدادات واختر اللغة التي تناسبك."
, "كيف يمكنني مشاركة المحتوى مع أصدقائي؟" : "يا صغيري! اضغط على زر المشاركة واختر الطريقة التي تفضلها."
, "هل يمكنني تغيير الخلفية؟" : "يا صغيري! اذهب إلى الإعدادات واختر الخلفية التي تحبها."
}

def analyser_message(texte):
    # Vérifier si la question a une réponse proche
    questions_connues = list(reponses_fixes.keys())
    question_proche = get_close_matches(texte, questions_connues, n=1, cutoff=0.6)
    
    chat_session = model.start_chat(history=[])
    
    if question_proche:
        # Demander à Gemini de générer une réponse très proche des réponses fixes
        prompt = f"Réponds en arabe d'une manière simple et amicale pour un enfant.commencer la reponse par يا صغيري! . repondre en بالعربية الفصحى. Formule ta réponse très proche de cette réponse donnée : '{reponses_fixes[question_proche[0]]}'\nMessage: '{texte}'"
    else:
        # Réponse générique si la question est hors sujet
        return "يا صغيري! لا أملك إجابة محددة، لكن يمكنك استكشاف التطبيق بنفسك! 😊"
    
    try:
        response = chat_session.send_message(prompt)
        return response.text.strip()
    except genai.types.generation_types.StopCandidateException:
        return "يا صغيري! لا أملك إجابة محددة، لكن يمكنك استكشاف التطبيق بنفسك! 😊"

# Interaction avec l'utilisateur via la console
try:
    while True:
        question = input("Enfant: ")
        if question.lower() in ["exit", "خروج"]:
            print("Chatbot: إلى اللقاء!")
            break
        print(f"Chatbot: {analyser_message(question)}\n")
except KeyboardInterrupt:
    print("\nChatbot: تم إيقاف البرنامج. إلى اللقاء!")
