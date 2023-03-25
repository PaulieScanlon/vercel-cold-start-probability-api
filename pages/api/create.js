import { getDB } from '../../pg';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const client = await getDB().connect();

  const date = new Date();
  const { runtime } = JSON.parse(req.body);

  try {
    const start_time = performance.now();

    const response = await client.query(
      'INSERT INTO results (date, runtime, start_time) VALUES($1, $2, $3) RETURNING id',
      [date, runtime, start_time]
    );

    const end_time = performance.now();
    const diff = ((end_time - start_time) / 1000).toFixed(2);
    const id = response.rows[0].id;

    await client.query('UPDATE results SET end_time = $1, diff = $2 WHERE id = $3', [end_time, diff, id]);

    res.status(200).json({
      message: 'A-OK!',
      results: {
        id: id,
        date: date,
        runtime: runtime,
        start_time: start_time,
        end_time: end_time,
        diff: diff,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error!' });
  } finally {
    client.release();
  }
}
