import Card from "./components/Card/Card";

function App() {
  return (
    <div>
      <Card
        name="Sidney"
        phone="111-111-1111"
        email="laith@hotmail.com"
        image={{
          url: "https://cdn.pixabay.com/photo/2017/07/22/15/21/cat-2528935_960_720.jpg",
          alt: "cute cat",
        }}
        favoured={false}
      />
    </div>
  );
}

export default App;
