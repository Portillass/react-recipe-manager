// src/App.jsx
import { useEffect, useState } from "react";
import recipesData from "./data/recipes.json"; 
import { Card, CardContent } from "./components/Card";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

export default function App() {
  const [recipes, setRecipes] = useState([]);  
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setRecipes(recipesData.recipes); 
  }, []);

    // Toggle favorites: add or remove recipe sa favorites
  const toggleFavorite = (recipe) => {
    setFavorites((prev) =>
      prev.find((r) => r.id === recipe.id)
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };
// Filter recipes base sa search input (title or ingredients)
  const filteredRecipes = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.ingredients.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🍽 Recipe Manager</h1>

      <Input
        placeholder="Search by name or ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      <div className="grid md:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardContent className="p-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded mb-2"
              />
              <h2 className="font-semibold">{recipe.title}</h2>
              <p>⏱ {recipe.cookingTime} mins</p>

              <Button
                className="mt-2"
                onClick={() => toggleFavorite(recipe)}
              >
                {favorites.find((f) => f.id === recipe.id)
                  ? "Remove Favorite"
                  : "Add Favorite"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8">Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {favorites.map((fav) => (
            <Card key={fav.id}>
              <CardContent>
                <h3 className="font-semibold">{fav.title}</h3>
                <p>⏱ {fav.cookingTime} mins</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
