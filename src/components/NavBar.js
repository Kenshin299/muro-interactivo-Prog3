import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfiguration';
import {  signOut } from "firebase/auth";

function NavBar(props) {
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <nav className="bg-gray-800 text-white flex items-center justify-between px-6 py-4 shadow-lg">
        <h3 id="Muro" className="text-2xl font-bold hover:text-green-400 transition-colors">
            Muro Interactivo
        </h3>
        {!props.auth ? (
            <div className="flex gap-4">
                <Link to="/login">
                    <button
                        className="px-6 py-2 bg-green-600 rounded-lg font-medium hover:bg-green-500 hover:scale-105 transform transition shadow-md"
                        id="Login"
                        type="button"
                    >
                        Iniciar Sesión
                    </button>
                </Link>
                <Link to="/signup">
                    <button
                        className="px-6 py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-500 hover:scale-105 transform transition shadow-md"
                        id="SignUp"
                        type="button"
                    >
                        Registrarse
                    </button>
                </Link>
            </div>
        ) : (
            <div className="flex gap-4">
                <Link to="/">
                    <button
                        className="px-6 py-2 bg-red-600 rounded-lg font-medium hover:bg-red-500 hover:scale-105 transform transition shadow-md"
                        id="SignOut"
                        type="button"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </Link>
            </div>
        )}
    </nav>
    )
}

export default NavBar;