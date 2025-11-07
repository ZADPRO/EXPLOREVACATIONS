import logo from "../../assets/images/foodlogo.jpg";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css'
export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", id: "/" },
    { name: "About", id: "/about" },
    { name: "Contact", id: "/contact" },
  ];
  
  // const scrollToSection = () => {
  //   if (location.hash) {
  //     const id = location.hash.replace("#", "");
  //     setTimeout(() => {
  //       const el = document.getElementById(id);
  //       if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }, 100);
  //   }
  // };

  // useEffect(() => {
  //   scrollToSection();
  // }, [location.hash]);

  // useEffect(() => {
  //   const sectionIds = menuItems.map((item) => item.id.split("#")[1]);

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const id = entry.target.id;
  //           const match = menuItems.find((item) => item.id.endsWith(`#${id}`));
  //           if (match) setActive(match.id);
  //         }
  //       });
  //     },
  //     { threshold: 0.6 }
  //   );

  //   sectionIds.forEach((id) => {
  //     const section = document.getElementById(id);
  //     if (section) observer.observe(section);
  //   });

  //   return () => observer.disconnect();
  // }, []);

  // const handleNavigation = (path: string) => {
  //   const [route] = path.split("#");
  //   if (location.pathname !== route) {
  //     navigate(route);
  //   } else {
  //     const id = path.split("#")[1];
  //     const el = document.getElementById(id);
  //     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  //   setActive(path);
  //   setIsToggleOpen(false);
  // };

  // const excludedRoutes = ["/login", "/admin"];
  // const shouldShowHeader = !excludedRoutes.includes(location.pathname);
const handleNavigation = (path: string) => {
  if (location.pathname !== path) {
    navigate(path);
  }
  setActive(path);
  setIsToggleOpen(false);
};  
  return (
    <>
      {/* {shouldShowHeader && ( */}
       <header className="header">
  <div className="header-container">
    <Link to="/" className="logo-link">
      <img src={logo} alt="Max-i Logo" className="logo" />
    </Link>

    <nav className="nav">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.id}
          onClick={() => handleNavigation(item.id)}
          className={`nav-link ${active === item.id ? "active" : ""}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>

    <button
      className="menu-toggle"
      onClick={() => setIsToggleOpen(!isToggleOpen)}
      aria-label="Toggle Menu"
    >
      ☰
    </button>
  </div>

  {isToggleOpen && (
    <div className="mobile-menu">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.id}
          onClick={() => handleNavigation(item.id)}
          className={`mobile-link ${active === item.id ? "active" : ""}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )}
</header>

      {/* )} */}
    </>
  );
}
