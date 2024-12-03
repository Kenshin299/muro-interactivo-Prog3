import Footer from '../components/Footer';
import Posts from '../components/Posts'

function MainPage(props) {
    return (
        <div>
            <Posts auth={props.auth} user={props.user}/>
            <Footer/>
        </div>
    )
}

export default MainPage;