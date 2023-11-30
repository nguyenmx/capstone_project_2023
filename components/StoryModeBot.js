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
      prompt: `The following is a conversation with a video game character. The assistant is flirty, creative, clever, and very friendly.
      Human: ${message}
      AI:`,
      max_tokens: 200,
      temperature: 0.8,
      n: 1,
      stop: 'Human:',
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return error;
  }
}