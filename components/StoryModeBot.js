import axios from 'axios';
import { REACT_APP_API_KEY } from "@env";


// generic d picture for testing
const testImage = 'https://img.freepik.com/premium-photo/duckling-who-are-represented-white-background_136670-2986.jpg';
//const testSelfie = require('../../images/PetHouse/Portrait/diamond.png');
export const generateResponse = async (userInput) => {
  // Check if the user is requesting an image
  const isImageRequest = userInput.toLowerCase().includes("badminton");
  const isDalleRequest = userInput.toLowerCase().includes("image");
  const isSelfieRequest = userInput.toLowerCase().includes("selfie");
  if (isImageRequest) {
    // const imageURL = await generateDALLEResponse(userInput);
    // return imageURL; // Return the generated image URL
    return testImage;
    
  } 
  else if (isDalleRequest) {
    console.log("got here1");
    console.log("the prompt is: ", userInput);
    const dalleResponse = await dalle(userInput);
    return dalleResponse;
  }
  else if (isSelfieRequest) { 
    const selfieResponse = await dalle("selfie of " + testImage + "in an anime style");
    console.log("Here's a selfie of me hehe");
    return selfieResponse;
  }
  
  else {
    // Return the GPT-3.5 response
    const chatGPTResponse = await generateChatGPTResponse(userInput);
    return chatGPTResponse;
  }
};



const dalle = async (prompt) => {
  try {
    prompt = "cute" +prompt;
    console.log("new prompt: ", prompt);
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: "512x512"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REACT_APP_API_KEY}`,
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    return 'Error generating image. Please try again';
  }
};

const generateChatGPTResponse = async (userInput) => {
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