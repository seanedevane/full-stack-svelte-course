/** @type {import(./$types).RequestHandler} */
import { json } from '@sveltejs/kit'

export async function PUT({ request }) {
    // update the lunchWeek
    const { lunchWeek } = await request.json();
    return json(lunchWeek);
}

/* @type {import('./types/').RequestHandler} */
// API delete endpoint
export async function DELETE(event) {
    const options: ResponseInit = {
        status: 200
    }
    console.log(event)
}



export async function POST(event) {
    const data = await event.request.formData()
    const weekOf = data.get('weekOf')
    const isPublished = data.get('isPublished')
    
}