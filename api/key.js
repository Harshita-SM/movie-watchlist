export default function handler(req, res) {
    const key = process.env.TMDB_API_KEY;

    if (!key) {
        return res.status(500).json({ error: "TMDB_API_KEY is not set in environment variables." });
    }

    res.status(200).json({ key });
}
