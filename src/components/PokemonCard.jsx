function PokemonCard({ pokemon }) {
    const types = pokemon.types.map((type) => type.type.name);
    const stats = Object.fromEntries(pokemon.stats.map((s) => [s.stat.name, s.base_stat]));

    return (
        <div className="card">
            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <div className="types">
                {types.map((type) => (
                    <span key={type} className={`type ${type}`}>{type}</span>
                ))}
            </div>
            <div className="stats">
                {["hp", "attack", "defense", "special-attack"].map((stat) => (
                    <div key={stat} className="stat">
                        <strong>{stat.replace("-", " ")}</strong>
                        <progress value={stats[stat]} max="100"></progress>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;
