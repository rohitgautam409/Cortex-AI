import { useDispatch } from "react-redux";
import getCurrentUser from "./features/getCurrentUser";
import Home from "./pages/Home";
import { useEffect } from 'react'
import { setUserdata } from "./redux/userSlice";


const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser()

      dispatch(setUserdata(data))

    }
    getUser()
  }, [])

  return (
    <>
      <Home />
    </>
  );
};

export default App;