import "./App.css";
import Form from "./component/Form";
import List from "./component/List";
function App() {
   
    return (
     <div>
        <div className="App">
         <Form/>
         </div>
        <div className="App">
            <List/>
        </div>
        </div>
      
    );
}

export default App;