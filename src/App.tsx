import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  let name;
  if (localStorage.getItem('name') === null) {
    name = prompt('Enter your name');
    if (name) {
      localStorage.setItem('name', name);
    }
    else {
      console.log('first')
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  }
  else {
    name = localStorage.getItem('name');
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  let socket = useMemo(() => {
    return io('http://localhost:3000');

  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = () => {
    if (inputRef.current) {
      socket.emit('message', name + ' : ' + inputRef.current.value);
      console.log('message sent');
    }
  };

  return (
    <div className='container'>
      <div>
        {messages.map((item, index) =>
          <h3 key={index}>{item}</h3>
        )}
      </div>
      <footer>
        <input type="text" ref={inputRef} />
        <button onClick={handleSubmit}>submit</button>
      </footer>
    </div>
  );
}

export default App;
