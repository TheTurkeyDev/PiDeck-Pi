import { GlobalStyles } from './global-styles';
import { ThemeContextProvider, Toast } from 'gobble-lib-react';
import App from './appp';

function AppWrapper() {
    return (
        <ThemeContextProvider>
            <GlobalStyles />
            <Toast>
                <App />
            </Toast>
        </ThemeContextProvider>
    );
}

export default AppWrapper;
