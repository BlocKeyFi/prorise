import React from "react";

// ProRIse imports
import { Flex, Tabs, TabList, Tab } from "@chakra-ui/react";
// Custom components

export default function GlobalTabs(props) {
  const { tabs, tabIndex, ...rest } = props;

  // ProRIse Color Mode
  return (
    <Flex justify="space-between" align="center" mb="30px" {...rest}>
      <Tabs variant="unstyled">
        <TabList>
          {tabs?.length &&
            tabs?.map((item, index) => {
              return (
                <Tab
                  _selected={{
                    color: "white",
                    bg: "rgba(255, 255, 255, 0.08)",
                  }}
                  _focus={{ border: "none" }}
                  color={"gray.200"}
                  borderRadius={8}
                  value={index}
                  onClick={() => tabIndex(index)}
                >
                  {item.name}
                </Tab>
              );
            })}
        </TabList>
      </Tabs>
    </Flex>
  );
}
