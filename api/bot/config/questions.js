const Question = require('../Question');

const questions = [
    new Question(
        'name',
        'Let\'s get started. What is your name?',
        input => {
            const name = input && input.trim();
            return name != undefined
                ? { success: true, message: `I have your name as ${name}`, value: name }
                : { success: false, message: 'Please enter a name that contains at least one character.' };
        }
    ),

    new Question(
        'name',
        'Let\'s get started. What is your name 2?',
        input => {
            const name = input && input.trim();
            return name != undefined
                ? { success: true, message: `I have your name as ${name}`, value: name }
                : { success: false, message: 'Please enter a name that contains at least one character.' };
        }
    )
    // ,

    // new Question(
    //     'age',
    //     'How old are you?',
    //      input => {
    //         // Try to recognize the input as a number. This works for responses such as "twelve" as well as "12".
    //         try {
    //             // Attempt to convert the Recognizer result to an integer. This works for "a dozen", "twelve", "12", and so on.
    //             // The recognizer returns a list of potential recognition results, if any.
    //             const results = Recognizers.recognizeNumber(input, Recognizers.Culture.English);
    //             let output;
    //             results.forEach(function (result) {
    //                 // result.resolution is a dictionary, where the "value" entry contains the processed string.
    //                 const value = result.resolution['value'];
    //                 if (value) {
    //                     const age = parseInt(value);
    //                     if (!isNaN(age) && age >= 18 && age <= 120) {
    //                         output = { success: true, age: age };
    //                         return;
    //                     }
    //                 }
    //             });
    //             return output || { success: false, message: 'Please enter an age between 18 and 120.' };
    //         } catch (error) {
    //             return {
    //                 success: false,
    //                 message: "I'm sorry, I could not interpret that as an age. Please enter an age between 18 and 120."
    //             };
    //         }
    //     }
    // ),

    // new Question(
    //     'date',
    //     'When is your flight?',
    //     input => {
    //         // Try to recognize the input as a date-time. This works for responses such as "11/14/2018", "today at 9pm", "tomorrow", "Sunday at 5pm", and so on.
    //         // The recognizer returns a list of potential recognition results, if any.
    //         try {
    //             const results = Recognizers.recognizeDateTime(input, Recognizers.Culture.English);
    //             const now = new Date();
    //             const earliest = now.getTime() + (60 * 60 * 1000);
    //             let output;
    //             results.forEach(function (result) {
    //                 // result.resolution is a dictionary, where the "values" entry contains the processed input.
    //                 result.resolution['values'].forEach(function (resolution) {
    //                     // The processed input contains a "value" entry if it is a date-time value, or "start" and
    //                     // "end" entries if it is a date-time range.
    //                     const datevalue = resolution['value'] || resolution['start'];
    //                     // If only time is given, assume it's for today.
    //                     const datetime = resolution['type'] === 'time'
    //                         ? new Date(`${now.toLocaleDateString()} ${datevalue}`)
    //                         : new Date(datevalue);
    //                     if (datetime && earliest < datetime.getTime()) {
    //                         output = { success: true, date: datetime.toLocaleDateString() };
    //                         return;
    //                     }
    //                 });
    //             });
    //             return output || { success: false, message: "I'm sorry, please enter a date at least an hour out." };
    //         } catch (error) {
    //             return {
    //                 success: false,
    //                 message: "I'm sorry, I could not interpret that as an appropriate date. Please enter a date at least an hour out."
    //             };
    //         }
    //     }
    // )
];

module.exports = questions;