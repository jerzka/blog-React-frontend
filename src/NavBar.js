import { Link } from "react-router-dom";
const NavBar = () =>{
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles List</Link>
                </li>
                {/* <li>Article</li> */}
            </ul>
        </nav>
    )
}

export default NavBar;