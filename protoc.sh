#!/bin/bash
protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_opt=addGrpcMetadata=true \
--ts_proto_opt=addNestjsRestParameter=true \
--ts_proto_opt=nestJs=true \
--ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false \
--ts_proto_out=src/proto-interfaces \
--proto_path=./src/_submodules/calculator/ \
./src/_submodules/calculator/*.proto
