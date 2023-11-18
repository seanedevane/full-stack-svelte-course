import { error, fail } from '@sveltejs/kit';
import { PUBLIC_API_ROOT } from '$env/static/public';
import { request } from '@playwright/test';
/** @type {import('./types').PageServerLoad} */

export async function load({ fetch, params }) {
    // get lunchweekId param first
    const lunchWeekId = params.lunchWeekId
    const res = await fetch(`${PUBLIC_API_ROOT}/lunch-week/${lunchWeekId}`)
    console.log(res);

    if (res.ok) return {
        params: await res.json(),
        loading: false
    };
    throw error(500);
}