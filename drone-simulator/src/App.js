import './App.css';
import MapComponent from './components/MapComponent';
import { ToastContainer} from 'react-toastify';
import UserInputForm from './components/UserInputForm'
import { Route, Routes } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<UserInputForm/>} />
        <Route path="/simulate/drone" element={<MapComponent/>} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
