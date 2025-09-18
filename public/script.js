import { loginUser, fetchSpots, claimSpot, releaseSpot } from './utils.js';

let currentUser = null;
let currentSpotId = null;
let lotId = 'demoLotId123'; // placeholder lot_id for demo

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');
const spotsContainer = document.getElementById('spotsContainer');
const currentSpotDiv = document.getElementById('currentSpot');
const filterButtons = document.querySelectorAll('#filters button');

// Login page logic
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const res = await loginUser(username, password);
        if (res.error) {
            errorMsg.textContent = res.error;
        } else {
            currentUser = res;
            window.location.href = '/dashboard';
        }
    });
}

// Dashboard page logic
if (spotsContainer) {
    async function loadSpots(zone='') {
        let spots = await fetchSpots(lotId, zone);

        // If EJS rendered spots exist initially, keep them until fetch updates
        if (spotsContainer.children.length > 0 && spots.length === 0) {
            spots = Array.from(spotsContainer.children).map(btn => ({
                spot_id: btn.dataset.spotId,
                status: btn.className,
                zone: btn.dataset.zone
            }));
        }

        spotsContainer.innerHTML = '';
        spots.forEach(spot => {
            const btn = document.createElement('button');
            btn.textContent = spot.spot_id;
            btn.className = spot.status;
            btn.dataset.spotId = spot.spot_id;
            btn.dataset.zone = spot.zone;

            btn.addEventListener('click', async () => {
                if (spot.status === 'available') {
                    await claimSpot(spot.spot_id);
                    currentSpotId = spot.spot_id;
                } else if (currentSpotId === spot.spot_id) {
                    await releaseSpot(spot.spot_id);
                    currentSpotId = null;
                }
                loadSpots(zone);
            });
            spotsContainer.appendChild(btn);
        });
        currentSpotDiv.textContent = currentSpotId ? `Your Spot: ${currentSpotId}` : 'No spot claimed';
    }

    filterButtons.forEach(btn => btn.addEventListener('click', () => loadSpots(btn.dataset.zone)));

    loadSpots();
    setInterval(() => loadSpots(), 5000); // refresh every 5 seconds
}