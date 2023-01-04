import { Route } from "react-router-dom";
import "./App.css";
import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/Homepage";

const App = () => {
  return (
    <div className="App">
      {/* exact means that it will only go to that exact path else it was included in /chats also */}
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
};
export default App;
