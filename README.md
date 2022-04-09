# myserieslist

## Environment setup

You can either setup a local development environment by installing the required tools or use a Dev Container.

[Visual Studio Code](https://code.visualstudio.com) is the recommanded code editor.

### Backend

> JEE/EJB + JAX-RS

**Folder:** `backend/`

**Required:** [JavaSE-11](https://adoptium.net) and [Maven](https://maven.apache.org) (Java project manager)

To launch the [WildFly](https://www.wildfly.org) server: `mvn wildfly:run`\
or in VS Code:
_Command Palette_ (`Ctrl+Shift+P`/`F1`) > _Tasks: Run Task_ > _backend: run_

To redeploy the application after changes: `mvn wildfly:deploy`\
or in VS Code: _Tasks: Run Build Task_ (`Ctrl+Shift+B`)

### Frontend

> Next.js (React) + TailwindCSS + TypeScript

**Folder:** `frontend/`

**Required:** [Node.js](https://nodejs.dev)

Install the Node.js dependancies: `npm install`

To launch the [Next.js](https://nextjs.org) dev server: `npm run dev`\
or in VS Code (with [debugging](https://code.visualstudio.com/docs/editor/debugging)): _Start Debugging_ (`F5`)

The dev server features [_Fast Refresh_](https://nextjs.org/docs/basic-features/fast-refresh) (instantaneous feedback on edits).

### Dev Container

**Required:** [Code](https://code.visualstudio.com) and [Developing inside a Container – Getting started](https://code.visualstudio.com/docs/remote/containers#_getting-started)

The provided [devcontainer.json](/.devcontainer/devcontainer.json) automatically setup an isolated environment to develop with VS Code.

## Resources

- [Visual Studio Code](https://code.visualstudio.com/docs)
- Backend: [Maven](https://maven.apache.org), [WildFly](https://www.wildfly.org), [WildFly Maven Plugin](https://docs.jboss.org/wildfly/plugins/maven/latest/)
- Frontend: [React](https://reactjs.org), [Next.js](https://nextjs.org), [TailwindCSS](https://tailwindcss.com), [TypeScript](https://www.typescriptlang.org)
