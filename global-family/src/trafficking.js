import React, { useState } from 'react';

// Node Component
// const Node = ({ data, next }) => {
//   return (
//     <div>
//       <span>{data}</span>
//       {next && <Node data={next.data} next={next.next} />}
//     </div>
//   );
// };

// LinkedList Component
const LinkedList = () => {
  const [head, setHead] = useState(null);

  const appendNode = (data) => {
    const newNode = { data, next: null };

    if (!head) {
      setHead(newNode);
    } else {
      let current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  };
}

//   return (
//     <div>
//       <h1>Linked List in React</h1>
//       <button onClick={() => appendNode('New Node')}>Append Node</button>
//       {head && <Node data={head.data} next={head.next} />}
//     </div>
//   );
// };

// export default LinkedList;


const TraffickingPage = () => {
    return (<div><h1>Trafficking</h1>
    <p>Enter PDF stuff here</p>
    </div>);
}

export default TraffickingPage;