import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

export default function Chart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Current Patients by {props.title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis 
            stroke={theme.palette.text.secondary}
            ticks={[100,500,1000]}
          />
          <Tooltip />
          <Line type="monotone" dataKey="patients" stroke={theme.palette.primary.main} dot={false} />
          <Line type="monotone" dataKey="exits" stroke="skyblue" dot={false} />
          <Line type="monotone" dataKey="deaths" stroke="salmon" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
