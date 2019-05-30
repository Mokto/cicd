#!/bin/bash

cd protos

protoc --go_out=plugins=grpc:. *.proto

cp *.proto ../../api/src/grpc

cd ..
