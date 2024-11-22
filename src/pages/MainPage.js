import Posts from '../components/Posts'

function MainPage(props) {
    return (
        <div>
            <Posts auth={props.auth} user={props.user}/>
        </div>
    )
}

export default MainPage;