import { error, fail } from '@sveltejs/kit';
import { PUBLIC_API_ROOT } from '$env/static/public';

export async function load({ fetch }) {
    const res = await fetch(`${PUBLIC_API_ROOT}/lunch-week/all`)
    console.log(res);

    if (res.ok) return {
        params: await res.json(),
        loading: false
    };
    return {
        // giving empty props intentionally if nothing shows
        params: undefined
    }
    // throw error(500);
    }

export const actions = {
    add: async ({ request }) => {
        const lunchWeek = await request.formData();
        // const weekOf = data.get('createWeekOfDate')
        console.log(lunchWeek);
        // console.log(weekOf);
        try {
            const response = await fetch(`${PUBLIC_API_ROOT}/lunch-week/add`,
            {
                method: 'POST',
                body: JSON.stringify('5'),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
        } catch (error) {
            return fail(422, {
                description: data.get('createWeekOfDate'),
                error: error.message
            });
        }
    }
}