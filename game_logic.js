let canvas = document.getElementById("canvas_bounce");
let context = canvas.getContext("2d");
const gravity = 1.7;
let keyState = [];
const score = {
    font: "15px sans-serif",
    points: 0,
    draw: function() {
        context.font = this.font;
        context.fillText("Score: " + this.points, canvas.width / 10, 20);
        if (rect.jumping) this.points += 2;
    }
};
const rect = {
    x: 10,
    y: 10,
    vx: 1.7,
    vy: 0,
    width: 30,
    height: 30,
    jumping: false, // add jumping flag
    jumpPower: 25, // add jump power
    draw: function() {
        // add jumping effect
        if (this.jumping) {
            context.fillStyle = "#CCC";
            context.shadowBlur = 20;
            context.shadowColor = "#CCC";
        } else {
            context.fillStyle = "#1AF";
            context.shadowBlur = 0;
        }

        context.fillRect(this.x, this.y, this.width, this.height);
        this.vy += gravity;
        this.y += this.vy;

        if (this.y + this.height >= canvas.height) { // check if rectangle hits bottom
            this.y = canvas.height - this.height; // set rectangle to bottom edge
            this.vy *= -0.7; // reverse and reduce vertical velocity to bounce
            this.jumping = false; // reset jumping flag
        }

        if (keyState[37]) this.x -= this.vx;
        if (keyState[39]) this.x += this.vx;

        // add boundary detection
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    },
    jump: function() {
        if (!this.jumping) {
            this.jumping = true;
            this.vy = -this.jumpPower;
        }
    }
};

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas before drawing
    rect.draw();
    score.draw();
    requestAnimationFrame(animate); // call animate again on next frame
}

window.addEventListener("keydown", function(e) {
    keyState[e.keyCode] = true;
    if (e.keyCode === 32) { // add jump key detection
        rect.jump();
    }
});
window.addEventListener("keyup", function(e) {
    keyState[e.keyCode] = false;
});

animate(); // start the animation loop