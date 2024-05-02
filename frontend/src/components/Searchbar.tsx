import React, { useState, useEffect, useRef } from "react";
import { getAllUsers } from "../api/users";
import { Link } from 'react-router-dom'

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usernames, setUsernames] = useState<string[]>([]); // Array to store all usernames
  const inputRef = useRef<HTMLInputElement>(null); // Reference to access the input element

  // Function to fetch all users from the server when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsernames = await getAllUsers();
      if (!allUsernames) {
        console.log("Could not retrieve all users on frontend");
      }
      setUsernames(allUsernames);
    };

    fetchUsers();
  }, []);

  // Function to filter users based on the search term
  const searchResults = usernames.filter((username) =>
    username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to reset the search input and dropdown
  const resetSearch = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="relative w-64">
      <input
        ref={inputRef}
        className="rounded-lg bg-white border-2 border-cyan-100 focus:border-cyan-600 text-gray-900 py-2 px-4 w-full"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length > 0 && (
        <div className="absolute mt-2 w-full bg-white z-10 border border-gray-200 rounded-md shadow max-h-[200px] overflow-auto">
          {searchResults.map((username) => (
            <Link to={`/users/${username}`} onClick={resetSearch}>
              <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer" key={username}>
                {username}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
