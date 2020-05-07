import React from "react";
import styled from "styled-components";

import sizes from "../styles/sizes";
import colors from "../styles/colors";

function HeadingGroup({ heading, subheading }) {
  return (
    <Wrapper>
      <Heading>{heading}</Heading>
      <Subheading>{subheading ? subheading : null}</Subheading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 0.8rem;
  color: inherit;
`;

const Subheading = styled.p`
  color: ${colors.lightMetalGrey};
  font-size: 1.8rem;
`;

export default HeadingGroup;
