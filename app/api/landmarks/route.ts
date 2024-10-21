import { NextResponse } from 'next/server';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function GET() {
  try {
    const db = await open({
      filename: './landmarks.db',
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS landmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        latitude REAL,
        longitude REAL,
        description TEXT
      )
    `);

    // Insert sample data if the table is empty
    const count = await db.get('SELECT COUNT(*) as count FROM landmarks');
    if (count.count === 0) {
      await db.exec(`
        INSERT INTO landmarks (name, latitude, longitude, description)
        VALUES 
          ('Parliament Hill', 45.4235, -75.7004, 'The political and cultural heart of Ottawa.'),
          ('National Gallery of Canada', 45.4295, -75.6989, 'Canada''s premier art gallery.'),
          ('ByWard Market', 45.4285, -75.6919, 'Historic farmers'' market and retail district.'),
          ('Rideau Canal', 45.4237, -75.6942, 'UNESCO World Heritage Site and popular skating rink in winter.')
      `);
    }

    const landmarks = await db.all('SELECT * FROM landmarks');
    await db.close();

    return NextResponse.json(landmarks);
  } catch (error) {
    console.error('Error fetching landmarks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}