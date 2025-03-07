import { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import AddRecipeModal from "./AddRecipeModal";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ setRecipes }) => {  // ✅ Accept setRecipes as a prop
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">🍽 Recipe App</Link>
        </div>
        <div className={styles.navItems}>
          <button onClick={() => setModalIsOpen(true)} className={styles.addRecipeBtn}>
            Add Recipe
          </button>
          <DarkModeToggle />
        </div>
      </nav>
      <AddRecipeModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} setRecipes={setRecipes} /> {/* ✅ Pass setRecipes */}
    </>
  );
};

export default Navbar;
