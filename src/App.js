/*eslint-disable*/

import React, {useState,useContext }from 'react';
import './App.css';
import {Navbar,Nav,NavDropdown,Form,Button,Jumbotron} from 'react-bootstrap';
import Data from './Data.js';
import { useHistory,useParams } from 'react-router-dom';
import {Link , Route, Switch} from 'react-router-dom';
import Detail from './Detail.js';
import axios from "axios";
import Cart from "./Cart.js";

let history = useHistory();
export let 재고context = React.createContext();


function App() {
  let [clothes, clothes변경] = useState(Data);
  let [재고,재고변경] = useState([10,11,12]);



  return (
 <div className="App">
   <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">bonita clothes</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
      <Nav.Link><Link to="/detail">Detail</Link></Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>


<Switch>

<Route exact path="/">
  
<Jumbotron className="background">
  <h1>최대 50% season OFF</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>

<div className="container">

<재고context.Provider value={재고}>

  <div className="row">
  {
    clothes.map((a,i)=>{
      return <Card clothes={clothes[i]} i={i} key={i}/>
    })
  }

  </div>
  </재고context.Provider>

  <button className="btn btn-primary" onClick={()=>
  {
    //로딩중이라는 ui띄우기
    axios.get('https://codingapple1.github.io/shop/data2.json')
    .then((result)=>{
      console.log('success')
      clothes변경 ([...clothes, ...result.data ]);
   })
    .catch(()=>{'failed'});
  }}>더보기</button>
</div>

</Route>
<Route path="/detail/:id">
  <재고context.Provider value={재고}>
  <Detail clothes={clothes} 재고={재고} 재고변경={재고변경}/>
    </재고context.Provider>

</Route>

<Route path="/cart">
  <Cart></Cart>
</Route>

<Route path="/:id">
  <div></div>
</Route>

</Switch>
    </div>
  );
}
function Card(props) {
  let 재고 = useContext(재고context);;
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=>{history.push('/detail/'+props.clothes.id)}}>
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + 
      '.jpg'} width="100%"/>
      <h4>{props.clothes.title}</h4>
  <p>{ props.clothes.content } & {props.clothes.price}</p>
  {재고[props.i]}
    </div>
  )
}

export default App;
