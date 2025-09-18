export async function loginUser(username, password) {
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            const data = await res.json();
            return { error: data.message };
        }
        return await res.json();
    } catch (err) {
        return { error: 'Network error' };
    }
}

export async function fetchSpots(lotId, zone='') {
    try {
        const url = zone ? `/api/parking_spots/${lotId}?zone=${zone}` : `/api/parking_spots/${lotId}`;
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function claimSpot(spotId) {
    try {
        const res = await fetch('/api/claim_spot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spot_id: spotId })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function releaseSpot(spotId) {
    try {
        const res = await fetch('/api/release_spot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spot_id: spotId })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}