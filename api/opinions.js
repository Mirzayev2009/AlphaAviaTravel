// Vercel Serverless Function — fetches tourist opinions from Supabase
// Handles: GET (public)

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { data, error } = await supabase
            .from("Alpha-opinion")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase fetch error:", error);
            return res.status(500).json({ success: false, message: "Error fetching opinions" });
        }

        return res.status(200).json(data || []);
    } catch (error) {
        console.error("Serverless function error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
