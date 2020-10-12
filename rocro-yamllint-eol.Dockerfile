FROM python:3-alpine AS yamllint-task

### Install golang and ruby ...
RUN apk add --update --no-cache ruby && \
    echo "+++ $(ruby --version)"

### Install yamllint tool ...
RUN pip3 install 'yamllint>=1.24.0,<1.25.0' && \
    echo "+++ $(yamllint --version)"

ENV REPOPATH="github.com/tetrafolium/sql-lint"
ENV REPODIR="/.src/${REPOPATH}"

ARG OUTDIR
ENV OUTDIR="${OUTDIR:-"/.reports"}"

RUN mkdir -p "${REPODIR}" "${OUTDIR}"
COPY . "${REPODIR}"
WORKDIR "${REPODIR}"

### Run yamllint ...
RUN yamllint -f parsable . > "${OUTDIR}/yamllint.issues.unix" || true

### Convert EOL in output of yamllint.
RUN ruby -pe 'sub("\n", "\r\n")' \
        < "${OUTDIR}/yamllint.issues.unix" > "${OUTDIR}/yamllint.issues.dos"
RUN ruby -pe 'sub("\n", "\r")' \
        < "${OUTDIR}/yamllint.issues.unix" > "${OUTDIR}/yamllint.issues.mac"
RUN ls -la "${OUTDIR}"
