import React from "react";
import { Button, Box, Flex } from "@chakra-ui/react";

import { VerifyAccessToken } from "../helpers";

const Home = () => {
  const verifyAccessToken = VerifyAccessToken();
  if (verifyAccessToken) window.location.replace("/tracker");

  return (
    <Flex h="full" alignItems="center" justifyContent="center">
      <Box color="white">
        <a href="https://www.bungie.net/en/OAuth/Authorize?client_id=34710&response_type=code">
          <Button>Authorize with Bungie.net</Button>
        </a>
      </Box>
    </Flex>
  );
};

export default Home;
