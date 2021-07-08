import Component from './view-component';
import './footer.scss';

// Footer elemet====================================================================================
export default class Footer {
  private readonly footerElement: HTMLElement;

  constructor() {
    this.footerElement = new Component('footer', 'footer').render();
    this.footerElement.innerHTML = `<a class="footer__rs"
                                        title="RS-School JS course"
                                        target="_blank"
                                        href="https://rs.school/js/"></a>

                                    <a class="footer__gh"
                                        title="GitHub"
                                        target="_blank"
                                        href="https://github.com/eugenemp">
                                      <div class="footer__gh__logo"></div>
                                      <span class="footer__gh__text">eugenemp</span>
                                    </a>

                                    <div class="footer__cr">
                                      <span class="footer__cr__text">&copy; 2021, EugeneMP</span>
                                    </div>`;
  }

  // Render footer element
  render(): HTMLElement {
    return this.footerElement;
  }
}
