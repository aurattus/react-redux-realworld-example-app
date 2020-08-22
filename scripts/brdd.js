const simpleGit = require("simple-git");

const git = simpleGit();

git.diff(["--name-only", "HEAD^1"]).then(console.log);

const example = `diff --git a/README.md b/README.md
index 1928820..776ea0a 100644
--- a/README.md
+++ b/README.md
@@ -1,5 +1,7 @@
 # ![React + Redux Example App](project-logo.png)

+[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](http://realworld.io)
+
 > ### React + Redux codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

 <a href="https://stackblitz.com/edit/react-redux-realworld" target="_blank"><img width="187" src="https://github.com/gothinkster/realworld/blob/master/media/edit_on_blitz.png?raw=true" /></a>&nbsp;&nbsp;<a href="https://thinkster.io/tutorials/build-a-real-world-react-redux-application" target="_blank"><img width="384" src="https://raw.githubusercontent.com/gothinkster/realworld/master/media/learn-btn-hr.png" /></a>
- /* @BRDD 1 */
diff --git a/package.json b/package.json
index 9680bc6..37de3e3 100644
--- a/package.json
+++ b/package.json
@@ -4,7 +4,9 @@
   "private": true,
   "devDependencies": {
     "cross-env": "^5.1.4",
-    "react-scripts": "1.1.1"
+    "husky": "^4.2.5",
+    "react-scripts": "1.1.1",
+    "simple-git": "^2.19.0"
+    // @BRDD 1
   },
   "dependencies": {
     "history": "^4.6.3",
@@ -27,5 +29,10 @@
     "build": "react-scripts build",
     "test": "cross-env PORT=4100 react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
+  },
+  "husky": {
+    "hooks": {
+      "post-commit": "node scripts/brdd.js"
+    }
   }
 }`;

const extractInfo = (diff) => {
  // Detect what files are modified
  const fileChangeRegx = /--- a\/(.*)\s\+\+\+ b\/(.*)/g;
  const filesLocation = [];
  let result;

  while ((result = fileChangeRegx.exec(diff)) !== null) {
    filesLocation.unshift(result);
  }

  // Check if there are added tags
  // TODO keep searching until there are no more
  let index = diff.search(/\+\s+(\/\/|\/\*)\s+@BRDD/g);
  if (index) {
    // Search in witch file could it be
    const match = filesLocation.find((m) => m.index < index);
    if (match) {
      console.log("Tag Added on ", match[1]);
    }
  }
  
  // Check if there are removed tags
  // TODO keep searching until there are no more
  index = diff.search(/\-\s+(\/\/|\/\*)\s+@BRDD/g);
  if (index) {
    // Search in witch file could it be
    const match = filesLocation.find((m) => m.index < index);
    if (match) {
      console.log("Tag Removed on ", match[1]);
    }
  }
};

extractInfo(example);
