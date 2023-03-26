export default async function handler(req, res) {
  res.status(200).json({
    message: 'Read v1 - A-OK!',
    region: process.env.AWS_REGION,
  });
}
