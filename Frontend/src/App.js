import logo from './logo.svg';
import './App.css';
import PageContainer from './components/pageContainer'

const App = () => {
  console.log(process.env)
  return (
    <div className="App">
      <PageContainer></PageContainer>
    </div>
  );
}

export default App;
