---
/**
 * DB initialization
 */
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Artworks;
CREATE TABLE Artworks (
    id TEXT PRIMARY KEY,
    title_es TEXT NOT NULL,
    title_en TEXT NOT NULL,
    price REAL NOT NULL,
    status TEXT DEFAULT 'available',
    category TEXT,
    metadata TEXT -- JSON blob for extra info
);
CREATE TABLE Orders (
    id TEXT PRIMARY KEY,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    -- pending, paid, shipped
    stripe_session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE OrderItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT REFERENCES Orders(id),
    artwork_id TEXT NOT NULL,
    price_at_purchase REAL NOT NULL
);
-- Initial Data Seed
INSERT INTO Artworks (id, title_es, title_en, price, status)
VALUES (
        'asimetria',
        'Asimetría',
        'Asymmetry',
        1500,
        'available'
    ),
    (
        'geometria-sagrada',
        'Geometría Sagrada',
        'Sacred Geometry',
        1200,
        'available'
    );