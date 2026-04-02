import { joinClassNames } from "@/common/utils/classnames";

type StatBarDirection = "left" | "right";
type StatBarSize = "compact" | "standard";
type StatBarState = "default" | "winner" | "loser" | "tied";

type StatBarProps = {
  className?: string;
  direction?: StatBarDirection;
  percent: number;
  size?: StatBarSize;
  state?: StatBarState;
};

export const StatBar = ({
  className,
  direction = "right",
  percent,
  size = "standard",
  state = "default",
}: StatBarProps) => {
  return (
    <div
      className={joinClassNames(
        "ui-stat-bar",
        `ui-stat-bar--${direction}`,
        `ui-stat-bar--${size}`,
        className,
      )}
    >
      <div
        className={joinClassNames(
          "ui-stat-bar__fill",
          state !== "default" && state !== "tied" && `ui-stat-bar__fill--${state}`,
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
