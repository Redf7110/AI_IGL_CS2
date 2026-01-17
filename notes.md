import  {useState, useEffect} from "react";
import { NewComponent } from "./components/newComponent";

const fetchData = async () => {
  return {"message": "hello world"}
}


export function App(): React.JSX.Element {
  const [count, setCount] = useState<Number>(0); //setcount changes value, count cannot be changed
  const [wordList, setWordList] = useState<string[]>([]); //must tell it the type 
  const [inpValue, setInpvalue] = useState<string>(""); 
  const [data, setData] = useState<any>(null);
  useEffect(()=> {
    fetchData().then((res) => {
      setData(res)
    })m
  }, []) // Will only run once


  useEffect(() => {
    fetchData().then((res) => {})
  }, [wordList, data, inpValue]) // Will run whenever wordList changes
  

  return <div>
      <input type="text" value={inpValue} onChange={(e) => setInpvalue(e.target.value)} >
      <button onClick={() => setWordList([...wordList, inpValue])}>Add to List</button>
      {wordList.map((word, index) => <div key={index}>{word}</div>)}
      <NewComponent name={"jason"}/> 
    </div>
}


export default App;