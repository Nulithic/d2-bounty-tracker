import React, { useEffect } from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";

import { getCurrentBungieNetUser } from "../api/getBungie";
import { getTokens } from "../api/postBungie";

interface Tokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  membership_id: string;
}

const Tracker = () => {
  useEffect(() => {
    const saveTokens = async () => {
      let url = String(document.location);
      let params = new URL(url).searchParams;
      let code = String(params.get("code"));
      localStorage.setItem("tokens", String(await getTokens(code)));
    };
    saveTokens();
  }, []);

  const currentUser = async () => {
    const tokens = String(localStorage.getItem("tokens"));
    const tokenObject: Tokens = JSON.parse(tokens);
    console.log(await getCurrentBungieNetUser(tokenObject.access_token));
  };

  return (
    <Flex h="full" alignItems="center" justifyContent="center">
      <Box color="white">
        <Text>{"Tracker"}</Text>
        <Button onClick={currentUser}>Current User</Button>
      </Box>
    </Flex>
  );
};

export default Tracker;
