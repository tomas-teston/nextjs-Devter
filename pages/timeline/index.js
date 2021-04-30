import Link from 'next/link';

export default function Timeline({ userName }) {
  return (
    <>
      <h1>This is the timeline of {userName}</h1>
      <nav>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </nav>
      <style jsx>{`
        h1 {
          font-size: 36px;
          color: red;
        }
      `}</style>
    </>
  );
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello').then((res) => res.json());
};
