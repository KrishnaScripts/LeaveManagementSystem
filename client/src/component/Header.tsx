import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    
    const navigate = useNavigate();

    const logout = ()=>{
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.clear();
            navigate("/")
        }
        
    }
  
    return(
        <>
        {/* <header className="header">
            <div className="header-container">
                <Link to='/landingPage' className='logo'>MySite</Link>
                <nav className='navigation'>
                    <Link to="/landingPage" className='nav-link'>Home</Link>
                    <Link to="/about" className='nav-link'>About</Link>
                    <Link to="/services" className='nav-link'>Services</Link>
                    <Link to="/contact-us" className='nav-link'>Contact US</Link>
                </nav>

                <div className='header-actions'>
                    <Link to='/' className='logout-button'>logOut</Link>
                </div>
            </div>
        </header> */}
            <div className="sidebar">
                <h2 className="sidebar-title">HOME</h2>
                <ul className="sidebar-menu">
                    <li><Link to="/landingPage">My Profile</Link></li>
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/applyLeaves">Apply Leave</Link></li>
                    <li><Link to="/company-holidays">Company Holidays</Link></li>
                    <li><Link to="/leave-history">My Leave History</Link></li>
                </ul>
            <div className="sidebar-logout">
            <Link to="/" onClick={logout}>Log Out</Link>
            </div>
            </div>
        </>
    )
}
export default Header;


