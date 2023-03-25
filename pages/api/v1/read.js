import { getDB } from '../../../pg';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const client = await getDB().connect();

  try {
    const response = await client.query('SELECT * from results');

    res.status(200).json({
      message: 'Read v1 - A-OK!',
      results: response.rows || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Read v1 - Error!' });
  } finally {
    client.release();
  }
}
