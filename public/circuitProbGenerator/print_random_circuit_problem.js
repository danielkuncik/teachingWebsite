var prob1 = new Circuit(true), i;



create_circuit_problem(prob1.total_voltage, prob1.resistance_array, prob1.is_series);




var R_box, text, R_box_text, i, R_button;



// top row of table
for (i = 0; i < prob1.num_resistors; i += 1) {
    
    R_box = document.createElement('th');
    text = 'Resistor ' + String(i + 1);
    R_box_text = document.createTextNode(text);
    R_box.appendChild(R_box_text);
    document.getElementById('top_row').appendChild(R_box);
}
R_box = document.createElement('th');
text = 'Total';
R_box_text = document.createTextNode(text);
R_box.appendChild(R_box_text);
document.getElementById('top_row').appendChild(R_box);

// IIDD is just a variable name for an id string, because i don't want to use id
var variable_names = ['V', 'I', 'R', 'P'], IIDD, j, correct_row;

// an array of all ids for answers;
var answer_ids = [];

for (j = 0; j < variable_names.length; j += 1) {
    for (i = 0; i < prob1.num_resistors + 1; i += 1) {
    
        R_box = document.createElement('td');
        R_button = document.createElement('input');
        IIDD = variable_names[j] + String(i + 1);
        R_button.setAttribute('id', IIDD);
        answer_ids.push(IIDD);

        R_box.appendChild(R_button);
        correct_row = variable_names[j] + "_row";
        document.getElementById(correct_row).appendChild(R_box);
    
    }
}

var next_prob_button = document.createElement('button');
next_prob_button.setAttribute('onclick', 'location.reload()');
var next_prob_text = document.createTextNode("New Problem");
next_prob_button.appendChild(next_prob_text);

function answering_function() {
    "use strict";
    var i, IIDD, correct, input_answer, m_button, num_correct = 0;

    for (i = 0; i < answer_ids.length; i += 1) {
        IIDD = answer_ids[i];
        correct = prob1.answer_array[i];
        m_button = document.getElementById(IIDD);
        input_answer = Number(m_button.value);
        if (testing_function(input_answer, correct)) {
            m_button.setAttribute('class', 'correct');
            num_correct += 1;
        } else {
            m_button.setAttribute('class', 'wrong');
        }

    }
    
    if (num_correct === answer_ids.length) {
        document.getElementById('new_prob_space').appendChild(next_prob_button);
    }
}

document.getElementById('whatever').innerHTML = prob1.answer_array;
document.getElementById('whatever2').innerHTML = answer_ids;

