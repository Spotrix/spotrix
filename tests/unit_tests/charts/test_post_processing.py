# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import copy
from typing import Any, Dict

import pandas as pd

from spotrix.charts.post_processing import apply_post_process, pivot_df
from spotrix.utils.core import GenericDataType, QueryStatus

RESULT: Dict[str, Any] = {
    "query_context": None,
    "queries": [
        {
            "cache_key": "1bd3ab8c01e98a0e349fb61bc76d9b90",
            "cached_dttm": None,
            "cache_timeout": 86400,
            "annotation_data": {},
            "error": None,
            "is_cached": None,
            "query": """SELECT state AS state,
       gender AS gender,
       sum(num) AS \"Births\"
FROM birth_names
WHERE ds >= TO_TIMESTAMP('1921-07-28 00:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.US')
  AND ds < TO_TIMESTAMP('2021-07-28 10:39:44.000000', 'YYYY-MM-DD HH24:MI:SS.US')
GROUP BY state,
         gender
LIMIT 50000;

""",
            "status": QueryStatus.SUCCESS,
            "stacktrace": None,
            "rowcount": 22,
            "colnames": ["state", "gender", "Births"],
            "coltypes": [
                GenericDataType.STRING,
                GenericDataType.STRING,
                GenericDataType.NUMERIC,
            ],
            "data": """state,gender,Births
OH,boy,2376385
TX,girl,2313186
MA,boy,1285126
MA,girl,842146
PA,boy,2390275
NY,boy,3543961
FL,boy,1968060
TX,boy,3311985
NJ,boy,1486126
CA,girl,3567754
CA,boy,5430796
IL,girl,1614427
FL,girl,1312593
NY,girl,2280733
NJ,girl,992702
MI,girl,1326229
other,girl,15058341
other,boy,22044909
MI,boy,1938321
IL,boy,2357411
PA,girl,1615383
OH,girl,1622814
            """,
            "applied_filters": [],
            "rejected_filters": [],
        }
    ],
}


def test_pivot_table():
    form_data = {
        "adhoc_filters": [],
        "columns": ["state"],
        "datasource": "3__table",
        "date_format": "smart_date",
        "extra_form_data": {},
        "granularity_sqla": "ds",
        "groupby": ["gender"],
        "metrics": [
            {
                "aggregate": "SUM",
                "column": {"column_name": "num", "type": "BIGINT"},
                "expressionType": "SIMPLE",
                "label": "Births",
                "optionName": "metric_11",
            }
        ],
        "number_format": "SMART_NUMBER",
        "order_desc": True,
        "pandas_aggfunc": "sum",
        "pivot_margins": True,
        "row_limit": 50000,
        "slice_id": 143,
        "time_grain_sqla": "P1D",
        "time_range": "100 years ago : now",
        "time_range_endpoints": ["inclusive", "exclusive"],
        "url_params": {},
        "viz_type": "pivot_table",
    }
    result = copy.deepcopy(RESULT)
    assert apply_post_process(result, form_data) == {
        "query_context": None,
        "queries": [
            {
                "cache_key": "1bd3ab8c01e98a0e349fb61bc76d9b90",
                "cached_dttm": None,
                "cache_timeout": 86400,
                "annotation_data": {},
                "error": None,
                "is_cached": None,
                "query": """SELECT state AS state,
       gender AS gender,
       sum(num) AS \"Births\"
FROM birth_names
WHERE ds >= TO_TIMESTAMP('1921-07-28 00:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.US')
  AND ds < TO_TIMESTAMP('2021-07-28 10:39:44.000000', 'YYYY-MM-DD HH24:MI:SS.US')
GROUP BY state,
         gender
LIMIT 50000;

""",
                "status": QueryStatus.SUCCESS,
                "stacktrace": None,
                "rowcount": 3,
                "colnames": [
                    "Births CA",
                    "Births FL",
                    "Births IL",
                    "Births MA",
                    "Births MI",
                    "Births NJ",
                    "Births NY",
                    "Births OH",
                    "Births PA",
                    "Births TX",
                    "Births other",
                    "Births Subtotal",
                    "Total (Sum)",
                ],
                "coltypes": [
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                ],
                "data": """,Births CA,Births FL,Births IL,Births MA,Births MI,Births NJ,Births NY,Births OH,Births PA,Births TX,Births other,Births Subtotal,Total (Sum)
boy,5430796,1968060,2357411,1285126,1938321,1486126,3543961,2376385,2390275,3311985,22044909,48133355,48133355
girl,3567754,1312593,1614427,842146,1326229,992702,2280733,1622814,1615383,2313186,15058341,32546308,32546308
Total (Sum),8998550,3280653,3971838,2127272,3264550,2478828,5824694,3999199,4005658,5625171,37103250,80679663,80679663
""",
                "applied_filters": [],
                "rejected_filters": [],
            }
        ],
    }


