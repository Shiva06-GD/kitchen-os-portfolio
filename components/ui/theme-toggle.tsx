'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const [isDark, setIsDark] = React.useState(true); // Default to dark as per requirements

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    React.useEffect(() => {
        // Ensure sync on mount
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
    }, []);

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {isDark ? (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            )}
            <span className="sr-only">Toggle theme</span>
            {/* Show opposite icon effectively? simpler implementation below */}
            {isDark ? <Sun className="absolute h-[1.2rem] w-[1.2rem]" /> : <Moon className="absolute h-[1.2rem] w-[1.2rem]" />}
        </Button>
    );
}
