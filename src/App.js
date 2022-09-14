import { BrowserRouter, Link, Route, Routes} from 'react-router-dom'

import Login from './components/Login/Login'
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>Instacount</h1>
          <Link to="/">Login</Link>
          <Link to="/homepage">Homepage</Link>
          {/* <Link to="/chartofaccounts">Chart Of Accounts</Link>
          <Link to="/journals">Journals</Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          {/* <Route exact path="/chartofaccounts">
            <Chartofaccounts />
          </Route>
          <Route exact path="/journals">
            <Journals />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
