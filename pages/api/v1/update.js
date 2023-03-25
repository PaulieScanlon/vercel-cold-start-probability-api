import { getDB } from '../../../pg';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const client = await getDB().connect();

  const { id, start_time, end_time, diff, error } = JSON.parse(req.body);

  try {
    await client.query(
      'UPDATE results SET id = $1, start_time = $2, end_time = $3, diff = $4, error = $5 WHERE id = $1',
      [id, start_time, end_time, diff, error]
    );

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
