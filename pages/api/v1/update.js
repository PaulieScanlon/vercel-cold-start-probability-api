import { getDB } from '../../../pg';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const client = await getDB().connect();

  const { start_time, end_time, diff, error, id } = JSON.parse(req.body);

  try {
    await client.query('UPDATE results SET start_time = $1, end_time = $2, diff = $3, error = $4 WHERE id = $5', [
      start_time,
      end_time,
      diff,
      error,
      id,
    ]);

    res.status(200).json({
      message: 'Update v1 - A-OK!',
      results: {
        id: id,
        start_time: start_time,
        end_time: end_time,
        diff: diff,
        error,
        error,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Update v1 - Error!' });
  } finally {
    client.release();
  }
}
