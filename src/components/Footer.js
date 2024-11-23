function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-200">
                    © 2024{" "}
                    <a href="https://www.linkedin.com/in/kemyl-fern%C3%A1ndez-a0a1bb275/" className="hover:underline">
                        Kemyl Fernandez
                    </a>
                    . Derechos Reservados.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-500 sm:mt-0">
                    <li>
                        <a href="mailto:kemylfernandez299@gmail.com" className="hover:underline">
                            Correo
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
