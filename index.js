const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7640404969:AAFLwWX2436b1TAa18tze5uyC7q86jAi1hU';
const OPENAI_API_KEY = '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';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const botReply = response.data.choices[0].message.content;
        bot.sendMessage(chatId, botReply);
    } catch (error) {
        console.error("Error:", error);
        bot.sendMessage(chatId, "حدث خطأ أثناء معالجة الطلب.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
