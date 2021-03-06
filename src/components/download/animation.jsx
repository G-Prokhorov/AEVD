import { useAnimatePresence } from "use-animate-presence";
import "./style.css";
import {React, useEffect} from "react";

const diff = window.innerWidth / 2 + 300;

const frontVariants = {
    x: { from: -diff, to: 0 },
    deg: 360
};

const middleVariants = {
    x: { from: diff, to: 0 },
    deg: 360
};

const bgVariants = {
    y: { from: -diff, to: 0 },
    deg: 360
};

export default function Animation() {
    const frontSquare = useAnimatePresence({
        variants: frontVariants,
        initial: "hidden",
    });

    const middleSquare = useAnimatePresence({
        variants: middleVariants,
        initial: "hidden",
        wait: frontSquare.togglePresence,
    });

    const bgSquare = useAnimatePresence({
        variants: bgVariants,
        initial: "visible",
        wait: middleSquare.togglePresence,
    });

    useEffect(() => {
        let my = setInterval(() => {
            bgSquare.togglePresence();
        }, 4000);
        return () => {
            clearInterval(my);
        };
    });

    return (
        <>
            {bgSquare.isRendered && (
                <div ref={bgSquare.ref} className="bg-square">
                    {middleSquare.isRendered && (
                        <div className="middle-square" ref={middleSquare.ref}>
                            {frontSquare.isRendered && (
                                <div className="front-square" ref={frontSquare.ref} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
