<div align="right">
    <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/guinsoolab-badge.png" width="60" alt="badge">
    <br />
</div>
<div align="center">
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/spotrix.svg" width="120" alt="logo" />
  <br/>
  <small>a modern, enterprise-ready business intelligence web application</small>
</div>

# [Spotrix](https://ciusji.gitbook.io/spotrix/)

![](https://img.shields.io/github/repo-size/Spotrix/spotrix)
![](https://img.shields.io/github/license/Spotrix/spotrix)
![](https://img.shields.io/github/v/tag/Spotrix/spotrix)

[Introduction](https://ciusji.gitbook.io/spotrix/) | 
[Installation](https://ciusji.gitbook.io/spotrix/installing/installing-from-source) | 
[Configuration](https://ciusji.gitbook.io/spotrix/congiguration/basic-configuration) | 
[Creating Charts](https://ciusji.gitbook.io/spotrix/creating-charts/creating-your-charts) | 
[APIs](https://ciusji.gitbook.io/spotrix/appendix/api) | 
[FAQ](https://ciusji.gitbook.io/spotrix/appendix/faq)

A modern, enterprise-ready business intelligence web application.

![spotrix-overview](https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/spotrix-overview.gif)


## Features

- **Embedded and server modes & disk-based or in-memory databases**: Interactive data analysis, e.g. [Joining & aggregate](https://ciusji.gitbook.io/guinsoo/reference/aggregate) multiple large tables, so simple and fast.
- **Powerful yet easy to use**: Quickly and easily integrate and explore your data, using either our simple no-code viz builder or state-of-the-art SQL IDE.
- **Integrates with modern databases**: _Spotrix_ can connect to any SQL based datasource through SQLAlchemy, including modern cloud native databases and engines at petabyte scale.
- **Modern architecture**: Spotrix is lightweight and highly scalable, leveraging the power of your existing data infrastructure without requiring yet another ingestion layer.
- **Rich visualizations and dashboards**: Spotrix ships with a wide array of beautiful visualizations. Our visualization plug-in architecture makes it easy to build custom visualizations that drop directly into Spotrix.


## Quickstart

Firstly, Install & run your spotrix server with python3 env:
```shell
pip install spotrix
spotrix init
spotrix run
```
Then, open your browser with http://localhost:5000, enjoying your explore.


## Why Spotrix?

Spotrix provides:

- An intuitive interface for visualizing datasets and
  crafting interactive dashboards
- A wide array of beautiful visualizations to showcase your data
- Code-free visualization builder to extract and present datasets
- A world-class SQL IDE for preparing data for visualization, including a rich metadata browser
- A lightweight semantic layer which empowers data analysts to quickly define custom dimensions and metrics
- Out-of-the-box support for most SQL-speaking databases
- Seamless, in-memory asynchronous caching and queries
- An extensible security model that allows configuration of very intricate rules
  on who can access which product features and datasets.
- Integration with major
  authentication backends (database, OpenID, LDAP, OAuth, REMOTE_USER, etc)
- The ability to add custom visualization plugins
- An API for programmatic customization
- A cloud-native architecture designed from the ground up for scale

![spotrix-ecosystem](https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/persona-decision-enablers-full-width.png)

Spotrix is cloud-native and designed to be highly available. It was designed to scale out to large, distributed 
environment and works very well inside containers. While you can easily test drive Spotrix on a modest setup or simple 
on your laptop, there's virtually no limit around scaling out the platform.

Spotrix is also cloud-naive in the sense that it is flexible and lets you choose the:

* Web server (Gunicorn, Nginx)
* Metadata database engine (MySQL, Postgres, MariaDB, Sqlite, [Guinsoo 🚀](https://github.com/ciusji/guinsoo), etc)
* Message queue (Redis, RabbitMQ, etc)
* Results backend (S3, MinIO, [AnnaStore 🌈](https://github.com/GuinsooLab/annastore), etc)

Spotrix also works well with services like [LeonaLog](https://github.com/LeonaLog), NewRelic, StatsD and DataDog, and has the 
ability to run analytic workloads against most popular database technologies.


## Supported Databases

Spotrix can query data from any SQL-speaking datastore or data engine (e.g. Presto or Athena) that has a Python DB-API driver and a SQLAlchemy dialect.

Here are some of the major database solutions that are supported:

<div align="center">
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/redshift.png" alt="redshift" border="0" width="106" height="41" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/google-biquery.png" alt="google-biquery" border="0" width="114" height="43" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/snowflake.png" alt="snowflake" border="0" width="152" height="46" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/trino.png" alt="trino" border="0" width="46" height="46" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/presto.png" alt="presto" border="0" width="152" height="46" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/druid.png" alt="druid" border="0" width="135" height="37" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/postgresql.png" alt="postgresql" border="0" width="132" height="81" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/mysql.png" alt="mysql" border="0" width="119" height="62" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/guinsoolab-stack.jpg" alt="guinsoolab-stack" border="0" width="46" height="46" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/mssql-server.png" alt="mssql-server" border="0" width="93" height="74" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/db2.png" alt="db2" border="0" width="62" height="62" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/sqlite.png" alt="sqlite" border="0" width="102" height="45" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/sybase.png" alt="sybase" border="0" width="128" height="47" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/mariadb.png" alt="mariadb" border="0" width="83" height="63" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/vertica.png" alt="vertica" border="0" width="128" height="40" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/oracle.png" alt="oracle" border="0" width="121" height="66" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/firebird.png" alt="firebird" border="0" width="86" height="56" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/greenplum.png" alt="greenplum" border="0" width="140" height="45" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/clickhouse.png" alt="clickhouse" border="0" width="140" height="37" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/exasol.png" alt="exasol" border="0" width="106" height="59" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/minds.svg" alt="minds" border="0" width="62" height="62" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/guinsoo.png" alt="guinsoo" border="0" width="62" height="46" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/monet-db.png" alt="monet-db" border="0" width="106" height="46" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/apache-kylin.png" alt="apache-kylin" border="0" width="56" height="64" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/hologres.png" alt="hologres" border="0" width="71" height="64" />
  <img src="https://raw.githubusercontent.com/Spotrix/spotrix/main/spotrix-frontend/images/netezza.png" alt="netezza" border="0" width="64" height="64" />
</div>

**A more comprehensive list of supported databases** along with the configuration instructions can be found
[here](https://guinsoolab.github.io/glab/#/app/home).

Want to add support for your datastore or data engine? Read more [here](https://guinsoolab.github.io/glab/#/app/home) about the technical requirements.

## License

[Apache 2.0](./LICENSE.txt)
