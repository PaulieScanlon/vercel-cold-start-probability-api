import React from 'react';

const Page = () => {
  const handleCreate = async () => {
    const start = performance.now();
    console.log('start: ', start);
    try {
      const response = await fetch('./api/create', {
        method: 'POST',
        body: JSON.stringify({
          runtime: 'vercel-serverless',
        }),
      });

      if (!response.ok) {
        throw new Error('Bad response');
      }

      const end = performance.now();
      console.log('end: ', end);
      const json = await response.json();
      console.log('diff: ', ((end - start) / 1000).toFixed(2));
      console.log(JSON.stringify(json, null, 2));
    } catch (error) {
      console.error();
    }
  };

  return (
    <main>
      <button onClick={handleCreate}>create</button>
    </main>
  );
};

export default Page;
