import React from "react";

const LinkedIn = ({className = "h-5 w-5"}) => {
    const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");
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

const GitHub = ({className = "h-5 w-5"}) => {
    return (
        <img
            src="https://cdn.simpleicons.org/github"
            alt="GitHub"
            className={className}
        />
    );
};

export { GitHub, LinkedIn };