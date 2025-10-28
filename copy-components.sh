 #!/usr/bin/env bash
set -e 

rm -rf packages/web-demo-client/public/dot-assets/document
rm -rf packages/web-demo-client/public/dot-assets/face
rm -rf packages/web-demo-client/public/dot-assets/magnifeye
rm -rf packages/web-demo-client/public/dot-assets/smile

rm -rf packages/ocr-demo-client/public/dot-assets/document

cp -r packages/web-demo-client/node_modules/@innovatrics/dot-document-auto-capture/dot-assets/document packages/web-demo-client/public/dot-assets
cp -r packages/web-demo-client/node_modules/@innovatrics/dot-face-auto-capture/dot-assets/face packages/web-demo-client/public/dot-assets
cp -r packages/web-demo-client/node_modules/@innovatrics/dot-magnifeye-liveness/dot-assets/magnifeye packages/web-demo-client/public/dot-assets
cp -r packages/web-demo-client/node_modules/@innovatrics/dot-smile-liveness/dot-assets/smile packages/web-demo-client/public/dot-assets

cp -r packages/ocr-demo-client/node_modules/@innovatrics/dot-document-auto-capture/dot-assets/document packages/ocr-demo-client/public/dot-assets