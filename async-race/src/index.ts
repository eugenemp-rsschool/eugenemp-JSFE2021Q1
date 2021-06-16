import App from './components/app';
import './components/shared/reset.scss';

const rootElement = document.body;
rootElement.appendChild(new App().render());
