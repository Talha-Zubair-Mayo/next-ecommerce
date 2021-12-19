import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#3498db",
    "& a": { color: "#ffff", textDecoration: "none", marginLeft: "10px" },
  },
  main: { minHeight: "80vh", padding: "20px" },
  footer: {
    textAlign: "center",
  },
  Brand: {
    fontSize: "1.5rem",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  FlexGrow: {
    flexGrow: 1,
  },
  Links: {
    display: "flex",
  },
});

export default useStyles;