def test_pivot_table_v2():
    form_data = {
        "adhoc_filters": [],
        "aggregateFunction": "Sum as Fraction of Rows",
        "colOrder": "key_a_to_z",
        "colTotals": True,
        "combineMetric": True,
        "datasource": "3__table",
        "date_format": "smart_date",
        "extra_form_data": {},
        "granularity_sqla": "ds",
        "groupbyColumns": ["state"],
        "groupbyRows": ["gender"],
        "metrics": [
            {
                "aggregate": "SUM",
                "column": {"column_name": "num", "type": "BIGINT"},
                "expressionType": "SIMPLE",
                "label": "Births",
                "optionName": "metric_11",
            }
        ],
        "metricsLayout": "COLUMNS",
        "rowOrder": "key_a_to_z",
        "rowTotals": True,
        "row_limit": 50000,
        "slice_id": 72,
        "time_grain_sqla": None,
        "time_range": "100 years ago : now",
        "time_range_endpoints": ["inclusive", "exclusive"],
        "transposePivot": True,
        "url_params": {},
        "valueFormat": "SMART_NUMBER",
        "viz_type": "pivot_table_v2",
    }
    result = copy.deepcopy(RESULT)
    assert apply_post_process(result, form_data) == {
        "query_context": None,
        "queries": [
            {
                "cache_key": "1bd3ab8c01e98a0e349fb61bc76d9b90",
                "cached_dttm": None,
                "cache_timeout": 86400,
                "annotation_data": {},
                "error": None,
                "is_cached": None,
                "query": """SELECT state AS state,
       gender AS gender,
       sum(num) AS \"Births\"
FROM birth_names
WHERE ds >= TO_TIMESTAMP('1921-07-28 00:00:00.000000', 'YYYY-MM-DD HH24:MI:SS.US')
  AND ds < TO_TIMESTAMP('2021-07-28 10:39:44.000000', 'YYYY-MM-DD HH24:MI:SS.US')
GROUP BY state,
         gender
LIMIT 50000;

""",
                "status": QueryStatus.SUCCESS,
                "stacktrace": None,
                "rowcount": 12,
                "colnames": [
                    "boy Births",
                    "boy Subtotal",
                    "girl Births",
                    "girl Subtotal",
                    "Total (Sum as Fraction of Rows)",
                ],
                "coltypes": [
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                    GenericDataType.NUMERIC,
                ],
                "data": """,boy Births,boy Subtotal,girl Births,girl Subtotal,Total (Sum as Fraction of Rows)
CA,0.6035190113962805,0.6035190113962805,0.3964809886037195,0.3964809886037195,1.0
FL,0.5998988615985903,0.5998988615985903,0.4001011384014097,0.4001011384014097,1.0
IL,0.5935315085862012,0.5935315085862012,0.40646849141379887,0.40646849141379887,1.0
MA,0.6041192663655611,0.6041192663655611,0.3958807336344389,0.3958807336344389,1.0
MI,0.5937482960898133,0.5937482960898133,0.4062517039101867,0.4062517039101867,1.0
NJ,0.5995276800165239,0.5995276800165239,0.40047231998347604,0.40047231998347604,1.0
NY,0.6084372844307357,0.6084372844307357,0.39156271556926425,0.39156271556926425,1.0
OH,0.5942152416021308,0.5942152416021308,0.40578475839786915,0.40578475839786915,1.0
PA,0.596724682935987,0.596724682935987,0.40327531706401293,0.40327531706401293,1.0
TX,0.5887794344385264,0.5887794344385264,0.41122056556147357,0.41122056556147357,1.0
other,0.5941503507105172,0.5941503507105172,0.40584964928948275,0.40584964928948275,1.0
Total (Sum as Fraction of Rows),6.576651618170867,6.576651618170867,4.423348381829133,4.423348381829133,11.0
""",
                "applied_filters": [],
                "rejected_filters": [],
            }
        ],
    }


