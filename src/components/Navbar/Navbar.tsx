import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <circle cx="15.5" cy="15.5" r="15.5" fill="white" />
        </svg>
        <ul className="navbar__links">
          <li>
            <a href="#" className="navbar__link">
              Доставка и оплата
            </a>
          </li>
          <li>
            <a href="#" className="navbar__link">
              Отправить груз
            </a>
          </li>
          <li>
            <a href="#" className="navbar__link">
              Контакты
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
