const db = require('../utils/db');

async function createLocation({ type_id, category_id, coordinates, photo_url, description, work_hours }) {
    const [result] = await db.query(
        `INSERT INTO locations (type_id, category_id, coordinates, photo_url, description, work_hours) 
         VALUES (?, ?, ST_PointFromText(?), ?, ?, ?)`,
        [
            type_id,
            category_id,
            `POINT(${coordinates.lng} ${coordinates.lat})`,
            photo_url,
            description,
            work_hours,
        ]
    );
    return { id: result.insertId, type_id, category_id, coordinates, photo_url, description, work_hours };
}

async function getAllLocations() {
    const [rows] = await db.query(
        `SELECT 
            l.id, 
            l.type_id, 
            l.category_id, 
            ST_AsText(l.coordinates) AS coordinates, 
            l.photo_url, 
            l.description, 
            l.work_hours,
            t.name AS type_name, 
            c.name AS category_name 
         FROM locations l
         LEFT JOIN types t ON l.type_id = t.id
         LEFT JOIN categories c ON l.category_id = c.id`
    );

    return rows.map((row) => ({
        ...row,
        coordinates: parsePoint(row.coordinates),
    }));
}

async function updateLocation(id, { type_id, category_id, coordinates, photo_url, description, work_hours }) {
    const query = `
        UPDATE locations 
        SET 
            type_id = ?, 
            category_id = ?, 
            coordinates = ST_PointFromText(?), 
            photo_url = ?, 
            description = ?, 
            work_hours = ?
        WHERE id = ?`;
    const [result] = await db.query(query, [
        type_id,
        category_id,
        `POINT(${coordinates.lng} ${coordinates.lat})`,
        photo_url,
        description,
        work_hours,
        id,
    ]);
    return result.affectedRows > 0;
}

async function deleteLocation(id) {
    const [result] = await db.query(`DELETE FROM locations WHERE id = ?`, [id]);
    return result.affectedRows > 0;
}

function parsePoint(point) {
    const match = point.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
    if (match) {
        return { lng: parseFloat(match[1]), lat: parseFloat(match[2]) };
    }
    return null;
}

module.exports = {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation,
};