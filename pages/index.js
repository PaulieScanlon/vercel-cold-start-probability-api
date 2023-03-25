import React, { Fragment, useEffect, useState } from 'react';

const Page = () => {
  const [results, setResults] = useState([]);

  const handleRead = async () => {
    try {
      const r = await fetch('./api/v1/read', {
        method: 'GET',
      });

      const rJson = await r.json();

      setResults(rJson.results.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error(error);
    }
  };

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
          id: cJson.results.id,
          start_time: start,
          end_time: end,
          diff: diff,
          error: false,
        }),
      });

      if (!u.ok) {
        throw new Error('Bad update');
      }

      const uJson = await u.json();
      console.log('uJson', JSON.stringify(uJson, null, 2));

      handleRead();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);

  return (
    <main>
      <div>
        <button onClick={handleCreate}>create</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>date</th>
              <th>runtime</th>
              <th>start_time</th>
              <th>end_time</th>
              <th>diff</th>
              <th>error</th>
            </tr>
          </thead>
          <tbody>
            {results ? (
              <Fragment>
                {results.map((result, index) => {
                  const { id, date, runtime, start_time, end_time, diff, error } = result;
                  return (
                    <tr key={index}>
                      <td>{id}</td>
                      <td>
                        {' '}
                        {new Date(date).toLocaleString('default', {
                          month: 'short',
                          day: 'numeric',
                          year: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                      <td>{runtime}</td>
                      <td>{start_time}</td>
                      <td>{end_time}</td>
                      <td style={{ fontWeight: 'bold', color: 'red' }}>{`${diff}s`}</td>
                      <td>{error ? 'true' : 'false'}</td>
                    </tr>
                  );
                })}
              </Fragment>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Page;
