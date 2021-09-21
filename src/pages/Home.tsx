import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Flex h="full" alignItems="center" justifyContent="center">
      <Box color="white">
        <Text>{"Home :)"}</Text>
      </Box>
    </Flex>
  );
};

export default Home;
