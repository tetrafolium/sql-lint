FROM sandrokeil/typescript AS sqllint-task

### Install golang ...
RUN apk add --update --no-cache ruby && \
    echo "+++ $(ruby --version)"

### Install sql-lint tool ...
RUN npm install -g sql-lint && \
    echo "+++ sql-lint .. $(sql-lint --version)"

ENV REPOPATH="github.com/tetrafolium/sql-lint"
ENV REPODIR="/.src/${REPOPATH}"

ARG OUTDIR
ENV OUTDIR="${OUTDIR:-"/.reports"}"

RUN mkdir -p "${REPODIR}" "${OUTDIR}"
COPY . "${REPODIR}"
WORKDIR "${REPODIR}"

### Run sql-lint ...
RUN ( find . -type f -name '*.sql' -print0 | xargs -0 -n 1 sql-lint --format simple ) \
        > "${OUTDIR}/sql-lint.issues.unix" || true
RUN ls -la "${OUTDIR}"

### Convert EOL in output of sql-lint.
RUN ruby -pe 'sub("\n", "\r\n")' < "${OUTDIR}/sql-lint.issues.unix" > "${OUTDIR}/sql-lint.issues.dos"
RUN ruby -pe 'sub("\n", "\r")'   < "${OUTDIR}/sql-lint.issues.unix" > "${OUTDIR}/sql-lint.issues.mac"
RUN ls -la "${OUTDIR}"
