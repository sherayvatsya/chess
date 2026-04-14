function fire() {
    const bullet = document.querySelector(".bullet");
    const explosion = document.querySelector(".explosion");

    bullet.style.display = "block";
    bullet.style.left = "250px";

    let position = 250;

    const interval = setInterval(() => {
        position += 10;
        bullet.style.left = position + "px";

        if (position > 430) {
            clearInterval(interval);
            bullet.style.display = "none";

            explosion.style.display = "block";

            setTimeout(() => {
                explosion.style.display = "none";
            }, 300);
        }

    }, 30);
}

function runTank() {

    const tank = document.querySelector(".tank");

    let position = 0;

    tankInterval = setInterval(() => {

        position += 5;

        tank.style.left = position + "px";

    }, 20);
}

function stopTank() {
    clearInterval(tankInterval);
}


function moveTurret() {

    const turret = document.querySelector(".turret");

    let angle = -30;     // starting angle
    let direction = 1;   // 1 = right, -1 = left

    const interval = setInterval(() => {

        angle += direction * 2;

        turret.style.transform = "rotate(" + angle + "deg)";

        if (angle >= 30) {
            direction = -1;  // reverse
        }

        if (angle <= -30) {
            direction = 1;   // reverse again
        }

    }, 30);
}

