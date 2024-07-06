import { Link } from "react-router-dom";
const Notfound = () => {
    return ( 
        <div className ="notfound">
            <h2> Sorry</h2>
            <p> That page is not found</p>
            <Link to="/">To home page..</Link>
        </div>
     );
}
 
export default Notfound;