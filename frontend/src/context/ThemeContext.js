import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useLayoutEffect(() => {
        const root = window.document.documentElement;

        // Remove both classes to start fresh
        root.classList.remove('light', 'dark');

        // Add the current theme class
        root.classList.add(theme);

        // Persist to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
