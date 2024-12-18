import passport from 'passport'
import MagicLink from 'passport-magic-link'
import sendgrid from '@sendgrid/mail'
import Users from '../models/users.mjs'
import {} from 'dotenv/config'

const MagicLinkStrategy = MagicLink.Strategy

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

passport.use(
  new MagicLinkStrategy(
    {
      secret: 'keyboard cat',
      userFields: ['email'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    function send(user, token) {
      var link =
        'http://localhost:5500/auth/login/email/verify?token=' + token
      var msg = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Sign in to bySolitdio',
        text:
          'Hello! Click the link below to finish signing in to bySolitdio.\r\n\r\n' +
          link,
        html:
          '<h3>Hello!</h3><p>Click the link below to finish signing in to bySolitdio.</p><p><a href="' +
          link +
          '">Sign in</a></p>',
      }
      return sendgrid.send(msg)
    },
    async function verify(user) {
      try {
        const check = await Users.findOne({ email: user.email })
        if (!check) {
          const newUser = new Users({ email: user.email })
          await newUser.save()
          return new Promise(function (resolve, reject) {
            return resolve(newUser)
          })
        }
        return new Promise(function (resolve, reject) {
          return resolve(check)
        })
      } catch (error) {
        return new Promise(function (resolve, reject) {
          return reject(error.message)
        })
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    if (user.notifUrl) {
        cb(null, {
         _id: user._id,
         email: user.email,
         fullName: user.fullName,
         notifUrl: user.notifUrl.endpoint,
        })
      return 
    }
    cb(null, user)
     
  })
    
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    //console.log(user)
    return cb(null, user)
  })
})
