import React from "react";
import { validatePasswordStrength } from "~/libs/util";
interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  const validity = password ? validatePasswordStrength(password) : 0;

  const getBlockColor = (idx: number): string => {
    const colorClasses = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-green-700",
    ];

    return idx + 1 <= validity ? colorClasses[idx] : "bg-neutral-200";
  };

  return (
    <ul className="flex gap-2">
      {Array.from({ length: 4 }).map((_, idx) => (
        <li
          key={idx}
          className={`h-2 flex-1 block rounded-full ${getBlockColor(idx)}`}
        ></li>
      ))}
    </ul>
  );
};

export default PasswordStrengthIndicator;
