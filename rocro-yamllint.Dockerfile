FROM python:3-alpine AS yamllint-task

### Install tools ...
RUN apk add --update --no-cache git go && \
    echo "+++ $(git version)" && \
    echo "+++ $(go version)"

ENV GOBIN="$GOROOT/bin" \
    GOPATH="/.go" \
    PATH="${GOPATH}/bin:/usr/local/go/bin:$PATH"

### Install yamllint tool ...
RUN pip3 install 'yamllint>=1.24.0,<1.25.0' && \
    echo "+++ $(yamllint --version)"

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

### Run yamllint ...
RUN yamllint -f parsable . > "${OUTDIR}/yamllint.issues" || true
RUN ls -la "${OUTDIR}"

### Convert yamllint issues to SARIF ...
RUN go run "${TOOLDIR}/yamllint/cmd/main.go" "${REPOPATH}" \
        < "${OUTDIR}/yamllint.issues" \
        > "${OUTDIR}/yamllint.sarif"
RUN ls -la "${OUTDIR}"
