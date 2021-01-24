import React from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export const ChartContent = ({ data }) => (
  <div style={{ marginTop: '10px' }}>
    <Typography variant="h6" component="h2">
      サインを求められた回数
    </Typography>
    <Card variant="outlined">
      <CardContent>
        <LineChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <Line dataKey="count" stroke="salmon" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </CardContent>
    </Card>
  </div>
);
