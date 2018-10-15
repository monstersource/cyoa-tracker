##  options

set -euo pipefail

if [ $# -eq 0 ]; then
    echo "0 arguments given"
    exit
fi

dev="dev"
out="docs"

watch() {
    trash ./$dev &
    tsc --noEmit --preserveWatchOutput --watch src/ts/*.ts &
    browser-sync start -s $dev -w -f $dev --no-open --no-ghost-mode --no-ui --no-online &
    parcel watch -d $dev --public-url "." --log-level 4 --no-hmr --no-autoinstall src/index.pug
}

build () {
    trash ./$out &
    parcel build -d $out --public-url "." --log-level 4 --no-autoinstall --no-source-maps --experimental-scope-hoisting src/index.pug
}

eval "$@"
