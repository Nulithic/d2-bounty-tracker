import React, { FC, useState } from "react";
import { Box, Text, Link, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscClose, VscMenu } from "react-icons/vsc";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

interface MenuItemProps {
  children: string;
  to: string;
}

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

interface MenuLinksProps {
  isOpen: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  const toggle = () => setIsOpen(!isOpen);

  const MenuToggle = (props: MenuToggleProps) => {
    return (
      <Box display={{ base: "block", md: "none" }} onClick={toggle} boxSize={35}>
        {isOpen ? <VscClose size={35} /> : <VscMenu size={35} />}
      </Box>
    );
  };

  const Logo = () => {
    return (
      <Link href="/">
        <Stack direction="row">
          <Text fontSize="3xl" fontWeight="bold">
            D2 Bounty Tracker
          </Text>
        </Stack>
      </Link>
    );
  };

  const MenuItem = ({ children, to }: MenuItemProps) => {
    return (
      <Link href={to}>
        <Text display="block">{children}</Text>
      </Link>
    );
  };

  const MenuLinks = (props: MenuLinksProps) => {
    return (
      <Box display={{ base: isOpen ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
        <Stack
          spacing={8}
          align="center"
          justify={["center", "center", "flex-end", "flex-end"]}
          direction={["column", "column", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="https://www.bungie.net/en/OAuth/Authorize?client_id=34710&response_type=code">Login</MenuItem>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
      </Box>
    );
  };

  const NavBarContainer: FC = ({ children }) => {
    return (
      <Flex
        as="nav"
        pos="fixed"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p={4}
        bg={bg}
        color={color}
      >
        {children}
      </Flex>
    );
  };

  return (
    <NavBarContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

export default Navbar;
