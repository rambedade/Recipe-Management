import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import Navbar from "./components/Navbar";
import { getAllRecipes } from "./api";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes()
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <Navbar setRecipes={setRecipes} /> {/* ✅ Pass setRecipes to Navbar */}
      <Routes>
        <Route path="/" element={<Home recipes={recipes} setRecipes={setRecipes} />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
