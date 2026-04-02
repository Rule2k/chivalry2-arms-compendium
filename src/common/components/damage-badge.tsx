import { joinClassNames } from "@/common/utils/classnames";

type DamageBadgeProps = {
  className?: string;
  damageType: string;
};

export const DamageBadge = ({
  className,
  damageType,
}: DamageBadgeProps) => {
  return (
    <span
      className={joinClassNames(
        "ui-damage-badge",
        `ui-damage-badge--${damageType}`,
        className,
      )}
    >
      {damageType}
    </span>
  );
};
