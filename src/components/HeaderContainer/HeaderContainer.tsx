import React, { useState } from "react";
import Header from "./components/Header";
import { useAppSelector } from "src/redux/store";
import { UserSelectors } from "src/redux/User";
import { useRouter } from "next/router";

const HeaderContainer: React.FC<{
  isSmall: boolean;
  toggleCurtain: () => void;
}> = ({ isSmall, toggleCurtain }) => {
  const [isTheMenuOpen, setMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const router = useRouter();


  
  return (
    <Header
      isSmall={isSmall}
      username={user.username!}
      isLogin={!!user.token}
      isTheMenuOpen={isTheMenuOpen}
      toggleMenu={() => setMenu((prev) => !prev)}
      toggleCurtain={toggleCurtain}
    />
  );
};

export default HeaderContainer;
