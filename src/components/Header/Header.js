import { header } from '../../portfolio';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = () => {
    const { homepage, title } = header;

    return (
        <header className="header center">
            <h3>
                {homepage ? (
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={homepage}
                        className="link"
                    >
                        {title}
                    </a>
                ) : (
                    title
                )}
            </h3>
            <Navbar />
        </header>
    );
};

export default Header;
