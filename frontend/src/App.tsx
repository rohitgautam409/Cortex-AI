import getCurrentUser from "./features/getCurrentUser";
import Home from "./pages/Home";
import { useEffect } from 'react'


const App: React.FC = () => {

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser()
      console.log(data)
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