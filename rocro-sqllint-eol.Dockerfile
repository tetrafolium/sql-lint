FROM sandrokeil/typescript AS sqllint-task

### Install ruby ...
RUN apk add --update --no-cache ruby && \
    echo "+++ $(ruby --version)"

### Install sql-lint tool ...
RUN npm install -g sql-lint && \
    echo "+++ sql-lint .. $(sql-lint --version)"

ENV TOOLNAME="sql-lint"
ENV REPOPATH="github.com/tetrafolium/${TOOLNAME}"
ENV REPODIR="/.src/${REPOPATH}"

ARG OUTDIR
ENV OUTDIR="${OUTDIR:-"/.reports"}"
ENV OUTFILE="${OUTDIR}/${TOOLNAME}-issues"

RUN mkdir -p "${REPODIR}" "${OUTDIR}"
COPY . "${REPODIR}"
WORKDIR "${REPODIR}"

### Run sql-lint ...
RUN ( find . -type f -name '*.sql' -print0 | xargs -0 -n 1 sql-lint --format simple ) \
        > "${OUTFILE}.unix" || true
RUN ls -la "${OUTDIR}"

### Convert EOL in outfile.
RUN ruby -pe 'sub("\n", "\r\n")' < "${OUTFILE}.unix" > "${OUTFILE}.dos"
RUN ruby -pe 'sub("\n", "\r")'   < "${OUTFILE}.unix" > "${OUTFILE}.mac"
RUN ls -la "${OUTDIR}"
