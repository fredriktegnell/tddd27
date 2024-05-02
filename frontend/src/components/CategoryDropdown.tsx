import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";

interface CategoryDropdownProps {}

const CategoryDropdown: React.FC<CategoryDropdownProps> = () => {
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => {
        setdropdownOpen(!dropdownOpen);
    }

    const handleClickOutsideBox = (event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setdropdownOpen(false);
        }
    }

    useEffect(() =>{
        document.addEventListener("mousedown", handleClickOutsideBox);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideBox);
        }
    }, []);
    return (
        <div className="relative z-10" ref={dropdownRef}>
            <button className="w-64 bg-white py-2 px-4 rounded-lg font-bold text-left"
                    onClick={toggleDropdown}>
                Home
            </button>
            {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
                    <div className="py-1" role="menu">
                    <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to="/home"
                    >
                        Home
                    </Link>
                    <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to="/fixtures"
                    >
                        Fixtures
                    </Link>
                    <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to="/betting"
                    >
                        Betting
                    </Link>
                    <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to="/profile"
                    >
                        My profile
                    </Link>
                    
                    </div>
                </div>
            )}
        </div>
    )
}


export default CategoryDropdown;