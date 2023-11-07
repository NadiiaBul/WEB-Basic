from aiogram.dispatcher import Dispatcher
from aiogram.utils.executor import start_webhook
from aiogram import Bot, types
import os
from deep_translator import GoogleTranslator
from langdetect import detect

API_TOKEN = os.environ['TG_TOKEN']

WEBHOOK_HOST = 'https://nadiia.alwaysdata.net/'
WEBHOOK_PATH = '/bot/'
WEBHOOK_URL = f"{WEBHOOK_HOST}{WEBHOOK_PATH}"

WEBAPP_HOST = '::'  # or IP address
WEBAPP_PORT = 8346

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    await message.reply("Привіт! Я бот-перекладач. Введи текст для перекладу з англійської на українську або навпаки.✏")

@dp.message_handler(lambda message: message.text)
async def translate_message(message: types.Message):
    try:
        text = message.text
        detected_language = detect(text)
        
        if detected_language == 'uk':
            translator = GoogleTranslator(source='uk', target='en')
        else:
            translator = GoogleTranslator(source='en', target='uk')
        
        translated_text = translator.translate(text)
        await message.reply(f"Переклад: {translated_text}")
    except Exception as e:
        await message.reply("Помилка при обробці повідомлення. Спробуйте інше повідомлення або виберіть мову для перекладу.")

@dp.message_handler(content_types=types.ContentTypes.ANY)
async def handle_unknown_message(message: types.Message):
    try:
        text = message.text
        if text and not text.isspace():
                detected_language = detect(text)
                if detected_language in ['uk', 'en']:
                    translator = GoogleTranslator(source=detected_language, target='en' if detected_language == 'uk' else 'uk')
                    translated_text = translator.translate(text)
                    await message.reply(f"Переклад: {translated_text}")
                else:
                    await message.reply("На жаль, я не можу розпізнати мову цього тексту. Спробуйте інше повідомлення або виберіть мову для перекладу.")
        else:
            await message.reply("На жаль, це пусте повідомлення. Введіть текст для перекладу.")
    except Exception as e:
            await message.reply("Помилка при обробці повідомлення. Спробуйте інше повідомлення або виберіть мову для перекладу.")

async def on_startup(dp):
    await bot.set_webhook(WEBHOOK_URL)

async def on_shutdown(dp):
    await bot.delete_webhook()
    await dp.storage.close()
    await dp.storage.wait_closed()

if __name__ == '__main__':
    start_webhook(
        dispatcher=dp,
        webhook_path=WEBHOOK_PATH,
        on_startup=on_startup,
        on_shutdown=on_shutdown,
        skip_updates=True,
        host=WEBAPP_HOST,
        port=WEBAPP_PORT,
    )