def test_pivot_df_no_cols_no_rows_single_metric():
    """
    Pivot table when no cols/rows and 1 metric are selected.
    """
    # when no cols/rows are selected there are no groupbys in the query,
    # and the data has only the metric(s)
    df = pd.DataFrame.from_dict({"SUM(num)": {0: 80679663}})
    assert (
        df.to_markdown()
        == """
|    |    SUM(num) |
|---:|------------:|
|  0 | 8.06797e+07 |
    """.strip()
    )

    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |    SUM(num) |
|:------------|------------:|
| Total (Sum) | 8.06797e+07 |
    """.strip()
    )

    # tranpose_pivot and combine_metrics do nothing in this case
    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |    SUM(num) |
|:------------|------------:|
| Total (Sum) | 8.06797e+07 |
    """.strip()
    )

    # apply_metrics_on_rows will pivot the table, moving the metrics
    # to rows
    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|          |   Total (Sum) |
|:---------|--------------:|
| SUM(num) |   8.06797e+07 |
    """.strip()
    )

    # showing totals
    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |   ('SUM(num)',) |   ('Total (Sum)',) |
|:------------|----------------:|-------------------:|
| Total (Sum) |     8.06797e+07 |        8.06797e+07 |
    """.strip()
    )


def test_pivot_df_no_cols_no_rows_two_metrics():
    """
    Pivot table when no cols/rows and 2 metrics are selected.
    """
    # when no cols/rows are selected there are no groupbys in the query,
    # and the data has only the metrics
    df = pd.DataFrame.from_dict({"SUM(num)": {0: 80679663}, "MAX(num)": {0: 37296}})
    assert (
        df.to_markdown()
        == """
|    |    SUM(num) |   MAX(num) |
|---:|------------:|-----------:|
|  0 | 8.06797e+07 |      37296 |
    """.strip()
    )

    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |    SUM(num) |   MAX(num) |
|:------------|------------:|-----------:|
| Total (Sum) | 8.06797e+07 |      37296 |
    """.strip()
    )

    # tranpose_pivot and combine_metrics do nothing in this case
    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |    SUM(num) |   MAX(num) |
|:------------|------------:|-----------:|
| Total (Sum) | 8.06797e+07 |      37296 |
    """.strip()
    )

    # apply_metrics_on_rows will pivot the table, moving the metrics
    # to rows
    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|          |     Total (Sum) |
|:---------|----------------:|
| SUM(num) |     8.06797e+07 |
| MAX(num) | 37296           |
    """.strip()
    )

    # when showing totals we only add a column, since adding a row
    # would be redundant
    pivoted = pivot_df(
        df,
        rows=[],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |   ('SUM(num)',) |   ('MAX(num)',) |   ('Total (Sum)',) |
|:------------|----------------:|----------------:|-------------------:|
| Total (Sum) |     8.06797e+07 |           37296 |         8.0717e+07 |
    """.strip()
    )


