
UUID=gestureImprovements@gestures
EXTENSIONDIR=build/extension
BUILDIR=build
ZIPPATH=${PWD}/${BUILDIR}/${UUID}.shell-extension.zip
DESTDIR=${HOME}/.local/share/gnome-shell/extensions/${UUID}
UPDATE_CMD = gnome-extensions install -f ${ZIPPATH}
ifdef FLATPAK_ID
	UPDATE_CMD = flatpak-spawn --host gnome-extensions install -f ${ZIPPATH}
endif

pack:
	cp metadata.json $(EXTENSIONDIR)
	cp -r extension/ui extension/schemas $(EXTENSIONDIR)
	glib-compile-schemas ${EXTENSIONDIR}/schemas
	rm -f ${ZIPPATH}
	cd ${EXTENSIONDIR} && zip -r ${ZIPPATH} .

update:
	${UPDATE_CMD}

build-tests: build/tests/prefs.js
	node ${BUILDIR}/scripts/transpile.js --dir ${BUILDIR}/tests --type app
	@npx eslint build/tests --fix
	
compile-schemas: extension/schemas/*.xml
	@cp -r extension/schemas ${DESTDIR}/schemas
	glib-compile-schemas ${DESTDIR}/schemas

test-ui: build-tests compile-schemas
	gjs build/tests/prefs.js
