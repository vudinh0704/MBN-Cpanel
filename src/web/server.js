const { createServer } = require('https');
const fs = require('fs');

require('dotenv').config();
// may config in .env or pass via command line params
const port = parseInt(process.env.PORT, 10) || 443;
const dev = process.env.NODE_ENV !== 'production';

const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
//const openid = require('./utils/openid')

const app = next({ dev }); // dev: false by default
const handle = app.getRequestHandler();
const ts = Date.now();

const loginEndpoint = `${process.env.BASE_PATH}/login`;
const signupEndpoint = `${process.env.BASE_PATH}/signup`;
const callbackEndpoint = encodeURIComponent(
  `${process.env.ROOT}/login?action=openid`
);
// console.log(loginToken)
const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
};

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.get('/hello', (req, res) => {
    return res.send(ts.toString());
  });

  server.get(loginEndpoint, async (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store, private');
    const { action, token } = req.query;
    console.log(action);
    if (token) {
      try {
        const resp = await openid.openIdLogin(
          `${process.env.API_ROOT}api/user/openid-login?token=${token}`
        );
        //console.log(resp)
      } catch (ex) {
        //console.log(ex)
      }
      let returnUrl = req.cookies.returnUrl || '';
      if (returnUrl === '') returnUrl = process.env.ROOT;
      res.cookie('returnUrl', '', {
        domain: process.env.DOMAIN_COOKIE,
        maxAge: 0,
        httpOnly: true
      });
      res.redirect(302, returnUrl);
      res.end();
    } else {
      //const callbackUrl = encodeURIComponent(req.protocol + '://' + req.get('host') + '/login?action=openid')
      const callbackUrl = !dev
        ? callbackEndpoint
        : encodeURIComponent(
            req.protocol +
              '://' +
              req.get('host') +
              process.env.BASE_PATH +
              '/login?action=openid'
          );
      const openUrl = `${process.env.OPENID_LOGIN_URL}${callbackUrl}`;
      const { returnUrl } = req.query;
      res.cookie('returnUrl', returnUrl, {
        domain: process.env.DOMAIN_COOKIE,
        maxAge: 900000,
        httpOnly: true
      });
      res.redirect(302, openUrl);
      res.end();
    }
  });

  server.get(signupEndpoint, async (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store, private');
    const callbackUrl = encodeURIComponent(
      req.protocol + '://' + req.get('host') + '/login?action=openid'
    );
    const openUrl = `${process.env.OPENID_SIGNUP_URL}${callbackUrl}`;
    const { returnUrl } = req.query;

    res.cookie('returnUrl', returnUrl, {
      domain: process.env.DOMAIN_COOKIE,
      maxAge: 900000,
      httpOnly: true
    });
    res.redirect(302, openUrl);
    res.end();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  if (dev) {
    const devServer = createServer(httpsOptions, server);
    devServer.listen(port, 'localhost.muaban.net', function () {
      console.log(`the current env is ${process.env.NODE_ENV}`);
      console.log(
        `> Ready on https://localhost:${port}${process.env.BASE_PATH || ''}`
      );
    });
  } else {
    server.listen(port, err => {
      if (err) throw err;
      console.log(`the current env is ${process.env.NODE_ENV}`);
      console.log(
        `> Ready on http://localhost:${port}${process.env.BASE_PATH || ''}`
      );
    });
  }
});
