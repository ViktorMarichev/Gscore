import React, { useState } from "react";
import Header from "./components/Header";

const HeaderContainer: React.FC = () => {
  const [aMenuIsOpen, setAmenuIsOpen] = useState<boolean>(false);

  return (
    <Header
      username="Master"
      currentPage="UiKit page"
      isLogin={true}
      aMenuIsOpen={aMenuIsOpen}
      toggleMenu={() => setAmenuIsOpen((prev) => !prev)}
    />
  );
};

export default HeaderContainer;
