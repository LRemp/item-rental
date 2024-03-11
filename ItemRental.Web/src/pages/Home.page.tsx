import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useState } from 'react';
import { Header } from '@/components/Header/Header';

export function HomePage() {
  const [data, setData] = useState('');
  const login = async () => {
    const req = await fetch('/api/Users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'string',
        password: 'string',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    setData(await req.json());
  };

  return (
    <>
      <Header />
      {data}
      <button onClick={login}>Login</button>
      {/*<Welcome />
      <ColorSchemeToggle />*/}
    </>
  );
}
