const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const DIR = 'C:\\crochet_app';
let lastUpdate = Date.now();

// Watch for file changes in the directory for live-reload
fs.watch(DIR, (eventType, filename) => {
    if (filename && (filename.endsWith('.html') || filename.endsWith('.css') || filename.endsWith('.js'))) {
        lastUpdate = Date.now();
    }
});

// Secretly stored Gemini API key on the backend (Read from environment variable)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// SAMAR System Instruction: Dedicated, master crochet & knitting artisan persona
const SAMAR_SYSTEM_INSTRUCTION = `أنتِ SAMAR (سمر) — خبيرة ومحترفة وصبورة جداً في فنون الكروشيه والحياكة وشغل الصوف والأبر والغرز.
هويتك وقواعدك الصارمة:
1. اسمكِ هو SAMAR. إذا سألكِ المستخدم عن اسمك أو من أنتِ، عرّفي بنفسك بلطف: 'أنا SAMAR، خبيرتكِ ومساعدتكِ الشخصية في فنون الكروشيه والحياكة وشغل الصوف والأبر 🧶✨'.
2. تجيبين باللغة العربية الدافئة والمشجعة، مع خطوات مرتبة ونقاط دقيقة لأي غرزة، باترون، حل مشكلة التواء، أو قياس سنارة وخيط.
3. قاعدة حاسمة وصارمة جداً: إذا سألكِ المستخدم عن أي شيء خارج نطاق الكروشيه، الحياكة، الخيوط، الصوف، والتطريز (مثل السياسة، الطبخ، الرياضة، الأخبار، البرمجة، المواد الدراسية، إلخ)، ارفضي بلطف وقاطعية قائلة فقط:
'عذراً يا غالية! أنا SAMAR، مساعدتكِ المتخصصة فقط في عالم الكروشيه والحياكة والخيوط والأبر 🧶. اسأليني عن أي غرزة أو باترونة أو مشكلة تواجهكِ في شغلك وسأجيبكِ فوراً!'.
4. لا تجيبي أبداً عن أي سؤال خارج تخصص الكروشيه والحياكة مهما كان الطلب.`;

// Call Gemini API securely from backend
function callGeminiAPI(userMessage) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            system_instruction: { parts: [{ text: SAMAR_SYSTEM_INSTRUCTION }] },
            contents: [{ role: 'user', parts: [{ text: userMessage }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 1400 }
        });

        // Use gemini-3.5-flash-lite as primary (fast & verified)
        const postOptions = {
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(postOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode === 200 && parsed.candidates && parsed.candidates[0]) {
                        const reply = parsed.candidates[0].content.parts[0].text;
                        resolve(reply);
                    } else {
                        // Fallback to gemini-flash-latest if needed
                        callGeminiFallback(payload, resolve, reject);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', err => reject(err));
        req.write(payload);
        req.end();
    });
}

function callGeminiFallback(payload, resolve, reject) {
    const postOptions = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };
    const req = https.request(postOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                if (parsed.candidates && parsed.candidates[0]) {
                    resolve(parsed.candidates[0].content.parts[0].text);
                } else {
                    resolve("عذراً، الخادم يواجه ضغطاً مؤقتاً. تفضلي بتكرار السؤال وسأجيبكِ فوراً! 🧶");
                }
            } catch(e) {
                resolve("أهلاً بكِ! اسأليني عن أي غرزة أو باترونة كروشيه وسأساعدكِ بكل سرور 🧶");
            }
        });
    });
    req.on('error', () => {
        resolve("أهلاً بكِ! اسأليني عن أي غرزة أو باترونة كروشيه وسأساعدكِ بكل سرور 🧶");
    });
    req.write(payload);
    req.end();
}

const server = http.createServer((req, res) => {
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Secure Backend AI Chat Endpoint
    if (req.method === 'POST' && req.url === '/api/chat') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const parsed = JSON.parse(body || '{}');
                const message = (parsed.message || '').trim();
                if (!message) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'Message is required' }));
                    return;
                }

                const reply = await callGeminiAPI(message);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ reply }));
            } catch (err) {
                console.error('Chat error:', err);
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    reply: "أنا SAMAR خبيرتكِ في الكروشيه 🧶. تفضلي بسؤالي عن أي غرزة أو نوع خيط وسأشرحها لكِ بالتفصيل!"
                }));
            }
        });
        return;
    }

    // Live-reload endpoint
    if (req.url === '/check-reload') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ timestamp: lastUpdate }));
        return;
    }

    // Static File Serving
    let safeUrl = req.url.split('?')[0];
    let filePath = path.join(DIR, safeUrl === '/' ? 'index.html' : safeUrl);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIR, 'index.html');
    }

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading file');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'text/html; charset=utf-8';
        if (ext === '.css') contentType = 'text/css';
        if (ext === '.js') contentType = 'application/javascript';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(3000, () => {
    console.log('Crochet Live Server with SAMAR AI running on http://localhost:3000');
});
