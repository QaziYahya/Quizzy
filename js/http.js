class easyHTTP {
  // Create HTTP GET Request
  async get(url) {
    const response = await fetch(url);

    const responseData = await response.json();

    return responseData;
  }

  // Create HTTP POST Request
  async Post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  }

  // Create HTTP PUT Request
  async Put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    return responseData;
  }

  // Create HTTP DELETE Request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const responseData = 'User Deleted';

    return responseData;
  }
}

const http = new easyHTTP();
