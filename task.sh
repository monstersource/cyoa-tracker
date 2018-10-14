##  options

set -euo pipefail

if [ $# -eq 0 ]; then
    echo "0 arguments given"
    exit
fi

watch() {
    trash ./docs &&
    tsc --noEmit --preserveWatchOutput --watch src/ts/*.ts &
    browser-sync start -s docs -w -f docs --no-open --no-ghost-mode --no-ui --no-online &
    parcel watch -d docs --public-url "/cyoa-tracker/" --log-level 4 --no-hmr --no-autoinstall src/index.pug
}

eval "$@"
