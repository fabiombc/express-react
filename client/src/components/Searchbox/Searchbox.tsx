import React, { useState, useRef, useEffect } from "react";

interface SearchBoxProps {
    onSearch: (query: string) => void;
    options: string[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, options }) => {
    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        setFilteredOptions(
            options.filter((option) => option.toLowerCase().includes(value.toLowerCase()))
        );
        setShowDropdown(true);
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
        <div className="relative w-full">
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
                <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-md max-h-40 overflow-auto">
                    {filteredOptions.map((option) => (
                        <li
                            key={option}
                            className="p-2 cursor-pointer hover:bg-gray-200"
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
