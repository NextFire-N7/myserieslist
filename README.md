# myserieslist

## Environment setup

You can either setup a local development environment by installing the required tools or use a Dev Container.

[Visual Studio Code](https://code.visualstudio.com) is the recommanded code editor.

### Backend

> JEE/EJB + JAX-RS + MySQL

**Folder:** `backend/`

**Required:** [JavaSE-11](https://adoptium.net), [Maven](https://maven.apache.org) (Java project manager) and [MySQL](https://www.mysql.com) (see [Database configuration](#database-configuration))

To launch the [WildFly](https://www.wildfly.org) server: `mvn wildfly:run`\
or in VS Code:
_Command Palette_ (`Ctrl+Shift+P`/`F1`) > _Tasks: Run Task_ > _backend: run_

To redeploy the application after changes: `mvn wildfly:deploy`\
or in VS Code: _Tasks: Run Build Task_ (`Ctrl+Shift+B`)

### Frontend

> Next.js (React) + TailwindCSS + TypeScript

**Folder:** `frontend/`

**Required:** [Node.js](https://nodejs.dev)

Install the Node.js dependancies: `npm ci`

To launch the [Next.js](https://nextjs.org) dev server: `npm run dev`\
or in VS Code (with [debugging](https://code.visualstudio.com/docs/editor/debugging)): _Start Debugging_ (`F5`)

The dev server features [_Fast Refresh_](https://nextjs.org/docs/basic-features/fast-refresh) (instantaneous feedback on edits).

### Dev Container

**Required:** [Code](https://code.visualstudio.com) and [Developing inside a Container – Getting started](https://code.visualstudio.com/docs/remote/containers#_getting-started)

The provided [devcontainer.json](/.devcontainer/devcontainer.json) automatically setup an isolated environment to develop with VS Code.

### Database configuration

Launch a MySQL instance with Docker:

```shell
$ docker run -d --name msl-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql
```

Create the database:

```shell
$ docker exec -it msl-mysql mysql -p
Enter password: password
mysql> CREATE DATABASE myserieslist;
```

Edit `backend/target/wildfly-26.0.1.Final/standalone/configuration/standalone.xml` and add the following datasource configuration under `<datasources>...</datasources>`:

```xml
<datasource jndi-name="java:/MySqlDS" pool-name="MySqlDS">
    <connection-url>jdbc:mysql://localhost:3306/myserieslist</connection-url>
    <driver-class>com.mysql.cj.jdbc.Driver</driver-class>
    <driver>myserieslist.war_com.mysql.cj.jdbc.Driver_8_0</driver>
    <security>
        <user-name>root</user-name>
        <password>password</password>
    </security>
    <validation>
        <valid-connection-checker class-name="org.jboss.jca.adapters.jdbc.extensions.mysql.MySQLValidConnectionChecker"/>
        <validate-on-match>true</validate-on-match>
        <exception-sorter class-name="org.jboss.jca.adapters.jdbc.extensions.mysql.MySQLExceptionSorter"/>
    </validation>
</datasource>
```

Relaunch the WildFly server.

## Resources

- [Visual Studio Code](https://code.visualstudio.com/docs)
- Backend: [Maven](https://maven.apache.org), [WildFly](https://www.wildfly.org), [WildFly Maven Plugin](https://docs.jboss.org/wildfly/plugins/maven/latest/)
- Frontend: [React](https://reactjs.org), [Next.js](https://nextjs.org), [TailwindCSS](https://tailwindcss.com), [TypeScript](https://www.typescriptlang.org)
