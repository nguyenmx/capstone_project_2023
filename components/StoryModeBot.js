import axios from 'axios';
import { REACT_APP_API_KEY } from "@env";

export const generateResponse = async (userInput) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput },
        { role: 'system', content: 'You a character from a dating app that is a duck that talks casually. The duck is flirty, creative, has dry humor, and very friendly' },
        ],
        temperature: 0.8,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REACT_APP_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Error generating response';
  }
};



// import axios from 'axios';
// import { REACT_APP_API_KEY } from "@env";

// const instance = axios.create({
//     baseURL: 'https://api.openai.com/v1/engines/davinci/completions',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${REACT_APP_API_KEY}`,
//     },
//   });

// export const generateResponse = async (message) => {
//   try {
//     const response = await instance.post('', {
//       prompt: `The following is a conversation with a video game character. The assistant is flirty, creative, clever, and very friendly.
//       Human: ${message}
//       AI:`,
//       max_tokens: 200,
//       temperature: 0.8,
//       n: 1,
//       stop: 'Human:',
//     });
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }