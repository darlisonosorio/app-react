import './App.css'
import AppRoutes from './Routes'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
