export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:5000',
  oidc: {
    issuer: 'http://localhost:8080/realms/bootcamp',
    clientId: 'bootcamp-web',
    scope: 'openid profile email roles',
    requireHttps: false,
  },
};
