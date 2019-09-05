export default class Auth {
  constructor() {
    this.auth2 = null;
    this.customBtn = document.getElementById('customBtn');
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const userData = document.createElement('div');
        userData.classList.add('user-data', 'nav-btn');
        userData.innerHTML = `
          <img class="user-avatar" src="${profile.getImageUrl()}">
          <span class="user-name">${profile.getName()}</span>
        `;
        document.getElementById('navigation-links').appendChild(userData);
        this.customBtn.style.display = 'none';
      });
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '261925930253-qnkq3vres5b4ljga1q982drn0avhbpq9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(this.customBtn);
    });
  }
}
