#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-blog-platform-336294-336323/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

