export async function POST({ request, locals }) {
    const body = await request.json();
    const { items, customerEmail, customerName } = body;

    if (!items || items.length === 0) {
        return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400 });
    }

    const { DB } = locals.runtime.env;
    const orderId = crypto.randomUUID();
    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

    try {
        // 1. Create Order
        await DB.prepare('INSERT INTO Orders (id, customer_email, customer_name, total_amount) VALUES (?, ?, ?, ?)')
            .bind(orderId, customerEmail, customerName, totalAmount)
            .run();

        // 2. Add Items
        const itemStmt = DB.prepare('INSERT INTO OrderItems (order_id, artwork_id, price_at_purchase) VALUES (?, ?, ?)');
        const itemQueries = items.map(item => itemStmt.bind(orderId, item.artworkId, item.price));
        await DB.batch(itemQueries);

        return new Response(JSON.stringify({
            success: true,
            orderId,
            message: 'Order created locally. In production, this would redirect to Stripe.'
        }), { status: 201 });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
