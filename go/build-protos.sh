#!/bin/bash

cd protos

# protoc -I=. *.proto \
#   --js_out=import_style=commonjs:../frontend/src/protos \
#   --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../frontend/src/protos
#   # --grpc-web_out=import_style=typescript,mode=grpcwebtext:../frontend/src/protos

PROTOC_GEN_TS_PATH="../frontend/node_modules/.bin/protoc-gen-ts"
 
# Directory to write generated code to (.js and .d.ts files) 
OUT_DIR="../frontend/src/protos"
 
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=true:${OUT_DIR}" \
    *.proto

protoc --go_out=plugins=grpc:. *.proto

cd ..
# rm -f protos/*.js

# protoc --go_out=plugins=grpc:./protos/built protos/*.proto