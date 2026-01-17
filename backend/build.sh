#!/bin/bash
docker build -t ghcr.io/gammons/wprb-rocks:$1 .
docker push ghcr.io/gammons/wprb-rocks:$1
