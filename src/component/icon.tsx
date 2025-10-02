import React from "react";

const LinkedIn = ({className = "h-5 w-5"}) => {
    const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");
    const src = isDark
        ? "/in-logo/InBug-Black.png"
        : "/in-logo/InBug-White.png";

    return (
        <img
            src={src}
            alt="LinkedIn"
            className={className}
        />
    );
};

const GitHub = ({className = "h-5 w-5"}) => {
    const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");
    const src = isDark
        ? "/github-logo/github-mark.svg"
        : "/github-logo/github-mark.svg";

    return (
        <img
            src={src}
            alt="GitHub"
            className={className}
        />
    );
};

export { GitHub, LinkedIn };