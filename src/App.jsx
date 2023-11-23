import './App.css';
import BirthdaysList from './Components/BirthdaysList';
import UpcomingBirthday from './Components/UpcomingBirthday';

function App() {
  return (
    <div className="App">
      <div className="container">
        <UpcomingBirthday />
        <BirthdaysList />
      </div>
    </div>
  );
}

export default App;
