export class NotFound extends Error {
    constructor() {
      super()
  
      this.name = 'NotFound'
    }
  }
  
  export class AlreadyExists extends Error {
    constructor() {
      super()
  
      this.name = 'AlreadyExists'
    }
  }

  export class FieldsMissing extends Error {
    constructor() {
      super()
  
      this.name = 'FieldsMissing'
    }
  }
  
  export class UsernameOrEmailExists extends Error {
    constructor() {
      super()
      this.name = 'UsernameOrEmailExists'
    }
  }
  
  export class PasswordsNotMatching extends Error {
    constructor() {
      super()
      this.name = 'PasswordsNotMatching'
    }
  }
  
  export class UserInfoMissing extends Error {
    constructor() {
      super()
      this.name = 'UserInfoMissing'
    }
  }
  
  export class Unauthorised extends Error {
    constructor() {
      super()
      this.name = 'Unauthorised'
    }
  }
  
  export class EmailNotValid extends Error {
    constructor() {
      super()
      this.name = 'EmailNotValid'
    }
  }