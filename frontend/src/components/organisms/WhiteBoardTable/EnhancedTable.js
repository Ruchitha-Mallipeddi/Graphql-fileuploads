import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Table, input, Button } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { Divider, Grid, Typography } from "@material-ui/core";
import { downloadFile } from "../../../services/FileStorage/index";
import gql from "graphql-tag";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import {
  fetchAllFiles,
  downloadFileWithPreSignedUrl,
} from "../../../services/FileStorage/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  title: {
    marginLeft: 10,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e0e0eb",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e6f2ff",
    },
  },
}))(TableRow);

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <StyledTableRow>
        {props.headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={"center"}
            padding="checkbox"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography className={classes.header} variant="subtitle1">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState(props.defaultOrder);
  const [orderBy, setOrderBy] = React.useState(props.defaultOrderBy);
  const { rows } = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ backgroundColor: "#edf5f6" }}
          >
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Download File
            </Typography>
            <Typography>Enter Bucket Name</Typography>
            <input onChange={props.handleMopIdChange}></input>
            <Button onClick={props.handleSubmit}>Submit</Button>
            <Divider style={{ margin: "8px" }} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="small"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={props.headCells}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <StyledTableRow
                          hover
                          style={{ cursor: "pointer" }}
                          onClick={() => props.handleClick(row.name)}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.name}
                        >
                          <StyledTableCell>
                            <Typography
                              variant="body2"
                              style={{ fontSize: 17 }}
                            >
                              {row.name}
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ backgroundColor: "#edf5f6" }}
          >
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Upload File
            </Typography>
            <Divider style={{ margin: "8px" }} />
            {/* <Typography>Uploading file through GraphQl</Typography> */}
            <Typography>Enter Bucket Name</Typography>
            <input onChange={props.handleBucketChange}></input>

            <input
              type="file"
              style={{ margin: "10px" }}
              name="file"
              onChange={props.onUploadHandler}
            />
            {/* <Divider style={{ margin: "8px" }} />
            <Typography>Uploading file through Pre-Signed Url</Typography>
            <Typography>Enter Bucket Name</Typography>
            <input onChange={props.handleBucket2Change}></input>

            <input
              type="file"
              style={{ margin: "10px" }}
              name="file"
              onChange={props.onUploadHandlerForPresignedUrl}
            /> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
