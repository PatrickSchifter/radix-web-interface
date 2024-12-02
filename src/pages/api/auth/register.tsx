import type { NextApiRequest, NextApiResponse } from "next";
import { backendApi } from "../../../config/BackendApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, name, password } = req.body;

  try {
    await backendApi.client.post("/auth/register", {
      email,
      name,
      password,
    });

    res.status(201).end();
  } catch (err) {
    const error = backendApi.parseError(err);
    res.status(error.status).json(error);
  }
}
