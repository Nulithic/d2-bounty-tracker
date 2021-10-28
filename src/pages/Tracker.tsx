import React, { useState, useEffect } from "react";
import { Button, Box, Flex, Text, Stack } from "@chakra-ui/react";
import { UserMembershipData } from "bungie-api-ts/user";

import { getMembershipDataForCurrentUser, getProfile } from "../api/getBungie";
import { getTokens } from "../api/postBungie";

import { RefreshAccessToken } from "../helpers";
import { Tokens } from "../main.d";

const Tracker = () => {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState<UserMembershipData>();

  // Request access token and save to local storage
  useEffect(() => {
    const saveTokens = async () => {
      const url = String(document.location);
      const params = new URL(url).searchParams;
      const code = String(params.get("code"));

      try {
        const res = await getTokens(code);
        if (res !== undefined) {
          const tokens = JSON.stringify(res.data);
          localStorage.setItem("tokens", tokens);
          setHasToken(true);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("tokens");
        window.location.replace("/");
      }
    };

    const run = async () => {
      if (!localStorage.getItem("tokens")) {
        saveTokens();
      } else setHasToken(true);
    };

    run();
  }, []);

  // Request current user data
  useEffect(() => {
    if (hasToken) {
      const currentUser = async () => {
        const tokens = localStorage.getItem("tokens");
        if (tokens) {
          const tokenObject: Tokens = JSON.parse(tokens);
          try {
            const res = await getMembershipDataForCurrentUser(tokenObject.access_token);
            setUser(res.data.Response);
          } catch (error) {
            console.log(error);
            localStorage.removeItem("tokens");
            window.location.replace("/");
          }
        }
      };
      currentUser();
    }
  }, [hasToken]);

  // Refresh access token every 50 mins
  useEffect(() => {
    const interval = setInterval(async () => RefreshAccessToken(), 3000000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      const profile = async () => {
        const tokens = localStorage.getItem("tokens");
        const tokenObject: Tokens = JSON.parse(tokens!!);
        try {
          const res = await getProfile(
            tokenObject.access_token,
            user.destinyMemberships[0].membershipType,
            user.destinyMemberships[0].membershipId
          );
          console.log(res.data.Response);
        } catch (error) {
          console.log(error);
        }
      };
      profile();
    }
  }, [user]);

  const handleCurrentUser = async () => {
    console.log(user);
  };

  return (
    <Flex h="full" alignItems="center" justifyContent="center">
      <Box color="white">
        <Stack>
          <Text>Welcome, {user?.bungieNetUser.uniqueName}</Text>
          <Button onClick={handleCurrentUser}>Current User</Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Tracker;
