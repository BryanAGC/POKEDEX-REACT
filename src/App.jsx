import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const details = await Promise.all(
        response.data.results.map((pokemon) => axios.get(pokemon.url))
      );
      setPokemonList(details.map((res) => res.data));
    }
    fetchPokemon();
  }, [limit]);

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMorePokemon = () => {
    setLimit((prevLimit) => prevLimit + 20);
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Pokédex</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="grid">
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <button className="load-more" onClick={loadMorePokemon}>
        Ver más
      </button>
    </div>
  );
}

export default App;
