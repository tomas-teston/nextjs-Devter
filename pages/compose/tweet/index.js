import { useState } from 'react';
import AppLayout from 'components/AppLayout';
import Button from 'components/Button';
import useUser from 'hooks/useUser';

import { addDevit } from 'firebase/client';
import { useRouter } from 'next/router';

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function ComposeTweet() {
  const user = useUser();
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    setStatus(COMPOSE_STATES.LOADING);
    event.preventDefault();
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => router.push('/home'))
      .catch((_err) => {
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué está pasando?"
            value={message}
            onChange={handleChange}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          border: 0;
          padding: 15px;
          min-height: 200px;
          outline: 0;
          resize: none;
          font-size: 21px;
          width: 100%;
        }
      `}</style>
    </>
  );
}
