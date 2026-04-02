import type { ButtonHTMLAttributes, ReactNode } from "react";

import { joinClassNames } from "@/common/utils/classnames";

type ButtonVariant = "filter" | "duel" | "clear";
type ActiveTone = "default" | "left" | "right";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeTone?: ActiveTone;
  children: ReactNode;
  variant?: ButtonVariant;
};

const getActiveClassName = (
  variant: ButtonVariant,
  activeTone: ActiveTone,
): string => {
  if (variant === "filter") {
    return "ui-button--active";
  }

  if (variant === "duel") {
    if (activeTone === "left") {
      return "ui-button--active-left";
    }

    if (activeTone === "right") {
      return "ui-button--active-right";
    }

    return "ui-button--active";
  }

  return "ui-button--active";
};

export const Button = ({
  active = false,
  activeTone = "default",
  children,
  className,
  type = "button",
  variant = "filter",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={joinClassNames(
        "ui-button",
        `ui-button--${variant}`,
        active && getActiveClassName(variant, activeTone),
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
