/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useCallback, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import _ from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

import useStyles from "./styles";
import db from "../../utils/_db";

export function AddSheet(props) {
  const classes = useStyles();
  db.set("importContext.bookName", props.opState.meta.name).write();
  const [ filesMeta, setFilesMeta ] = useState(db.get("importContext.sheets").value());

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          let temp = {};
          temp.name = file.name;
          temp.size = file.size;
          temp.type = file.type;
          temp.fields = results.meta.fields;
          temp.lines = results.data.length;
          db.get("importContext.sheets").push(temp).write();
          let tempFilesMeta = [ ...filesMeta ];
          tempFilesMeta.push(temp);
          setFilesMeta(tempFilesMeta);
          const defaultSheetName = _.split(file.name, ".")[0];
          // TODO: limit result size to 50
          let bookName =  db.get("importContext.bookName").value();
          importData(bookName, defaultSheetName, results.meta.fields, _.take(results.data, 50));
        },
      });
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop: onDrop,
  });

  return (
    <Dialog
      open={props.opState.create}
      fullWidth
      maxWidth={"md"}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid1}>
              <Grid item xs={1}>
                上传工作表
              </Grid>
              <Grid item xs={10}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button size={"small"} color={"primary"} startIcon={<AddIcon fontSize={"small"}/> }>点击上传文件</Button>
                </div>
              </Grid>
              <Grid item xs={1} className={classes.close}>
                <CloseIcon fontSize={"small"} onClick={props.handleClose} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.grid2}>
            <Grid container >
              <Grid item xs={12}>
                <Grid container alignItems={"center"}>
                  <Grid item xs={1}>#</Grid>
                  <Grid item xs={2}>文件名</Grid>
                  <Grid item xs={1}>大小</Grid>
                  <Grid item xs={1}>行数</Grid>
                  <Grid item xs={1}>列数</Grid>
                  <Grid item xs={1}>类型</Grid>
                  <Grid item xs={4}>字段名</Grid>
                  <Grid item xs={1} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {db.get("importContext.sheets").value().map((it, index) => (
                  <Grid container alignItems={"center"} key={index} className={ index % 2 === 0 ? classes.oddLine : classes.evenLine}>
                    <Grid item xs={1}><p>{index}</p></Grid>
                    <Grid item xs={2}>
                      <Tooltip title={it.name} arrow placement={"right"}>
                        <p className={classes.fieldWrap}>{it.name}</p>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>{it.size}</Grid>
                    <Grid item xs={1}>{it.lines}</Grid>
                    <Grid item xs={1}>{it.fields.length}</Grid>
                    <Grid item xs={1}>{it.type}</Grid>
                    <Grid item xs={4}>
                      <Tooltip title={_.join(it.fields, ", ")} arrow placement={"top"}>
                        <p className={classes.fieldWrap}>{_.join(it.fields, ", ")}</p>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Chip variant={"outlined"} color={"primary"} size={"small"} label={"成功"} />
                    </Grid>
                  </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid3}>
              <Grid item xs={10}>
                <b>{db.get("importContext.sheets").value().length}</b> sheet(s)
              </Grid>
              <Grid item xs={2}>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );

  function importData(db, name, fields, data) {
    let schema = {};
    for (let field of fields) {
      // TODO: fix type
      let fieldName = field.toLowerCase().replaceAll(" ", "_");
      schema[fieldName] = "varchar(100)"; // noqa
    }
    console.log("db: ", db);
    console.log("sheet schema: ", schema);
    let sheetSchema = {
      db: db,
      name: name,
      meta: schema,
    };
    let sheetData = {
      db: db,
      name: name,
      lines: data,
    };

    // create sheet schema
    fetch("http://localhost:8080/sheet/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(sheetSchema),
    }).then(s => s.toString())
      .then(d => console.log("create sheet: ", d))
      .catch(r => console.error(r));

    // insert sheet data
    fetch("http://localhost:8080/sheet/insert", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(sheetData),
    }).then(s => s.toString())
      .then(d => console.log("insert sheet: ", d))
      .catch(r => console.error(r));

  }
}