def test_pivot_df_single_row_two_metrics():
    """
    Pivot table when a single column and 2 metrics are selected.
    """
    df = pd.DataFrame.from_dict(
        {
            "gender": {0: "girl", 1: "boy"},
            "SUM(num)": {0: 118065, 1: 47123},
            "MAX(num)": {0: 2588, 1: 1280},
        }
    )
    assert (
        df.to_markdown()
        == """
|    | gender   |   SUM(num) |   MAX(num) |
|---:|:---------|-----------:|-----------:|
|  0 | girl     |     118065 |       2588 |
|  1 | boy      |      47123 |       1280 |
    """.strip()
    )

    pivoted = pivot_df(
        df,
        rows=["gender"],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| gender   |   SUM(num) |   MAX(num) |
|:---------|-----------:|-----------:|
| boy      |      47123 |       1280 |
| girl     |     118065 |       2588 |
    """.strip()
    )

    # transpose_pivot
    pivoted = pivot_df(
        df,
        rows=["gender"],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| metric      |   ('SUM(num)', 'boy') |   ('SUM(num)', 'girl') |   ('MAX(num)', 'boy') |   ('MAX(num)', 'girl') |
|:------------|----------------------:|-----------------------:|----------------------:|-----------------------:|
| Total (Sum) |                 47123 |                 118065 |                  1280 |                   2588 |
    """.strip()
    )

    # combine_metrics does nothing in this case
    pivoted = pivot_df(
        df,
        rows=["gender"],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| gender   |   SUM(num) |   MAX(num) |
|:---------|-----------:|-----------:|
| boy      |      47123 |       1280 |
| girl     |     118065 |       2588 |
    """.strip()
    )

    # show totals
    pivoted = pivot_df(
        df,
        rows=["gender"],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
|                  |   ('SUM(num)',) |   ('MAX(num)',) |   ('Total (Sum)',) |
|:-----------------|----------------:|----------------:|-------------------:|
| ('boy',)         |           47123 |            1280 |              48403 |
| ('girl',)        |          118065 |            2588 |             120653 |
| ('Total (Sum)',) |          165188 |            3868 |             169056 |
    """.strip()
    )

    # apply_metrics_on_rows
    pivoted = pivot_df(
        df,
        rows=["gender"],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|                          |   Total (Sum) |
|:-------------------------|--------------:|
| ('SUM(num)', 'boy')      |         47123 |
| ('SUM(num)', 'girl')     |        118065 |
| ('SUM(num)', 'Subtotal') |        165188 |
| ('MAX(num)', 'boy')      |          1280 |
| ('MAX(num)', 'girl')     |          2588 |
| ('MAX(num)', 'Subtotal') |          3868 |
| ('Total (Sum)', '')      |        169056 |
    """.strip()
    )

    # apply_metrics_on_rows with combine_metrics
    pivoted = pivot_df(
        df,
        rows=["gender"],
        columns=[],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=True,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|                      |   Total (Sum) |
|:---------------------|--------------:|
| ('boy', 'SUM(num)')  |         47123 |
| ('boy', 'MAX(num)')  |          1280 |
| ('boy', 'Subtotal')  |         48403 |
| ('girl', 'SUM(num)') |        118065 |
| ('girl', 'MAX(num)') |          2588 |
| ('girl', 'Subtotal') |        120653 |
| ('Total (Sum)', '')  |        169056 |
    """.strip()
    )


