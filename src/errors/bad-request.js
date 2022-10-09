class BadRequestError{
    constructor(message) {
        this.message = message
        this.statusCode = 400;
    }
  }
  
  module.exports = BadRequestError;