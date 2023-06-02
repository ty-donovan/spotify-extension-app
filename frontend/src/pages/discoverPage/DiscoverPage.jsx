import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchResults from './SearchResults';
import './DiscoverPage.css'
import useWindowSize from '../homePage/useWindowSize';


export default function DiscoverPage() {

    const size = useWindowSize();
    //useStates to load components
    const [isDataChanged, setIsDataChanged] = useState(false);
    //fetching database data
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    useEffect(() => {
        getUsers()
    }, [isDataChanged])

    useEffect(() => {
    }, [allUsers])

    async function getUsers() {
        await fetch("http://localhost:9000/profile/checkUser")
            .then((response) => response.json())
            .then((data) => setAllUsers(data))
            .catch((error) => console.log("Error:", error))
        if (searchInput.length > 0) {
            setFilteredUsers(allUsers.result.filter((element) => {
                return element.username.toString().match(searchInput);
            }));
            setSearchInput("")
        }
    }


    function changeIsDataChanged(update) {
        setIsDataChanged(update);
    }

    //search bar functionality
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        setSearchInput(formJson.searched)
        changeIsDataChanged(!isDataChanged);
        setIsSearch(true);
    };

    //clear search button
    function clearSearch() {
        setSearchInput("");
        setFilteredUsers([]);
        changeIsDataChanged(!isDataChanged);
        setIsSearch(false);
    }

    return (
        <div>
            <h1 className='header'>Discover</h1>
            <div className='searchBar'>
                <form method="post" onSubmit={handleChange} className='form'>
                    <div className='formData'>
                        <TextField
                            className='searchInput'
                            name='searched'
                            type="text"
                            placeholder="Search Usernames"
                            size='small'
                        />
                        <Button type='submit' size='small' sx={{ color: "white", border: "none", backgroundColor: "#363535", marginLeft: "1%" }}>Search</Button>
                        <Button onClick={clearSearch} sx={{ color: "white", border: "none", backgroundColor: "#363535", marginLeft: "1%" }} size='small'>Clear Search</Button>
                    </div>
                </form>

            </div>
            {!filteredUsers ? <p1></p1> :
                <div className='resultsTable'>
                    <div className='scrollBox'>
                        <SearchResults data={filteredUsers} isSearch={isSearch} />
                    </div>
                </div>
            }

        </div>
    );
}

