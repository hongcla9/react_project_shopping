import React , {useContext, useEffect, useState}from 'react';
import { useHistory,useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {Nav} from 'react-bootstrap';
import {재고context} from './App.js';
import {CSSTransition } from "react-transition-group";
import {connect } from 'react-redux';
//css를 미리 입혀놓은 컴포넌트
let 박스 = styled.div`
padding :20px;
`;
let 제목 = styled.h4`
font-size : 25px
color : ${props => props.색상}
`;
function Detail(props){

  

  let [alert,alert변경] = useState(true);
  let [inputData, inputData변경] = useState('');

  let [누른탭,누른탭변경] = useState();
  let [스위치,스위치변경] = useState(false);
  let 재고 = useContext(재고context);

  let { id } = useParams();
  let history = useHistory();

  useEffect(()=>{
    let 타이머 = setTimeout(()=>{ alert변경(false)},2000);
    
    
  });

  return (
    <div className="container">
      <박스>
      <제목 색상={"blue" }>Detail</제목>
      </박스>
      

      {
       alert === true
       ? <div className= "my-alert2">
         <p>재고가 얼마남지않았습니다</p>
         </div>
         : null  
      }
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
  <h4 className="pt-5">{props.clothes[id].title}</h4>
          <p>{props.clothes[id].content}</p>
          <p>{props.clothes[id].price}원</p>
          <Info 재고={props.재고}></Info>
          
          <button className="btn btn-danger" onClick={()=>{
            props.재고변경([9,11,12]);
            props.dispatch({type:'항목추가', payload : 
            {id:2, name:'새로운상품', quan : 1 } });
            history.push('/cart');
          }}>주문하기</button> 
          <button onClick={()=>{ history.push('/') }} className="btn btn-danger">뒤로가기</button> 
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
  <Nav.Item>
    <Nav.Link  eventKey="link-0" onClick = {()=>{스위치변경(false); 누른탭변경(0)}}>Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1" onClick = {()=>{누른탭변경(0)}}>Option 2</Nav.Link>
  </Nav.Item>
 
</Nav>
<CSSTransition in={스위치} classNames="wow" timeout={500}>
<TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
</CSSTransition>
  </div>  
  )
};

function TabContent(props){
  
  useEffect(() => {
   props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
 return <div>0번째내용입니다</div>
  }else if (props.누른탭 === 1) {
    return <div>1번째내용입니다</div>
  }else if (props.누른탭 === 2) {
     return <div>2번째내용입니다</div>
  }
  
  
}

function Info(props)
{
  return(
    <div>
    <p>재고: {props.재고[0]}</p>
    </div>
  )
}





function state를props화(state){
  console.log(state);
  return {
    state : state.reducer,
    alert열렸니 : state.reducer2
  }
}
export default connect(state를props화)(Detail);

