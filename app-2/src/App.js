import Cards from "./components/Cards/Cards";
import cats from "./mocks/cats.json";

function App() {
  return (
    <div>
      <Cards cats={cats} />
    </div>
  );
}

export default App;
