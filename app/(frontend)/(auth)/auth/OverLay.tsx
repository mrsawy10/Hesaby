import classes from "./OverLay.module.css";

export default function OverLay({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: String;
}) {
  return (
    <div className={classes.sky} dir={`ltr`}>
      <div className={`${classes.photo} ${className}`}>{children}</div>
    </div>
  );
}
