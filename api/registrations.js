// Vercel Serverless Function — replaces Render backend's Supabase endpoints
// Handles: GET (admin), POST (new booking), PATCH (update status)

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        // ─── GET: Fetch all registrations (admin) ───
        if (req.method === "GET") {
            const statusFilter = req.query.status;

            let query = supabase
                .from("Alpha_registration_data")
                .select("*")
                .order("created_at", { ascending: false });

            if (statusFilter === "done" || statusFilter === "undone") {
                query = query.eq("status", statusFilter);
            }

            const { data, error } = await query;

            if (error) {
                console.error("Supabase fetch error:", error);
                return res.status(500).json({ success: false, message: "Error fetching registrations" });
            }

            return res.status(200).json(data || []);
        }

        // ─── POST: Create new booking ───
        if (req.method === "POST") {
            let { name, email, phone, people, tourTitle, unitPrice, totalPrice } = req.body;

            if (!name || !email || !phone || !tourTitle || !totalPrice) {
                return res.status(400).json({
                    success: false,
                    message: "Name, Email, Phone, Tour Title, and Total Price are required.",
                });
            }

            people = Number(people) || 1;
            unitPrice = Number(unitPrice) || 0;
            totalPrice = Number(totalPrice);

            if (Number.isNaN(totalPrice) || totalPrice === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Total price must be a valid number greater than 0.",
                });
            }

            const insertData = {
                name,
                email,
                phone,
                tourTitle,
                people,
                unitPrice,
                totalPrice,
                status: "undone",
                message: `Booking request for ${tourTitle} (${people} person(s)). Total: $${totalPrice}.`,
            };

            const { data: result, error: insertError } = await supabase
                .from("Alpha_registration_data")
                .insert([insertData])
                .select()
                .single();

            if (insertError) {
                console.error("Supabase insert failed:", insertError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to save to database.",
                });
            }

            return res.status(201).json({
                success: true,
                message: "Tour booking saved successfully!",
                data: result,
            });
        }

        // ─── PATCH: Update registration status (admin) ───
        if (req.method === "PATCH") {
            const { id } = req.query;
            const { status } = req.body;

            if (status !== "done" && status !== "undone") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status. Must be 'done' or 'undone'.",
                });
            }

            const idNumber = Number(id);
            if (Number.isNaN(idNumber)) {
                return res.status(400).json({ success: false, message: "Invalid ID format" });
            }

            const { data: updated, error: updateErr } = await supabase
                .from("Alpha_registration_data")
                .update({ status, updated_at: new Date().toISOString() })
                .eq("id", idNumber)
                .select()
                .single();

            if (updateErr) {
                return res.status(500).json({ success: false, message: "Failed to update status" });
            }

            return res.status(200).json({
                success: true,
                message: `Status updated to ${status}`,
                data: updated,
            });
        }

        return res.status(405).json({ message: "Method not allowed" });

    } catch (error) {
        console.error("Serverless function error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
