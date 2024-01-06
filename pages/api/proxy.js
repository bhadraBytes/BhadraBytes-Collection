// pages/api/proxy.js
import fetch from 'node-fetch';

export default async (req, res) => {
  const url = 'https://57eqepqo.apicdn.sanity.io' + req.url;
  const response = await fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  res.status(response.status).json(data);
};
