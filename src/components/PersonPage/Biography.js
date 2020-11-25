import { useEffect, useRef, useState } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  preLine: {
    whiteSpace: "pre-line",
  },
  readMore: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 9,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),

    // tránh lỗi đẩy content lên trên của bottom button
    overflowAnchor: "none",
  },
}));
const Biography = ({ details }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [lines, setLines] = useState(0);
  const biographyRef = useRef("");

  useEffect(() => {
    const p = biographyRef.current;
    if (p) {
      // height của mỗi dòng
      const lineHeight = parseInt(getComputedStyle(p).lineHeight);

      // pHeight: height của toàn bộ biography
      const pHeight = p.offsetHeight;

      // số dòng của biography
      const line = pHeight / lineHeight;
      setLines(line);
    }
  }, []);

  const handleClick = () => {
    setChecked(!checked);
  };
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {details.name}
      </Typography>
      <div>
        <Typography variant="subtitle1">Biography</Typography>
        {details.biography ? (
          <>
            <Typography
              className={clsx(classes.preLine, {
                [classes.readMore]: !checked && lines > 9,
              })}
              ref={biographyRef}
            >
              {details.biography}
            </Typography>
            {/* dựa theo số dòng biography để hiển thị button */}
            {lines > 9 && (
              <div className={classes.button}>
                <Button onClick={handleClick}>
                  {!checked ? "Read more" : "Read less"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <Typography>We don't have a biography for {details.name}</Typography>
        )}
      </div>
    </>
  );
};

export default Biography;
