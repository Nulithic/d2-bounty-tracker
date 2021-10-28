import { refreshTokens } from "../api/postBungie";
import { Tokens } from "../main.d";

const RefreshAccessToken = async () => {
  const tokens = localStorage.getItem("tokens");
  if (tokens !== null) {
    try {
      const tokenObject: Tokens = JSON.parse(tokens);
      const res = await refreshTokens(tokenObject.refresh_token);
      const newTokens = JSON.stringify(res.data);
      localStorage.setItem("tokens", newTokens);
      console.log("Token refreshed successfully.");
    } catch (error) {
      console.log(error);
      console.log("Token refreshed unsuccessfully.");
      localStorage.removeItem("tokens");
      window.location.replace("/");
    }
  }
};

export default RefreshAccessToken;
