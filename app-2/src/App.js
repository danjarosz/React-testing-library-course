import Cards from "./components/Cards/Cards";
import cats from "./mocks/cats.json";
import Filter from "./components/Filter/Filter";

function App() {
  return (
    <div>
      <Filter />
      <Cards cats={cats} />
    </div>
  );
}

export default App;
