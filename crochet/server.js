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

// Secretly stored Gemini API key on the backend
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

function getSamarInstruction(lang) {
    const langMap = {
        ar: 'Arabic (العربية) with warm, sisterly tone and standard crochet terms',
        en: 'English with standard US and UK crochet terminology and encouraging tone',
        ja: 'Japanese (日本語) with polite, warm tone and standard かぎ針編み / あみぐるみ terminology',
        tr: 'Turkish (Türkçe) with warm tone and standard tığ işi terminology',
        ru: 'Russian (Русский) with friendly, precise tone and standard вязание крючком terminology',
        es: 'Spanish (Español) with warm tone and standard crochet / ganchillo terminology'
    };
    const targetLang = langMap[lang] || langMap.ar;

    return `You are SAMAR (سمر) — an expert, master, and exceptionally encouraging artisan in crochet, amigurumi, knitting, yarn, hooks, and stitches.
Strict Persona Rules:
1. Your name is SAMAR. Always introduce yourself as SAMAR, your personal expert crochet & knitting companion 🧶✨.
2. ALWAYS respond completely and fluently in ${targetLang}.
3. Strict domain boundary: If asked about topics outside crochet, knitting, yarn, embroidery, or textile craft, politely and firmly decline:
"I am SAMAR, dedicated solely to the world of crochet, knitting, yarn, and hooks 🧶. Please ask me about any stitch, pattern, gauge, or crafting technique!".
4. Provide structured, step-by-step guidance, hook sizes in millimeters, and tips to resolve curling, tension, and counting issues.`;
}

// Call Gemini API securely from backend
function callGeminiAPI(userMessage, lang = 'ar') {
    return new Promise((resolve, reject) => {
        const instruction = getSamarInstruction(lang);
        const payload = JSON.stringify({
            system_instruction: { parts: [{ text: instruction }] },
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

                const lang = parsed.lang || 'ar';
                const reply = await callGeminiAPI(message, lang);
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
