import axios from 'axios';
import { REACT_APP_API_KEY } from "@env";

const instance = axios.create({
    baseURL: 'https://api.openai.com/v1/engines/davinci/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${REACT_APP_API_KEY}`,
    },
  });

export const generateResponse = async (message) => {
  try {
    const response = await instance.post('', {
      prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.
      Human: ${message}
      AI:`,
      max_tokens: 150,
      temperature: 0.7,
      n: 1,
      stop: 'Human:',
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return error;
  }
}