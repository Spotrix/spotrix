import React from "react";
import Grid from "@material-ui/core/Grid";
import { Bar, BarChart } from "recharts";

import useStyles from "./styles";

const data1 = [
  {name: "Field4abcd", percent: 59, value: Math.ceil(Math.random() * 1000000)},
  {name: "Field2", percent: 19, value: Math.ceil(Math.random() * 100000)},
  {name: "Field1", percent: 17, value: Math.ceil(Math.random() * 100000)},
  {name: "Field3efg", percent: 2, value: Math.ceil(Math.random() * 10000)},
  {name: "Others", percent: 3, value: Math.ceil(Math.random() * 10000)},
];

const data2 = [
  {name: "[null]", percent: 45, value: Math.ceil(Math.random() * 10000000)},
  {name: "Field2sdf", percent: 15, value: Math.ceil(Math.random() * 100000)},
  {name: "Others", percent: 40, value: Math.ceil(Math.random() * 1000000)},
];

const data3 = [
  {name: "Uniq Values", percent: 92, value: Math.ceil(Math.random() * 1000000)},
];

const data4 = [
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
  {name: "value", value: Math.ceil(Math.random() * 1000000)},
];

const data5 = [
  {name: "True", percent: 66, value: Math.ceil(Math.random() * 100000)},
  {name: "False", percent: 32, value: Math.ceil(Math.random() * 1000000)},
  {name: "Others", percent: 2, value: Math.ceil(Math.random() * 1000000)},
];

const data6 = [
  {name: "2020-12-12", percent: 54, value: Math.ceil(Math.random() * 100000)},
  {name: "2020-12-13", percent: 21, value: Math.ceil(Math.random() * 100000)},
  {name: "2020-12-14", percent: 10, value: Math.ceil(Math.random() * 100000)},
  {name: "2020-12-15", percent: 6, value: Math.ceil(Math.random() * 100000)},
  {name: "2020-12-16", percent: 2, value: Math.ceil(Math.random() * 100000)},
];


export function Summary(props) {
  const classes = useStyles();

  let result;
  let rv = Math.ceil(Math.random() * 100) % 6;

  switch (rv) {
    case 0:
      //  String: topN 排名
      result =
        <Grid container alignItems={"center"}>
          <Grid item xs={12}>
            {data1.map(item => (
              <Grid container key={item.name} alignItems={"center"} justify="space-between" className={classes.bodyContainer}>
                <Grid item style={{ width: item.percent + "%" }}  className={classes.barBackground}>
                  <i className={item.name === "Others" ? classes.others : null}>{item.name}</i>
                </Grid>
                <Grid item className={item.name === "Others" ? classes.others : classes.barValue}>{item.percent + "%"}</Grid>
              </Grid>
            ))
            }
          </Grid>
        </Grid>;
      break;
    case 1:
      // String: null 较多
      result =
        <Grid container alignItems={"center"}>
          <Grid item xs={12}>
            {data2.map(item => (
              <Grid container key={item.name} alignItems={"center"} justify="space-between" className={classes.bodyContainer}>
                <Grid item className={item.name === "[null]" ? classes.nullHighlight : item.name === "Others" ? classes.others : classes.otherKey}>
                  {item.name}
                </Grid>
                <Grid item className={item.name === "[null]" ? classes.nullHighlight : item.name === "Others" ? classes.others : classes.otherValue}>{item.percent + "%"}</Grid>
              </Grid>
            ))
            }
          </Grid>
        </Grid>;
      break;
    case 2:
      // String: uniq 占比超过 90%
      result =
        <Grid container alignItems={"center"}>
          <Grid item xs={12}>
            {data3.map(item => (
              <Grid container key={item.name} direction={"column"} alignItems={"center"} className={classes.bodyContainer}>
                <Grid item xs={12} className={classes.uniqValue}>
                  {item.value}
                </Grid>
                <Grid item className={classes.uniqName}>{item.name}</Grid>
              </Grid>
            ))
            }
          </Grid>
        </Grid>;
      break;
    case 3:
      // Number: 随机分布（划分成 20 个区间）
      // 最小值，最大值
      result =
        <Grid container alignItems={"center"}>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} justify={"center"}>
              <BarChart width={270} height={60} data={data4}>
                <Bar dataKey="value" fill="#017ba8"/>
              </BarChart>
            </Grid>
            <Grid container alignItems={"center"} justify={"space-between"}>
              <Grid item>0</Grid>
              <Grid item>12313</Grid>
            </Grid>
          </Grid>
        </Grid>;
      break;
    case 4:
      // Boolean: 类 boolean 值（uniq value 数小于等于 2 个） / boolean 值
      result =
        <Grid container alignItems={"center"}>
          {data5.map(item => (
            <Grid container key={item.name} alignItems={"center"} justify="space-between" className={classes.bodyContainer}>
              <Grid item className={item.name === "Others" ? classes.others : classes.otherKey}>
                <i>{item.name}</i>
              </Grid>
              <Grid item className={item.name === "Others" ? classes.others : classes.otherValue}>{item.percent + "%"}</Grid>
            </Grid>
          ))
          }
        </Grid>;
      break;
    case 5:
      // DateTime: Datetime, Date, Time 按照粒度进行聚合
      result =
        <Grid container alignItems={"center"}>
          {data6.map(item => (
            <Grid container key={item.name} alignItems={"center"} justify="space-between" className={classes.bodyContainer}>
              <Grid item className={classes.otherKey}>
                <i>{item.name}</i>
              </Grid>
              <Grid item className={classes.otherValue}>{item.percent + "%"}</Grid>
            </Grid>
          ))
          }
        </Grid>;
      break;
    default:
      result = "null";
  }

  return (
    <div className={classes.root}>
      {result}
    </div>
  );
}
