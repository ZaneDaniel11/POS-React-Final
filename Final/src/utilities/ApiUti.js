export async function fetchData(url, method, body) {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Something went wrong");
    }
  
    try {
      return await response.json();
    } catch (error) {
      return {}; 
    }
  }