
export default function errorHandler(err, req, res, next) {
    console.log(`🤖 Something Went Wrong!
    Error: ${err.name}
    `)
    console.log(err.stack)
  
    if (err.name === 'NotFound' || err.name === 'CastError') {
      return res.status(404).json({ message: 'Not Found' })
    }
  
    if (err.name === 'ValidationError') {
      const customErrors = {}
  
      for (const key in err.errors) {
        customErrors[key] = err.errors[key].message
      }
  
      return res.status(422).json(customErrors)
    }
  
    if (err.name === 'AlreadyExists') {
      return res.status(400).json({ message: 'This character already exists, please try another!' })
    }
  
    //* User errors
    if (err.name === 'UsernameOrEmailExists') {
      return res.status(400).json({ message: 'Username or email is taken. Please try again.' })
    }
    if (err.name === 'PasswordsNotMatching') {
      return res.status(400).json({ message: 'Make sure your passwords are matching.' })
    }
    if (err.name === 'UserInfoMissing') {
      return res.status(422).json({ message: 'Looks like you missed a field.' })
    }
    if (err.name === 'Unauthorised') {
      return res.status(401).json({ message: 'You are not authorised.' })
    }
    if (err.name === 'EmailNotValid') {
      return res.status(400).json({ message: 'Not a valid email address. Please try again.' })
    }
  
    res.sendStatus(500)
    next(err)
  }