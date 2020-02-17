import React from 'react';
import TimeDisplay from '../TimeDisplay';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function ActivityLog({ log }) {
  return (
    <div id="activityLog">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Time spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {log.activities.map(obj => {
              return (
                <TableRow key={obj.key}>
                  <TableCell>{obj.id}</TableCell>
                  <TableCell>
                    <TimeDisplay seconds={obj.timeSpent} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
