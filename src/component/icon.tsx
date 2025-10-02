import React from "react";
import { useTheme } from "./theme"; // Adjust the import path as needed

const LinkedIn = ({ className = "h-5 w-5" }) => {
    const { isDark } = useTheme();
    const src = isDark
        ? "/in-logo/InBug-White.png"
        : "/in-logo/InBug-Black.png";

    return (
        <img
            src={src}
            alt="LinkedIn"
            className={className}
        />
    );
};

const GitHub = ({ className = "h-5 w-5" }) => {
        const { isDark } = useTheme();
    const src = isDark
        ? "https://cdn.simpleicons.org/github/FFFFFF"
        : "https://cdn.simpleicons.org/github/000000";
    return (
        <img
            src={src}
            alt="GitHub"
            className={className}
        />
    );
};

export { GitHub, LinkedIn };
