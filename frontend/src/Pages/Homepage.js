import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const Homepage = () => {
  // it is used for navigate
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    // if user hass logged in push him to the chats page
    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="RGBA(0, 0, 0, 0.64)"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          textAlign="center"
          textColor="white"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="RGBA(0, 0, 0, 0.64)"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="white"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab color="white" width="50%">
              Login
            </Tab>
            <Tab color="white" width="50%">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
