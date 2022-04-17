import logo from "../images/header/header__logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="header logo with text `Around The U.S.`"
      />
    </header>
  );
};
