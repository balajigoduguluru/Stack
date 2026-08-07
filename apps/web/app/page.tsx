import { auth } from "@stack/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Stack 2.0</h1>
      {session ? (
        <p>Logged in as {session.user?.email}</p>
      ) : (
        <p>Not logged in.</p>
      )}
    </main>
  );
}
