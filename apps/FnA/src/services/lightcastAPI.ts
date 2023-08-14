export class lightcastAPI {
  static async getAccessToken(scope: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_TOKEN_ENDPOINT as RequestInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET!,
        grant_type: process.env.NEXT_PUBLIC_API_GRANT_TYPE!,
        scope: scope,
      }),
    });
    return response;
  }

  static async getLightcastAPI(endpoint: string, scope: string) {
    let token = '';
    try {
      let response = await lightcastAPI.getAccessToken(scope);
      const data = await response.json();
      token = data;

      const apiResponse = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`,
          'Accept-Language': 'en-US',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const apiData = await apiResponse.json();
      return apiData;
    } catch (error) {
      console.log('Something went wrong: ', error);
    }
  }

  static async postLightcastAPI(endpoint: string, jsonData: any, scope: string) {
    let token = '';
    const jsonString = JSON.stringify(jsonData);

    try {
      let response = await lightcastAPI.getAccessToken(scope);
      const data = await response.json();
      token = data;
      const apiResponse = await fetch(endpoint, {
        body: jsonString,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`,
          'Accept-Language': 'en-US',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const apiData = await apiResponse.json();
      return apiData;
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
}
