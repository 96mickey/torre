let BaseUrl = "https://search.torre.co"; // should be fetched from environment

/**
 * This will make a post request with given config
 * @param {string} type, endpoint 
 * @param {object} userData, payload for the api
 * 
 * @returns the api response in json format
 */
export function PostData(type, userData) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * This will make a get request to given endpoint
 * @param {string} type, endpoint
 * 
 * @returns the api response in json format
 */
export function GetData(type) {
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
