// creates random circuit problems
// written september 2016, by Daniel Kuncik 


//document.getElementById('whatever').innerHTML = 'hello its me';

// generates a random integer between min and max
function rand_int(min, max) {
    'use strict';
    return min + Math.floor((max - min + 1) * Math.random());
}

// calculates sum of an array
function sum(array) {
    "use strict";
    var summation, i;
    summation = 0;
    for (i = 0; i < array.length; i += 1) {
        summation += array[i];
    }
    return summation;
}


/// tests if a and b are close enough to be correct in a physics problem
function testing_function(a, b) {
    // tests if a and b are close enough to be correct in a physics problem
    "use strict";
    var t;
    if (a >= b) {
        t = a / b;
    } else {
        t = b / a;
    }
    if (t < 1.01) {
        return true;
    } else {
        return false;
    }
}


// circuit objects
// type is a string either "series" or "parallel"
// num_resistors is an integer showing how many resistors the circuit has
// voltage, current, resistance, and poewr are arrays giving the voltage, current, resistance, and power of each resistor
// integer is a boolean saying whether the circuit is made of all integer numbers or includes decimals, true == all or most of the numbers in the circuit are integers
function Circuit(integer) {
    "use strict";
    
    /// first step generates a random circuit
    var num_resistors, type, voltage, current, resistance, power, total_voltage, total_current, total_resistance, total_power, i, answer_array;
    
 
    num_resistors = rand_int(2, 4);
    if (Math.random() < 0.5) {
        type = 'series';
        this.is_series = true;
    } else {
        type = 'parallel';
        this.is_series = false;
    }

        
        
    total_voltage = rand_int(3, 20);
    
    voltage = [];
    current = [];
    resistance = [];
    power = [];
    
    for (i = 0; i < num_resistors; i += 1) {
        resistance.push(rand_int(3, 40));
    }

    if (type === 'series') {
        total_resistance = sum(resistance);
        total_current = total_voltage / total_resistance;

        for (i = 0; i < num_resistors; i += 1) {
            current.push(total_current);
        }
        for (i = 0; i < num_resistors; i += 1) {
            voltage.push(current[i] * resistance[i]);
        }
        for (i = 0; i < num_resistors; i += 1) {
            power.push(voltage[i] * current[i]);
        }
        total_power = total_voltage * total_current;
    } else if (type === 'parallel') {
        for (i = 0; i < num_resistors; i += 1) {
            voltage.push(total_voltage);
        }
        for (i = 0; i < num_resistors; i += 1) {
            current.push(voltage[i] / resistance[i]);
        }
        total_current = sum(current);
        total_resistance = total_voltage / total_current;
        
        for (i = 0; i < num_resistors; i += 1) {
            power[i] = voltage[i] * current[i];
        }
        total_power = total_voltage * total_current;
    }

    this.num_resistors = num_resistors;

    
    answer_array = [].concat(voltage, total_voltage, current, total_current, resistance, total_resistance, power, total_power);
    
    this.answer_array = answer_array;
    
    this.total_voltage = total_voltage;
    this.total_current = total_current;
    this.total_resistance = total_resistance;
    this.total_power = total_power;
    
    this.voltage_array = voltage;
    this.current_array = current;
    this.resistance_array = resistance;
    this.power_array = power;
    
}

///var prob0 = new Formula_Prob("Hello its me. I happen to have a speed of AA meters/second and a mass of BB kg. I have been wondering if after all these years what my momentum is.", 15, 2, 100, 10, divide);