def test_pivot_df_complex():
    """
    Pivot table when a column, rows and 2 metrics are selected.
    """
    df = pd.DataFrame.from_dict(
        {
            "state": {
                0: "CA",
                1: "CA",
                2: "CA",
                3: "FL",
                4: "CA",
                5: "CA",
                6: "FL",
                7: "FL",
                8: "FL",
                9: "CA",
                10: "FL",
                11: "FL",
            },
            "gender": {
                0: "girl",
                1: "boy",
                2: "girl",
                3: "girl",
                4: "girl",
                5: "girl",
                6: "boy",
                7: "girl",
                8: "girl",
                9: "boy",
                10: "boy",
                11: "girl",
            },
            "name": {
                0: "Amy",
                1: "Edward",
                2: "Sophia",
                3: "Amy",
                4: "Cindy",
                5: "Dawn",
                6: "Edward",
                7: "Sophia",
                8: "Dawn",
                9: "Tony",
                10: "Tony",
                11: "Cindy",
            },
            "SUM(num)": {
                0: 45426,
                1: 31290,
                2: 18859,
                3: 14740,
                4: 14149,
                5: 11403,
                6: 9395,
                7: 7181,
                8: 5089,
                9: 3765,
                10: 2673,
                11: 1218,
            },
            "MAX(num)": {
                0: 2227,
                1: 1280,
                2: 2588,
                3: 854,
                4: 842,
                5: 1157,
                6: 389,
                7: 1187,
                8: 461,
                9: 598,
                10: 247,
                11: 217,
            },
        }
    )
    assert (
        df.to_markdown()
        == """
|    | state   | gender   | name   |   SUM(num) |   MAX(num) |
|---:|:--------|:---------|:-------|-----------:|-----------:|
|  0 | CA      | girl     | Amy    |      45426 |       2227 |
|  1 | CA      | boy      | Edward |      31290 |       1280 |
|  2 | CA      | girl     | Sophia |      18859 |       2588 |
|  3 | FL      | girl     | Amy    |      14740 |        854 |
|  4 | CA      | girl     | Cindy  |      14149 |        842 |
|  5 | CA      | girl     | Dawn   |      11403 |       1157 |
|  6 | FL      | boy      | Edward |       9395 |        389 |
|  7 | FL      | girl     | Sophia |       7181 |       1187 |
|  8 | FL      | girl     | Dawn   |       5089 |        461 |
|  9 | CA      | boy      | Tony   |       3765 |        598 |
| 10 | FL      | boy      | Tony   |       2673 |        247 |
| 11 | FL      | girl     | Cindy  |       1218 |        217 |
    """.strip()
    )

    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
