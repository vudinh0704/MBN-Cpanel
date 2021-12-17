import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" passHref>
      <div style={{ cursor: 'pointer', height: '100%', width: '150px' }}>
        <img
          src="/images/logo.png"
          alt="logo"
          style={{ height: '100%', objectFit: 'contain', width: '100%' }}
        />
      </div>
    </Link>
  );
};
