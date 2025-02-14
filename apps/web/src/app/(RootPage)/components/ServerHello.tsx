'use server';

export const ServerHello = async () => {
  try {
    const res = await fetch('http://localhost/api/');

    if (res.ok) {
      const data = await res.json().catch(() => ({ message: 'Error' }));
      return <>{data.message}</>;
    }

    // Error
    else {
      return <>No Result</>;
    }
  } catch (e: unknown) {
    console.error(e);
  }
};
