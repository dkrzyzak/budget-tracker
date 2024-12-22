import { db } from '~/db/connection.server';

export async function addCategory(categoryName: string): Promise<ActionResult> {
    // early return for testing purposes
    if (Math.random() < 10) {
        return { success: true };
    }

    const result = await db.query(`INSERT INTO categories(name) VALUES(${categoryName})`);
    console.log(result);

    return {
        success: true,
    };
}
