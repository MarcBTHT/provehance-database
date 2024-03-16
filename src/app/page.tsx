import Link from 'next/link';

export default function Home() {
  return (
    <div className=''>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <main className="flex-grow">
          <section className='text-center min-h-screen flex flex-col justify-center relative'>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'linear-gradient(to bottom, rgba(212,137,127,1) 0%, rgba(201,117,156,1) 100%)',
                filter: 'blur(180px)',
                width: '770px',
                height: '770px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-40 -translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 100%, rgba(190,232,235,1) 0%)',
                filter: 'blur(180px)',
                width: '530px',
                height: '530px',
              }}
            />
            <div
              className="absolute transform -translate-x-10 -translate-y-80 "
              style={{
                background: 'linear-gradient(to bottom, rgba(121,35,171,1) 0%, rgba(82,55,149,1) 75%)',
                filter: 'blur(180px)',
                width: '530px',
                height: '530px',
              }}
            />
            <div className='relative z-10 mx-auto w-2/3'>
              <h1 className="text-8xl text-lavender font-sans font-bold leading-tight text-center responsive-heading">
                Rewarding Loyalty
              </h1>
              <h1 className="text-8xl text-white font-sans font-bold leading-tight text-center responsive-heading">
                With Privacy.
              </h1>
              <p className="text-2xl mt-20 text-gray-300 mt-16 text-center">
                Earn exclusive rewards and tokens for your purchases, backed by the security and privacy of zero-knowledge proofs. Experience the future of loyalty programs with FideRewards.
              </p>
              <nav className="flex justify-center mt-20 p-8">
                <Link href="/" className="text-2xl text-black mr-16 bg-white hover:bg-lavender font-bold font-sans py-4 px-14 rounded-lg transition duration-300">
                  Launch
                </Link>
                <Link href="/verifier" className="text-xl text-white font-bold py-4 px-4">
                  Verify a proof
                </Link>
              </nav>
            </div>
          </section>
        </main>
      </div>
    </div >
  );
}