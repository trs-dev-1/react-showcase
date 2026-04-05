import { cn } from "@/shared/lib/utils";
import { IconLoader } from "@tabler/icons-react";

type SpinnerSize = "small" | "medium" | "large";

const sizeClassMap: { [key in SpinnerSize]: string } = {
  large: "size-12",
  medium: "size-8",
  small: "size-4"
};

type SpinnerProps = React.ComponentProps<"svg"> & {
  center?: boolean;
  className?: string;
  size?: SpinnerSize;
};

function Spinner({
  center,
  size = "medium",
  className,
  ...props
}: SpinnerProps) {
  return (
    <IconLoader
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin",
        center
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          : "",
        sizeClassMap[size],
        className
      )}
      {...props}
    />
  );
}

export { Spinner };
