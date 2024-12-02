import type { NextApiRequest, NextApiResponse } from "next";
import { backendApi } from "../../../config/BackendApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const { data } = await backendApi.client.post("/auth/login", {
      email,
      password,
    });

    res.status(200).json(data);
  } catch (err) {
    const error = backendApi.parseError(err);
    res.status(error.status).json(error);
  }
}
