FROM python:3-alpine AS yamllint-task

### Install ruby ...
RUN apk add --update --no-cache ruby && \
    echo "+++ $(ruby --version)"

### Install yamllint tool ...
RUN pip3 install 'yamllint>=1.24.0,<1.25.0' && \
    echo "+++ $(yamllint --version)"

ENV TOOLNAME="yamllint"
ENV REPOPATH="github.com/tetrafolium/${TOOLNAME}"
ENV REPODIR="/.src/${REPOPATH}"

ARG OUTDIR
ENV OUTDIR="${OUTDIR:-"/.reports"}"
ENV OUTFILE="${OUTDIR}/${TOOLNAME}-issues"

RUN mkdir -p "${REPODIR}" "${OUTDIR}"
COPY . "${REPODIR}"
WORKDIR "${REPODIR}"

### Run yamllint ...
RUN yamllint -f parsable . > "${OUTFILE}.unix" || true

### Convert EOL in outfile.
RUN ruby -pe 'sub("\n", "\r\n")' < "${OUTFILE}.unix" > "${OUTFILE}.dos"
RUN ruby -pe 'sub("\n", "\r")'   < "${OUTFILE}.unix" > "${OUTFILE}.mac"
RUN ls -la "${OUTDIR}"
