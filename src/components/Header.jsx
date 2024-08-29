import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="">
            <Link to="/">
                <h1 className="">Formula1<span>Quotes</span></h1>
            </Link>
        </header>
    )
    
}

export default Header