import React from 'react';

const Page = () => {
  const handleCreate = async () => {
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

      const json = await response.json();
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
