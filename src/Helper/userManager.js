import { createUserManager } from 'redux-oidc';

const localhost = 'http://localhost:3000/';
const identity = 'https://localhost:5000/';

const userManagerConfig = {
    client_id: 'js',
    client_secret: 'rookieecom',
    redirect_uri: `${localhost}callback`,
    post_logout_redirect_uri: `${localhost}`,
    response_type: 'id_token token',
    scope: 'openid profile api1',
    authority: `${identity}`,
    silent_redirect_uri: `${localhost}silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
