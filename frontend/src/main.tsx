import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './app-wrapper';

declare global {
    // eslint-disable-next-line functional/prefer-readonly-type, @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-definitions
    interface Window { runtime: any }
}

window.runtime = window.runtime || {};

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
