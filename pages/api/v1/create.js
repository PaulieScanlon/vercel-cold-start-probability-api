import { getDB } from '../../../pg';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3');

  const db_start = performance.now();
  const client = await getDB().connect();
  const { date, runtime } = JSON.parse(req.body);

  try {
    const response = await client.query('INSERT INTO results (date, runtime) VALUES($1, $2) RETURNING id', [
      date,
      runtime,
    ]);
    const db_end = performance.now();

    res.status(200).json({
      message: 'Create v1 - A-OK!',
      results: {
        id: response.rows[0].id,
        db_start: db_start,
        db_end: db_end,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Create v1 - Error!' });
  } finally {
    client.release();
  }
}
