import React from 'react';

const Page = () => {
  const handleCreate = async () => {
    const start = performance.now();
    try {
      const c = await fetch('./api/v1/create', {
        method: 'POST',
        body: JSON.stringify({
          runtime: 'vercel-serverless',
        }),
      });

      if (!c.ok) {
        throw new Error('Bad create');
      }

      const cJson = await c.json();
      console.log('cJson', JSON.stringify(cJson, null, 2));

      const end = performance.now();
      const diff = ((end - start) / 1000).toFixed(2);

      const u = await fetch('./api/v1/update', {
        method: 'POST',
        body: JSON.stringify({
          start_time: start,
          end_time: end,
          diff: diff,
          id: cJson.results.id,
          error: false,
        }),
      });

      if (!u.ok) {
        throw new Error('Bad update');
      }

      const uJson = await u.json();

      console.log('uJson', JSON.stringify(uJson, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <button onClick={handleCreate}>create</button>
    </main>
  );
};

export default Page;
