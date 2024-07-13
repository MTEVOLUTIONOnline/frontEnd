export const deleteApiKey = async (id: number, setError: Function) => {
    try {
      const tokenJwt = localStorage.getItem('token') || '';
      const response = await fetch(`http://localhost:3000/api-keys/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenJwt}`
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Key deleted successfully:', data.message);
      } else {
        const errorData = await response.json();
        console.error('Error deleting API Key:', errorData.error);
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
    }
  };
  