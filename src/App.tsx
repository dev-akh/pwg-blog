import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterPage from './pages/Register';
import PostDetail from './pages/Post/PostDetail';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<RegisterPage />}
          />
          <Route
            path='/post/:postId'
            element={<PostDetail />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App;
