import { useState, useRef, useEffect } from "react";

interface SearchBoxProps {
    onSearch: (query: string) => void;
    options: string[];
    id: string;
}

const searchBoxRefs: Record<string, React.RefObject<HTMLInputElement>> = {};

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, options, id }) => {
    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);  // Create a ref for the dropdown container

    useEffect(() => {
        searchBoxRefs[id] = inputRef;

        // Close the dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement !== inputRef.current) return; // Only proceed if the input is focused

            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                const searchBoxIds = Object.keys(searchBoxRefs);
                const currentIndex = searchBoxIds.indexOf(id);
                const nextIndex = (currentIndex + 1) % searchBoxIds.length;
                searchBoxRefs[searchBoxIds[nextIndex]]?.current?.focus();
                setShowDropdown(true);
            } else if (event.key === "Escape") {
                setShowDropdown(false);
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredOptions.length) % filteredOptions.length);
            } else if (event.key === "Enter" && selectedIndex !== -1) {
                event.preventDefault();
                handleSelect(filteredOptions[selectedIndex]);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("click", handleClickOutside);
            delete searchBoxRefs[id];
        };
    }, [id, filteredOptions, selectedIndex]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        setFilteredOptions(
            options.filter((option) => option.toLowerCase().includes(value.toLowerCase()))
        );
        setShowDropdown(true);
        setSelectedIndex(-1);
    };

    const handleSelect = (option: string) => {
        setQuery(option);
        setShowDropdown(false);
        onSearch(option);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(query);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 border rounded-md shadow-sm">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="p-2 border rounded-md w-full"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Search</button>
            </form>
            {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-md max-h-40 overflow-auto z-10">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={option}
                            className={`p-2 cursor-pointer hover:bg-gray-200 ${index === selectedIndex ? "bg-gray-300" : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
