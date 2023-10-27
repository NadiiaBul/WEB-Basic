import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <IntlProvider locale="uk-UA">
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </IntlProvider>
)
