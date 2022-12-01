# MIT License
# 
# Copyright (c) 2021 Bingqi Ji
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

import sqlalchemy
from sqlalchemy import Table, Column, String, MetaData

engine = sqlalchemy.create_engine('postgresql://sa:sa@localhost:5435/xxx')

with engine.connect() as connection:
    metadata = MetaData()
    tables = Table('tables', metadata,
                   Column('table_schema', String),
                   Column('table_name', String),
                   schema='information_schema')
    results = connection.execute(
        tables.select().where(tables.c.table_schema == 'pg_catalog'))
    for result in results:
        print(result)

# Create
engine.execute("CREATE TABLE IF NOT EXISTS films (title text, director text, year_yy text)")
engine.execute("INSERT INTO films (title, director, year_yy) VALUES ('Doctor Strange', 'Scott Derrickson', '2016')")

# Read
result_set = engine.execute("SELECT * FROM films")
for r in result_set:
    print(r)

# Update
engine.execute("UPDATE films SET title='Some2016Film' WHERE year_yy='2016'")

# Delete
engine.execute("DELETE FROM films WHERE year_yy='2016'")


# import duckdb
#
# cursor = duckdb.connect()
# print(cursor.execute('SELECT 42').fetchall())
