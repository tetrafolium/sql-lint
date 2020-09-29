FROM sandrokeil/typescript AS sqllint-task

### Install golang ...
RUN apk add --update --no-cache go && \
    echo "+++ $(go version)"

ENV GOBIN="$GOROOT/bin" \
    GOPATH="/.go" \
    PATH="${GOPATH}/bin:/usr/local/go/bin:$PATH"

### Install sql-lint tool ...
RUN npm install -g sql-lint && \
    echo "+++ sql-lint .. $(sql-lint --version)"

ENV REPOPATH="github.com/tetrafolium/sql-lint" \
    TOOLPATH="github.com/tetrafolium/inspecode-tasks"
ENV REPODIR="${GOPATH}/src/${REPOPATH}" \
    TOOLDIR="${GOPATH}/src/${TOOLPATH}"

### Get inspecode-tasks tool ...
RUN go get -u "${TOOLPATH}" || true

ARG OUTDIR
ENV OUTDIR="${OUTDIR:-"/.reports"}"

RUN mkdir -p "${REPODIR}" "${OUTDIR}"
COPY . "${REPODIR}"
WORKDIR "${REPODIR}"

### Run sql-lint ...
RUN sql-lint --format simple . > "${OUTDIR}/sql-lint.issues" || true
RUN ls -la "${OUTDIR}"

### Convert sql-lint issues to SARIF ...
RUN go run "${TOOLDIR}/sqllint/cmd/main.go" "${REPOPATH}" \
        < "${OUTDIR}/sql-lint.issues" \
        > "${OUTDIR}/sql-lint.sarif"
RUN ls -la "${OUTDIR}"
