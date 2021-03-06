/**
 * Generated by Verge3D Puzzles v.3.8.1
 * Mon Nov 01 2021 20:26:11 GMT-0500 (hora estándar de Perú)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

"use strict";

(function () {
  // global variables/constants used by puzzles' functions

  var LIST_NONE = "<none>";

  var _pGlob = {};

  _pGlob.objCache = {};
  _pGlob.fadeAnnotations = true;
  _pGlob.pickedObject = "";
  _pGlob.hoveredObject = "";
  _pGlob.mediaElements = {};
  _pGlob.loadedFile = "";
  _pGlob.states = [];
  _pGlob.percentage = 0;
  _pGlob.openedFile = "";
  _pGlob.xrSessionAcquired = false;
  _pGlob.xrSessionCallbacks = [];
  _pGlob.screenCoords = new v3d.Vector2();
  _pGlob.intervalTimers = {};

  _pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
  _pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
  _pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
  _pGlob.MIN_DRAG_SCALE = 10e-4;
  _pGlob.SET_OBJ_ROT_EPS = 1e-8;

  _pGlob.vec2Tmp = new v3d.Vector2();
  _pGlob.vec2Tmp2 = new v3d.Vector2();
  _pGlob.vec3Tmp = new v3d.Vector3();
  _pGlob.vec3Tmp2 = new v3d.Vector3();
  _pGlob.vec3Tmp3 = new v3d.Vector3();
  _pGlob.vec3Tmp4 = new v3d.Vector3();
  _pGlob.eulerTmp = new v3d.Euler();
  _pGlob.eulerTmp2 = new v3d.Euler();
  _pGlob.quatTmp = new v3d.Quaternion();
  _pGlob.quatTmp2 = new v3d.Quaternion();
  _pGlob.colorTmp = new v3d.Color();
  _pGlob.mat4Tmp = new v3d.Matrix4();
  _pGlob.planeTmp = new v3d.Plane();
  _pGlob.raycasterTmp = new v3d.Raycaster();

  var PL = (v3d.PL = v3d.PL || {});

  // a more readable alias for PL (stands for "Puzzle Logic")
  v3d.puzzles = PL;

  PL.procedures = PL.procedures || {};

  PL.execInitPuzzles = function (options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
      initOptions: {
        fadeAnnotations: true,
        useBkgTransp: false,
        preserveDrawBuf: false,
        useCompAssets: false,
        useFullscreen: true,
        useCustomPreloader: false,
        preloaderStartCb: function () {},
        preloaderProgressCb: function () {},
        preloaderEndCb: function () {},
      },
    };

    // provide the container's id to puzzles that need access to the container
    _initGlob.container =
      options !== undefined && "container" in options ? options.container : "";

    var PROC = {};

    // utility functions envoked by the HTML puzzles
    function getElements(ids, isParent) {
      var elems = [];
      if (
        Array.isArray(ids) &&
        ids[0] != "CONTAINER" &&
        ids[0] != "WINDOW" &&
        ids[0] != "DOCUMENT" &&
        ids[0] != "BODY" &&
        ids[0] != "QUERYSELECTOR"
      ) {
        for (var i = 0; i < ids.length; i++)
          elems.push(getElement(ids[i], isParent));
      } else {
        elems.push(getElement(ids, isParent));
      }
      return elems;
    }

    function getElement(id, isParent) {
      var elem;
      if (Array.isArray(id) && id[0] == "CONTAINER") {
        if (appInstance !== null) {
          elem = appInstance.container;
        } else if (typeof _initGlob !== "undefined") {
          // if we are on the initialization stage, we still can have access
          // to the container element
          var id = _initGlob.container;
          if (isParent) {
            elem = parent.document.getElementById(id);
          } else {
            elem = document.getElementById(id);
          }
        }
      } else if (Array.isArray(id) && id[0] == "WINDOW") {
        if (isParent) elem = parent;
        else elem = window;
      } else if (Array.isArray(id) && id[0] == "DOCUMENT") {
        if (isParent) elem = parent.document;
        else elem = document;
      } else if (Array.isArray(id) && id[0] == "BODY") {
        if (isParent) elem = parent.document.body;
        else elem = document.body;
      } else if (Array.isArray(id) && id[0] == "QUERYSELECTOR") {
        if (isParent) elem = parent.document.querySelector(id);
        else elem = document.querySelector(id);
      } else {
        if (isParent) elem = parent.document.getElementById(id);
        else elem = document.getElementById(id);
      }
      return elem;
    }

    // setHTMLElemAttribute puzzle
    function setHTMLElemAttribute(attr, value, ids, isParent) {
      var elems = getElements(ids, isParent);
      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem) continue;

        if (attr === "style") {
          // NOTE: setting an attribute 'style' instead of a property 'style'
          // fixes IE11 wrong behavior
          elem.setAttribute(attr, value);
        } else if (
          (attr == "href" || attr == "src") &&
          value instanceof Promise
        ) {
          // resolve promise value for url-based attributes
          value.then(function (response) {
            elem[attr] = response;
          });
        } else {
          elem[attr] = value;
        }
      }
    }

    // setHTMLElemStyle puzzle
    function setHTMLElemStyle(prop, value, ids, isParent) {
      var elems = getElements(ids, isParent);
      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style) continue;
        elem.style[prop] = value;
      }
    }

    // initSettings puzzle
    _initGlob.output.initOptions.fadeAnnotations = true;
    _initGlob.output.initOptions.useBkgTransp = false;
    _initGlob.output.initOptions.preserveDrawBuf = false;
    _initGlob.output.initOptions.useCompAssets = true;
    _initGlob.output.initOptions.useFullscreen = false;

    // initPreloader puzzle
    _initGlob.output.initOptions.useCustomPreloader = true;
    _initGlob.output.initOptions.preloaderStartCb = function () {
      _initGlob.percentage = 0;
      (function () {})();
    };
    _initGlob.output.initOptions.preloaderProgressCb = function (percentage) {
      _initGlob.percentage = percentage;
      (function () {
        setHTMLElemAttribute(
          "innerHTML",
          String(Math.round(_initGlob.percentage)) + "%",
          "percentage",
          false
        );
        setHTMLElemAttribute(
          "style",
          [
            "stroke-dashoffset: ",
            472 - (472 * Math.round(_initGlob.percentage)) / 100,
            ";",
          ].join(""),
          "circle",
          false
        );
      })();
    };
    _initGlob.output.initOptions.preloaderEndCb = function () {
      _initGlob.percentage = 100;
      (function () {
        setHTMLElemStyle("display", "none", "preloader_screen", false);
      })();
    };

    return _initGlob.output;
  };

  PL.init = function (appInstance, initOptions) {
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = appInstance;

    initOptions = initOptions || {};

    if ("fadeAnnotations" in initOptions) {
      _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
    }

    var PROC = {};

    // utility function envoked by almost all V3D-specific puzzles
    // filter off some non-mesh types
    function notIgnoredObj(obj) {
      return (
        obj.type !== "AmbientLight" &&
        obj.name !== "" &&
        !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
        !obj.isAuxClippingMesh
      );
    }

    // utility function envoked by almost all V3D-specific puzzles
    // find first occurence of the object by its name
    function getObjectByName(objName) {
      var objFound;
      var runTime = _pGlob !== undefined;
      objFound = runTime ? _pGlob.objCache[objName] : null;

      if (objFound && objFound.name === objName) return objFound;

      appInstance.scene.traverse(function (obj) {
        if (!objFound && notIgnoredObj(obj) && obj.name == objName) {
          objFound = obj;
          if (runTime) {
            _pGlob.objCache[objName] = objFound;
          }
        }
      });
      return objFound;
    }

    // utility function envoked by almost all V3D-specific puzzles
    // retrieve all objects on the scene
    function getAllObjectNames() {
      var objNameList = [];
      appInstance.scene.traverse(function (obj) {
        if (notIgnoredObj(obj)) objNameList.push(obj.name);
      });
      return objNameList;
    }

    // utility function envoked by almost all V3D-specific puzzles
    // retrieve all objects which belong to the group
    function getObjectNamesByGroupName(targetGroupName) {
      var objNameList = [];
      appInstance.scene.traverse(function (obj) {
        if (notIgnoredObj(obj)) {
          var groupNames = obj.groupNames;
          if (!groupNames) return;
          for (var i = 0; i < groupNames.length; i++) {
            var groupName = groupNames[i];
            if (groupName == targetGroupName) {
              objNameList.push(obj.name);
            }
          }
        }
      });
      return objNameList;
    }

    // utility function envoked by almost all V3D-specific puzzles
    // process object input, which can be either single obj or array of objects, or a group
    function retrieveObjectNames(objNames) {
      var acc = [];
      retrieveObjectNamesAcc(objNames, acc);
      return acc.filter(function (name) {
        return name;
      });
    }

    function retrieveObjectNamesAcc(currObjNames, acc) {
      if (typeof currObjNames == "string") {
        acc.push(currObjNames);
      } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++) acc.push(newObj[i]);
      } else if (
        Array.isArray(currObjNames) &&
        currObjNames[0] == "ALL_OBJECTS"
      ) {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++) acc.push(newObj[i]);
      } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
          retrieveObjectNamesAcc(currObjNames[i], acc);
      }
    }

    // outline puzzle
    function outline(objSelector, doWhat) {
      var objNames = retrieveObjectNames(objSelector);

      if (
        !appInstance.postprocessing ||
        !appInstance.postprocessing.outlinePass
      )
        return;
      var outlineArray = appInstance.postprocessing.outlinePass.selectedObjects;
      for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        var obj = getObjectByName(objName);
        if (!obj) continue;
        if (doWhat == "ENABLE") {
          if (outlineArray.indexOf(obj) == -1) outlineArray.push(obj);
        } else {
          var index = outlineArray.indexOf(obj);
          if (index > -1) outlineArray.splice(index, 1);
        }
      }
    }

    // utility function used by the whenClicked, whenHovered and whenDraggedOver puzzles
    function initObjectPicking(
      callback,
      eventType,
      mouseDownUseTouchStart,
      mouseButtons
    ) {
      var elem = appInstance.renderer.domElement;
      elem.addEventListener(eventType, pickListener);
      if (v3d.PL.editorEventListeners)
        v3d.PL.editorEventListeners.push([elem, eventType, pickListener]);

      if (eventType == "mousedown") {
        var touchEventName = mouseDownUseTouchStart ? "touchstart" : "touchend";
        elem.addEventListener(touchEventName, pickListener);
        if (v3d.PL.editorEventListeners)
          v3d.PL.editorEventListeners.push([
            elem,
            touchEventName,
            pickListener,
          ]);
      } else if (eventType == "dblclick") {
        var prevTapTime = 0;

        function doubleTapCallback(event) {
          var now = new Date().getTime();
          var timesince = now - prevTapTime;

          if (timesince < 600 && timesince > 0) {
            pickListener(event);
            prevTapTime = 0;
            return;
          }

          prevTapTime = new Date().getTime();
        }

        var touchEventName = mouseDownUseTouchStart ? "touchstart" : "touchend";
        elem.addEventListener(touchEventName, doubleTapCallback);
        if (v3d.PL.editorEventListeners)
          v3d.PL.editorEventListeners.push([
            elem,
            touchEventName,
            doubleTapCallback,
          ]);
      }

      var raycaster = new v3d.Raycaster();

      function pickListener(event) {
        // to handle unload in loadScene puzzle
        if (!appInstance.getCamera()) return;

        event.preventDefault();

        var xNorm = 0,
          yNorm = 0;
        if (event instanceof MouseEvent) {
          if (mouseButtons && mouseButtons.indexOf(event.button) == -1) return;
          xNorm = event.offsetX / elem.clientWidth;
          yNorm = event.offsetY / elem.clientHeight;
        } else if (event instanceof TouchEvent) {
          var rect = elem.getBoundingClientRect();
          xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
          yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
        }

        _pGlob.screenCoords.x = xNorm * 2 - 1;
        _pGlob.screenCoords.y = -yNorm * 2 + 1;
        raycaster.setFromCamera(
          _pGlob.screenCoords,
          appInstance.getCamera(true)
        );
        var objList = [];
        appInstance.scene.traverse(function (obj) {
          objList.push(obj);
        });
        var intersects = raycaster.intersectObjects(objList);
        callback(intersects, event);
      }
    }

    function objectsIncludeObj(objNames, testedObjName) {
      if (!testedObjName) return false;

      for (var i = 0; i < objNames.length; i++) {
        if (testedObjName == objNames[i]) {
          return true;
        } else {
          // also check children which are auto-generated for multi-material objects
          var obj = getObjectByName(objNames[i]);
          if (obj && obj.type == "Group") {
            for (var j = 0; j < obj.children.length; j++) {
              if (testedObjName == obj.children[j].name) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    // utility function used by the whenClicked, whenHovered, whenDraggedOver, and raycast puzzles
    function getPickedObjectName(obj) {
      // auto-generated from a multi-material object, use parent name instead
      if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
        return obj.parent.name;
      } else {
        return obj.name;
      }
    }

    // whenHovered puzzle
    initObjectPicking(
      function (intersects, event) {
        var prevHovered = _pGlob.hoveredObject;
        var currHovered = "";

        // the event might happen before hover registration
        _pGlob.objHoverInfo = _pGlob.objHoverInfo || [];

        // search for closest hovered object

        var lastIntersectIndex = Infinity;
        _pGlob.objHoverInfo.forEach(function (el) {
          var maxIntersects = el.xRay
            ? intersects.length
            : Math.min(1, intersects.length);

          for (var i = 0; i < maxIntersects; i++) {
            var obj = intersects[i].object;
            var objName = getPickedObjectName(obj);

            if (
              objectsIncludeObj(retrieveObjectNames(el.objSelector), objName) &&
              i <= lastIntersectIndex
            ) {
              currHovered = objName;
              lastIntersectIndex = i;
            }
          }
        });

        if (prevHovered == currHovered) return;

        // first - all "out" callbacks, then - all "over"
        _pGlob.objHoverInfo.forEach(function (el) {
          if (
            objectsIncludeObj(retrieveObjectNames(el.objSelector), prevHovered)
          ) {
            // ensure the correct value of the hoveredObject block
            _pGlob.hoveredObject = prevHovered;
            el.callbacks[1](event);
          }
        });

        _pGlob.objHoverInfo.forEach(function (el) {
          if (
            objectsIncludeObj(retrieveObjectNames(el.objSelector), currHovered)
          ) {
            // ensure the correct value of the hoveredObject block
            _pGlob.hoveredObject = currHovered;
            el.callbacks[0](event);
          }
        });

        _pGlob.hoveredObject = currHovered;
      },
      "mousemove",
      false
    );

    // whenHovered puzzle
    function registerOnHover(objSelector, xRay, cbOver, cbOut) {
      _pGlob.objHoverInfo = _pGlob.objHoverInfo || [];

      _pGlob.objHoverInfo.push({
        objSelector: objSelector,
        callbacks: [cbOver, cbOut],
        xRay: xRay,
      });
    }

    function findUniqueObjectName(name) {
      function objNameUsed(name) {
        return Boolean(getObjectByName(name));
      }
      while (objNameUsed(name)) {
        var r = name.match(/^(.*?)(\d+)$/);
        if (!r) {
          name += "2";
        } else {
          name = r[1] + (parseInt(r[2], 10) + 1);
        }
      }
      return name;
    }

    // addAnnotation and removeAnnotation puzzles
    function handleAnnot(add, annot, objSelector, contents, id, name) {
      var objNames = retrieveObjectNames(objSelector);

      for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName) continue;
        var obj = getObjectByName(objName);
        if (!obj) continue;
        // check if it already has an annotation and remove it
        for (var j = 0; j < obj.children.length; j++) {
          var child = obj.children[j];
          if (child.type == "Annotation") {
            // delete all childs of annotation
            child.traverse(function (child2) {
              if (child2.isAnnotation) child2.dispose();
            });
            obj.remove(child);
          }
        }
        if (add) {
          var aObj = new v3d.Annotation(appInstance.container, annot, contents);
          aObj.name = findUniqueObjectName(name ? name : annot);
          aObj.fadeObscured = _pGlob.fadeAnnotations;
          if (id) {
            aObj.annotation.id = id;
            aObj.annotationDialog.id = id + "_dialog";
          }
          obj.add(aObj);
        }
      }
    }

    registerOnHover(
      "hidro_1_mesh",
      false,
      function () {
        outline("hidro_1_mesh", "ENABLE");
      },
      function () {
        outline("hidro_1_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "hidro_2_mesh",
      false,
      function () {
        outline("hidro_2_mesh", "ENABLE");
      },
      function () {
        outline("hidro_2_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "Circle.014",
      false,
      function () {
        outline("Circle.014", "ENABLE");
      },
      function () {
        outline("Circle.014", "DISABLE");
      }
    );
    registerOnHover(
      "laguna_suches_mesh",
      false,
      function () {
        outline("laguna_suches_mesh", "ENABLE");
      },
      function () {
        outline("laguna_suches_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "lake_viña",
      false,
      function () {
        outline("lake_viña", "ENABLE");
      },
      function () {
        outline("lake_viña", "DISABLE");
      }
    );
    registerOnHover(
      "reservorio_antiguo_mesh",
      false,
      function () {
        outline("reservorio_antiguo_mesh", "ENABLE");
      },
      function () {
        outline("reservorio_antiguo_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "reservorio_nuevo_mesh",
      false,
      function () {
        outline("reservorio_nuevo_mesh", "ENABLE");
      },
      function () {
        outline("reservorio_nuevo_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "tanque_212_mesh",
      false,
      function () {
        outline("tanque_212_mesh", "ENABLE");
      },
      function () {
        outline("tanque_212_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "toquepala_mesh",
      false,
      function () {
        outline("toquepala_mesh", "ENABLE");
      },
      function () {
        outline("toquepala_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "toquepala_mesh",
      false,
      function () {
        outline("toquepala_mesh", "ENABLE");
      },
      function () {
        outline("toquepala_mesh", "DISABLE");
      }
    );

    handleAnnot(
      true,
      "",
      "vw1",
      "VW1 - Estacion de bombeo (Pozo)",
      "1",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tw2a",
      "TW2A - Estacion de bombeo (Pozo)",
      "2",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tw3",
      "TW3 - Estacion de bombeo (Pozo)",
      "3",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tw4",
      "TW4 - Estacion de bombeo (Pozo)",
      "4",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tw6",
      "TW6 - Estacion de bombeo (Pozo)",
      "5",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp11",
      "TP11 - Estacion de bombeo (Pozo)",
      "6",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp12",
      "TP12 - Estacion de bombeo (Pozo)",
      "7",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp15",
      "TP15 - Estacion de bombeo (Pozo)",
      "8",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp3a",
      "TP3A - Estacion de bombeo (Pozo)",
      "9",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp14",
      "TP14 - Estacion de bombeo (Pozo)",
      "10",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp5",
      "TP5 - Estacion de bombeo (Pozo)",
      "11",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp8",
      "TP8 - Estacion de bombeo (Pozo)",
      "12",
      undefined
    );
    handleAnnot(
      true,
      "",
      "tp9a",
      "TP9A - Estacion de bombeo (Pozo)",
      "13",
      undefined
    );
    handleAnnot(
      true,
      "",
      "vw2",
      "VW2 - Estacion de bombeo (Pozo)",
      "14",
      undefined
    );
    handleAnnot(
      true,
      "",
      "vw3",
      "VW3 - Estacion de bombeo (Pozo)",
      "15",
      undefined
    );
    handleAnnot(
      true,
      "",
      "vw4",
      "VW4 - Estacion de bombeo (Pozo)",
      "16",
      undefined
    );

    registerOnHover(
      "barcaza_cuajone_mesh",
      false,
      function () {
        outline("barcaza_cuajone_mesh", "ENABLE");
      },
      function () {
        outline("barcaza_cuajone_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "barcaza_toquepala_mesh",
      false,
      function () {
        outline("barcaza_toquepala_mesh", "ENABLE");
      },
      function () {
        outline("barcaza_toquepala_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "bombas_mesh",
      false,
      function () {
        outline("bombas_mesh", "ENABLE");
      },
      function () {
        outline("bombas_mesh", "DISABLE");
      }
    );
    registerOnHover(
      "cuajone_mesh",
      false,
      function () {
        outline("cuajone_mesh", "ENABLE");
      },
      function () {
        outline("cuajone_mesh", "DISABLE");
      }
    );
  }; // end of PL.init function
})(); // end of closure

/* ================================ end of code ============================= */
