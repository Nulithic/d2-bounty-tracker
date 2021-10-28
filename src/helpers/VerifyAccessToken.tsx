import { useEffect, useState } from "react";
import { getMembershipDataForCurrentUser } from "../api/getBungie";

import { Tokens } from "../main.d";

const VerifyAccessToken = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");

    const checkTokens = async () => {
      const tokenObject: Tokens = JSON.parse(tokens!!);
      try {
        const res = await getMembershipDataForCurrentUser(tokenObject.access_token);
        console.log(`Verify Token: ${res.data.ErrorStatus} - ${res.data.Message}`);
        if (res.data.ErrorStatus === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
          localStorage.removeItem("tokens");
        }
      } catch (error) {
        console.log(error);
        setAuth(false);
        localStorage.removeItem("tokens");
      }
    };

    if (tokens) {
      checkTokens();
    }
  }, []);
  return auth;
};

export default VerifyAccessToken;
