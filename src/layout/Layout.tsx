import React, { FC } from "react";
import { Box, Grid } from "@chakra-ui/react";

import Navbar from "./Navbar";

const Layout: FC = ({ children }) => {
  return (
    <Box bgColor="gray.800">
      <Navbar />
      <Grid minH="100vh">
        <Box mt={24} mb={5} mx={5}>
          {children}
        </Box>
      </Grid>
    </Box>
  );
};

export default Layout;
