import SearchBox from "../components/Searchbox/Searchbox.tsx";

export default function Home() {
    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
    };

    return (
        <div className="text-center p-4">
            <h1 className="text-3xl font-bold">Home Page</h1>
            <p>Welcome to our Tailwind + React Router setup!</p>
            <SearchBox id="search1" onSearch={handleSearch} options={["Apple", "Banana", "Cherry", "Mango"]} />
            <SearchBox id="search2" onSearch={handleSearch} options={["Carrot", "Lettuce", "Pepper", "Tomato"]} />
        </div>
    );
}