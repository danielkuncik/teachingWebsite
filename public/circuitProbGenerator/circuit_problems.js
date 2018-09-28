//document.getElementById("whatever").innerHTML = "hello its me ive been wondering if after all these years youd like to meet";

var c = document.getElementById("circuitCanvas");
var ctx = c.getContext("2d");

function filled_circle(x_pos, y_pos, radius) {
    "use strict";
    ctx.lineWidth = 0;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#000000";

    ctx.moveTo(x_pos, y_pos);
    ctx.beginPath();
    ctx.arc(x_pos, y_pos, radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    
    ctx.lineWidth = 2;

}


// multiply each step of a vector by a factor
function multiply_vector(vector, factor) {
    "use strict";
    var i, result_vector = [];
    for (i = 0; i < vector.length; i += 1) {
        result_vector.push(vector[i] * factor);
    }
    return result_vector;
}

// draws a resistor of LENGTH and HEIGHT at position XPOS and YPOS
// orientation is left, right, up, or down.
function draw_resistor(xpos, ypos, length, height, orientation) {
    "use strict";
    var amplitude, zag_length, horizontal_motion, vertical_motion, x_movements, y_movements, i;


    ctx.lineWidth = 2;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#000000";

    amplitude = height / 2;
    zag_length = length / 10;

// horizontal_motion and vertical_motion vectors represent the vertical and horizontal steps
// in drawing a resistor if the orientation is RIGHT
    horizontal_motion = [2 * zag_length, 0.5 * zag_length, zag_length, zag_length, zag_length, zag_length, zag_length, 0.5 * zag_length, 2 * zag_length];

    vertical_motion = [0, -1 * amplitude, +2 * amplitude, -2 * amplitude, +2 * amplitude, -2 * amplitude, +2 * amplitude, -1 * amplitude, 0];

// reorient the vector to the correct orientation
    if (orientation === 'right') {
        x_movements = horizontal_motion;
        y_movements = vertical_motion;
    } else if (orientation === 'left') {
        x_movements = multiply_vector(horizontal_motion, -1);
        y_movements = multiply_vector(vertical_motion, 1);
    } else if (orientation === 'up') {
        x_movements = vertical_motion;
        y_movements = multiply_vector(horizontal_motion, -1);
    } else if (orientation === 'down') {
        x_movements = multiply_vector(vertical_motion, -1);
        y_movements = multiply_vector(horizontal_motion, 1);
    }

    /// drawing the resistor
    ctx.moveTo(xpos, ypos);
    for (i = 0; i < x_movements.length; i += 1) {
        xpos += x_movements[i];
        ypos += y_movements[i];
        ctx.lineTo(xpos, ypos);
        ctx.stroke();
    }
}

ctx.lineWidth = 2;
ctx.lineCap = "butt";
ctx.strokeStyle = "#000000";


// Draws a battery at position xpos and ypos
// orientation is left, right, up, or down
// length and height (height should really be called width)
// number of batters
function draw_battery(xpos, ypos, orientation, length, height, num_bats) {
    "use strict";

    ctx.lineWidth = 2;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#000000";

    var num_spaces, space_length, i, horizontal_motion = [], vertical_motion = [], stroke_directions = [], minus_sign_length, x_movements, y_movements;

    num_spaces = 2 * num_bats - 1;
// number of spaces between batteries
    space_length = length / (4 + num_spaces);
// length of space between batteries
// the leading length is twice the space_length


/// horizontal_motion and vertical_motion show the x and y directiosn
/// if the orientation is RIGHT
// step_direction is a boolean vector, if TRUE that step is a stroke,
// if FALSE that step is a movement

// position for minus sign
    horizontal_motion.push(1.65 * space_length);
    vertical_motion.push(-0.25 * height);
    stroke_directions.push(false);

    minus_sign_length = 0.75 * space_length;
/// draw minus sign
    horizontal_motion.push(-1.0 * minus_sign_length);
    vertical_motion.push(0);
    stroke_directions.push(true);

// return to original spot
    horizontal_motion.push(-1.65 * space_length + minus_sign_length);
    vertical_motion.push(+0.25 * height);
    stroke_directions.push(false);



// draw leading wire
    horizontal_motion.push(2 * space_length);
    vertical_motion.push(0);
    stroke_directions.push(true);

// position for the first battery draw
    horizontal_motion.push(0);
    vertical_motion.push(0.25 * height);
    stroke_directions.push(false);


    for (i = 0; i < num_bats; i += 1) {
    
    // draw short battery line
        horizontal_motion.push(0);
        vertical_motion.push(-0.5 * height);
        stroke_directions.push(true);

    // position for long battery line
        horizontal_motion.push(space_length);
        vertical_motion.push(0.75 * height);
        stroke_directions.push(false);


    // draw long battery line
        horizontal_motion.push(0);
        vertical_motion.push(-1.0 * height);
        stroke_directions.push(true);


        if (i !== num_bats - 1) {
        // if there are more batteries, position for next battery
            horizontal_motion.push(space_length);
            vertical_motion.push(0.75 * height);
            stroke_directions.push(false);
        } else {
        // if there are no more batteries, position to center to finish
            horizontal_motion.push(0);
            vertical_motion.push(0.5 * height);
            stroke_directions.push(false);
        }
    }


// draw the trailing wire
    horizontal_motion.push(2 * space_length);
    vertical_motion.push(0);
    stroke_directions.push(true);



// final step: draw the + sign
// positioning
    horizontal_motion.push(-1.65 * space_length);
    vertical_motion.push(-0.5 * height);
    stroke_directions.push(false);

// horizontal swipe
    horizontal_motion.push(minus_sign_length);
    vertical_motion.push(0);
    stroke_directions.push(true);

// repositioning
    horizontal_motion.push(-0.5 * minus_sign_length);
    vertical_motion.push(+0.5 * minus_sign_length);
    stroke_directions.push(false);

//vertical swipe
    horizontal_motion.push(0);
    vertical_motion.push(-1.0 * minus_sign_length);
    stroke_directions.push(true);

// reposition correct end spot
    horizontal_motion.push(-0.5 * minus_sign_length + 1.65 * space_length);
    vertical_motion.push(+0.5 * minus_sign_length + 0.5 * height);
    stroke_directions.push(false);
    
// reorient the moition vectors to the correct orientation
    if (orientation === 'right') {
        x_movements = horizontal_motion;
        y_movements = vertical_motion;
    } else if (orientation === 'left') {
        x_movements = multiply_vector(horizontal_motion, -1);
        y_movements = multiply_vector(vertical_motion, 1);
    } else if (orientation === 'up') {
        x_movements = vertical_motion;
        y_movements = multiply_vector(horizontal_motion, -1);
    } else if (orientation === 'down') {
        x_movements = multiply_vector(vertical_motion, -1);
        y_movements = multiply_vector(horizontal_motion, 1);
    }

// drawing the actual battery
    ctx.moveTo(xpos, ypos);
    for (i = 0; i < x_movements.length; i += 1) {
        xpos += x_movements[i];
        ypos += y_movements[i];
        if (stroke_directions[i]) {
            ctx.lineTo(xpos, ypos);
            ctx.stroke();
        } else {
            ctx.moveTo(xpos, ypos);
        }
    }
}
//draw_battery(350, 350, 'left', 100, 80, 2);

//draw_resistor(250, 250, 100, 20, 'right');


// drawing a switch
var length = 100, xpos = 250, ypos = 250, orientation = 'right', opening = 'up';

// openning shows if the switch opens up, down, right, or left
// openning must be perpendicalar to orienatation, or funciton will not work
function draw_open_switch(xpos, ypos, length, orientation, openning) {
    "use strict";
    
    var hor_length, vert_length;
    hor_length = length / 2 * 1.73205; /// 30-60-90 triangle
    vert_length = length / 2;
// hor_length is the length on the axis parallel to the wire
// vert length is the length on the axis perpendicular to the wire

    filled_circle(xpos, ypos, 5);
    ctx.moveTo(xpos, ypos);

    if (orientation === 'right') {
        if (openning === "up") {
            ctx.lineTo(xpos + hor_length, ypos - vert_length);
            ctx.stroke();
        } else if (openning === 'down') {
            ctx.lineTo(xpos + hor_length, ypos + vert_length);
            ctx.stroke();
        }
        filled_circle(xpos + length, ypos, 5);
        ctx.moveTo(xpos + length, ypos);
    // drawing finishing circle automatically moves to correct spot
    
    } else if (orientation === 'left') {
        if (openning === "up") {
            ctx.lineTo(xpos - hor_length, ypos - vert_length);
            ctx.stroke();
        } else if (openning === 'down') {
            ctx.lineTo(xpos - hor_length, ypos + vert_length);
            ctx.stroke();
        }
        filled_circle(xpos - length, ypos, 5);
        ctx.moveTo(xpos - length, ypos);
    
    } else if (orientation === 'up') {
        if (openning === "right") {
            ctx.lineTo(xpos + hor_length, ypos - hor_length);
            ctx.stroke();
        } else if (openning === 'left') {
            ctx.lineTo(xpos - hor_length, ypos - hor_length);
            ctx.stroke();
        }
        filled_circle(xpos, ypos - length, 5);
        ctx.moveTo(xpos, ypos - length);
    
    } else if (orientation === 'down') {
        if (openning === "right") {
            ctx.lineTo(xpos + hor_length, ypos + hor_length);
            ctx.stroke();
        } else if (openning === 'left') {
            ctx.lineTo(xpos - hor_length, ypos + hor_length);
            ctx.stroke();
        }
        filled_circle(xpos, ypos + length, 5);
        ctx.moveTo(xpos, ypos + length);
    }
}
// draw closed switch 
function draw_closed_switch(xpos, ypos, length, orientation) {
    "use strict";

    filled_circle(xpos, ypos, 5);
    ctx.moveTo(xpos, ypos);
    if (orientation === 'right') {
        ctx.lineTo(xpos + length, ypos);
        ctx.stroke();
        filled_circle(xpos + length, ypos, 5);
        ctx.moveTo(xpos + length, ypos);
    } else if (orientation === 'left') {
        ctx.lineTo(xpos - length, ypos);
        ctx.stroke();
        filled_circle(xpos - length, ypos, 5);
        ctx.moveTo(xpos - length, ypos);
    } else if (orientation === 'up') {
        ctx.lineTo(xpos, ypos - length);
        ctx.stroke();
        filled_circle(xpos, ypos - length, 5);
        ctx.moveTo(xpos, ypos - length);
    } else if (orientation === 'down') {
        ctx.lineTo(xpos, ypos + length);
        ctx.stroke();
        filled_circle(xpos, ypos + length, 5);
        ctx.moveTo(xpos, ypos + length);
    }
}

//draw_open_switch(100,100,50,'right');
//draw_closed_switch(200,200,50,'right');
//draw_closed_switch(200,300,50,'up');
//draw_open_switch(400,400,50,'left');

// switch will go up 30 degrees if open
// it seems, in all cases, that the first circle is larger than the second
// not sure why???

// draws a light bulb as a circle with an X in it
// no leading or tailing wire
function draw_x_lightbulb(xpos, ypos, length, orientation) {
    "use strict";
    
    var horizontal_motion = [], vertical_motion = [], stroke_directions = [], radius = length / 2, L = radius / 1.41421, centerx, centery, endx, endy;
/// these vectors will explain how the motion should happen if 
/// sqrt 2 = 1.41421

    ctx.moveTo(xpos, ypos);

/// set out the end point (endx, endy) in relation to the start point (xpos, ypos)
    if (orientation === 'right') {
        endx = xpos + length;
        endy = ypos;
    } else if (orientation === 'left') {
        endx = xpos - length;
        endy = ypos;
    } else if (orientation === 'up') {
        endx = xpos;
        endy = ypos - length;
    } else if (orientation === 'down') {
        endx = xpos;
        endy = ypos + length;
    }

// identify center point as average of start and end
    centerx = (xpos + endx) / 2;
    centery = (ypos + endy) / 2;

// draw circle
    ctx.beginPath();
    ctx.arc(centerx, centery, radius, 0, Math.PI * 2);
    ctx.stroke();

    // first line of X
    ctx.moveTo(centerx - L, centery - L);
    ctx.lineTo(centerx + L, centery + L);
    ctx.stroke();
    
    // second line of X
    ctx.moveTo(centerx + L, centery - L);
    ctx.lineTo(centerx - L, centery + L);
    ctx.stroke();

// end position in the correct spot
    ctx.moveTo(endx, endy);
}

function draw_wire(xpos, ypos, length, orientation) {
    "use strict";
    ctx.moveTo(xpos, ypos);
    if (orientation === "up") {
        ctx.lineTo(xpos, ypos - length);
    } else if (orientation === "down") {
        ctx.lineTo(xpos, ypos + length);
    } else if (orientation === 'right') {
        ctx.lineTo(xpos + length, ypos);
    } else if (orientation === "left") {
        ctx.lineTo(xpos - length, ypos);
    }
    ctx.stroke();
}

// text_orientation must be left or right, above or below
function draw_resistor_with_text(xpos, ypos, length, height, orientation, magnitude, text_orientation) {
    "use strict";
    draw_resistor(xpos, ypos, length, height, orientation);
    // text_xpos and text_ypos are x and y position of the text
    var text_xpos, text_ypos, text, mid_x, mid_y, label;
    label = String(magnitude) + " Ohms";
    
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.save();
    
    if (orientation === 'left' || orientation === 'right') {
        if (orientation === 'right') {
            mid_x = xpos + length / 2;
            mid_y = ypos;
        } else if (orientation === 'left') {
            mid_x = xpos - length / 2;
            mid_y = ypos;
        
        }
        if (text_orientation === "above") {
            text_xpos = mid_x;
            text_ypos = mid_y - height - 5;
        } else if (text_orientation === "below") {
            text_xpos = mid_x;
            text_ypos = mid_y + height + 5;
        } else {
            // don't let this happen!
            text_xpos = mid_x;
            text_ypos = mid_y;
        }
    } else if (orientation === 'up' || orientation === 'down') {
        if (orientation === 'down') {
            mid_x = xpos;
            mid_y = ypos + length / 2;
        } else if (orientation === 'up') {
            mid_x = xpos;
            mid_y = ypos - length / 2;
        }
        ctx.translate(mid_x, mid_y);
        ctx.rotate(3.14159 / 2);
        if (text_orientation === "right") {
            text_xpos = 0;
            text_ypos = -1 * height - 5;
        } else if (text_orientation === "left") {
            text_xpos = 0;
            text_ypos = height + 5;
        } else {
            // don't go here
            text_xpos = 0;
            text_ypos = 0;
        }

    }
            
    ctx.fillText(label, text_xpos, text_ypos);
    ctx.restore();
    
}


///function draw_battery(xpos, ypos, orientation, length, height, num_bats) {
    
function draw_battery_with_text(xpos, ypos, length, height, orientation, num_bats, magnitude, text_orientation) {
    "use strict";
    draw_battery(xpos, ypos, orientation, length, height, num_bats);
    
    var text_xpos, text_ypos, text, mid_x, mid_y, label;
    label = String(magnitude) + " Volts";
    
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.save();
    
    if (orientation === 'left' || orientation === 'right') {
        if (orientation === 'right') {
            mid_x = xpos + length / 2;
            mid_y = ypos;
        } else if (orientation === 'left') {
            mid_x = xpos - length / 2;
            mid_y = ypos;
        
        }
        if (text_orientation === "above") {
            text_xpos = mid_x;
            text_ypos = mid_y - height + 5;
        } else if (text_orientation === "below") {
            text_xpos = mid_x;
            text_ypos = mid_y + height - 5;
        } else {
            // don't let this happen!
            text_xpos = mid_x;
            text_ypos = mid_y;
        }
    } else if (orientation === 'up' || orientation === 'down') {
        if (orientation === 'down') {
            mid_x = xpos;
            mid_y = ypos + length / 2;
        } else if (orientation === 'up') {
            mid_x = xpos;
            mid_y = ypos - length / 2;
        }
        ctx.translate(mid_x, mid_y);
        ctx.rotate(3.14159 / 2);
        if (text_orientation === "right") {
            text_xpos = 0;
            text_ypos = -1 * height + 5;
        } else if (text_orientation === "left") {
            text_xpos = 0;
            text_ypos = height - 5;
        } else {
            // don't go here
            text_xpos = 0;
            text_ypos = 0;
        }

    }
    

    ctx.fillText(label, text_xpos, text_ypos);
    ctx.restore();
        
}

// creates a simple series or parallel circuit problem
// if series = TRUE, then its a series problem
// else, it s aparallel problme
// resistors is an array of resistors
//voltage is a number which tells the voltage of the batter
function create_circuit_problem(voltage, resistors, series) {
    "use strict";
    var num_resistors = resistors.length, i, row_resistors, vert_resistor, j;
    xpos = 100;
    ypos = 300;

    draw_battery_with_text(xpos, ypos, 100, 50, "up", 2, voltage, 'left');
    ypos -= 100;
    j = 0;

    if (series) {
        draw_wire(xpos, ypos, 50, "right");
        xpos += 50;
        row_resistors = Math.floor(num_resistors / 2);
        
        // draw resistors on top, even resistors
        for (i = 0; i < row_resistors; i += 1) {
            draw_wire(xpos, ypos, 25, 'right');
            xpos += 25;
            draw_resistor_with_text(xpos, ypos, 100, 25, 'right', resistors[j], 'above');
            xpos += 100;
            draw_wire(xpos, ypos, 25, 'right');
            xpos += 25;
            j += 1;
        }
        draw_wire(xpos, ypos, 25, 'right');
        xpos += 25;
        
        // if necessary, draw resistor on the far end of the circuit
        if (num_resistors % 2 === 1) {
            draw_resistor_with_text(xpos, ypos, 100, 25, 'down', resistors[j], 'right');
            j += 1;
        } else {
            draw_wire(xpos, ypos, 100, 'down');
        }
        ypos += 100;
        
        draw_wire(xpos, ypos, 25, 'left');
        xpos -= 25;
        // draw resistors on bottom
        for (i = 0; i < row_resistors; i += 1) {
            draw_wire(xpos, ypos, 25, 'left');
            xpos -= 25;
            draw_resistor_with_text(xpos, ypos, 100, 25, 'left', resistors[j], 'below');
            /*
                                    if (num_resistors === 2) {
                draw_resistor_with_text(xpos, ypos, 100, 25, 'left', resistors[Math.floor(num_resistors / 2)  + i], 'below');
            } else {
                draw_resistor_with_text(xpos, ypos, 100, 25, 'left', resistors[Math.floor(num_resistors / 2) + i], 'below');
            }
            */
      
            xpos -= 100;
            draw_wire(xpos, ypos, 25, 'left');
            xpos -= 25;
            j += 1;
        }

        
        draw_wire(xpos, ypos, 50, 'left');
        
    } else {
        for (i = 0; i < num_resistors; i += 1) {
            // draw another branch of a parallel circuit
            draw_wire(xpos, ypos, 100, "right");
            xpos += 100;
            draw_resistor_with_text(xpos, ypos, 100, 25, "down", resistors[i], 'right');
            ypos += 100;
            draw_wire(xpos, ypos, 100, "left");
            
            // move to correct spot to draw next branch
            ypos -= 100;
        }
    }
}

document.getElementById('whatever3').innerHTML = 'im in california dreaming';

/// there's no way to write the resistance or the votlage in my functions!!!
// that's the big thing that has to be fixed!

///create_circuit_problem(3, [1, 1, 1], false);

