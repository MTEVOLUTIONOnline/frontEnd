// src/api.ts

const baseURL = 'http://localhost:3000';

export const getApiKeyCount = async (token: string) => {
  try {
    const response = await fetch(`${baseURL}/apikeys/count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching API key count:', error);
    throw error;
  }
};
