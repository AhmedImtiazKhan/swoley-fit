import React from "react";
import SectionWrapper from "./SectionWrapper";

function Header(props) {
  const { index, header, title } = props;

  return (
    <div>
      <div>
        <p>{header}</p>
        <h4>{title}</h4>
      </div>
    </div>
  );
}

export default function Generator(props) {
  return (
    <SectionWrapper
      header={"Generate your workout"}
      title={["Lets get enormous"]}
    >
      <Header
        index={1}
        header={"Generate your workout"}
        title={"Lets get enormous"}
      />
      asad
    </SectionWrapper>
  );
}
