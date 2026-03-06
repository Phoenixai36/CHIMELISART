export async function GET({ locals }) {
    const { DB } = locals.runtime.env;

    try {
        const { results } = await DB.prepare('SELECT * FROM Artworks').all();
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
