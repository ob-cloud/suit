echo '***********************'
echo 'update files from repo....'
echo ''
git pull --tags origin master

echo ''
echo '***********************'
echo 'push  files to  repo...'
echo ''
ggit init
git add -A
git commit -m '自动打包构建发布'
git push origin master:master
