$(function () {
    var character;
    var position = {
        x: 0,
        y: 0
    };
    var movementEvent = {
        left: false,
        right: false,
        up: false,
        down: false
    }
    var movementSpritePosition = {
        position: 0,
        left: [
            { x: 0, y: 191, },
            { x: 63, y: 191, },
            { x: 63 * 2, y: 191, },
            { x: 63 * 3, y: 191, },
        ],
        up: [
            { x: 0, y: 63, },
            { x: 63, y: 63, },
            { x: 63 * 2, y: 63, },
            { x: 63 * 3, y: 63, },
        ],
        right: [
            { x: 0, y: 127, },
            { x: 63, y: 127, },
            { x: 63 * 2, y: 127, },
            { x: 63 * 3, y: 127, },
        ],
        down: [
            { x: 0, y: -1, },
            { x: 63, y: -1, },
            { x: 63 * 2, y: -1, },
            { x: 63 * 3, y: -1, },
        ]
    }
    var speed = 5;
    init();

    function init() {
        character = $('.character');

        console.log(character);
        movement();
    }

    function movement() {
        $(document).keydown(function (e) {
            switch (e.which) {
                case 37://left
                    movementEvent.left = true;
                    movementEvent.right = false;
                    break;
                case 38://up
                    movementEvent.up = true;
                    movementEvent.down = false;
                    break;
                case 39://right
                    movementEvent.left = false;
                    movementEvent.right = true;
                    break;
                case 40://down
                    movementEvent.up = false;
                    movementEvent.down = true;
                    break;
            }
        })
        $(document).keyup(function (e) {
            switch (e.which) {
                case 37://left
                    movementEvent.left = false;
                    break;
                case 38://up
                    movementEvent.up = false;
                    break;
                case 39://right
                    movementEvent.right = false;
                    break;
                case 40://down
                    movementEvent.down = false;
                    break;
            }
        })
    }

    setInterval(function () {
        if (movementEvent.left)
            position.x = position.x - speed;
        if (movementEvent.up)
            position.y = position.y - speed;
        if (movementEvent.right)
            position.x = position.x + speed;
        if (movementEvent.down)
            position.y = position.y + speed;

        character.css({
            "left": position.x + "px",
            "top": position.y + "px",
            "position": "absolute"
        })
    }, 10);

    setInterval(function () {
        var movementPosition = {
            x: 0,
            y: -1
        };

        if (movementEvent.left) {
            movementPosition.x = movementSpritePosition.left[movementSpritePosition.position].x;
            movementPosition.y = movementSpritePosition.left[movementSpritePosition.position].y;
        } else if (movementEvent.up) {
            movementPosition.x = movementSpritePosition.up[movementSpritePosition.position].x;
            movementPosition.y = movementSpritePosition.up[movementSpritePosition.position].y;

        } else if (movementEvent.right) {
            movementPosition.x = movementSpritePosition.right[movementSpritePosition.position].x;
            movementPosition.y = movementSpritePosition.right[movementSpritePosition.position].y;
        } else if (movementEvent.down) {
            movementPosition.x = movementSpritePosition.down[movementSpritePosition.position].x;
            movementPosition.y = movementSpritePosition.down[movementSpritePosition.position].y;
        } else if (movementSpritePosition.position % 2 == 0) {
            movementPosition.x = 0;
            movementPosition.y = 63;
        }

        if (movementSpritePosition.position == 3)
            movementSpritePosition.position = 0;
        else
            movementSpritePosition.position++;
        character.css({
            "background-position-x": movementPosition.x + "px",
            "background-position-y": movementPosition.y + "px"
        });
    }, 100);


})