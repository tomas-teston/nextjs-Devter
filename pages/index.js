import { useState, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { colors } from '../styles/theme';
import Button from '../components/Button';
import GitHub from '../components/Icons/Github';

import { loginWithGithub, onAuthStateChanged } from '../firebase/client';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  const handleclick = () => {
    loginWithGithub()
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devter-logo.png" alt="logo" />
          <h1>Devter</h1>
          <h2>
            Talk about development <br /> with developers
          </h2>
          <div>
            {user === null && (
              <Button onClick={handleclick}>
                <GitHub fill="#fff" width="24" height="24" />
                Login With Gitghub
              </Button>
            )}
            {user != null && user.avatar && (
              <>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        div {
          margin-top: 16px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-botton: 16px;
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
