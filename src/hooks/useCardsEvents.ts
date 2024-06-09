import { useEffect } from "react";

export const useCardsEvents = ({ handleMouseMove, handleMouseUp }: any) => {
  useEffect(() => {
    const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e);
    const handleTouchMoveEvent = (e: TouchEvent) => handleMouseMove(e);
    const handleMouseUpEvent = () => handleMouseUp();

    document.addEventListener("mousemove", handleMouseMoveEvent);
    document.addEventListener("mouseup", handleMouseUpEvent);
    document.addEventListener("touchstart", handleTouchMoveEvent, {
      passive: true,
    });
    document.addEventListener("touchend", handleMouseUpEvent, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveEvent);
      document.removeEventListener("mouseup", handleMouseUpEvent);
      document.removeEventListener("touchmove", handleTouchMoveEvent);
      document.removeEventListener("touchend", handleMouseUpEvent);
    };
  }, [handleMouseMove, handleMouseUp]);
};
