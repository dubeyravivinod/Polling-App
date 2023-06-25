import './App.css';
import Home from './components/Layout/Home';
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </div>
  );
}

export default App;