|                    |   ('SUM(num)', 'CA') |   ('SUM(num)', 'FL') |   ('MAX(num)', 'CA') |   ('MAX(num)', 'FL') |
|:-------------------|---------------------:|---------------------:|---------------------:|---------------------:|
| ('boy', 'Edward')  |                31290 |                 9395 |                 1280 |                  389 |
| ('boy', 'Tony')    |                 3765 |                 2673 |                  598 |                  247 |
| ('girl', 'Amy')    |                45426 |                14740 |                 2227 |                  854 |
| ('girl', 'Cindy')  |                14149 |                 1218 |                  842 |                  217 |
| ('girl', 'Dawn')   |                11403 |                 5089 |                 1157 |                  461 |
| ('girl', 'Sophia') |                18859 |                 7181 |                 2588 |                 1187 |
    """.strip()
    )

    # transpose_pivot
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
| state   |   ('SUM(num)', 'boy', 'Edward') |   ('SUM(num)', 'boy', 'Tony') |   ('SUM(num)', 'girl', 'Amy') |   ('SUM(num)', 'girl', 'Cindy') |   ('SUM(num)', 'girl', 'Dawn') |   ('SUM(num)', 'girl', 'Sophia') |   ('MAX(num)', 'boy', 'Edward') |   ('MAX(num)', 'boy', 'Tony') |   ('MAX(num)', 'girl', 'Amy') |   ('MAX(num)', 'girl', 'Cindy') |   ('MAX(num)', 'girl', 'Dawn') |   ('MAX(num)', 'girl', 'Sophia') |
|:--------|--------------------------------:|------------------------------:|------------------------------:|--------------------------------:|-------------------------------:|---------------------------------:|--------------------------------:|------------------------------:|------------------------------:|--------------------------------:|-------------------------------:|---------------------------------:|
| CA      |                           31290 |                          3765 |                         45426 |                           14149 |                          11403 |                            18859 |                            1280 |                           598 |                          2227 |                             842 |                           1157 |                             2588 |
| FL      |                            9395 |                          2673 |                         14740 |                            1218 |                           5089 |                             7181 |                             389 |                           247 |                           854 |                             217 |                            461 |                             1187 |
    """.strip()
    )

    # combine_metrics
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
|                    |   ('CA', 'SUM(num)') |   ('CA', 'MAX(num)') |   ('FL', 'SUM(num)') |   ('FL', 'MAX(num)') |
|:-------------------|---------------------:|---------------------:|---------------------:|---------------------:|
| ('boy', 'Edward')  |                31290 |                 1280 |                 9395 |                  389 |
| ('boy', 'Tony')    |                 3765 |                  598 |                 2673 |                  247 |
| ('girl', 'Amy')    |                45426 |                 2227 |                14740 |                  854 |
| ('girl', 'Cindy')  |                14149 |                  842 |                 1218 |                  217 |
| ('girl', 'Dawn')   |                11403 |                 1157 |                 5089 |                  461 |
| ('girl', 'Sophia') |                18859 |                 2588 |                 7181 |                 1187 |
    """.strip()
    )

    # show totals
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
|                      |   ('SUM(num)', 'CA') |   ('SUM(num)', 'FL') |   ('SUM(num)', 'Subtotal') |   ('MAX(num)', 'CA') |   ('MAX(num)', 'FL') |   ('MAX(num)', 'Subtotal') |   ('Total (Sum)', '') |
|:---------------------|---------------------:|---------------------:|---------------------------:|---------------------:|---------------------:|---------------------------:|----------------------:|
| ('boy', 'Edward')    |                31290 |                 9395 |                      40685 |                 1280 |                  389 |                       1669 |                 42354 |
| ('boy', 'Tony')      |                 3765 |                 2673 |                       6438 |                  598 |                  247 |                        845 |                  7283 |
| ('boy', 'Subtotal')  |                35055 |                12068 |                      47123 |                 1878 |                  636 |                       2514 |                 49637 |
| ('girl', 'Amy')      |                45426 |                14740 |                      60166 |                 2227 |                  854 |                       3081 |                 63247 |
| ('girl', 'Cindy')    |                14149 |                 1218 |                      15367 |                  842 |                  217 |                       1059 |                 16426 |
| ('girl', 'Dawn')     |                11403 |                 5089 |                      16492 |                 1157 |                  461 |                       1618 |                 18110 |
| ('girl', 'Sophia')   |                18859 |                 7181 |                      26040 |                 2588 |                 1187 |                       3775 |                 29815 |
| ('girl', 'Subtotal') |                89837 |                28228 |                     118065 |                 6814 |                 2719 |                       9533 |                127598 |
| ('Total (Sum)', '')  |               124892 |                40296 |                     165188 |                 8692 |                 3355 |                      12047 |                177235 |
    """.strip()
    )

    # apply_metrics_on_rows
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|                                |    CA |    FL |
|:-------------------------------|------:|------:|
| ('SUM(num)', 'boy', 'Edward')  | 31290 |  9395 |
| ('SUM(num)', 'boy', 'Tony')    |  3765 |  2673 |
| ('SUM(num)', 'girl', 'Amy')    | 45426 | 14740 |
| ('SUM(num)', 'girl', 'Cindy')  | 14149 |  1218 |
| ('SUM(num)', 'girl', 'Dawn')   | 11403 |  5089 |
| ('SUM(num)', 'girl', 'Sophia') | 18859 |  7181 |
| ('MAX(num)', 'boy', 'Edward')  |  1280 |   389 |
| ('MAX(num)', 'boy', 'Tony')    |   598 |   247 |
| ('MAX(num)', 'girl', 'Amy')    |  2227 |   854 |
| ('MAX(num)', 'girl', 'Cindy')  |   842 |   217 |
| ('MAX(num)', 'girl', 'Dawn')   |  1157 |   461 |
| ('MAX(num)', 'girl', 'Sophia') |  2588 |  1187 |
    """.strip()
    )

    # apply_metrics_on_rows with combine_metrics
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=False,
        combine_metrics=True,
        show_rows_total=False,
        show_columns_total=False,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|                                |    CA |    FL |
|:-------------------------------|------:|------:|
| ('boy', 'Edward', 'SUM(num)')  | 31290 |  9395 |
| ('boy', 'Edward', 'MAX(num)')  |  1280 |   389 |
| ('boy', 'Tony', 'SUM(num)')    |  3765 |  2673 |
| ('boy', 'Tony', 'MAX(num)')    |   598 |   247 |
| ('girl', 'Amy', 'SUM(num)')    | 45426 | 14740 |
| ('girl', 'Amy', 'MAX(num)')    |  2227 |   854 |
| ('girl', 'Cindy', 'SUM(num)')  | 14149 |  1218 |
| ('girl', 'Cindy', 'MAX(num)')  |   842 |   217 |
| ('girl', 'Dawn', 'SUM(num)')   | 11403 |  5089 |
| ('girl', 'Dawn', 'MAX(num)')   |  1157 |   461 |
| ('girl', 'Sophia', 'SUM(num)') | 18859 |  7181 |
| ('girl', 'Sophia', 'MAX(num)') |  2588 |  1187 |
    """.strip()
    )

    # everything
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum",
        transpose_pivot=True,
        combine_metrics=True,
        show_rows_total=True,
        show_columns_total=True,
        apply_metrics_on_rows=True,
    )
    assert (
        pivoted.to_markdown()
        == """
|                     |   ('boy', 'Edward') |   ('boy', 'Tony') |   ('boy', 'Subtotal') |   ('girl', 'Amy') |   ('girl', 'Cindy') |   ('girl', 'Dawn') |   ('girl', 'Sophia') |   ('girl', 'Subtotal') |   ('Total (Sum)', '') |
|:--------------------|--------------------:|------------------:|----------------------:|------------------:|--------------------:|-------------------:|---------------------:|-----------------------:|----------------------:|
| ('CA', 'SUM(num)')  |               31290 |              3765 |                 35055 |             45426 |               14149 |              11403 |                18859 |                  89837 |                124892 |
| ('CA', 'MAX(num)')  |                1280 |               598 |                  1878 |              2227 |                 842 |               1157 |                 2588 |                   6814 |                  8692 |
| ('CA', 'Subtotal')  |               32570 |              4363 |                 36933 |             47653 |               14991 |              12560 |                21447 |                  96651 |                133584 |
| ('FL', 'SUM(num)')  |                9395 |              2673 |                 12068 |             14740 |                1218 |               5089 |                 7181 |                  28228 |                 40296 |
| ('FL', 'MAX(num)')  |                 389 |               247 |                   636 |               854 |                 217 |                461 |                 1187 |                   2719 |                  3355 |
| ('FL', 'Subtotal')  |                9784 |              2920 |                 12704 |             15594 |                1435 |               5550 |                 8368 |                  30947 |                 43651 |
| ('Total (Sum)', '') |               42354 |              7283 |                 49637 |             63247 |               16426 |              18110 |                29815 |                 127598 |                177235 |
    """.strip()
    )

    # fraction
    pivoted = pivot_df(
        df,
        rows=["gender", "name"],
        columns=["state"],
        metrics=["SUM(num)", "MAX(num)"],
        aggfunc="Sum as Fraction of Columns",
        transpose_pivot=False,
        combine_metrics=False,
        show_rows_total=False,
        show_columns_total=True,
        apply_metrics_on_rows=False,
    )
    assert (
        pivoted.to_markdown()
        == """
|                                            |   ('SUM(num)', 'CA') |   ('SUM(num)', 'FL') |   ('MAX(num)', 'CA') |   ('MAX(num)', 'FL') |
|:-------------------------------------------|---------------------:|---------------------:|---------------------:|---------------------:|
| ('boy', 'Edward')                          |            0.250536  |            0.23315   |            0.147262  |            0.115946  |
| ('boy', 'Tony')                            |            0.030146  |            0.0663341 |            0.0687989 |            0.0736215 |
| ('boy', 'Subtotal')                        |            0.280683  |            0.299484  |            0.216061  |            0.189568  |
| ('girl', 'Amy')                            |            0.363722  |            0.365793  |            0.256213  |            0.254545  |
| ('girl', 'Cindy')                          |            0.11329   |            0.0302263 |            0.0968707 |            0.0646796 |
| ('girl', 'Dawn')                           |            0.0913029 |            0.12629   |            0.133111  |            0.137407  |
| ('girl', 'Sophia')                         |            0.151002  |            0.178206  |            0.297745  |            0.3538    |
| ('girl', 'Subtotal')                       |            0.719317  |            0.700516  |            0.783939  |            0.810432  |
| ('Total (Sum as Fraction of Columns)', '') |            1         |            1         |            1         |            1         |
    """.strip()
    )
