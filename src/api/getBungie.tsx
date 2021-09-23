import axios from "axios";

const getCurrentBungieNetUser = (token: string) => {
  return axios.get("https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/", {
    headers: {
      "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY,
      Authorization: "Bearer " + token,
    },
  });
};

export { getCurrentBungieNetUser };
