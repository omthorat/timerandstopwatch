import logo from './logo.svg';
import './App.css';
import TimerCom from './components/TimerCom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CountDown Timer</h1>
        <TimerCom/>
      </header>
    </div>
  );
}

export default App;
