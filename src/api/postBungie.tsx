import axios from "axios";
import qs from "qs";

const getTokens = (code: string) => {
  const data = {
    grant_type: "authorization_code",
    code: code,
  };

  return axios.post("https://www.bungie.net/Platform/App/OAuth/Token/", qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("34710:" + process.env.REACT_APP_BUNGIE_API_CLIENT_SECRET),
    },
  });
};

export { getTokens };
