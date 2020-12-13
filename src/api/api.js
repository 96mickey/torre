let BaseUrl = "https://search.torre.co"; // should be fetched from environment

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
