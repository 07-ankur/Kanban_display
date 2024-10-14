import Navbar from './components/Navbar.jsx';
import Status from './container/Status.js';
import Priority from './container/Priority.js';
import Byuser from './container/Byuser.js';
import { useState } from 'react';

function App() {
  const [Grouping, setGrouping] = useState(localStorage.getItem('grouping'));
  const [Order, setOrder] = useState(localStorage.getItem('order'));
  const setGroupingValue = (newValue) => {
    if (newValue === 'status' || newValue === 'priority' || newValue === 'user') {
      setGrouping(newValue);
    } else {
      console.error('Invalid grouping value provided:', newValue);
    }
  };

  const setOrderingValue = (newValue) => {
    if (newValue === 'Priority' || newValue === 'Title') {
      setOrder(newValue);
    } else {
      console.error('Invalid ordering value provided:', newValue);
    }
  };
  let content;

  if (Grouping === 'status') {
    content = <Status order={Order}  />;
  } else if (Grouping === 'priority') {
    content = <Priority order={Order} />;
  } else {
    content = <Byuser order={Order} />;
  }
  return (
    <div className='fullBody'>

      <Navbar order={Order} grouping={Grouping} setGroupingValue={setGroupingValue} setOrderingValue={setOrderingValue}></Navbar>
      {content}
    </div>
  );
}

export default App;
