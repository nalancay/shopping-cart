import { IS_DEVELOPMENT } from "../config";
const URL_IN_PRODUCTION = "https://nalancay-shopping-cart.netlify.app";
const URL_IN_LOCAL = "http://localhost:3000";
const API_URL = IS_DEVELOPMENT ? URL_IN_LOCAL : URL_IN_PRODUCTION;

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/data.json`);

    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}
