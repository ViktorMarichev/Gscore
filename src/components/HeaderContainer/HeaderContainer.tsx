import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { useAppSelector, useAppDispatch } from "src/redux/store";
import { UserSelectors } from "src/redux/User";
import { useRouter } from "next/router";

const HeaderContainer: React.FC = () => {
  const [aMenuIsOpen, setAmenuIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => UserSelectors.userData(state));
  const router = useRouter();

  return (
    <Header
      username={user.username!}
      isLogin={!!user.token}
      aMenuIsOpen={aMenuIsOpen}
      toggleMenu={() => setAmenuIsOpen((prev) => !prev)}
    />
  );
};

export default HeaderContainer;
