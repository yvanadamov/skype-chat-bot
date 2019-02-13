const WRONG_MESAGE = 'Could you please write it in a simpler way?';

/**
 * To be used for collecting user data
 */
class Question {
    /**
     * @param {String} name
     * @param {String} ask 
     * @param {String} [reject]
     * @param {Function} [validation]
     */
    constructor(name, ask, reject, validation) {
        this.name = name;
        this.ask = ask;
        if (typeof reject === 'function') {
            this.validation = reject;
            this.reject = WRONG_MESAGE;
        }
        else {
            this.validation = validation;
        }
        this.answer = null;
    }

    /**
     * @param {*} value
     * @return {success: boolean, value: *}
     */
    validate(value) {
        if (!this.validation) {
            this.answer = value;
            return { success: true, value: value };
        }
        return this.validation(value);
    }
}

module.exports = Question;