import SearchBox from "../components/Searchbox/Searchbox.tsx";

const options = ["Apple", "Banana", "Cherry", "Date", "Grape", "Mango", "Orange", "Peach", "Strawberry"];

export default function Home() {
    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
    };

    return (
        <div className="text-center p-4">
            <h1 className="text-3xl font-bold">Home Page</h1>
            <p>Welcome to our Tailwind + React Router setup!</p>
            <SearchBox onSearch={handleSearch} options={options} />
        </div>
    );
}