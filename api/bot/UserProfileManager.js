/**
 * To populate user session data
 * @property {Array.<iterator>} questions
 * @property {value: *, done: boolean} current
 */
class UserProfileManager {
    constructor(questions) {
        this.questions = questions[Symbol.iterator]();
        this.current = null;
    }

    async populate(context, userData) {
        let question;
        // Its first question, just ask and wait for the next turn to populate
        if (!this.current) {
            this.current = this.questions.next();
            question = this.current.value;
            return await context.sendActivity(question.ask);
        }
        // All questions answered
        if (this.current.done) {
            console.log(`No more questions to ask. Total questions: ${this.current.value}`);
            return;
        }
        // not the first question and not answered yet
        question = this.current.value;
        const input = context.activity.text;
        const result = question.validate(input);
        await context.sendActivity(result.message);
        // In case of error, send the question again
        if (!result.success) {
            return await context.sendActivity(question.message);
        }
        // Save value and ask next question
        userData[question.name] = result.value;
        this.current = this.questions.next();
        if (this.current.done) {
            console.log(`No more questions to ask. Total questions: ${this.current.value}`);
            return;
        }
        return await context.sendActivity(this.current.value.ask);
    }

    done() {
        return this.current && this.current.done;
    }
}

module.exports = UserProfileManager;