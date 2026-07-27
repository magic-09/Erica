import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt || '공부 다짐 문구를 한 문장으로 추천해줘.',
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'AI 응답 생성 실패' });
  }
}