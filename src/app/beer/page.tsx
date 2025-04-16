import { getBeers } from "../../lib/firestoreUtils";

async function BeerPage() {
  const beers = await getBeers();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-500">Lista de Cervezas</h1>
      <ul>
        {beers.map((beer, index) => (
          <li key={index} className="text-xl">
            {beer.name} - ${beer.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeerPage;