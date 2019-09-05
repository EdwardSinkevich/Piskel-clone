import './Header.css';

export default class Header {
  static render() {
    const header = document.getElementById('header');
    header.innerHTML = `
      <div class="navigation">
        <span class="piskel-name">Piskel Clone</span>
        <nav id="navigation-links" class="navigation-links">
          <a id="customBtn" class="nav-btn google-sign-in-btn" href="#">Sign in</a>
        </nav>
      </div>`;
  }
}
