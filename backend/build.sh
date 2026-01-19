#!/bin/bash
docker build -t ghcr.io/gammons/wprb-rocks:latest .
docker push ghcr.io/gammons/wprb-rocks:latest
