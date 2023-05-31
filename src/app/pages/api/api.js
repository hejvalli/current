export async function getData() {
    const res = await fetch('http://localhost:3001/data');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
  }
  export async function postData(data) {
    const res = await fetch('http://localhost:3001/data', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    // Recommendation: handle errors
    if (!res.ok) {
      throw new Error('Failed to update data');
    }
  
    return res.json();
  }
  