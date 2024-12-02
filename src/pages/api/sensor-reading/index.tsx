import type { NextApiRequest, NextApiResponse } from "next";
import { backendApi } from "../../../config/BackendApi";

// Função que lida com as requisições de Equipment
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = req.headers.authorization as string;
  backendApi.setBearerToken(access_token);

  if (req.method === "GET") {
    const { limit = 10, page = 1, timestamp } = req.query;

    try {
      const response = await backendApi.client.get("/sensor-reading", {
        params: {
          limit,
          page,
          timestamp,
        },
      });

      res.status(200).json(response.data);
    } catch (err) {
      const error = backendApi.parseError(err);
      res.status(error.status).json(error);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
