import { Link } from 'react-router-dom';
import '../App.css';
import Header from '../common/header';
function HomePage() {
    return (
        <div className='App text-light'>
            <Header />
            <div className='container m-5 center'>
                <div className="row text-light">
                    <div className="col-sm-6">
                        <div className="card bg-transparent border-success">
                            <div className='card-header border-success'>
                                <h5 className="card-title">Dashboard</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Upcoming events for a user</p>
                            </div>
                            <div className='card-footer border-success'>
                                <Link to="/dashboard" className="btn btn-outline-success">Go To Dashboard</Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card bg-transparent border-success">
                            <div className="card-header border-success">
                                <h5 className="card-title">Stats</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">List of recent transactions</p>
                            </div>
                            <div className='card-footer border-success'>
                                <Link to="/stats" className="btn btn-outline-success">Go To Stats Page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;