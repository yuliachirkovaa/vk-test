import { FC } from "react";
import s from "./header.module.scss"

const Header: FC = () => {

  return (

    <nav className = {s.container}>

      <a href = "/">Главная</a>
      <a href = "/favorites">Избранное</a>

    </nav>

  );

};

export default Header;