import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Accept any password - even empty
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "strict",
        path: "/",
      }),
    );

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}