(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["openpifpafwebdemo"] = factory();
	else
		root["openpifpafwebdemo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/src/clientside.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/src/camera.ts":
/*!**************************!*\
  !*** ./js/src/camera.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultCapabilities = { audio: false, video: { width: 640, height: 480 } };
class Camera {
    constructor(ui) {
        this.ui = ui;
        this.video = ui.getElementsByTagName('video')[0];
        this.captureCanvas = ui.getElementsByTagName('canvas')[0];
        this.originalCaptureCanvasSize = [this.captureCanvas.width,
            this.captureCanvas.height];
        this.captureContext = this.captureCanvas.getContext('2d');
        this.buttonNextCamera = ui.getElementsByClassName('nextCamera')[0];
        this.captureCounter = 0;
        navigator.mediaDevices.enumerateDevices().then(devices => {
            console.log(devices);
            this.cameraIds = devices
                .filter(device => device.kind === 'videoinput')
                .map(device => device.deviceId);
            // On iOS, all deviceId and label for devices are empty.
            // So making up labels here that should be used for facingMode instead.
            if (this.cameraIds.length >= 2 && this.cameraIds.every(i => i === '')) {
                this.cameraIds = ['user', 'environment'];
            }
        }).catch(function (err) {
            console.log(err.name + ': ' + err.message);
        });
        this.setCamera();
        this.buttonNextCamera.onclick = this.nextCamera.bind(this);
    }
    setCamera(cameraId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cameraId && cameraId === this.cameraId)
                return;
            let capabilities = Object.assign({}, defaultCapabilities, { video: Object.assign({}, defaultCapabilities.video) });
            if (cameraId === 'user' || cameraId === 'environment') {
                capabilities.video.facingMode = cameraId;
            }
            else {
                capabilities.video.deviceId = cameraId;
            }
            const stream = yield navigator.mediaDevices.getUserMedia(capabilities);
            this.video.srcObject = stream;
            this.cameraId = cameraId;
        });
    }
    imageData() {
        // update capture canvas size
        const landscape = this.video.clientWidth > this.video.clientHeight;
        const targetSize = landscape ? this.originalCaptureCanvasSize : this.originalCaptureCanvasSize.slice().reverse();
        if (this.captureCanvas.width !== targetSize[0])
            this.captureCanvas.width = targetSize[0];
        if (this.captureCanvas.height !== targetSize[1])
            this.captureCanvas.height = targetSize[1];
        // capture
        this.captureCounter += 1;
        this.captureContext.drawImage(this.video, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
        return { image_id: this.captureCounter, image: this.captureCanvas.toDataURL() };
    }
    nextCamera() {
        let nextCameraId = undefined;
        if (this.cameraId && this.cameraIds.length > 1) {
            const currentCameraIndex = this.cameraIds.indexOf(this.cameraId);
            let nextCameraIndex = currentCameraIndex + 1;
            if (nextCameraIndex >= this.cameraIds.length)
                nextCameraIndex = 0;
            nextCameraId = this.cameraIds[nextCameraIndex];
        }
        else if (this.cameraIds.length > 1) {
            // assume the default (unset this.cameraId) was camera 0, so go to 1
            nextCameraId = this.cameraIds[1];
        }
        else {
            nextCameraId = this.cameraIds[0];
        }
        this.setCamera(nextCameraId);
    }
}
exports.Camera = Camera;


/***/ }),

/***/ "./js/src/clientside.ts":
/*!******************************!*\
  !*** ./js/src/clientside.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global document */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const camera_1 = __webpack_require__(/*! ./camera */ "./js/src/camera.ts");
const visualization_1 = __webpack_require__(/*! ./visualization */ "./js/src/visualization.ts");
const onnx = __webpack_require__(/*! onnxjs */ "./node_modules/onnxjs/dist/onnx.min.js");
const ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js");
const ops = __webpack_require__(/*! ndarray-ops */ "./node_modules/ndarray-ops/ndarray-ops.js");
let backend_location = '';
if (document.location.search && document.location.search[0] === '?') {
    backend_location = document.location.search.substr(1);
}
if (!backend_location && document.location.hostname === 'vita-epfl.github.io') {
    backend_location = 'https://vitademo.epfl.ch';
}
const fpsSpan = document.getElementById('fps');
let captureCounter = 0;
let fps = 0.0;
let lastProcessing = null;
const c = new camera_1.Camera(document.getElementById('capture'));
const vis = new visualization_1.Visualization(document.getElementById('visualization'));
vis.markerSize = 10;
function drawFields(image, modelOutput) {
    const pifC = modelOutput.get('pif_c');
    const pifR = modelOutput.get('pif_r');
    const pafC = modelOutput.get('paf_c');
    const pafR1 = modelOutput.get('paf_r1');
    const pafR2 = modelOutput.get('paf_r2');
    console.log({ pifC });
    vis.drawFields(image, pifC, pifR, pafC, pafR1, pafR2, 0.8);
}
function preProcess(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const { data, width, height } = imageData;
    const dataTensor = ndarray(data, [height, width, 4]);
    // const dataTensor = ndtranspose(dataTensorT);
    const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [1, 3, height, width]);
    ops.assign(dataProcessedTensor.pick(0, 0, null, null), dataTensor.pick(null, null, 0));
    ops.assign(dataProcessedTensor.pick(0, 1, null, null), dataTensor.pick(null, null, 1));
    ops.assign(dataProcessedTensor.pick(0, 2, null, null), dataTensor.pick(null, null, 2));
    ops.divseq(dataProcessedTensor, 255);
    ops.subseq(dataProcessedTensor.pick(0, 0, null, null), 0.485);
    ops.subseq(dataProcessedTensor.pick(0, 1, null, null), 0.456);
    ops.subseq(dataProcessedTensor.pick(0, 2, null, null), 0.406);
    ops.divseq(dataProcessedTensor.pick(0, 0, null, null), 0.229);
    ops.divseq(dataProcessedTensor.pick(0, 1, null, null), 0.224);
    ops.divseq(dataProcessedTensor.pick(0, 2, null, null), 0.225);
    const tensor = new onnx.Tensor(new Float32Array(3 * height * width), 'float32', [1, 3, height, width]);
    tensor.data.set(dataProcessedTensor.data);
    console.log({ width, height });
    return tensor;
}
// load the ONNX model
let session = null;
let modelLoaded = null;
const modelSelectorDiv = document.getElementById('model-selector');
function loadModel(modelData) {
    modelLoaded = null;
    session = new onnx.InferenceSession({ backendHint: 'webgl' });
    session.loadModel(modelData.url).then(() => { modelLoaded = modelData; });
}
// wire up model selection ui
const inputElements = modelSelectorDiv.getElementsByTagName('input');
for (let radioElement of inputElements) {
    radioElement.onchange = (ev) => {
        console.log(radioElement.dataset);
        loadModel({ name: radioElement.dataset.name, url: radioElement.dataset.url });
    };
}
inputElements[0].checked = true;
inputElements[0].onchange(null);
function newImageOnnx() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!modelLoaded) {
            console.log('model not loaded yet');
            yield new Promise(resolve => setTimeout(() => resolve(), 200));
            return;
        }
        // generate model input
        const data = c.imageData();
        const inferenceInputs = preProcess(c.captureContext);
        const [n_batch, n_colors, height, width] = inferenceInputs.dims;
        if (height > width) {
            alert('use landscape mode');
            return;
        }
        // execute the model
        console.log('about to run new session');
        const startSession = Date.now();
        let output = null;
        try {
            output = yield session.run([inferenceInputs]);
        }
        catch (err) {
            console.error(err.message);
            alert(err.message);
            return;
        }
        console.log({ 'nn done': Date.now() - startSession });
        if (lastProcessing != null) {
            const duration = Date.now() - lastProcessing;
            console.log({ duration });
            fps = 0.5 * fps + 0.5 * (1000.0 / duration);
            fpsSpan.textContent = `${fps.toFixed(1)}`;
        }
        lastProcessing = Date.now();
        // process output
        drawFields(data.image, output);
    });
}
exports.newImageOnnx = newImageOnnx;
function loop_forever() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            yield newImageOnnx();
            yield new Promise(resolve => requestAnimationFrame(() => resolve()));
        }
    });
}
loop_forever();


/***/ }),

/***/ "./js/src/visualization.ts":
/*!*********************************!*\
  !*** ./js/src/visualization.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COCO_PERSON_SKELETON = [
    [16, 14], [14, 12], [17, 15], [15, 13], [12, 13], [6, 12], [7, 13],
    [6, 7], [6, 8], [7, 9], [8, 10], [9, 11], [2, 3], [1, 2], [1, 3],
    [2, 4], [3, 5], [4, 6], [5, 7]
];
const COLORS = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5',
];
class Visualization {
    constructor(ui) {
        this.canvas = ui.getElementsByTagName('canvas')[0];
        this.originalCanvasSize = [this.canvas.width, this.canvas.height];
        this.context = this.canvas.getContext('2d');
        this.lineWidth = 10;
        this.markerSize = 4;
    }
    draw(image, data) {
        const scores = data.map((entry) => entry.score);
        // adjust height of output canvas
        if (data && data.length > 0) {
            const landscape = data[0].width_height[0] > data[0].width_height[1];
            const targetSize = landscape ? this.originalCanvasSize : this.originalCanvasSize.slice().reverse();
            if (this.canvas.width !== targetSize[0])
                this.canvas.width = targetSize[0];
            if (this.canvas.height !== targetSize[1])
                this.canvas.height = targetSize[1];
        }
        // draw on output canvas
        const canvasImage = new Image();
        canvasImage.onload = () => {
            this.context.drawImage(canvasImage, 0, 0, this.canvas.width, this.canvas.height);
            data.forEach((entry) => this.drawSkeleton(entry.coordinates, entry.detection_id));
        };
        canvasImage.src = image;
    }
    drawSkeletonLines(keypoints) {
        COCO_PERSON_SKELETON.forEach((joint_pair, connection_index) => {
            const [joint1i, joint2i] = joint_pair;
            const joint1xyv = keypoints[joint1i - 1];
            const joint2xyv = keypoints[joint2i - 1];
            const color = COLORS[connection_index % COLORS.length];
            this.context.strokeStyle = color;
            this.context.lineWidth = this.lineWidth;
            if (joint1xyv[2] === 0.0 || joint2xyv[2] === 0.0)
                return;
            this.context.beginPath();
            this.context.moveTo(joint1xyv[0] * this.canvas.width, joint1xyv[1] * this.canvas.height);
            this.context.lineTo(joint2xyv[0] * this.canvas.width, joint2xyv[1] * this.canvas.height);
            this.context.stroke();
        });
    }
    drawSkeleton(keypoints, detection_id) {
        this.drawSkeletonLines(keypoints);
        keypoints.forEach((xyv, joint_id) => {
            if (xyv[2] === 0.0)
                return;
            this.context.beginPath();
            this.context.fillStyle = '#ffffff';
            this.context.arc(xyv[0] * this.canvas.width, xyv[1] * this.canvas.height, this.markerSize, 0, 2 * Math.PI);
            this.context.fill();
        });
    }
    drawFields(image, pifC, pifR, pafC, pafR1, pafR2, threshold) {
        // adjust height of output canvas
        const landscape = pifC.dims[3] > pifC.dims[2];
        const targetSize = landscape ? this.originalCanvasSize : this.originalCanvasSize.slice().reverse();
        if (this.canvas.width !== targetSize[0])
            this.canvas.width = targetSize[0];
        if (this.canvas.height !== targetSize[1])
            this.canvas.height = targetSize[1];
        // draw on output canvas
        const canvasImage = new Image();
        canvasImage.onload = () => {
            this.context.drawImage(canvasImage, 0, 0, this.canvas.width, this.canvas.height);
            const xScale = this.canvas.width / (pifC.dims[3] - 1);
            const yScale = this.canvas.height / (pifC.dims[2] - 1);
            for (let ii = 0; ii < pafC.dims[2]; ++ii) {
                for (let jj = 0; jj < pafC.dims[3]; ++jj) {
                    for (let kk = 0; kk < pafC.dims[1]; ++kk) {
                        const v = pafC.get(0, kk, ii, jj);
                        if (v < threshold)
                            continue;
                        const fx1 = jj + pafR1.get(0, kk, 0, ii, jj);
                        const fy1 = ii + pafR1.get(0, kk, 1, ii, jj);
                        const fx2 = jj + pafR2.get(0, kk, 0, ii, jj);
                        const fy2 = ii + pafR2.get(0, kk, 1, ii, jj);
                        this.context.beginPath();
                        this.context.lineWidth = this.lineWidth;
                        this.context.strokeStyle = COLORS[kk];
                        this.context.moveTo(fx1 * xScale, fy1 * yScale);
                        this.context.lineTo(fx2 * xScale, fy2 * yScale);
                        this.context.stroke();
                    }
                }
            }
            for (let ii = 0; ii < pifC.dims[2]; ++ii) {
                for (let jj = 0; jj < pifC.dims[3]; ++jj) {
                    for (let ll = 0; ll < pifC.dims[1]; ++ll) {
                        const v = pifC.get(0, ll, ii, jj);
                        if (v < threshold)
                            continue;
                        this.context.beginPath();
                        this.context.fillStyle = '#fff';
                        const fx = jj + pifR.get(0, ll, 0, ii, jj);
                        const fy = ii + pifR.get(0, ll, 1, ii, jj);
                        this.context.arc(fx * xScale, fy * yScale, (v - threshold) / threshold * this.markerSize, 0, 2 * Math.PI);
                        this.context.fill();
                    }
                }
            }
        };
        canvasImage.src = image;
    }
}
exports.Visualization = Visualization;


/***/ }),

/***/ "./node_modules/cwise-compiler/compiler.js":
/*!*************************************************!*\
  !*** ./node_modules/cwise-compiler/compiler.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createThunk = __webpack_require__(/*! ./lib/thunk.js */ "./node_modules/cwise-compiler/lib/thunk.js");

function Procedure() {
  this.argTypes = [];
  this.shimArgs = [];
  this.arrayArgs = [];
  this.arrayBlockIndices = [];
  this.scalarArgs = [];
  this.offsetArgs = [];
  this.offsetArgIndex = [];
  this.indexArgs = [];
  this.shapeArgs = [];
  this.funcName = "";
  this.pre = null;
  this.body = null;
  this.post = null;
  this.debug = false;
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure(); //Parse blocks

  proc.pre = user_args.pre;
  proc.body = user_args.body;
  proc.post = user_args.post; //Parse arguments

  var proc_args = user_args.args.slice(0);
  proc.argTypes = proc_args;

  for (var i = 0; i < proc_args.length; ++i) {
    var arg_type = proc_args[i];

    if (arg_type === "array" || typeof arg_type === "object" && arg_type.blockIndices) {
      proc.argTypes[i] = "array";
      proc.arrayArgs.push(i);
      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0);
      proc.shimArgs.push("array" + i);

      if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array args");
      }

      if (i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array args");
      }
    } else if (arg_type === "scalar") {
      proc.scalarArgs.push(i);
      proc.shimArgs.push("scalar" + i);
    } else if (arg_type === "index") {
      proc.indexArgs.push(i);

      if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index");
      }

      if (i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index");
      }

      if (i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index");
      }
    } else if (arg_type === "shape") {
      proc.shapeArgs.push(i);

      if (i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape");
      }

      if (i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape");
      }

      if (i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape");
      }
    } else if (typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset";
      proc.offsetArgs.push({
        array: arg_type.array,
        offset: arg_type.offset
      });
      proc.offsetArgIndex.push(i);
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i]);
    }
  } //Make sure at least one array argument was specified


  if (proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified");
  } //Make sure arguments are correct


  if (proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block");
  }

  if (proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block");
  }

  if (proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block");
  } //Check debug flag


  proc.debug = !!user_args.printCode || !!user_args.debug; //Retrieve name

  proc.funcName = user_args.funcName || "cwise"; //Read in block size

  proc.blockSize = user_args.blockSize || 64;
  return createThunk(proc);
}

module.exports = compileCwise;

/***/ }),

/***/ "./node_modules/cwise-compiler/lib/compile.js":
/*!****************************************************!*\
  !*** ./node_modules/cwise-compiler/lib/compile.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uniq = __webpack_require__(/*! uniq */ "./node_modules/uniq/uniq.js"); // This function generates very simple loops analogous to how you typically traverse arrays (the outermost loop corresponds to the slowest changing index, the innermost loop to the fastest changing index)
// TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.


function innerFill(order, proc, body) {
  var dimension = order.length,
      nargs = proc.arrayArgs.length,
      has_index = proc.indexArgs.length > 0,
      code = [],
      vars = [],
      idx = 0,
      pidx = 0,
      i,
      j;

  for (i = 0; i < dimension; ++i) {
    // Iteration variables
    vars.push(["i", i, "=0"].join(""));
  } //Compute scan deltas


  for (j = 0; j < nargs; ++j) {
    for (i = 0; i < dimension; ++i) {
      pidx = idx;
      idx = order[i];

      if (i === 0) {
        // The innermost/fastest dimension's delta is simply its stride
        vars.push(["d", j, "s", i, "=t", j, "p", idx].join(""));
      } else {
        // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
        vars.push(["d", j, "s", i, "=(t", j, "p", idx, "-s", pidx, "*t", j, "p", pidx, ")"].join(""));
      }
    }
  }

  if (vars.length > 0) {
    code.push("var " + vars.join(","));
  } //Scan loop


  for (i = dimension - 1; i >= 0; --i) {
    // Start at largest stride and work your way inwards
    idx = order[i];
    code.push(["for(i", i, "=0;i", i, "<s", idx, ";++i", i, "){"].join(""));
  } //Push body of inner loop


  code.push(body); //Advance scan pointers

  for (i = 0; i < dimension; ++i) {
    pidx = idx;
    idx = order[i];

    for (j = 0; j < nargs; ++j) {
      code.push(["p", j, "+=d", j, "s", i].join(""));
    }

    if (has_index) {
      if (i > 0) {
        code.push(["index[", pidx, "]-=s", pidx].join(""));
      }

      code.push(["++index[", idx, "]"].join(""));
    }

    code.push("}");
  }

  return code.join("\n");
} // Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
// TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
//       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.


function outerFill(matched, order, proc, body) {
  var dimension = order.length,
      nargs = proc.arrayArgs.length,
      blockSize = proc.blockSize,
      has_index = proc.indexArgs.length > 0,
      code = [];

  for (var i = 0; i < nargs; ++i) {
    code.push(["var offset", i, "=p", i].join(""));
  } //Generate loops for unmatched dimensions
  // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
  // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).


  for (var i = matched; i < dimension; ++i) {
    code.push(["for(var j" + i + "=SS[", order[i], "]|0;j", i, ">0;){"].join("")); // Iterate back to front

    code.push(["if(j", i, "<", blockSize, "){"].join("")); // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).

    code.push(["s", order[i], "=j", i].join(""));
    code.push(["j", i, "=0"].join(""));
    code.push(["}else{s", order[i], "=", blockSize].join(""));
    code.push(["j", i, "-=", blockSize, "}"].join(""));

    if (has_index) {
      code.push(["index[", order[i], "]=j", i].join(""));
    }
  }

  for (var i = 0; i < nargs; ++i) {
    var indexStr = ["offset" + i];

    for (var j = matched; j < dimension; ++j) {
      indexStr.push(["j", j, "*t", i, "p", order[j]].join(""));
    }

    code.push(["p", i, "=(", indexStr.join("+"), ")"].join(""));
  }

  code.push(innerFill(order, proc, body));

  for (var i = matched; i < dimension; ++i) {
    code.push("}");
  }

  return code.join("\n");
} //Count the number of compatible inner orders
// This is the length of the longest common prefix of the arrays in orders.
// Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
// This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.


function countMatches(orders) {
  var matched = 0,
      dimension = orders[0].length;

  while (matched < dimension) {
    for (var j = 1; j < orders.length; ++j) {
      if (orders[j][matched] !== orders[0][matched]) {
        return matched;
      }
    }

    ++matched;
  }

  return matched;
} //Processes a block according to the given data types
// Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.


function processBlock(block, proc, dtypes) {
  var code = block.body;
  var pre = [];
  var post = [];

  for (var i = 0; i < block.args.length; ++i) {
    var carg = block.args[i];

    if (carg.count <= 0) {
      continue;
    }

    var re = new RegExp(carg.name, "g");
    var ptrStr = "";
    var arrNum = proc.arrayArgs.indexOf(i);

    switch (proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i);
        var offArg = proc.offsetArgs[offArgIndex];
        arrNum = offArg.array;
        ptrStr = "+q" + offArgIndex;
      // Adds offset to the "pointer" in the array

      case "array":
        ptrStr = "p" + arrNum + ptrStr;
        var localStr = "l" + i;
        var arrStr = "a" + arrNum;

        if (proc.arrayBlockIndices[arrNum] === 0) {
          // Argument to body is just a single value from this array
          if (carg.count === 1) {
            // Argument/array used only once(?)
            if (dtypes[arrNum] === "generic") {
              if (carg.lvalue) {
                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")); // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)

                code = code.replace(re, localStr);
                post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
              } else {
                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""));
              }
            } else {
              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
            }
          } else if (dtypes[arrNum] === "generic") {
            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")); // TODO: Could we optimize by checking for carg.rvalue?

            code = code.replace(re, localStr);

            if (carg.lvalue) {
              post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
            }
          } else {
            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")); // TODO: Could we optimize by checking for carg.rvalue?

            code = code.replace(re, localStr);

            if (carg.lvalue) {
              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""));
            }
          }
        } else {
          // Argument to body is a "block"
          var reStrArr = [carg.name],
              ptrStrArr = [ptrStr];

          for (var j = 0; j < Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
            reStrArr.push("\\s*\\[([^\\]]+)\\]");
            ptrStrArr.push("$" + (j + 1) + "*t" + arrNum + "b" + j); // Matched index times stride
          }

          re = new RegExp(reStrArr.join(""), "g");
          ptrStr = ptrStrArr.join("+");

          if (dtypes[arrNum] === "generic") {
            /*if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }*/
            throw new Error("cwise: Generic arrays not supported in combination with blocks!");
          } else {
            // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
          }
        }

        break;

      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i));
        break;

      case "index":
        code = code.replace(re, "index");
        break;

      case "shape":
        code = code.replace(re, "shape");
        break;
    }
  }

  return [pre.join("\n"), code, post.join("\n")].join("\n").trim();
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length);
  var allEqual = true;

  for (var i = 0; i < dtypes.length; ++i) {
    var t = dtypes[i];
    var digits = t.match(/\d+/);

    if (!digits) {
      digits = "";
    } else {
      digits = digits[0];
    }

    if (t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits;
    } else {
      summary[i] = t.charAt(0) + digits;
    }

    if (i > 0) {
      allEqual = allEqual && summary[i] === summary[i - 1];
    }
  }

  if (allEqual) {
    return summary[0];
  }

  return summary.join("");
} //Generates a cwise operator


function generateCWiseOp(proc, typesig) {
  //Compute dimension
  // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
  var dimension = typesig[1].length - Math.abs(proc.arrayBlockIndices[0]) | 0;
  var orders = new Array(proc.arrayArgs.length);
  var dtypes = new Array(proc.arrayArgs.length);

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    dtypes[i] = typesig[2 * i];
    orders[i] = typesig[2 * i + 1];
  } //Determine where block and loop indices start and end


  var blockBegin = [],
      blockEnd = []; // These indices are exposed as blocks

  var loopBegin = [],
      loopEnd = []; // These indices are iterated over

  var loopOrders = []; // orders restricted to the loop indices

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    if (proc.arrayBlockIndices[i] < 0) {
      loopBegin.push(0);
      loopEnd.push(dimension);
      blockBegin.push(dimension);
      blockEnd.push(dimension + proc.arrayBlockIndices[i]);
    } else {
      loopBegin.push(proc.arrayBlockIndices[i]); // Non-negative

      loopEnd.push(proc.arrayBlockIndices[i] + dimension);
      blockBegin.push(0);
      blockEnd.push(proc.arrayBlockIndices[i]);
    }

    var newOrder = [];

    for (var j = 0; j < orders[i].length; j++) {
      if (loopBegin[i] <= orders[i][j] && orders[i][j] < loopEnd[i]) {
        newOrder.push(orders[i][j] - loopBegin[i]); // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
      }
    }

    loopOrders.push(newOrder);
  } //First create arguments for procedure


  var arglist = ["SS"]; // SS is the overall shape over which we iterate

  var code = ["'use strict'"];
  var vars = [];

  for (var j = 0; j < dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join("")); // The limits for each dimension.
  }

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    arglist.push("a" + i); // Actual data array

    arglist.push("t" + i); // Strides

    arglist.push("p" + i); // Offset in the array at which the data starts (also used for iterating over the data)

    for (var j = 0; j < dimension; ++j) {
      // Unpack the strides into vars for looping
      vars.push(["t", i, "p", j, "=t", i, "[", loopBegin[i] + j, "]"].join(""));
    }

    for (var j = 0; j < Math.abs(proc.arrayBlockIndices[i]); ++j) {
      // Unpack the strides into vars for block iteration
      vars.push(["t", i, "b", j, "=t", i, "[", blockBegin[i] + j, "]"].join(""));
    }
  }

  for (var i = 0; i < proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i);
  }

  if (proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)"); // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
  }

  if (proc.indexArgs.length > 0) {
    // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
    var zeros = new Array(dimension);

    for (var i = 0; i < dimension; ++i) {
      zeros[i] = "0";
    }

    vars.push(["index=[", zeros.join(","), "]"].join(""));
  }

  for (var i = 0; i < proc.offsetArgs.length; ++i) {
    // Offset arguments used for stencil operations
    var off_arg = proc.offsetArgs[i];
    var init_string = [];

    for (var j = 0; j < off_arg.offset.length; ++j) {
      if (off_arg.offset[j] === 0) {
        continue;
      } else if (off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""));
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""));
      }
    }

    if (init_string.length === 0) {
      vars.push("q" + i + "=0");
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""));
    }
  } //Prepare this variables


  var thisVars = uniq([].concat(proc.pre.thisVars).concat(proc.body.thisVars).concat(proc.post.thisVars));
  vars = vars.concat(thisVars);

  if (vars.length > 0) {
    code.push("var " + vars.join(","));
  }

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    code.push("p" + i + "|=0");
  } //Inline prelude


  if (proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes));
  } //Process body


  var body = processBlock(proc.body, proc, dtypes);
  var matched = countMatches(loopOrders);

  if (matched < dimension) {
    code.push(outerFill(matched, loopOrders[0], proc, body)); // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
  } else {
    code.push(innerFill(loopOrders[0], proc, body));
  } //Inline epilog


  if (proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes));
  }

  if (proc.debug) {
    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------");
  }

  var loopName = [proc.funcName || "unnamed", "_cwise_loop_", orders[0].join("s"), "m", matched, typeSummary(dtypes)].join("");
  var f = new Function(["function ", loopName, "(", arglist.join(","), "){", code.join("\n"), "} return ", loopName].join(""));
  return f();
}

module.exports = generateCWiseOp;

/***/ }),

/***/ "./node_modules/cwise-compiler/lib/thunk.js":
/*!**************************************************!*\
  !*** ./node_modules/cwise-compiler/lib/thunk.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // The function below is called when constructing a cwise function object, and does the following:
// A function object is constructed which accepts as argument a compilation function and returns another function.
// It is this other function that is eventually returned by createThunk, and this function is the one that actually
// checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
// The compilation passed to the first function object is used for compiling new functions.
// Once this function object is created, it is called with compile as argument, where the first argument of compile
// is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
// So createThunk roughly works like this:
// function createThunk(proc) {
//   var thunk = function(compileBound) {
//     var CACHED = {}
//     return function(arrays and scalars) {
//       if (dtype and order of arrays in CACHED) {
//         var func = CACHED[dtype and order of arrays]
//       } else {
//         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
//       }
//       return func(arrays and scalars)
//     }
//   }
//   return thunk(compile.bind1(proc))
// }

var compile = __webpack_require__(/*! ./compile.js */ "./node_modules/cwise-compiler/lib/compile.js");

function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"];
  var vars = [];
  var thunkName = proc.funcName + "_cwise_thunk"; //Build thunk

  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""));
  var typesig = [];
  var string_typesig = [];
  var proc_args = [["array", proc.arrayArgs[0], ".shape.slice(", // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
  Math.max(0, proc.arrayBlockIndices[0]), proc.arrayBlockIndices[0] < 0 ? "," + proc.arrayBlockIndices[0] + ")" : ")"].join("")];
  var shapeLengthConditions = [],
      shapeConditions = []; // Process array arguments

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i];
    vars.push(["t", j, "=array", j, ".dtype,", "r", j, "=array", j, ".order"].join(""));
    typesig.push("t" + j);
    typesig.push("r" + j);
    string_typesig.push("t" + j);
    string_typesig.push("r" + j + ".join()");
    proc_args.push("array" + j + ".data");
    proc_args.push("array" + j + ".stride");
    proc_args.push("array" + j + ".offset|0");

    if (i > 0) {
      // Gather conditions to check for shape equality (ignoring block indices)
      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0]) - Math.abs(proc.arrayBlockIndices[i])));
      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0, proc.arrayBlockIndices[i]) + "]");
    }
  } // Check for shape equality


  if (proc.arrayArgs.length > 1) {
    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')");
    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {");
    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')");
    code.push("}");
  } // Process scalar arguments


  for (var i = 0; i < proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i]);
  } // Check for cached function (and if not present, generate it)


  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""));
  vars.push("proc=CACHED[type]");
  code.push("var " + vars.join(","));
  code.push(["if(!proc){", "CACHED[type]=proc=compile([", typesig.join(","), "])}", "return proc(", proc_args.join(","), ")}"].join(""));

  if (proc.debug) {
    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------");
  } //Compile thunk


  var thunk = new Function("compile", code.join("\n"));
  return thunk(compile.bind(undefined, proc));
}

module.exports = createThunk;

/***/ }),

/***/ "./node_modules/iota-array/iota.js":
/*!*****************************************!*\
  !*** ./node_modules/iota-array/iota.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function iota(n) {
  var result = new Array(n);

  for (var i = 0; i < n; ++i) {
    result[i] = i;
  }

  return result;
}

module.exports = iota;

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),

/***/ "./node_modules/ndarray-ops/ndarray-ops.js":
/*!*************************************************!*\
  !*** ./node_modules/ndarray-ops/ndarray-ops.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compile = __webpack_require__(/*! cwise-compiler */ "./node_modules/cwise-compiler/compiler.js");

var EmptyProc = {
  body: "",
  args: [],
  thisVars: [],
  localVars: []
};

function fixup(x) {
  if (!x) {
    return EmptyProc;
  }

  for (var i = 0; i < x.args.length; ++i) {
    var a = x.args[i];

    if (i === 0) {
      x.args[i] = {
        name: a,
        lvalue: true,
        rvalue: !!x.rvalue,
        count: x.count || 1
      };
    } else {
      x.args[i] = {
        name: a,
        lvalue: false,
        rvalue: true,
        count: 1
      };
    }
  }

  if (!x.thisVars) {
    x.thisVars = [];
  }

  if (!x.localVars) {
    x.localVars = [];
  }

  return x;
}

function pcompile(user_args) {
  return compile({
    args: user_args.args,
    pre: fixup(user_args.pre),
    body: fixup(user_args.body),
    post: fixup(user_args.proc),
    funcName: user_args.funcName
  });
}

function makeOp(user_args) {
  var args = [];

  for (var i = 0; i < user_args.args.length; ++i) {
    args.push("a" + i);
  }

  var wrapper = new Function("P", ["return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"].join(""));
  return wrapper(pcompile(user_args));
}

var assign_ops = {
  add: "+",
  sub: "-",
  mul: "*",
  div: "/",
  mod: "%",
  band: "&",
  bor: "|",
  bxor: "^",
  lshift: "<<",
  rshift: ">>",
  rrshift: ">>>"
};

(function () {
  for (var id in assign_ops) {
    var op = assign_ops[id];
    exports[id] = makeOp({
      args: ["array", "array", "array"],
      body: {
        args: ["a", "b", "c"],
        body: "a=b" + op + "c"
      },
      funcName: id
    });
    exports[id + "eq"] = makeOp({
      args: ["array", "array"],
      body: {
        args: ["a", "b"],
        body: "a" + op + "=b"
      },
      rvalue: true,
      funcName: id + "eq"
    });
    exports[id + "s"] = makeOp({
      args: ["array", "array", "scalar"],
      body: {
        args: ["a", "b", "s"],
        body: "a=b" + op + "s"
      },
      funcName: id + "s"
    });
    exports[id + "seq"] = makeOp({
      args: ["array", "scalar"],
      body: {
        args: ["a", "s"],
        body: "a" + op + "=s"
      },
      rvalue: true,
      funcName: id + "seq"
    });
  }
})();

var unary_ops = {
  not: "!",
  bnot: "~",
  neg: "-",
  recip: "1.0/"
};

(function () {
  for (var id in unary_ops) {
    var op = unary_ops[id];
    exports[id] = makeOp({
      args: ["array", "array"],
      body: {
        args: ["a", "b"],
        body: "a=" + op + "b"
      },
      funcName: id
    });
    exports[id + "eq"] = makeOp({
      args: ["array"],
      body: {
        args: ["a"],
        body: "a=" + op + "a"
      },
      rvalue: true,
      count: 2,
      funcName: id + "eq"
    });
  }
})();

var binary_ops = {
  and: "&&",
  or: "||",
  eq: "===",
  neq: "!==",
  lt: "<",
  gt: ">",
  leq: "<=",
  geq: ">="
};

(function () {
  for (var id in binary_ops) {
    var op = binary_ops[id];
    exports[id] = makeOp({
      args: ["array", "array", "array"],
      body: {
        args: ["a", "b", "c"],
        body: "a=b" + op + "c"
      },
      funcName: id
    });
    exports[id + "s"] = makeOp({
      args: ["array", "array", "scalar"],
      body: {
        args: ["a", "b", "s"],
        body: "a=b" + op + "s"
      },
      funcName: id + "s"
    });
    exports[id + "eq"] = makeOp({
      args: ["array", "array"],
      body: {
        args: ["a", "b"],
        body: "a=a" + op + "b"
      },
      rvalue: true,
      count: 2,
      funcName: id + "eq"
    });
    exports[id + "seq"] = makeOp({
      args: ["array", "scalar"],
      body: {
        args: ["a", "s"],
        body: "a=a" + op + "s"
      },
      rvalue: true,
      count: 2,
      funcName: id + "seq"
    });
  }
})();

var math_unary = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];

(function () {
  for (var i = 0; i < math_unary.length; ++i) {
    var f = math_unary[i];
    exports[f] = makeOp({
      args: ["array", "array"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b"],
        body: "a=this_f(b)",
        thisVars: ["this_f"]
      },
      funcName: f
    });
    exports[f + "eq"] = makeOp({
      args: ["array"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a"],
        body: "a=this_f(a)",
        thisVars: ["this_f"]
      },
      rvalue: true,
      count: 2,
      funcName: f + "eq"
    });
  }
})();

var math_comm = ["max", "min", "atan2", "pow"];

(function () {
  for (var i = 0; i < math_comm.length; ++i) {
    var f = math_comm[i];
    exports[f] = makeOp({
      args: ["array", "array", "array"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b", "c"],
        body: "a=this_f(b,c)",
        thisVars: ["this_f"]
      },
      funcName: f
    });
    exports[f + "s"] = makeOp({
      args: ["array", "array", "scalar"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b", "c"],
        body: "a=this_f(b,c)",
        thisVars: ["this_f"]
      },
      funcName: f + "s"
    });
    exports[f + "eq"] = makeOp({
      args: ["array", "array"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b"],
        body: "a=this_f(a,b)",
        thisVars: ["this_f"]
      },
      rvalue: true,
      count: 2,
      funcName: f + "eq"
    });
    exports[f + "seq"] = makeOp({
      args: ["array", "scalar"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b"],
        body: "a=this_f(a,b)",
        thisVars: ["this_f"]
      },
      rvalue: true,
      count: 2,
      funcName: f + "seq"
    });
  }
})();

var math_noncomm = ["atan2", "pow"];

(function () {
  for (var i = 0; i < math_noncomm.length; ++i) {
    var f = math_noncomm[i];
    exports[f + "op"] = makeOp({
      args: ["array", "array", "array"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b", "c"],
        body: "a=this_f(c,b)",
        thisVars: ["this_f"]
      },
      funcName: f + "op"
    });
    exports[f + "ops"] = makeOp({
      args: ["array", "array", "scalar"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b", "c"],
        body: "a=this_f(c,b)",
        thisVars: ["this_f"]
      },
      funcName: f + "ops"
    });
    exports[f + "opeq"] = makeOp({
      args: ["array", "array"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b"],
        body: "a=this_f(b,a)",
        thisVars: ["this_f"]
      },
      rvalue: true,
      count: 2,
      funcName: f + "opeq"
    });
    exports[f + "opseq"] = makeOp({
      args: ["array", "scalar"],
      pre: {
        args: [],
        body: "this_f=Math." + f,
        thisVars: ["this_f"]
      },
      body: {
        args: ["a", "b"],
        body: "a=this_f(b,a)",
        thisVars: ["this_f"]
      },
      rvalue: true,
      count: 2,
      funcName: f + "opseq"
    });
  }
})();

exports.any = compile({
  args: ["array"],
  pre: EmptyProc,
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    body: "if(a){return true}",
    localVars: [],
    thisVars: []
  },
  post: {
    args: [],
    localVars: [],
    thisVars: [],
    body: "return false"
  },
  funcName: "any"
});
exports.all = compile({
  args: ["array"],
  pre: EmptyProc,
  body: {
    args: [{
      name: "x",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    body: "if(!x){return false}",
    localVars: [],
    thisVars: []
  },
  post: {
    args: [],
    localVars: [],
    thisVars: [],
    body: "return true"
  },
  funcName: "all"
});
exports.sum = compile({
  args: ["array"],
  pre: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "this_s=0"
  },
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    body: "this_s+=a",
    localVars: [],
    thisVars: ["this_s"]
  },
  post: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "return this_s"
  },
  funcName: "sum"
});
exports.prod = compile({
  args: ["array"],
  pre: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "this_s=1"
  },
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    body: "this_s*=a",
    localVars: [],
    thisVars: ["this_s"]
  },
  post: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "return this_s"
  },
  funcName: "prod"
});
exports.norm2squared = compile({
  args: ["array"],
  pre: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "this_s=0"
  },
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 2
    }],
    body: "this_s+=a*a",
    localVars: [],
    thisVars: ["this_s"]
  },
  post: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "return this_s"
  },
  funcName: "norm2squared"
});
exports.norm2 = compile({
  args: ["array"],
  pre: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "this_s=0"
  },
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 2
    }],
    body: "this_s+=a*a",
    localVars: [],
    thisVars: ["this_s"]
  },
  post: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "return Math.sqrt(this_s)"
  },
  funcName: "norm2"
});
exports.norminf = compile({
  args: ["array"],
  pre: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "this_s=0"
  },
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 4
    }],
    body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
    localVars: [],
    thisVars: ["this_s"]
  },
  post: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "return this_s"
  },
  funcName: "norminf"
});
exports.norm1 = compile({
  args: ["array"],
  pre: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "this_s=0"
  },
  body: {
    args: [{
      name: "a",
      lvalue: false,
      rvalue: true,
      count: 3
    }],
    body: "this_s+=a<0?-a:a",
    localVars: [],
    thisVars: ["this_s"]
  },
  post: {
    args: [],
    localVars: [],
    thisVars: ["this_s"],
    body: "return this_s"
  },
  funcName: "norm1"
});
exports.sup = compile({
  args: ["array"],
  pre: {
    body: "this_h=-Infinity",
    args: [],
    thisVars: ["this_h"],
    localVars: []
  },
  body: {
    body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
    args: [{
      "name": "_inline_1_arg0_",
      "lvalue": false,
      "rvalue": true,
      "count": 2
    }],
    thisVars: ["this_h"],
    localVars: []
  },
  post: {
    body: "return this_h",
    args: [],
    thisVars: ["this_h"],
    localVars: []
  }
});
exports.inf = compile({
  args: ["array"],
  pre: {
    body: "this_h=Infinity",
    args: [],
    thisVars: ["this_h"],
    localVars: []
  },
  body: {
    body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
    args: [{
      "name": "_inline_1_arg0_",
      "lvalue": false,
      "rvalue": true,
      "count": 2
    }],
    thisVars: ["this_h"],
    localVars: []
  },
  post: {
    body: "return this_h",
    args: [],
    thisVars: ["this_h"],
    localVars: []
  }
});
exports.argmin = compile({
  args: ["index", "array", "shape"],
  pre: {
    body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args: [{
      name: "_inline_0_arg0_",
      lvalue: false,
      rvalue: false,
      count: 0
    }, {
      name: "_inline_0_arg1_",
      lvalue: false,
      rvalue: false,
      count: 0
    }, {
      name: "_inline_0_arg2_",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    thisVars: ["this_i", "this_v"],
    localVars: []
  },
  body: {
    body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args: [{
      name: "_inline_1_arg0_",
      lvalue: false,
      rvalue: true,
      count: 2
    }, {
      name: "_inline_1_arg1_",
      lvalue: false,
      rvalue: true,
      count: 2
    }],
    thisVars: ["this_i", "this_v"],
    localVars: ["_inline_1_k"]
  },
  post: {
    body: "{return this_i}",
    args: [],
    thisVars: ["this_i"],
    localVars: []
  }
});
exports.argmax = compile({
  args: ["index", "array", "shape"],
  pre: {
    body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args: [{
      name: "_inline_0_arg0_",
      lvalue: false,
      rvalue: false,
      count: 0
    }, {
      name: "_inline_0_arg1_",
      lvalue: false,
      rvalue: false,
      count: 0
    }, {
      name: "_inline_0_arg2_",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    thisVars: ["this_i", "this_v"],
    localVars: []
  },
  body: {
    body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args: [{
      name: "_inline_1_arg0_",
      lvalue: false,
      rvalue: true,
      count: 2
    }, {
      name: "_inline_1_arg1_",
      lvalue: false,
      rvalue: true,
      count: 2
    }],
    thisVars: ["this_i", "this_v"],
    localVars: ["_inline_1_k"]
  },
  post: {
    body: "{return this_i}",
    args: [],
    thisVars: ["this_i"],
    localVars: []
  }
});
exports.random = makeOp({
  args: ["array"],
  pre: {
    args: [],
    body: "this_f=Math.random",
    thisVars: ["this_f"]
  },
  body: {
    args: ["a"],
    body: "a=this_f()",
    thisVars: ["this_f"]
  },
  funcName: "random"
});
exports.assign = makeOp({
  args: ["array", "array"],
  body: {
    args: ["a", "b"],
    body: "a=b"
  },
  funcName: "assign"
});
exports.assigns = makeOp({
  args: ["array", "scalar"],
  body: {
    args: ["a", "b"],
    body: "a=b"
  },
  funcName: "assigns"
});
exports.equals = compile({
  args: ["array", "array"],
  pre: EmptyProc,
  body: {
    args: [{
      name: "x",
      lvalue: false,
      rvalue: true,
      count: 1
    }, {
      name: "y",
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    body: "if(x!==y){return false}",
    localVars: [],
    thisVars: []
  },
  post: {
    args: [],
    localVars: [],
    thisVars: [],
    body: "return true"
  },
  funcName: "equals"
});

/***/ }),

/***/ "./node_modules/ndarray/ndarray.js":
/*!*****************************************!*\
  !*** ./node_modules/ndarray/ndarray.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var iota = __webpack_require__(/*! iota-array */ "./node_modules/iota-array/iota.js");

var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

var hasTypedArrays = typeof Float64Array !== "undefined";

function compare1st(a, b) {
  return a[0] - b[0];
}

function order() {
  var stride = this.stride;
  var terms = new Array(stride.length);
  var i;

  for (i = 0; i < terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i];
  }

  terms.sort(compare1st);
  var result = new Array(terms.length);

  for (i = 0; i < result.length; ++i) {
    result[i] = terms[i][1];
  }

  return result;
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("");

  if (dimension < 0) {
    className = "View_Nil" + dtype;
  }

  var useGetters = dtype === "generic";

  if (dimension === -1) {
    //Special case for trivial arrays
    var code = "function " + className + "(a){this.data=a;};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new " + className + "(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_" + className + "(a){return new " + className + "(a);}";
    var procedure = new Function(code);
    return procedure();
  } else if (dimension === 0) {
    //Special case for 0d arrays
    var code = "function " + className + "(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function " + className + "_copy() {\
return new " + className + "(this.data,this.offset)\
};\
proto.pick=function " + className + "_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function " + className + "_get(){\
return " + (useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};\
proto.set=function " + className + "_set(v){\
return " + (useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "\
};\
return function construct_" + className + "(a,b,c,d){return new " + className + "(a,d)}";
    var procedure = new Function("TrivialArray", code);
    return procedure(CACHED_CONSTRUCTORS[dtype][0]);
  }

  var code = ["'use strict'"]; //Create constructor for view

  var indices = iota(dimension);
  var args = indices.map(function (i) {
    return "i" + i;
  });
  var index_str = "this.offset+" + indices.map(function (i) {
    return "this.stride[" + i + "]*i" + i;
  }).join("+");
  var shapeArg = indices.map(function (i) {
    return "b" + i;
  }).join(",");
  var strideArg = indices.map(function (i) {
    return "c" + i;
  }).join(",");
  code.push("function " + className + "(a," + shapeArg + "," + strideArg + ",d){this.data=a", "this.shape=[" + shapeArg + "]", "this.stride=[" + strideArg + "]", "this.offset=d|0}", "var proto=" + className + ".prototype", "proto.dtype='" + dtype + "'", "proto.dimension=" + dimension); //view.size:

  code.push("Object.defineProperty(proto,'size',{get:function " + className + "_size(){\
return " + indices.map(function (i) {
    return "this.shape[" + i + "]";
  }).join("*"), "}})"); //view.order:

  if (dimension === 1) {
    code.push("proto.order=[0]");
  } else {
    code.push("Object.defineProperty(proto,'order',{get:");

    if (dimension < 4) {
      code.push("function " + className + "_order(){");

      if (dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
      } else if (dimension === 3) {
        code.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})");
      }
    } else {
      code.push("ORDER})");
    }
  } //view.set(i0, ..., v):


  code.push("proto.set=function " + className + "_set(" + args.join(",") + ",v){");

  if (useGetters) {
    code.push("return this.data.set(" + index_str + ",v)}");
  } else {
    code.push("return this.data[" + index_str + "]=v}");
  } //view.get(i0, ...):


  code.push("proto.get=function " + className + "_get(" + args.join(",") + "){");

  if (useGetters) {
    code.push("return this.data.get(" + index_str + ")}");
  } else {
    code.push("return this.data[" + index_str + "]}");
  } //view.index:


  code.push("proto.index=function " + className + "_index(", args.join(), "){return " + index_str + "}"); //view.hi():

  code.push("proto.hi=function " + className + "_hi(" + args.join(",") + "){return new " + className + "(this.data," + indices.map(function (i) {
    return ["(typeof i", i, "!=='number'||i", i, "<0)?this.shape[", i, "]:i", i, "|0"].join("");
  }).join(",") + "," + indices.map(function (i) {
    return "this.stride[" + i + "]";
  }).join(",") + ",this.offset)}"); //view.lo():

  var a_vars = indices.map(function (i) {
    return "a" + i + "=this.shape[" + i + "]";
  });
  var c_vars = indices.map(function (i) {
    return "c" + i + "=this.stride[" + i + "]";
  });
  code.push("proto.lo=function " + className + "_lo(" + args.join(",") + "){var b=this.offset,d=0," + a_vars.join(",") + "," + c_vars.join(","));

  for (var i = 0; i < dimension; ++i) {
    code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){\
d=i" + i + "|0;\
b+=c" + i + "*d;\
a" + i + "-=d}");
  }

  code.push("return new " + className + "(this.data," + indices.map(function (i) {
    return "a" + i;
  }).join(",") + "," + indices.map(function (i) {
    return "c" + i;
  }).join(",") + ",b)}"); //view.step():

  code.push("proto.step=function " + className + "_step(" + args.join(",") + "){var " + indices.map(function (i) {
    return "a" + i + "=this.shape[" + i + "]";
  }).join(",") + "," + indices.map(function (i) {
    return "b" + i + "=this.stride[" + i + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");

  for (var i = 0; i < dimension; ++i) {
    code.push("if(typeof i" + i + "==='number'){\
d=i" + i + "|0;\
if(d<0){\
c+=b" + i + "*(a" + i + "-1);\
a" + i + "=ceil(-a" + i + "/d)\
}else{\
a" + i + "=ceil(a" + i + "/d)\
}\
b" + i + "*=d\
}");
  }

  code.push("return new " + className + "(this.data," + indices.map(function (i) {
    return "a" + i;
  }).join(",") + "," + indices.map(function (i) {
    return "b" + i;
  }).join(",") + ",c)}"); //view.transpose():

  var tShape = new Array(dimension);
  var tStride = new Array(dimension);

  for (var i = 0; i < dimension; ++i) {
    tShape[i] = "a[i" + i + "]";
    tStride[i] = "b[i" + i + "]";
  }

  code.push("proto.transpose=function " + className + "_transpose(" + args + "){" + args.map(function (n, idx) {
    return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)";
  }).join(";"), "var a=this.shape,b=this.stride;return new " + className + "(this.data," + tShape.join(",") + "," + tStride.join(",") + ",this.offset)}"); //view.pick():

  code.push("proto.pick=function " + className + "_pick(" + args + "){var a=[],b=[],c=this.offset");

  for (var i = 0; i < dimension; ++i) {
    code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){c=(c+this.stride[" + i + "]*i" + i + ")|0}else{a.push(this.shape[" + i + "]);b.push(this.stride[" + i + "])}");
  }

  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"); //Add return statement

  code.push("return function construct_" + className + "(data,shape,stride,offset){return new " + className + "(data," + indices.map(function (i) {
    return "shape[" + i + "]";
  }).join(",") + "," + indices.map(function (i) {
    return "stride[" + i + "]";
  }).join(",") + ",offset)}"); //Compile procedure

  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"));
  return procedure(CACHED_CONSTRUCTORS[dtype], order);
}

function arrayDType(data) {
  if (isBuffer(data)) {
    return "buffer";
  }

  if (hasTypedArrays) {
    switch (Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64";

      case "[object Float32Array]":
        return "float32";

      case "[object Int8Array]":
        return "int8";

      case "[object Int16Array]":
        return "int16";

      case "[object Int32Array]":
        return "int32";

      case "[object Uint8Array]":
        return "uint8";

      case "[object Uint16Array]":
        return "uint16";

      case "[object Uint32Array]":
        return "uint32";

      case "[object Uint8ClampedArray]":
        return "uint8_clamped";
    }
  }

  if (Array.isArray(data)) {
    return "array";
  }

  return "generic";
}

var CACHED_CONSTRUCTORS = {
  "float32": [],
  "float64": [],
  "int8": [],
  "int16": [],
  "int32": [],
  "uint8": [],
  "uint16": [],
  "uint32": [],
  "array": [],
  "uint8_clamped": [],
  "buffer": [],
  "generic": []
};

(function () {
  for (var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1));
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if (data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0];
    return ctor([]);
  } else if (typeof data === "number") {
    data = [data];
  }

  if (shape === undefined) {
    shape = [data.length];
  }

  var d = shape.length;

  if (stride === undefined) {
    stride = new Array(d);

    for (var i = d - 1, sz = 1; i >= 0; --i) {
      stride[i] = sz;
      sz *= shape[i];
    }
  }

  if (offset === undefined) {
    offset = 0;

    for (var i = 0; i < d; ++i) {
      if (stride[i] < 0) {
        offset -= (shape[i] - 1) * stride[i];
      }
    }
  }

  var dtype = arrayDType(data);
  var ctor_list = CACHED_CONSTRUCTORS[dtype];

  while (ctor_list.length <= d + 1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length - 1));
  }

  var ctor = ctor_list[d + 1];
  return ctor(data, shape, stride, offset);
}

module.exports = wrappedNDArrayCtor;

/***/ }),

/***/ "./node_modules/onnxjs/dist/onnx.min.js":
/*!**********************************************!*\
  !*** ./node_modules/onnxjs/dist/onnx.min.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) {
  if (true) module.exports = e();else { var r, n; }
}(window, function () {
  return function (t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var o = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) {
        return t[e];
      }.bind(null, o));
      return r;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 25);
  }([function (t, e, n) {
    "use strict";

    var r = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        o = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    },
        i = this && this.__importDefault || function (t) {
      return t && t.__esModule ? t : {
        default: t
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var a = i(n(13)),
        u = n(9),
        s = n(1);

    e.checkInputsShape = function (t) {
      for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];

      if (!t || t.length !== e.length) return !1;

      for (var r = 0; r < t.length; r++) if (!t[r].dims || t[r].dims.length !== e[r]) return !1;

      return !0;
    };

    var l = function () {
      function t() {}

      return t.preprocessInputShapes = function (t, e) {
        return [1 === t.length ? [1, t[0]] : t, 1 === e.length ? [e[0], 1] : e];
      }, t.postprocessOutputShape = function (t, e, n) {
        1 === e && t.splice(t.length - 2, 1), 1 === n && t.pop();
      }, t.calcMatMulShape = function (t, e) {
        return t[1] !== e[0] ? void 0 : [t[0], e[1]];
      }, t;
    }();

    e.MatMulUtil = l;

    var c = function () {
      function t() {}

      return t.calcShape = function (t, e, n) {
        var o;
        void 0 === n && (n = !1);
        var i = t.length,
            a = e.length;
        if (0 === i) return e;
        if (0 === a) return t;
        var u = Math.max(t.length, e.length),
            s = new Array(u);

        if (n) {
          if (i < 2 || a < 2) return;
          var c = l.calcMatMulShape([t[i - 2], t[i - 1]], [e[a - 2], e[a - 1]]);
          if (void 0 === c) return;
          o = r(c, 2), s[u - 2] = o[0], s[u - 1] = o[1];
        }

        for (var f = n ? 3 : 1; f <= u; f++) {
          var p = i - f < 0 ? 1 : t[i - f],
              h = a - f < 0 ? 1 : e[a - f];
          if (p !== h && p > 1 && h > 1) return;
          s[u - f] = Math.max(p, h);
        }

        return s;
      }, t.index = function (e, n) {
        var r = new Array(n.length);
        return t.fillIndex(e, n, r), r;
      }, t.fillIndex = function (t, e, n) {
        for (var r = t.length - e.length, o = 0; o < e.length; o++) n[o] = t[r + o] % e[o];
      }, t.calc = function (e, n, r, o, i) {
        var a = t.calcShape(e.dims, n.dims);

        if (a) {
          if (o && !d.areEqual(a, e.dims)) return;
          var u = d.size(a),
              l = o ? e : new s.Tensor(a, i || e.type);
          if (0 === a.length) l.set([], r(e.get([]), n.get([])));else {
            var c = new Array(a.length),
                f = new Array(e.dims.length),
                p = new Array(n.dims.length),
                h = 0,
                y = 0,
                g = !1,
                m = !1;
            0 === e.dims.length && (h = e.get([]), g = !0), 0 === n.dims.length && (y = n.get([]), m = !0);

            for (var v = void 0, b = 0; b < u; b++) {
              v = b;

              for (var w = a.length - 1; w >= 0; w--) c[w] = v % a[w], v = Math.floor(v / a[w]);

              g || (t.fillIndex(c, e.dims, f), h = e.get(f)), m || (t.fillIndex(c, n.dims, p), y = n.get(p)), l.set(c, r(h, y));
            }
          }
          return l;
        }
      }, t.isValidBroadcast = function (t, e) {
        var n = t.length,
            r = e.length;
        if (n > r) return !1;

        for (var o = 1; o <= n; o++) if (1 !== t[n - o] && t[n - o] !== e[r - o]) return !1;

        return !0;
      }, t;
    }();

    e.BroadcastUtil = c, e.arrayCopyHelper = function (t, e, n, r, o) {
      if (r < 0 || r >= e.length) throw new Error("sourceIndex out of bounds");
      if (n < 0 || n >= t.length) throw new Error("targetIndex out of bounds");
      if (r + o > e.length) throw new Error("source indices to be copied are outside bounds");
      if (n + o > t.length) throw new Error("target array is too small to hold result");

      for (var i = 0; i < o; i++) t[n + i] = e[r + i];
    };

    var f = function () {
      function t() {}

      return t.getShapeOfGemmResult = function (t, e, n, r, o) {
        if (2 !== t.length || 2 !== n.length) throw new Error("shape need to be of size 2");
        var i, a, u;
        e ? (i = t[1], a = t[0]) : (i = t[0], a = t[1]);
        var s = -1;
        if (r ? (u = n[0], s = 1) : (u = n[1], s = 0), n[s] !== a) throw new Error("dimension mismatch");
        if (i <= 0 || u <= 0 || a <= 0) throw new Error("invalid shape specified");
        if (!c.isValidBroadcast(o, [i, u])) throw new Error("gemm: invalid bias shape for broadcast");
        return [i, u, a];
      }, t;
    }();

    e.GemmUtil = f;

    var p = function () {
      function t() {}

      return t.tensorDataTypeFromProto = function (t) {
        switch (t) {
          case u.onnx.TensorProto.DataType.INT8:
            return "int8";

          case u.onnx.TensorProto.DataType.UINT8:
            return "uint8";

          case u.onnx.TensorProto.DataType.BOOL:
            return "bool";

          case u.onnx.TensorProto.DataType.INT16:
            return "int16";

          case u.onnx.TensorProto.DataType.UINT16:
            return "uint16";

          case u.onnx.TensorProto.DataType.INT32:
            return "int32";

          case u.onnx.TensorProto.DataType.UINT32:
            return "uint32";

          case u.onnx.TensorProto.DataType.FLOAT:
            return "float32";

          case u.onnx.TensorProto.DataType.DOUBLE:
            return "float64";

          case u.onnx.TensorProto.DataType.STRING:
            return "string";

          case u.onnx.TensorProto.DataType.INT64:
            return "int32";

          case u.onnx.TensorProto.DataType.UINT64:
            return "uint32";

          default:
            throw new Error("unsupported data type: " + u.onnx.TensorProto.DataType[t]);
        }
      }, t.tensorDimsFromProto = function (t) {
        return t.map(function (t) {
          return a.default.isLong(t) ? t.toNumber() : t;
        });
      }, t.tensorValueTypeFromProto = function (e) {
        return {
          tensorType: t.tensorDataTypeFromProto(e.elemType),
          shape: {
            dims: t.tensorDimsFromProto(e.shape.dim.map(function (t) {
              return t.dimValue;
            }))
          }
        };
      }, t;
    }();

    e.ProtoUtil = p;

    var h = function () {
      function t() {}

      return t.longToNumber = function (t) {
        return a.default.isLong(t) ? t.toNumber() : t;
      }, t;
    }();

    e.LongUtil = h;

    var d = function () {
      function t() {}

      return t.size = function (e) {
        return t.getSizeFromDimensionRange(e, 0, e.length);
      }, t.sizeFromDimension = function (e, n) {
        if (n < 0 || n > e.length) throw new Error("invalid dimension of " + n + " for sizeFromDimension as Tensor has " + e.length + " dimensions.");
        return t.getSizeFromDimensionRange(e, n, e.length);
      }, t.sizeToDimension = function (e, n) {
        if (n < 0 || n > e.length) throw new Error("invalid dimension of " + n + " for sizeToDimension as Tensor has " + e.length + " dimensions.");
        return t.getSizeFromDimensionRange(e, 0, n);
      }, t.getSizeFromDimensionRange = function (t, e, n) {
        for (var r = 1, o = e; o < n; o++) {
          if (t[o] <= 0) throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");
          r *= t[o];
        }

        return r;
      }, t.computeStrides = function (t) {
        var e = t.length;
        if (0 === e) return [];
        if (1 === e) return [1];
        var n = new Array(e);
        n[e - 1] = 1, n[e - 2] = t[e - 1];

        for (var r = e - 3; r >= 0; --r) n[r] = n[r + 1] * t[r + 1];

        return n;
      }, t.transpose = function (t) {
        return t.slice().reverse();
      }, t.indicesToOffset = function (t, e, n) {
        void 0 === n && (n = t.length);

        for (var r = 0, o = 0; o < n; ++o) r += e[o] * t[o];

        return r;
      }, t.offsetToIndices = function (t, e) {
        var n = e.length;
        if (0 === n) return [];
        if (1 === n) return [t * e[0]];

        for (var r = new Array(e.length), o = 0; o < r.length - 1; ++o) r[o] = Math.floor(t / e[o]), t -= r[o] * e[o];

        return r[r.length - 1] = t, r;
      }, t.parseAxis = function (t, e) {
        if (t < -e && t >= e) throw new Error("unsupported axis for this operation.");
        return t < 0 ? t + e : t;
      }, t.incrementIndex = function (t, e, n) {
        if (0 === e.length || 0 === t.length) throw new Error("Index incrementing unsupported for scalar Tensor");
        if (void 0 === n) n = e.length;else if (n <= 0 || n > e.length) throw new Error("Incorrect axis to increment on");

        for (var r = n - 1; r >= 0 && (t[r]++, !(t[r] < e[r])); --r) t[r] = 0;
      }, t.calculateReshapedDims = function (e, n) {
        if (0 === n.length) {
          if (0 === e.length || 1 === t.size(e)) return [];
          throw new Error("cannot reshape to a scalar Tensor");
        }

        for (var r = n.length, o = new Array(r), i = -1, a = 1, u = 0; u < r; u++) {
          if (n[u] < -1) throw new Error("a dimension in shape hints cannot be less than -1");

          if (-1 === n[u]) {
            if (-1 !== i) throw new Error("at most one dimension in shape hints can be -1");
            i = u;
          } else {
            if (0 === n[u]) {
              if (u >= e.length) throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");
              o[u] = e[u];
            } else o[u] = n[u];

            a *= o[u];
          }
        }

        var s = t.size(e);

        if (-1 !== i) {
          if (s % a != 0) throw new Error("the input tensor cannot be reshaped to the requested shape. Input shape: [" + e + "] Output shape: [" + n + "]");
          o[i] = s / a;
        } else if (a !== s) throw new Error("reshapedDims and originalDims don't have matching sizes");

        return o;
      }, t.sortBasedOnPerm = function (t, e) {
        return e ? e.map(function (e) {
          return t[e];
        }) : t.slice().reverse();
      }, t.padShape = function (t, e) {
        var n = t.length;
        return t.map(function (t, r) {
          return t + e[r] + e[r + n];
        });
      }, t.areEqual = function (t, e) {
        return t.length === e.length && t.every(function (t, n) {
          return t === e[n];
        });
      }, t.validateDimsAndCalcSize = function (t) {
        var e, n;
        if (t.length > 6) throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");
        var r = 1;

        try {
          for (var i = o(t), a = i.next(); !a.done; a = i.next()) {
            var u = a.value;
            if (!Number.isInteger(u)) throw new TypeError("Invalid shape: " + u + " is not an integer");
            if (u <= 0 || u > 2147483647) throw new TypeError("Invalid shape: length " + u + " is not allowed");
            r *= u;
          }
        } catch (t) {
          e = {
            error: t
          };
        } finally {
          try {
            a && !a.done && (n = i.return) && n.call(i);
          } finally {
            if (e) throw e.error;
          }
        }

        return r;
      }, t.flattenShape = function (t, e) {
        var n = t.reduce(function (t, e) {
          return t * e;
        }, 1),
            r = t.slice(e).reduce(function (t, e) {
          return t * e;
        }, 1);
        return [n / r, r];
      }, t.squeezeShape = function (t, e) {
        var n = new Array();
        if (e.some(function (e) {
          return e >= t.length || e < 0;
        })) throw new Error("'axes' has an out of range axis");

        for (var r = 0; r < t.length; r++) {
          var o = e.indexOf(r) >= 0;
          if (o && 1 !== t[r]) throw new Error("squeeze an axis of size different than 1");
          (0 === e.length && t[r] > 1 || e.length > 0 && !o) && n.push(t[r]);
        }

        return n;
      }, t.unsqueezeShape = function (t, e) {
        var n = new Array(t.length + e.length);
        n.fill(0);

        for (var r = 0; r < e.length; r++) {
          var o = e[r];
          if (o >= n.length) throw new Error("'axes' has an out of range axis");
          if (0 !== n[o]) throw new Error("'axes' has a duplicate axis");
          n[o] = 1;
        }

        var i = 0;

        for (r = 0; r < n.length; r++) 0 === n[r] && (n[r] = t[i++]);

        if (i !== t.length) throw new Error("the unsqueezed dimension could not be established");
        return n;
      }, t;
    }();

    e.ShapeUtil = d;

    var y = function () {
      function t() {}

      return t.sqr = function (t, e, n, r, o) {
        if (r < 0 || r >= e.length) throw new Error("sourceIndex out of bounds");
        if (n < 0 || n >= t.length) throw new Error("targetIndex out of bounds");
        if (r + o > e.length) throw new Error("source indices to be copied are outside bounds");
        if (n + o > t.length) throw new Error("target array is too small to hold result");

        for (var i = 0; i < o; i++) t[n + i] += Math.pow(e[r + i], 2);
      }, t.axpy = function (t, e, n, r, o, i) {
        if (r < 0 || r >= e.length) throw new Error("sourceIndex out of bounds");
        if (n < 0 || n >= t.length) throw new Error("targetIndex out of bounds");
        if (r + o > e.length) throw new Error("source indices to be copied are outside bounds");
        if (n + o > t.length) throw new Error("target array is too small to hold result");

        for (var a = 0; a < o; a++) t[n + a] += i * e[r + a];
      }, t.powx = function (t, e, n, r, o, i) {
        if (r < 0 || r >= e.length) throw new Error("sourceIndex out of bounds");
        if (n < 0 || n >= t.length) throw new Error("targetIndex out of bounds");
        if (r + o > e.length) throw new Error("source indices to be copied are outside bounds");
        if (n + o > t.length) throw new Error("target array is too small to hold result");

        for (var a = 0; a < o; a++) t[n + a] = Math.pow(e[r + a], i);
      }, t.mul = function (t, e, n, r, o) {
        if (r < 0 || r >= e.length) throw new Error("sourceIndex out of bounds");
        if (n < 0 || n >= t.length) throw new Error("targetIndex out of bounds");
        if (r + o > e.length) throw new Error("source indices to be copied are outside bounds");
        if (n + o > t.length) throw new Error("target array is too small to hold result");

        for (var i = 0; i < o; i++) t[n + i] = e[r + i] * t[n + i];
      }, t;
    }();

    e.MathUtil = y;

    var g = function () {
      function t() {}

      return t.splitShape = function (e, n, r, o) {
        if (0 === r.length) {
          if (!o) throw new Error("need to know number of outputs when the 'split' attribute is not specified");
          t.determineSplit(e[n], o, r);
        }

        for (var i = [], a = [0], u = 0; u < r.length; ++u) {
          0 !== u && a.push(a[u - 1] + r[u - 1]);
          var s = e.slice();
          s[n] = r[u], i.push(s);
        }

        return [i, a];
      }, t.determineSplit = function (t, e, n) {
        if (t % e != 0) throw new Error("cannot split tensor to equal sized parts");

        for (var r = 0; r < e; ++r) n.push(t / e);
      }, t;
    }();

    e.SplitUtil = g;

    var m = function () {
      function t() {}

      return t.calcReduce = function (e, n, r, o, i) {
        var a = e.dims.slice(0);
        0 === n.length && a.forEach(function (t, e) {
          return n.push(e);
        });

        for (var u = t.calcReduceShape(a, n, !0), l = d.size(u), f = new s.Tensor(u, e.type), p = d.computeStrides(u), h = d.computeStrides(a), y = new Array(a.length), g = 0; g < l; g++) {
          var m = d.offsetToIndices(g, p);
          c.fillIndex(m, a, y), f.set(m, t.calcReduceByAxis(e.numberData, n, a, 0, d.indicesToOffset(y, h), o, i));
        }

        return r ? f : new s.Tensor(t.calcReduceShape(a, n, r), f.type, void 0, void 0, f.data, f.dataId);
      }, t.calcReduceByAxis = function (e, n, r, o, i, a, u) {
        var s = 0;
        if (o >= n.length) return a(e[i]);

        for (var l = n[o], c = l >= r.length ? 1 : d.size(r.slice(l + 1)), f = 0; f < r[l]; f++) s = 0 === f ? t.calcReduceByAxis(e, n, r, o + 1, i, a, u) : u(s, t.calcReduceByAxis(e, n, r, o + 1, i, a, u)), i += c;

        return s;
      }, t.calcReduceShape = function (t, e, n) {
        for (var r = t.slice(), o = 0; o < e.length; o++) r[e[o]] = n ? 1 : 0;

        return r.filter(function (t) {
          return 0 !== t;
        });
      }, t;
    }();

    e.ReduceUtil = m;

    var v = function () {
      function t() {}

      return t.adjustPoolAttributes = function (t, e, n, r, o) {
        if (!t && n.length !== e.length - 2) throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");
        if (t) for (var i = 0; i < e.length - 2; i++) i >= n.length ? n.push(e[i + 2]) : n[i] = e[i + 2];

        for (i = 0; i < n.length; i++) if (i < r.length) {
          if (r[i] < 0) throw new Error("strides should be greater than or equal to 1");
        } else r.push(1);

        for (i = 0; i < 2 * n.length; i++) if (i < o.length) {
          if (o[i] < 0) throw new Error("pad should be greater than or equal to 1");
        } else o.push(0);

        for (i = 0; i < n.length; i++) {
          if (n[i] <= 0) throw new Error("kernel shapes need to be greater than 0");
          if (o[i] >= n[i] || o[i + n.length] >= n[i]) throw new Error("pads should be smaller than kernel");
        }
      }, t.adjustPadsBasedOnAutoPad = function (e, n, r, o, i, a) {
        if (a) {
          if (i.length !== 2 * (e.length - 2)) throw new Error("length of pads should be twice the length of data dimensions");
          if (n.length !== e.length - 2) throw new Error("length of strides should be the length of data dimensions");
          if (o.length !== e.length - 2) throw new Error("length of kernel shapes should be the length of data dimensions");

          for (var u = 0; u < e.length - 2; u++) t.adjustPadAndReturnShape(e[u + 2], n[u], r[u], o[u], i, u, u + e.length - 2, a);
        }
      }, t.computePoolOutputShape = function (e, n, r, o, i, a) {
        if (n.length <= 0) throw new Error("input shape must be of size greater than 0");
        var u = [n[0], n[1]],
            s = new Array(o.length).fill(1);
        return t.computeShapeHelper(e, n, u, r, s, o, i, a), u;
      }, t.computeConvOutputShape = function (e, n, r, o, i, a, u) {
        if (e.length <= 0 || n.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims");
        var s = [e[0], n[0]];
        return t.computeShapeHelper(!1, e, s, r, o, i, a, u), s;
      }, t.computeShapeHelper = function (e, n, r, o, i, a, u, s) {
        if (e) for (var l = 0; l < n.length - 2; l++) r.push(1);else for (l = 0; l < n.length - 2; l++) r.push(t.adjustPadAndReturnShape(n[l + 2], o[l], i[l], a[l], u, l, l + n.length - 2, s));
      }, t.adjustPadAndReturnShape = function (t, e, n, r, o, i, a, u) {
        var s = n * (r - 1) + 1;
        if (!u || "NOTSET" === u) return Math.floor((t + o[i] + o[a] - s) / e + 1);

        switch (u) {
          case "VALID":
            return o[i] = 0, o[a] = 0, Math.floor((t - s) / e + 1);

          case "SAME_LOWER":
          case "SAME_UPPER":
            if (1 !== n) throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");
            var l = ((t + e - 1) / e - 1) * e + r - t;
            return o[i] = "SAME_LOWER" === u ? Math.floor((l + 1) / 2) : Math.floor(l / 2), o[a] = l - o[i], Math.floor((t + l - r) / e + 1);

          default:
            throw new Error("Unsupported AutoPad type");
        }
      }, t;
    }();

    e.PoolConvUtil = v;
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      var r = this && this.__awaiter || function (t, e, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(t) {
            try {
              s(r.next(t));
            } catch (t) {
              i(t);
            }
          }

          function u(t) {
            try {
              s(r.throw(t));
            } catch (t) {
              i(t);
            }
          }

          function s(t) {
            t.done ? o(t.value) : new n(function (e) {
              e(t.value);
            }).then(a, u);
          }

          s((r = r.apply(t, e || [])).next());
        });
      },
          o = this && this.__generator || function (t, e) {
        var n,
            r,
            o,
            i,
            a = {
          label: 0,
          sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: []
        };
        return i = {
          next: u(0),
          throw: u(1),
          return: u(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
          return this;
        }), i;

        function u(i) {
          return function (u) {
            return function (i) {
              if (n) throw new TypeError("Generator is already executing.");

              for (; a;) try {
                if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

                switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                  case 0:
                  case 1:
                    o = i;
                    break;

                  case 4:
                    return a.label++, {
                      value: i[1],
                      done: !1
                    };

                  case 5:
                    a.label++, r = i[1], i = [0];
                    continue;

                  case 7:
                    i = a.ops.pop(), a.trys.pop();
                    continue;

                  default:
                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                      a = 0;
                      continue;
                    }

                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                      a.label = i[1];
                      break;
                    }

                    if (6 === i[0] && a.label < o[1]) {
                      a.label = o[1], o = i;
                      break;
                    }

                    if (o && a.label < o[2]) {
                      a.label = o[2], a.ops.push(i);
                      break;
                    }

                    o[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }

                i = e.call(t, a);
              } catch (t) {
                i = [6, t], r = 0;
              } finally {
                n = o = 0;
              }

              if (5 & i[0]) throw i[1];
              return {
                value: i[0] ? i[1] : void 0,
                done: !0
              };
            }([i, u]);
          };
        }
      },
          i = this && this.__importDefault || function (t) {
        return t && t.__esModule ? t : {
          default: t
        };
      };

      Object.defineProperty(e, "__esModule", {
        value: !0
      });

      var a = i(n(13)),
          u = n(9),
          s = n(0),
          l = function () {
        function e(t, e, n, r, o, i) {
          void 0 === i && (i = {}), this.dims = t, this.type = e, this.dataProvider = n, this.asyncDataProvider = r, this.cache = o, this.dataId = i, this.size = s.ShapeUtil.validateDimsAndCalcSize(t);
          var a = this.size,
              u = void 0 === n && void 0 === r && void 0 === o;
          if (void 0 !== o && o.length !== a) throw new RangeError("Input dims doesn't match data length.");

          if ("string" === e) {
            if (!(void 0 === o || Array.isArray(o) && o.every(function (t) {
              return "string" == typeof t;
            }))) throw new TypeError("cache should be a string array");
            u && (o = new Array(a));
          } else {
            if (void 0 !== o) {
              var l = c(e);
              if (!(o instanceof l)) throw new TypeError("cache should be type " + l.name);
            }

            if (u) {
              var f = new ArrayBuffer(a * function (t) {
                switch (t) {
                  case "bool":
                  case "int8":
                  case "uint8":
                    return 1;

                  case "int16":
                  case "uint16":
                    return 2;

                  case "int32":
                  case "uint32":
                  case "float32":
                    return 4;

                  case "float64":
                    return 8;

                  default:
                    throw new Error("cannot calculate sizeof() on type " + t);
                }
              }(e));

              this.cache = function (t, e) {
                return new (c(e))(t);
              }(f, e);
            }
          }
        }

        return Object.defineProperty(e.prototype, "data", {
          get: function () {
            if (void 0 === this.cache) {
              var t = this.dataProvider(this.dataId);
              if (t.length !== this.size) throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");
              this.cache = t;
            }

            return this.cache;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(e.prototype, "stringData", {
          get: function () {
            if ("string" !== this.type) throw new TypeError("data type is not string");
            return this.data;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(e.prototype, "integerData", {
          get: function () {
            switch (this.type) {
              case "uint8":
              case "int8":
              case "uint16":
              case "int16":
              case "int32":
              case "uint32":
              case "bool":
                return this.data;

              default:
                throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)");
            }
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(e.prototype, "floatData", {
          get: function () {
            switch (this.type) {
              case "float32":
              case "float64":
                return this.data;

              default:
                throw new TypeError("data type is not float (float32, float64)");
            }
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(e.prototype, "numberData", {
          get: function () {
            if ("string" !== this.type) return this.data;
            throw new TypeError("type cannot be non-number (string)");
          },
          enumerable: !0,
          configurable: !0
        }), e.prototype.get = function (t) {
          return this.data[s.ShapeUtil.indicesToOffset(t, this.strides)];
        }, e.prototype.set = function (t, e) {
          this.data[s.ShapeUtil.indicesToOffset(t, this.strides)] = e;
        }, e.prototype.getData = function () {
          return r(this, void 0, void 0, function () {
            var t;
            return o(this, function (e) {
              switch (e.label) {
                case 0:
                  return void 0 !== this.cache ? [3, 2] : (t = this, [4, this.asyncDataProvider(this.dataId)]);

                case 1:
                  t.cache = e.sent(), e.label = 2;

                case 2:
                  return [2, this.cache];
              }
            });
          });
        }, Object.defineProperty(e.prototype, "strides", {
          get: function () {
            return this._strides || (this._strides = s.ShapeUtil.computeStrides(this.dims)), this._strides;
          },
          enumerable: !0,
          configurable: !0
        }), e.fromProto = function (n) {
          if (!n) throw new Error("cannot construct Value from an empty tensor");
          var r = s.ProtoUtil.tensorDataTypeFromProto(n.dataType),
              o = new e(s.ProtoUtil.tensorDimsFromProto(n.dims), r);
          if ("string" === r) n.stringData.forEach(function (e, n) {
            var r = t.from(e.buffer, e.byteOffset, e.byteLength);
            o.data[n] = r.toString();
          });else if (n.rawData && "number" == typeof n.rawData.byteLength && n.rawData.byteLength > 0) {
            var i = o.data,
                l = new DataView(n.rawData.buffer, n.rawData.byteOffset, n.rawData.byteLength),
                c = function (t) {
              switch (t) {
                case u.onnx.TensorProto.DataType.UINT8:
                case u.onnx.TensorProto.DataType.INT8:
                case u.onnx.TensorProto.DataType.BOOL:
                  return 1;

                case u.onnx.TensorProto.DataType.UINT16:
                case u.onnx.TensorProto.DataType.INT16:
                  return 2;

                case u.onnx.TensorProto.DataType.FLOAT:
                case u.onnx.TensorProto.DataType.INT32:
                case u.onnx.TensorProto.DataType.UINT32:
                  return 4;

                case u.onnx.TensorProto.DataType.INT64:
                case u.onnx.TensorProto.DataType.DOUBLE:
                case u.onnx.TensorProto.DataType.UINT64:
                  return 8;

                default:
                  throw new Error("cannot calculate sizeof() on type " + u.onnx.TensorProto.DataType[t]);
              }
            }(n.dataType),
                h = n.rawData.byteLength / c;

            if (n.rawData.byteLength % c != 0) throw new Error("invalid buffer length");
            if (i.length !== h) throw new Error("buffer length mismatch");

            for (var d = 0; d < h; d++) {
              var y = p(l, n.dataType, d * c);
              i[d] = y;
            }
          } else {
            var g = void 0;

            switch (n.dataType) {
              case u.onnx.TensorProto.DataType.FLOAT:
                g = n.floatData;
                break;

              case u.onnx.TensorProto.DataType.INT32:
              case u.onnx.TensorProto.DataType.INT16:
              case u.onnx.TensorProto.DataType.UINT16:
              case u.onnx.TensorProto.DataType.INT8:
              case u.onnx.TensorProto.DataType.UINT8:
              case u.onnx.TensorProto.DataType.BOOL:
                g = n.int32Data;
                break;

              case u.onnx.TensorProto.DataType.INT64:
                g = n.int64Data;
                break;

              case u.onnx.TensorProto.DataType.DOUBLE:
                g = n.doubleData;
                break;

              case u.onnx.TensorProto.DataType.UINT32:
              case u.onnx.TensorProto.DataType.UINT64:
                g = n.uint64Data;
                break;

              default:
                throw new Error("unspecific error");
            }

            if (null == g) throw new Error("failed to populate data from a tensorproto value");
            var m = o.data;
            if (m.length !== g.length) throw new Error("array length mismatch");

            for (d = 0; d < g.length; d++) {
              var v = g[d];
              a.default.isLong(v) ? m[d] = f(v, n.dataType) : m[d] = v;
            }
          }
          return o;
        }, e.fromData = function (t, n, r) {
          return new e(n, r, void 0, void 0, t);
        }, e;
      }();

      function c(t) {
        switch (t) {
          case "bool":
          case "uint8":
            return Uint8Array;

          case "int8":
            return Int8Array;

          case "int16":
            return Int16Array;

          case "uint16":
            return Uint16Array;

          case "int32":
            return Int32Array;

          case "uint32":
            return Uint32Array;

          case "float32":
            return Float32Array;

          case "float64":
            return Float64Array;

          default:
            throw new Error("unspecified error");
        }
      }

      function f(t, e) {
        if (e === u.onnx.TensorProto.DataType.INT64) {
          if (t.greaterThanOrEqual(2147483648) || t.lessThan(-2147483648)) throw new TypeError("int64 is not supported");
        } else {
          if (e !== u.onnx.TensorProto.DataType.UINT32 && e !== u.onnx.TensorProto.DataType.UINT64) throw new TypeError("not a LONG type: " + u.onnx.TensorProto.DataType[e]);
          if (t.greaterThanOrEqual(4294967296) || t.lessThan(0)) throw new TypeError("uint64 is not supported");
        }

        return t.toNumber();
      }

      function p(t, e, n) {
        switch (e) {
          case u.onnx.TensorProto.DataType.BOOL:
          case u.onnx.TensorProto.DataType.UINT8:
            return t.getUint8(n);

          case u.onnx.TensorProto.DataType.INT8:
            return t.getInt8(n);

          case u.onnx.TensorProto.DataType.UINT16:
            return t.getUint16(n, !0);

          case u.onnx.TensorProto.DataType.INT16:
            return t.getInt16(n, !0);

          case u.onnx.TensorProto.DataType.FLOAT:
            return t.getFloat32(n, !0);

          case u.onnx.TensorProto.DataType.INT32:
            return t.getInt32(n, !0);

          case u.onnx.TensorProto.DataType.UINT32:
            return t.getUint32(n, !0);

          case u.onnx.TensorProto.DataType.INT64:
            return f(a.default.fromBits(t.getUint32(n, !0), t.getUint32(n + 4, !0), !1), e);

          case u.onnx.TensorProto.DataType.DOUBLE:
            return t.getFloat64(n, !0);

          case u.onnx.TensorProto.DataType.UINT64:
            return f(a.default.fromBits(t.getUint32(n, !0), t.getUint32(n + 4, !0), !0), e);

          default:
            throw new Error("cannot read from DataView for type " + u.onnx.TensorProto.DataType[e]);
        }
      }

      e.Tensor = l;
    }).call(this, n(12).Buffer);
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = {
      version: "",
      attribute: "attribute",
      varyingVertex: "varying",
      varyingFrag: "varying",
      texture2D: "texture2D",
      output: "gl_FragColor",
      outputDeclaration: ""
    },
        o = {
      version: "#version 300 es",
      attribute: "in",
      varyingVertex: "out",
      varyingFrag: "in",
      texture2D: "texture",
      output: "outputColor",
      outputDeclaration: "out vec4 outputColor;"
    };

    function i(t) {
      return 1 === t ? r : o;
    }

    e.getGlsl = i, e.getVertexShaderSource = function (t) {
      var e = i(t);
      return e.version + "\n      precision highp float;\n      " + e.attribute + " vec3 position;\n      " + e.attribute + " vec2 textureCoord;\n\n      " + e.varyingVertex + " vec2 TexCoords;\n\n      void main()\n      {\n          gl_Position = vec4(position, 1.0);\n          TexCoords = textureCoord;\n      }";
    }, e.getFragShaderPreamble = function (t) {
      var e = i(t);
      return e.version + "\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    " + e.varyingFrag + " vec2 TexCoords;\n    " + e.outputDeclaration + "\n\n    ";
    }, e.getDefaultFragShaderMain = function (t, e) {
      return "\n  void main() {\n    int indices[" + e + "];\n    toVec(TexCoords, indices);\n    vec4 result = vec4(process(indices));\n    " + i(t).output + " = result;\n  }\n  ";
    };
  }, function (t, e, n) {
    "use strict";

    var r, o;
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function () {
      function t() {}

      return t.prototype.log = function (t, e, n) {}, t;
    }(),
        a = function () {
      function t() {}

      return t.prototype.log = function (t, e, n) {
        console.log(this.color(t) + " " + (n ? "[35m" + n + "[0m " : "") + e);
      }, t.prototype.color = function (t) {
        switch (t) {
          case "verbose":
            return "[34;40mv[0m";

          case "info":
            return "[32mi[0m";

          case "warning":
            return "[30;43mw[0m";

          case "error":
            return "[31;40me[0m";

          default:
            throw new Error("unsupported severity: " + t);
        }
      }, t;
    }(),
        u = {
      verbose: 1e3,
      info: 2e3,
      warning: 4e3,
      error: 5e3
    },
        s = ((r = {}).none = new i(), r.console = new a(), r),
        l = {
      provider: "console",
      minimalSeverity: "info",
      logDateTime: !0,
      logSourceLocation: !1
    },
        c = ((o = {})[""] = l, o);

    function f(t, e, n, r) {
      if (void 0 === e) return o = t, {
        verbose: f.verbose.bind(null, o),
        info: f.info.bind(null, o),
        warning: f.warning.bind(null, o),
        error: f.error.bind(null, o)
      };
      if (void 0 === n) p(t, e, 1);else if ("number" == typeof n && void 0 === r) p(t, e, n);else if ("string" == typeof n && void 0 === r) p(t, n, 1, e);else {
        if ("string" != typeof n || "number" != typeof r) throw new TypeError("input is valid");
        p(t, n, r, e);
      }
      var o;
    }

    function p(t, e, n, r) {
      var o = c[r || ""] || c[""];
      u[t] < u[o.minimalSeverity] || (o.logDateTime && (e = new Date().toISOString() + "|" + e), o.logSourceLocation, s[o.provider].log(t, e, r));
    }

    !function (t) {
      function e(t) {
        c = {}, n("", t || {});
      }

      function n(t, n) {
        if ("*" === t) e(n);else {
          var r = c[t] || l;
          c[t] = {
            provider: n.provider || r.provider,
            minimalSeverity: n.minimalSeverity || r.minimalSeverity,
            logDateTime: void 0 === n.logDateTime ? r.logDateTime : n.logDateTime,
            logSourceLocation: void 0 === n.logSourceLocation ? r.logSourceLocation : n.logSourceLocation
          };
        }
      }

      t.verbose = function (e, n) {
        t("verbose", e, n);
      }, t.info = function (e, n) {
        t("info", e, n);
      }, t.warning = function (e, n) {
        t("warning", e, n);
      }, t.error = function (e, n) {
        t("error", e, n);
      }, t.reset = e, t.set = n;
    }(f || (f = {})), e.Logger = f;

    var h = function () {
      function t(t, e, n, r) {
        this.category = t, this.name = e, this.startTime = n, this.endCallback = r;
      }

      return t.prototype.end = function () {
        this.endCallback(this);
      }, t;
    }(),
        d = function () {
      return function (t, e, n, r) {
        this.category = t, this.name = e, this.startTime = n, this.endTime = r;
      };
    }(),
        y = function () {
      function t(t, e, n) {
        this._started = !1, this._flushPointer = 0, this._started = !1, this._maxNumberEvents = void 0 === t ? 1e4 : t, this._flushBatchSize = void 0 === e ? 10 : e, this._flushIntervalInMilliseconds = void 0 === n ? 5e3 : n;
      }

      return t.create = function (t) {
        return void 0 === t ? new this() : new this(t.maxNumberEvents, t.flushBatchSize, t.flushIntervalInMilliseconds);
      }, t.prototype.start = function () {
        this._started = !0, this._timingEvents = [], this._flushTime = e.now(), this._flushPointer = 0;
      }, t.prototype.stop = function () {
        for (this._started = !1; this._flushPointer < this._timingEvents.length; this._flushPointer++) this.logOneEvent(this._timingEvents[this._flushPointer]);
      }, t.prototype.event = function (t, e, n) {
        var r = this._started ? this.begin(t, e) : void 0,
            o = !1;

        try {
          var i = n();
          return i && "function" == typeof i.then ? (o = !0, new Promise(function (t, e) {
            i.then(function (e) {
              t(e), r && r.end();
            }, function (t) {
              e(t), r && r.end();
            });
          })) : i;
        } finally {
          !o && r && r.end();
        }
      }, t.prototype.begin = function (t, n) {
        var r = this;
        if (!this._started) throw new Error("profiler is not started yet");
        var o = e.now();
        return this.flush(o), new h(t, n, o, function (t) {
          return r.end(t);
        });
      }, t.prototype.end = function (t) {
        if (this._timingEvents.length < this._maxNumberEvents) {
          var n = e.now();
          this._timingEvents.push(new d(t.category, t.name, t.startTime, n)), this.flush(n);
        }
      }, t.prototype.logOneEvent = function (t) {
        e.Logger.verbose("Profiler." + t.category, (t.endTime - t.startTime).toFixed(2) + "ms on event '" + t.name + "' at " + t.endTime.toFixed(2));
      }, t.prototype.flush = function (t) {
        if (this._timingEvents.length - this._flushPointer >= this._flushBatchSize || t - this._flushTime >= this._flushIntervalInMilliseconds) {
          for (var n = this._flushPointer; this._flushPointer < n + this._flushBatchSize && this._flushPointer < this._timingEvents.length; this._flushPointer++) this.logOneEvent(this._timingEvents[this._flushPointer]);

          this._flushTime = e.now();
        }
      }, Object.defineProperty(t.prototype, "started", {
        get: function () {
          return this._started;
        },
        enumerable: !0,
        configurable: !0
      }), t;
    }();

    e.Profiler = y, e.now = "undefined" != typeof performance && performance.now ? function () {
      return performance.now();
    } : Date.now;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var a,
        u,
        s,
        l = n(3),
        c = i(n(96)),
        f = !1,
        p = !1;

    e.init = function (t, e) {
      if (f) return Promise.resolve();
      if (p) throw new Error("multiple calls to 'init()' detected.");
      return p = !0, new Promise(function (r, o) {
        var i,
            h = function () {
          void 0 !== i && (clearTimeout(i), i = void 0);
        },
            d = function () {
          h(), r(), p = !1, f = !0;
        },
            y = c.init(),
            g = new Promise(function (t, n) {
          i = setTimeout(function () {
            n("Wasm init promise failed to be resolved within set timeout");
          }, e);
        });

        t > 0 ? (l.Logger.verbose("WebAssembly-Workers", "User has requested " + t + " Workers."), "undefined" == typeof window || void 0 === window.Worker ? (l.Logger.error("WebAssembly-Workers", "Environment does not support usage of Workers. Will not spawn workers."), u = 0) : (l.Logger.verbose("WebAssembly-Workers", "Environment supports usage of Workers. Will spawn " + t + " Workers"), u = t)) : (l.Logger.verbose("WebAssembly-Workers", "User has disabled usage of Workers. Will not spawn workers."), u = 0);
        var m = new Array(u);
        a = new Array(u), s = new Array(u);

        for (var v = function (t) {
          var e = new Promise(function (e, r) {
            var o = n(99)();
            a[t] = o, s[t] = [], o.onerror = function (e) {
              l.Logger.error("WebAssembly-Workers", "worker-" + t + " ERR: " + e), f || r();
            }, o.onmessage = function (n) {
              if (!(n && n.data && n.data.type)) throw new Error("missing message type from worker");
              if ("init-success" === n.data.type) e();else {
                if ("ccall" !== n.data.type) throw new Error("unknown message type from worker: " + n.data.type);
                var r = n.data.perfData;
                s[t].shift()(n.data.buffer, r);
              }
            };
          });
          m[t] = e;
        }, b = 0; b < u; b++) v(b);

        Promise.race([y, g]).then(function () {
          Promise.all(m).then(d, function () {
            l.Logger.warning("WebAssembly-Workers", "Unable to get all requested workers initialized. Will use Wasm backend with 0 workers."), u = 0, d();
          });
        }, function (t) {
          h(), o(t), p = !1;
        });
      });
    };

    var h = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.getInstance = function () {
        return e.instance || (e.instance = new e()), e.instance;
      }, Object.defineProperty(e, "workerNumber", {
        get: function () {
          return u;
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.ccallRemote = function (t, n) {
        for (var r = [], o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];

        if (!f) throw new Error("wasm not initialized. please ensure 'init()' is called.");
        if (t < 0 || t >= u) throw new Error("invalid worker ID " + t + ". should be in range [0, " + u + ")");
        var i = [],
            l = e.calculateOffsets(i, r),
            p = new ArrayBuffer(l);
        e.ccallSerialize(new Uint8Array(p), i, r);
        var h = c.now();
        return a[t].postMessage({
          type: "ccall",
          func: n,
          buffer: p
        }, [p]), new Promise(function (n, o) {
          s[t].push(function (t, o) {
            o.startTimeWorker = o.startTime, o.endTimeWorker = o.endTime, o.startTime = h, o.endTime = c.now(), e.ccallDeserialize(new Uint8Array(t), i, r), n(o);
          });
        });
      }, e;
    }(c.WasmBinding);

    e.WasmBinding = h;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), function (t) {
      t[t.ValueBased = 0] = "ValueBased", t[t.Positional = 1] = "Positional";
    }(e.FunctionType || (e.FunctionType = {}));

    var r = function () {
      return function (t, e) {
        this.glContext = t, this.programInfo = e;
      };
    }();

    e.GlslContext = r;

    var o = function () {
      return function (t) {
        this.context = t;
      };
    }();

    e.GlslLib = o;

    var i = function () {
      return function (t, e) {
        this.routineBody = t, this.dependencies = e;
      };
    }();

    e.GlslLibRoutine = i;

    var a = function () {
      function t(t, e, n) {
        this.name = t, this.dependencies = n || [], e && (this.routineBody = e);
      }

      return t.prototype.addDependency = function (t) {
        t && this.dependencies.push(t);
      }, t;
    }();

    e.GlslLibRoutineNode = a;

    var u = function () {
      function t() {}

      return t.returnOrderedNodes = function (t) {
        if (!t || 0 === t.length) return [];
        if (1 === t.length) return t;
        var e = new Set(),
            n = new Set(),
            r = new Array();
        return this.createOrderedNodes(t, e, n, r), r;
      }, t.createOrderedNodes = function (t, e, n, r) {
        for (var o = 0; o < t.length; ++o) this.dfsTraverse(t[o], e, n, r);
      }, t.dfsTraverse = function (t, e, n, r) {
        if (t && !n.has(t.name)) {
          if (e.has(t.name)) throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");
          e.add(t.name);
          var o = t.dependencies;
          if (o && o.length > 0) for (var i = 0; i < o.length; ++i) this.dfsTraverse(o[i], e, n, r);
          r.push(t), n.add(t.name), e.delete(t.name);
        }
      }, t;
    }();

    e.TopologicalSortGlslRoutines = u;
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      var r = e;

      function o(t, e, n) {
        for (var r = Object.keys(e), o = 0; o < r.length; ++o) void 0 !== t[r[o]] && n || (t[r[o]] = e[r[o]]);

        return t;
      }

      function i(t) {
        function e(t, n) {
          if (!(this instanceof e)) return new e(t, n);
          Object.defineProperty(this, "message", {
            get: function () {
              return t;
            }
          }), Error.captureStackTrace ? Error.captureStackTrace(this, e) : Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
          }), n && o(this, n);
        }

        return (e.prototype = Object.create(Error.prototype)).constructor = e, Object.defineProperty(e.prototype, "name", {
          get: function () {
            return t;
          }
        }), e.prototype.toString = function () {
          return this.name + ": " + this.message;
        }, e;
      }

      r.asPromise = n(60), r.base64 = n(61), r.EventEmitter = n(62), r.float = n(63), r.inquire = n(64), r.utf8 = n(65), r.pool = n(66), r.LongBits = n(67), r.global = "undefined" != typeof window && window || void 0 !== t && t || "undefined" != typeof self && self || this, r.emptyArray = Object.freeze ? Object.freeze([]) : [], r.emptyObject = Object.freeze ? Object.freeze({}) : {}, r.isNode = Boolean(r.global.process && r.global.process.versions && r.global.process.versions.node), r.isInteger = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
      }, r.isString = function (t) {
        return "string" == typeof t || t instanceof String;
      }, r.isObject = function (t) {
        return t && "object" == typeof t;
      }, r.isset = r.isSet = function (t, e) {
        var n = t[e];
        return !(null == n || !t.hasOwnProperty(e)) && ("object" != typeof n || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0);
      }, r.Buffer = function () {
        try {
          var t = r.inquire("buffer").Buffer;
          return t.prototype.utf8Write ? t : null;
        } catch (t) {
          return null;
        }
      }(), r._Buffer_from = null, r._Buffer_allocUnsafe = null, r.newBuffer = function (t) {
        return "number" == typeof t ? r.Buffer ? r._Buffer_allocUnsafe(t) : new r.Array(t) : r.Buffer ? r._Buffer_from(t) : "undefined" == typeof Uint8Array ? t : new Uint8Array(t);
      }, r.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, r.Long = r.global.dcodeIO && r.global.dcodeIO.Long || r.global.Long || r.inquire("long"), r.key2Re = /^true|false|0|1$/, r.key32Re = /^-?(?:0|[1-9][0-9]*)$/, r.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, r.longToHash = function (t) {
        return t ? r.LongBits.from(t).toHash() : r.LongBits.zeroHash;
      }, r.longFromHash = function (t, e) {
        var n = r.LongBits.fromHash(t);
        return r.Long ? r.Long.fromBits(n.lo, n.hi, e) : n.toNumber(Boolean(e));
      }, r.merge = o, r.lcFirst = function (t) {
        return t.charAt(0).toLowerCase() + t.substring(1);
      }, r.newError = i, r.ProtocolError = i("ProtocolError"), r.oneOfGetter = function (t) {
        for (var e = {}, n = 0; n < t.length; ++n) e[t[n]] = 1;

        return function () {
          for (var t = Object.keys(this), n = t.length - 1; n > -1; --n) if (1 === e[t[n]] && void 0 !== this[t[n]] && null !== this[t[n]]) return t[n];
        };
      }, r.oneOfSetter = function (t) {
        return function (e) {
          for (var n = 0; n < t.length; ++n) t[n] !== e && delete this[t[n]];
        };
      }, r.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0
      }, r._configure = function () {
        var t = r.Buffer;
        t ? (r._Buffer_from = t.from !== Uint8Array.from && t.from || function (e, n) {
          return new t(e, n);
        }, r._Buffer_allocUnsafe = t.allocUnsafe || function (e) {
          return new t(e);
        }) : r._Buffer_from = r._Buffer_allocUnsafe = null;
      };
    }).call(this, n(8));
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.NUMBER_TYPES = ["float32", "float64", "int32", "int16", "int8", "uint16", "uint32", "uint8"], e.INT_TYPES = ["int32", "int16", "int8", "uint16", "uint32", "uint8"], e.FLOAT_TYPES = ["float32", "float64"];
  }, function (t, e) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }

    t.exports = n;
  }, function (t, e, n) {
    "use strict";

    var r = n(58),
        o = r.Reader,
        i = r.Writer,
        a = r.util,
        u = r.roots.default || (r.roots.default = {});
    u.onnx = function () {
      var t,
          e,
          n = {};
      return n.Version = (t = {}, (e = Object.create(t))[t[0] = "_START_VERSION"] = 0, e[t[1] = "IR_VERSION_2017_10_10"] = 1, e[t[2] = "IR_VERSION_2017_10_30"] = 2, e[t[3] = "IR_VERSION_2017_11_3"] = 3, e[t[4] = "IR_VERSION_2019_1_22"] = 4, e[t[5] = "IR_VERSION"] = 5, e), n.AttributeProto = function () {
        function t(t) {
          if (this.floats = [], this.ints = [], this.strings = [], this.tensors = [], this.graphs = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.name = "", t.prototype.refAttrName = "", t.prototype.docString = "", t.prototype.type = 0, t.prototype.f = 0, t.prototype.i = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.prototype.s = a.newBuffer([]), t.prototype.t = null, t.prototype.g = null, t.prototype.floats = a.emptyArray, t.prototype.ints = a.emptyArray, t.prototype.strings = a.emptyArray, t.prototype.tensors = a.emptyArray, t.prototype.graphs = a.emptyArray, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.name && t.hasOwnProperty("name") && e.uint32(10).string(t.name), null != t.f && t.hasOwnProperty("f") && e.uint32(21).float(t.f), null != t.i && t.hasOwnProperty("i") && e.uint32(24).int64(t.i), null != t.s && t.hasOwnProperty("s") && e.uint32(34).bytes(t.s), null != t.t && t.hasOwnProperty("t") && u.onnx.TensorProto.encode(t.t, e.uint32(42).fork()).ldelim(), null != t.g && t.hasOwnProperty("g") && u.onnx.GraphProto.encode(t.g, e.uint32(50).fork()).ldelim(), null != t.floats && t.floats.length) {
            e.uint32(58).fork();

            for (var n = 0; n < t.floats.length; ++n) e.float(t.floats[n]);

            e.ldelim();
          }

          if (null != t.ints && t.ints.length) {
            e.uint32(66).fork();

            for (n = 0; n < t.ints.length; ++n) e.int64(t.ints[n]);

            e.ldelim();
          }

          if (null != t.strings && t.strings.length) for (n = 0; n < t.strings.length; ++n) e.uint32(74).bytes(t.strings[n]);
          if (null != t.tensors && t.tensors.length) for (n = 0; n < t.tensors.length; ++n) u.onnx.TensorProto.encode(t.tensors[n], e.uint32(82).fork()).ldelim();
          if (null != t.graphs && t.graphs.length) for (n = 0; n < t.graphs.length; ++n) u.onnx.GraphProto.encode(t.graphs[n], e.uint32(90).fork()).ldelim();
          return null != t.docString && t.hasOwnProperty("docString") && e.uint32(106).string(t.docString), null != t.type && t.hasOwnProperty("type") && e.uint32(160).int32(t.type), null != t.refAttrName && t.hasOwnProperty("refAttrName") && e.uint32(170).string(t.refAttrName), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.AttributeProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.name = t.string();
                break;

              case 21:
                r.refAttrName = t.string();
                break;

              case 13:
                r.docString = t.string();
                break;

              case 20:
                r.type = t.int32();
                break;

              case 2:
                r.f = t.float();
                break;

              case 3:
                r.i = t.int64();
                break;

              case 4:
                r.s = t.bytes();
                break;

              case 5:
                r.t = u.onnx.TensorProto.decode(t, t.uint32());
                break;

              case 6:
                r.g = u.onnx.GraphProto.decode(t, t.uint32());
                break;

              case 7:
                if (r.floats && r.floats.length || (r.floats = []), 2 == (7 & i)) for (var a = t.uint32() + t.pos; t.pos < a;) r.floats.push(t.float());else r.floats.push(t.float());
                break;

              case 8:
                if (r.ints && r.ints.length || (r.ints = []), 2 == (7 & i)) for (a = t.uint32() + t.pos; t.pos < a;) r.ints.push(t.int64());else r.ints.push(t.int64());
                break;

              case 9:
                r.strings && r.strings.length || (r.strings = []), r.strings.push(t.bytes());
                break;

              case 10:
                r.tensors && r.tensors.length || (r.tensors = []), r.tensors.push(u.onnx.TensorProto.decode(t, t.uint32()));
                break;

              case 11:
                r.graphs && r.graphs.length || (r.graphs = []), r.graphs.push(u.onnx.GraphProto.decode(t, t.uint32()));
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";
          if (null != t.name && t.hasOwnProperty("name") && !a.isString(t.name)) return "name: string expected";
          if (null != t.refAttrName && t.hasOwnProperty("refAttrName") && !a.isString(t.refAttrName)) return "refAttrName: string expected";
          if (null != t.docString && t.hasOwnProperty("docString") && !a.isString(t.docString)) return "docString: string expected";
          if (null != t.type && t.hasOwnProperty("type")) switch (t.type) {
            default:
              return "type: enum value expected";

            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
          }
          if (null != t.f && t.hasOwnProperty("f") && "number" != typeof t.f) return "f: number expected";
          if (null != t.i && t.hasOwnProperty("i") && !(a.isInteger(t.i) || t.i && a.isInteger(t.i.low) && a.isInteger(t.i.high))) return "i: integer|Long expected";
          if (null != t.s && t.hasOwnProperty("s") && !(t.s && "number" == typeof t.s.length || a.isString(t.s))) return "s: buffer expected";
          if (null != t.t && t.hasOwnProperty("t") && (n = u.onnx.TensorProto.verify(t.t))) return "t." + n;
          if (null != t.g && t.hasOwnProperty("g") && (n = u.onnx.GraphProto.verify(t.g))) return "g." + n;

          if (null != t.floats && t.hasOwnProperty("floats")) {
            if (!Array.isArray(t.floats)) return "floats: array expected";

            for (var e = 0; e < t.floats.length; ++e) if ("number" != typeof t.floats[e]) return "floats: number[] expected";
          }

          if (null != t.ints && t.hasOwnProperty("ints")) {
            if (!Array.isArray(t.ints)) return "ints: array expected";

            for (e = 0; e < t.ints.length; ++e) if (!(a.isInteger(t.ints[e]) || t.ints[e] && a.isInteger(t.ints[e].low) && a.isInteger(t.ints[e].high))) return "ints: integer|Long[] expected";
          }

          if (null != t.strings && t.hasOwnProperty("strings")) {
            if (!Array.isArray(t.strings)) return "strings: array expected";

            for (e = 0; e < t.strings.length; ++e) if (!(t.strings[e] && "number" == typeof t.strings[e].length || a.isString(t.strings[e]))) return "strings: buffer[] expected";
          }

          if (null != t.tensors && t.hasOwnProperty("tensors")) {
            if (!Array.isArray(t.tensors)) return "tensors: array expected";

            for (e = 0; e < t.tensors.length; ++e) {
              if (n = u.onnx.TensorProto.verify(t.tensors[e])) return "tensors." + n;
            }
          }

          if (null != t.graphs && t.hasOwnProperty("graphs")) {
            if (!Array.isArray(t.graphs)) return "graphs: array expected";

            for (e = 0; e < t.graphs.length; ++e) {
              var n;
              if (n = u.onnx.GraphProto.verify(t.graphs[e])) return "graphs." + n;
            }
          }

          return null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.AttributeProto) return t;
          var e = new u.onnx.AttributeProto();

          switch (null != t.name && (e.name = String(t.name)), null != t.refAttrName && (e.refAttrName = String(t.refAttrName)), null != t.docString && (e.docString = String(t.docString)), t.type) {
            case "UNDEFINED":
            case 0:
              e.type = 0;
              break;

            case "FLOAT":
            case 1:
              e.type = 1;
              break;

            case "INT":
            case 2:
              e.type = 2;
              break;

            case "STRING":
            case 3:
              e.type = 3;
              break;

            case "TENSOR":
            case 4:
              e.type = 4;
              break;

            case "GRAPH":
            case 5:
              e.type = 5;
              break;

            case "FLOATS":
            case 6:
              e.type = 6;
              break;

            case "INTS":
            case 7:
              e.type = 7;
              break;

            case "STRINGS":
            case 8:
              e.type = 8;
              break;

            case "TENSORS":
            case 9:
              e.type = 9;
              break;

            case "GRAPHS":
            case 10:
              e.type = 10;
          }

          if (null != t.f && (e.f = Number(t.f)), null != t.i && (a.Long ? (e.i = a.Long.fromValue(t.i)).unsigned = !1 : "string" == typeof t.i ? e.i = parseInt(t.i, 10) : "number" == typeof t.i ? e.i = t.i : "object" == typeof t.i && (e.i = new a.LongBits(t.i.low >>> 0, t.i.high >>> 0).toNumber())), null != t.s && ("string" == typeof t.s ? a.base64.decode(t.s, e.s = a.newBuffer(a.base64.length(t.s)), 0) : t.s.length && (e.s = t.s)), null != t.t) {
            if ("object" != typeof t.t) throw TypeError(".onnx.AttributeProto.t: object expected");
            e.t = u.onnx.TensorProto.fromObject(t.t);
          }

          if (null != t.g) {
            if ("object" != typeof t.g) throw TypeError(".onnx.AttributeProto.g: object expected");
            e.g = u.onnx.GraphProto.fromObject(t.g);
          }

          if (t.floats) {
            if (!Array.isArray(t.floats)) throw TypeError(".onnx.AttributeProto.floats: array expected");
            e.floats = [];

            for (var n = 0; n < t.floats.length; ++n) e.floats[n] = Number(t.floats[n]);
          }

          if (t.ints) {
            if (!Array.isArray(t.ints)) throw TypeError(".onnx.AttributeProto.ints: array expected");
            e.ints = [];

            for (n = 0; n < t.ints.length; ++n) a.Long ? (e.ints[n] = a.Long.fromValue(t.ints[n])).unsigned = !1 : "string" == typeof t.ints[n] ? e.ints[n] = parseInt(t.ints[n], 10) : "number" == typeof t.ints[n] ? e.ints[n] = t.ints[n] : "object" == typeof t.ints[n] && (e.ints[n] = new a.LongBits(t.ints[n].low >>> 0, t.ints[n].high >>> 0).toNumber());
          }

          if (t.strings) {
            if (!Array.isArray(t.strings)) throw TypeError(".onnx.AttributeProto.strings: array expected");
            e.strings = [];

            for (n = 0; n < t.strings.length; ++n) "string" == typeof t.strings[n] ? a.base64.decode(t.strings[n], e.strings[n] = a.newBuffer(a.base64.length(t.strings[n])), 0) : t.strings[n].length && (e.strings[n] = t.strings[n]);
          }

          if (t.tensors) {
            if (!Array.isArray(t.tensors)) throw TypeError(".onnx.AttributeProto.tensors: array expected");
            e.tensors = [];

            for (n = 0; n < t.tensors.length; ++n) {
              if ("object" != typeof t.tensors[n]) throw TypeError(".onnx.AttributeProto.tensors: object expected");
              e.tensors[n] = u.onnx.TensorProto.fromObject(t.tensors[n]);
            }
          }

          if (t.graphs) {
            if (!Array.isArray(t.graphs)) throw TypeError(".onnx.AttributeProto.graphs: array expected");
            e.graphs = [];

            for (n = 0; n < t.graphs.length; ++n) {
              if ("object" != typeof t.graphs[n]) throw TypeError(".onnx.AttributeProto.graphs: object expected");
              e.graphs[n] = u.onnx.GraphProto.fromObject(t.graphs[n]);
            }
          }

          return e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.floats = [], n.ints = [], n.strings = [], n.tensors = [], n.graphs = []), e.defaults) {
            if (n.name = "", n.f = 0, a.Long) {
              var r = new a.Long(0, 0, !1);
              n.i = e.longs === String ? r.toString() : e.longs === Number ? r.toNumber() : r;
            } else n.i = e.longs === String ? "0" : 0;

            e.bytes === String ? n.s = "" : (n.s = [], e.bytes !== Array && (n.s = a.newBuffer(n.s))), n.t = null, n.g = null, n.docString = "", n.type = e.enums === String ? "UNDEFINED" : 0, n.refAttrName = "";
          }

          if (null != t.name && t.hasOwnProperty("name") && (n.name = t.name), null != t.f && t.hasOwnProperty("f") && (n.f = e.json && !isFinite(t.f) ? String(t.f) : t.f), null != t.i && t.hasOwnProperty("i") && ("number" == typeof t.i ? n.i = e.longs === String ? String(t.i) : t.i : n.i = e.longs === String ? a.Long.prototype.toString.call(t.i) : e.longs === Number ? new a.LongBits(t.i.low >>> 0, t.i.high >>> 0).toNumber() : t.i), null != t.s && t.hasOwnProperty("s") && (n.s = e.bytes === String ? a.base64.encode(t.s, 0, t.s.length) : e.bytes === Array ? Array.prototype.slice.call(t.s) : t.s), null != t.t && t.hasOwnProperty("t") && (n.t = u.onnx.TensorProto.toObject(t.t, e)), null != t.g && t.hasOwnProperty("g") && (n.g = u.onnx.GraphProto.toObject(t.g, e)), t.floats && t.floats.length) {
            n.floats = [];

            for (var o = 0; o < t.floats.length; ++o) n.floats[o] = e.json && !isFinite(t.floats[o]) ? String(t.floats[o]) : t.floats[o];
          }

          if (t.ints && t.ints.length) {
            n.ints = [];

            for (o = 0; o < t.ints.length; ++o) "number" == typeof t.ints[o] ? n.ints[o] = e.longs === String ? String(t.ints[o]) : t.ints[o] : n.ints[o] = e.longs === String ? a.Long.prototype.toString.call(t.ints[o]) : e.longs === Number ? new a.LongBits(t.ints[o].low >>> 0, t.ints[o].high >>> 0).toNumber() : t.ints[o];
          }

          if (t.strings && t.strings.length) {
            n.strings = [];

            for (o = 0; o < t.strings.length; ++o) n.strings[o] = e.bytes === String ? a.base64.encode(t.strings[o], 0, t.strings[o].length) : e.bytes === Array ? Array.prototype.slice.call(t.strings[o]) : t.strings[o];
          }

          if (t.tensors && t.tensors.length) {
            n.tensors = [];

            for (o = 0; o < t.tensors.length; ++o) n.tensors[o] = u.onnx.TensorProto.toObject(t.tensors[o], e);
          }

          if (t.graphs && t.graphs.length) {
            n.graphs = [];

            for (o = 0; o < t.graphs.length; ++o) n.graphs[o] = u.onnx.GraphProto.toObject(t.graphs[o], e);
          }

          return null != t.docString && t.hasOwnProperty("docString") && (n.docString = t.docString), null != t.type && t.hasOwnProperty("type") && (n.type = e.enums === String ? u.onnx.AttributeProto.AttributeType[t.type] : t.type), null != t.refAttrName && t.hasOwnProperty("refAttrName") && (n.refAttrName = t.refAttrName), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t.AttributeType = function () {
          var t = {},
              e = Object.create(t);
          return e[t[0] = "UNDEFINED"] = 0, e[t[1] = "FLOAT"] = 1, e[t[2] = "INT"] = 2, e[t[3] = "STRING"] = 3, e[t[4] = "TENSOR"] = 4, e[t[5] = "GRAPH"] = 5, e[t[6] = "FLOATS"] = 6, e[t[7] = "INTS"] = 7, e[t[8] = "STRINGS"] = 8, e[t[9] = "TENSORS"] = 9, e[t[10] = "GRAPHS"] = 10, e;
        }(), t;
      }(), n.ValueInfoProto = function () {
        function t(t) {
          if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.name = "", t.prototype.type = null, t.prototype.docString = "", t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          return e || (e = i.create()), null != t.name && t.hasOwnProperty("name") && e.uint32(10).string(t.name), null != t.type && t.hasOwnProperty("type") && u.onnx.TypeProto.encode(t.type, e.uint32(18).fork()).ldelim(), null != t.docString && t.hasOwnProperty("docString") && e.uint32(26).string(t.docString), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.ValueInfoProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.name = t.string();
                break;

              case 2:
                r.type = u.onnx.TypeProto.decode(t, t.uint32());
                break;

              case 3:
                r.docString = t.string();
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";
          if (null != t.name && t.hasOwnProperty("name") && !a.isString(t.name)) return "name: string expected";

          if (null != t.type && t.hasOwnProperty("type")) {
            var e = u.onnx.TypeProto.verify(t.type);
            if (e) return "type." + e;
          }

          return null != t.docString && t.hasOwnProperty("docString") && !a.isString(t.docString) ? "docString: string expected" : null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.ValueInfoProto) return t;
          var e = new u.onnx.ValueInfoProto();

          if (null != t.name && (e.name = String(t.name)), null != t.type) {
            if ("object" != typeof t.type) throw TypeError(".onnx.ValueInfoProto.type: object expected");
            e.type = u.onnx.TypeProto.fromObject(t.type);
          }

          return null != t.docString && (e.docString = String(t.docString)), e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};
          return e.defaults && (n.name = "", n.type = null, n.docString = ""), null != t.name && t.hasOwnProperty("name") && (n.name = t.name), null != t.type && t.hasOwnProperty("type") && (n.type = u.onnx.TypeProto.toObject(t.type, e)), null != t.docString && t.hasOwnProperty("docString") && (n.docString = t.docString), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n.NodeProto = function () {
        function t(t) {
          if (this.input = [], this.output = [], this.attribute = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.input = a.emptyArray, t.prototype.output = a.emptyArray, t.prototype.name = "", t.prototype.opType = "", t.prototype.domain = "", t.prototype.attribute = a.emptyArray, t.prototype.docString = "", t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.input && t.input.length) for (var n = 0; n < t.input.length; ++n) e.uint32(10).string(t.input[n]);
          if (null != t.output && t.output.length) for (n = 0; n < t.output.length; ++n) e.uint32(18).string(t.output[n]);
          if (null != t.name && t.hasOwnProperty("name") && e.uint32(26).string(t.name), null != t.opType && t.hasOwnProperty("opType") && e.uint32(34).string(t.opType), null != t.attribute && t.attribute.length) for (n = 0; n < t.attribute.length; ++n) u.onnx.AttributeProto.encode(t.attribute[n], e.uint32(42).fork()).ldelim();
          return null != t.docString && t.hasOwnProperty("docString") && e.uint32(50).string(t.docString), null != t.domain && t.hasOwnProperty("domain") && e.uint32(58).string(t.domain), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.NodeProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.input && r.input.length || (r.input = []), r.input.push(t.string());
                break;

              case 2:
                r.output && r.output.length || (r.output = []), r.output.push(t.string());
                break;

              case 3:
                r.name = t.string();
                break;

              case 4:
                r.opType = t.string();
                break;

              case 7:
                r.domain = t.string();
                break;

              case 5:
                r.attribute && r.attribute.length || (r.attribute = []), r.attribute.push(u.onnx.AttributeProto.decode(t, t.uint32()));
                break;

              case 6:
                r.docString = t.string();
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";

          if (null != t.input && t.hasOwnProperty("input")) {
            if (!Array.isArray(t.input)) return "input: array expected";

            for (var e = 0; e < t.input.length; ++e) if (!a.isString(t.input[e])) return "input: string[] expected";
          }

          if (null != t.output && t.hasOwnProperty("output")) {
            if (!Array.isArray(t.output)) return "output: array expected";

            for (e = 0; e < t.output.length; ++e) if (!a.isString(t.output[e])) return "output: string[] expected";
          }

          if (null != t.name && t.hasOwnProperty("name") && !a.isString(t.name)) return "name: string expected";
          if (null != t.opType && t.hasOwnProperty("opType") && !a.isString(t.opType)) return "opType: string expected";
          if (null != t.domain && t.hasOwnProperty("domain") && !a.isString(t.domain)) return "domain: string expected";

          if (null != t.attribute && t.hasOwnProperty("attribute")) {
            if (!Array.isArray(t.attribute)) return "attribute: array expected";

            for (e = 0; e < t.attribute.length; ++e) {
              var n = u.onnx.AttributeProto.verify(t.attribute[e]);
              if (n) return "attribute." + n;
            }
          }

          return null != t.docString && t.hasOwnProperty("docString") && !a.isString(t.docString) ? "docString: string expected" : null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.NodeProto) return t;
          var e = new u.onnx.NodeProto();

          if (t.input) {
            if (!Array.isArray(t.input)) throw TypeError(".onnx.NodeProto.input: array expected");
            e.input = [];

            for (var n = 0; n < t.input.length; ++n) e.input[n] = String(t.input[n]);
          }

          if (t.output) {
            if (!Array.isArray(t.output)) throw TypeError(".onnx.NodeProto.output: array expected");
            e.output = [];

            for (n = 0; n < t.output.length; ++n) e.output[n] = String(t.output[n]);
          }

          if (null != t.name && (e.name = String(t.name)), null != t.opType && (e.opType = String(t.opType)), null != t.domain && (e.domain = String(t.domain)), t.attribute) {
            if (!Array.isArray(t.attribute)) throw TypeError(".onnx.NodeProto.attribute: array expected");
            e.attribute = [];

            for (n = 0; n < t.attribute.length; ++n) {
              if ("object" != typeof t.attribute[n]) throw TypeError(".onnx.NodeProto.attribute: object expected");
              e.attribute[n] = u.onnx.AttributeProto.fromObject(t.attribute[n]);
            }
          }

          return null != t.docString && (e.docString = String(t.docString)), e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.input = [], n.output = [], n.attribute = []), e.defaults && (n.name = "", n.opType = "", n.docString = "", n.domain = ""), t.input && t.input.length) {
            n.input = [];

            for (var r = 0; r < t.input.length; ++r) n.input[r] = t.input[r];
          }

          if (t.output && t.output.length) {
            n.output = [];

            for (r = 0; r < t.output.length; ++r) n.output[r] = t.output[r];
          }

          if (null != t.name && t.hasOwnProperty("name") && (n.name = t.name), null != t.opType && t.hasOwnProperty("opType") && (n.opType = t.opType), t.attribute && t.attribute.length) {
            n.attribute = [];

            for (r = 0; r < t.attribute.length; ++r) n.attribute[r] = u.onnx.AttributeProto.toObject(t.attribute[r], e);
          }

          return null != t.docString && t.hasOwnProperty("docString") && (n.docString = t.docString), null != t.domain && t.hasOwnProperty("domain") && (n.domain = t.domain), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n.ModelProto = function () {
        function t(t) {
          if (this.opsetImport = [], this.metadataProps = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.irVersion = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.prototype.opsetImport = a.emptyArray, t.prototype.producerName = "", t.prototype.producerVersion = "", t.prototype.domain = "", t.prototype.modelVersion = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.prototype.docString = "", t.prototype.graph = null, t.prototype.metadataProps = a.emptyArray, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.irVersion && t.hasOwnProperty("irVersion") && e.uint32(8).int64(t.irVersion), null != t.producerName && t.hasOwnProperty("producerName") && e.uint32(18).string(t.producerName), null != t.producerVersion && t.hasOwnProperty("producerVersion") && e.uint32(26).string(t.producerVersion), null != t.domain && t.hasOwnProperty("domain") && e.uint32(34).string(t.domain), null != t.modelVersion && t.hasOwnProperty("modelVersion") && e.uint32(40).int64(t.modelVersion), null != t.docString && t.hasOwnProperty("docString") && e.uint32(50).string(t.docString), null != t.graph && t.hasOwnProperty("graph") && u.onnx.GraphProto.encode(t.graph, e.uint32(58).fork()).ldelim(), null != t.opsetImport && t.opsetImport.length) for (var n = 0; n < t.opsetImport.length; ++n) u.onnx.OperatorSetIdProto.encode(t.opsetImport[n], e.uint32(66).fork()).ldelim();
          if (null != t.metadataProps && t.metadataProps.length) for (n = 0; n < t.metadataProps.length; ++n) u.onnx.StringStringEntryProto.encode(t.metadataProps[n], e.uint32(114).fork()).ldelim();
          return e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.ModelProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.irVersion = t.int64();
                break;

              case 8:
                r.opsetImport && r.opsetImport.length || (r.opsetImport = []), r.opsetImport.push(u.onnx.OperatorSetIdProto.decode(t, t.uint32()));
                break;

              case 2:
                r.producerName = t.string();
                break;

              case 3:
                r.producerVersion = t.string();
                break;

              case 4:
                r.domain = t.string();
                break;

              case 5:
                r.modelVersion = t.int64();
                break;

              case 6:
                r.docString = t.string();
                break;

              case 7:
                r.graph = u.onnx.GraphProto.decode(t, t.uint32());
                break;

              case 14:
                r.metadataProps && r.metadataProps.length || (r.metadataProps = []), r.metadataProps.push(u.onnx.StringStringEntryProto.decode(t, t.uint32()));
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";
          if (null != t.irVersion && t.hasOwnProperty("irVersion") && !(a.isInteger(t.irVersion) || t.irVersion && a.isInteger(t.irVersion.low) && a.isInteger(t.irVersion.high))) return "irVersion: integer|Long expected";

          if (null != t.opsetImport && t.hasOwnProperty("opsetImport")) {
            if (!Array.isArray(t.opsetImport)) return "opsetImport: array expected";

            for (var e = 0; e < t.opsetImport.length; ++e) {
              if (n = u.onnx.OperatorSetIdProto.verify(t.opsetImport[e])) return "opsetImport." + n;
            }
          }

          if (null != t.producerName && t.hasOwnProperty("producerName") && !a.isString(t.producerName)) return "producerName: string expected";
          if (null != t.producerVersion && t.hasOwnProperty("producerVersion") && !a.isString(t.producerVersion)) return "producerVersion: string expected";
          if (null != t.domain && t.hasOwnProperty("domain") && !a.isString(t.domain)) return "domain: string expected";
          if (null != t.modelVersion && t.hasOwnProperty("modelVersion") && !(a.isInteger(t.modelVersion) || t.modelVersion && a.isInteger(t.modelVersion.low) && a.isInteger(t.modelVersion.high))) return "modelVersion: integer|Long expected";
          if (null != t.docString && t.hasOwnProperty("docString") && !a.isString(t.docString)) return "docString: string expected";
          if (null != t.graph && t.hasOwnProperty("graph") && (n = u.onnx.GraphProto.verify(t.graph))) return "graph." + n;

          if (null != t.metadataProps && t.hasOwnProperty("metadataProps")) {
            if (!Array.isArray(t.metadataProps)) return "metadataProps: array expected";

            for (e = 0; e < t.metadataProps.length; ++e) {
              var n;
              if (n = u.onnx.StringStringEntryProto.verify(t.metadataProps[e])) return "metadataProps." + n;
            }
          }

          return null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.ModelProto) return t;
          var e = new u.onnx.ModelProto();

          if (null != t.irVersion && (a.Long ? (e.irVersion = a.Long.fromValue(t.irVersion)).unsigned = !1 : "string" == typeof t.irVersion ? e.irVersion = parseInt(t.irVersion, 10) : "number" == typeof t.irVersion ? e.irVersion = t.irVersion : "object" == typeof t.irVersion && (e.irVersion = new a.LongBits(t.irVersion.low >>> 0, t.irVersion.high >>> 0).toNumber())), t.opsetImport) {
            if (!Array.isArray(t.opsetImport)) throw TypeError(".onnx.ModelProto.opsetImport: array expected");
            e.opsetImport = [];

            for (var n = 0; n < t.opsetImport.length; ++n) {
              if ("object" != typeof t.opsetImport[n]) throw TypeError(".onnx.ModelProto.opsetImport: object expected");
              e.opsetImport[n] = u.onnx.OperatorSetIdProto.fromObject(t.opsetImport[n]);
            }
          }

          if (null != t.producerName && (e.producerName = String(t.producerName)), null != t.producerVersion && (e.producerVersion = String(t.producerVersion)), null != t.domain && (e.domain = String(t.domain)), null != t.modelVersion && (a.Long ? (e.modelVersion = a.Long.fromValue(t.modelVersion)).unsigned = !1 : "string" == typeof t.modelVersion ? e.modelVersion = parseInt(t.modelVersion, 10) : "number" == typeof t.modelVersion ? e.modelVersion = t.modelVersion : "object" == typeof t.modelVersion && (e.modelVersion = new a.LongBits(t.modelVersion.low >>> 0, t.modelVersion.high >>> 0).toNumber())), null != t.docString && (e.docString = String(t.docString)), null != t.graph) {
            if ("object" != typeof t.graph) throw TypeError(".onnx.ModelProto.graph: object expected");
            e.graph = u.onnx.GraphProto.fromObject(t.graph);
          }

          if (t.metadataProps) {
            if (!Array.isArray(t.metadataProps)) throw TypeError(".onnx.ModelProto.metadataProps: array expected");
            e.metadataProps = [];

            for (n = 0; n < t.metadataProps.length; ++n) {
              if ("object" != typeof t.metadataProps[n]) throw TypeError(".onnx.ModelProto.metadataProps: object expected");
              e.metadataProps[n] = u.onnx.StringStringEntryProto.fromObject(t.metadataProps[n]);
            }
          }

          return e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.opsetImport = [], n.metadataProps = []), e.defaults) {
            if (a.Long) {
              var r = new a.Long(0, 0, !1);
              n.irVersion = e.longs === String ? r.toString() : e.longs === Number ? r.toNumber() : r;
            } else n.irVersion = e.longs === String ? "0" : 0;

            if (n.producerName = "", n.producerVersion = "", n.domain = "", a.Long) {
              r = new a.Long(0, 0, !1);
              n.modelVersion = e.longs === String ? r.toString() : e.longs === Number ? r.toNumber() : r;
            } else n.modelVersion = e.longs === String ? "0" : 0;

            n.docString = "", n.graph = null;
          }

          if (null != t.irVersion && t.hasOwnProperty("irVersion") && ("number" == typeof t.irVersion ? n.irVersion = e.longs === String ? String(t.irVersion) : t.irVersion : n.irVersion = e.longs === String ? a.Long.prototype.toString.call(t.irVersion) : e.longs === Number ? new a.LongBits(t.irVersion.low >>> 0, t.irVersion.high >>> 0).toNumber() : t.irVersion), null != t.producerName && t.hasOwnProperty("producerName") && (n.producerName = t.producerName), null != t.producerVersion && t.hasOwnProperty("producerVersion") && (n.producerVersion = t.producerVersion), null != t.domain && t.hasOwnProperty("domain") && (n.domain = t.domain), null != t.modelVersion && t.hasOwnProperty("modelVersion") && ("number" == typeof t.modelVersion ? n.modelVersion = e.longs === String ? String(t.modelVersion) : t.modelVersion : n.modelVersion = e.longs === String ? a.Long.prototype.toString.call(t.modelVersion) : e.longs === Number ? new a.LongBits(t.modelVersion.low >>> 0, t.modelVersion.high >>> 0).toNumber() : t.modelVersion), null != t.docString && t.hasOwnProperty("docString") && (n.docString = t.docString), null != t.graph && t.hasOwnProperty("graph") && (n.graph = u.onnx.GraphProto.toObject(t.graph, e)), t.opsetImport && t.opsetImport.length) {
            n.opsetImport = [];

            for (var o = 0; o < t.opsetImport.length; ++o) n.opsetImport[o] = u.onnx.OperatorSetIdProto.toObject(t.opsetImport[o], e);
          }

          if (t.metadataProps && t.metadataProps.length) {
            n.metadataProps = [];

            for (o = 0; o < t.metadataProps.length; ++o) n.metadataProps[o] = u.onnx.StringStringEntryProto.toObject(t.metadataProps[o], e);
          }

          return n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n.StringStringEntryProto = function () {
        function t(t) {
          if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.key = "", t.prototype.value = "", t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          return e || (e = i.create()), null != t.key && t.hasOwnProperty("key") && e.uint32(10).string(t.key), null != t.value && t.hasOwnProperty("value") && e.uint32(18).string(t.value), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.StringStringEntryProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.key = t.string();
                break;

              case 2:
                r.value = t.string();
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          return "object" != typeof t || null === t ? "object expected" : null != t.key && t.hasOwnProperty("key") && !a.isString(t.key) ? "key: string expected" : null != t.value && t.hasOwnProperty("value") && !a.isString(t.value) ? "value: string expected" : null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.StringStringEntryProto) return t;
          var e = new u.onnx.StringStringEntryProto();
          return null != t.key && (e.key = String(t.key)), null != t.value && (e.value = String(t.value)), e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};
          return e.defaults && (n.key = "", n.value = ""), null != t.key && t.hasOwnProperty("key") && (n.key = t.key), null != t.value && t.hasOwnProperty("value") && (n.value = t.value), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n.TensorAnnotation = function () {
        function t(t) {
          if (this.quantParameterTensorNames = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.tensorName = "", t.prototype.quantParameterTensorNames = a.emptyArray, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.tensorName && t.hasOwnProperty("tensorName") && e.uint32(10).string(t.tensorName), null != t.quantParameterTensorNames && t.quantParameterTensorNames.length) for (var n = 0; n < t.quantParameterTensorNames.length; ++n) u.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[n], e.uint32(18).fork()).ldelim();
          return e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TensorAnnotation(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.tensorName = t.string();
                break;

              case 2:
                r.quantParameterTensorNames && r.quantParameterTensorNames.length || (r.quantParameterTensorNames = []), r.quantParameterTensorNames.push(u.onnx.StringStringEntryProto.decode(t, t.uint32()));
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";
          if (null != t.tensorName && t.hasOwnProperty("tensorName") && !a.isString(t.tensorName)) return "tensorName: string expected";

          if (null != t.quantParameterTensorNames && t.hasOwnProperty("quantParameterTensorNames")) {
            if (!Array.isArray(t.quantParameterTensorNames)) return "quantParameterTensorNames: array expected";

            for (var e = 0; e < t.quantParameterTensorNames.length; ++e) {
              var n = u.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[e]);
              if (n) return "quantParameterTensorNames." + n;
            }
          }

          return null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.TensorAnnotation) return t;
          var e = new u.onnx.TensorAnnotation();

          if (null != t.tensorName && (e.tensorName = String(t.tensorName)), t.quantParameterTensorNames) {
            if (!Array.isArray(t.quantParameterTensorNames)) throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");
            e.quantParameterTensorNames = [];

            for (var n = 0; n < t.quantParameterTensorNames.length; ++n) {
              if ("object" != typeof t.quantParameterTensorNames[n]) throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");
              e.quantParameterTensorNames[n] = u.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[n]);
            }
          }

          return e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.quantParameterTensorNames = []), e.defaults && (n.tensorName = ""), null != t.tensorName && t.hasOwnProperty("tensorName") && (n.tensorName = t.tensorName), t.quantParameterTensorNames && t.quantParameterTensorNames.length) {
            n.quantParameterTensorNames = [];

            for (var r = 0; r < t.quantParameterTensorNames.length; ++r) n.quantParameterTensorNames[r] = u.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[r], e);
          }

          return n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n.GraphProto = function () {
        function t(t) {
          if (this.node = [], this.initializer = [], this.input = [], this.output = [], this.valueInfo = [], this.quantizationAnnotation = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.node = a.emptyArray, t.prototype.name = "", t.prototype.initializer = a.emptyArray, t.prototype.docString = "", t.prototype.input = a.emptyArray, t.prototype.output = a.emptyArray, t.prototype.valueInfo = a.emptyArray, t.prototype.quantizationAnnotation = a.emptyArray, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.node && t.node.length) for (var n = 0; n < t.node.length; ++n) u.onnx.NodeProto.encode(t.node[n], e.uint32(10).fork()).ldelim();
          if (null != t.name && t.hasOwnProperty("name") && e.uint32(18).string(t.name), null != t.initializer && t.initializer.length) for (n = 0; n < t.initializer.length; ++n) u.onnx.TensorProto.encode(t.initializer[n], e.uint32(42).fork()).ldelim();
          if (null != t.docString && t.hasOwnProperty("docString") && e.uint32(82).string(t.docString), null != t.input && t.input.length) for (n = 0; n < t.input.length; ++n) u.onnx.ValueInfoProto.encode(t.input[n], e.uint32(90).fork()).ldelim();
          if (null != t.output && t.output.length) for (n = 0; n < t.output.length; ++n) u.onnx.ValueInfoProto.encode(t.output[n], e.uint32(98).fork()).ldelim();
          if (null != t.valueInfo && t.valueInfo.length) for (n = 0; n < t.valueInfo.length; ++n) u.onnx.ValueInfoProto.encode(t.valueInfo[n], e.uint32(106).fork()).ldelim();
          if (null != t.quantizationAnnotation && t.quantizationAnnotation.length) for (n = 0; n < t.quantizationAnnotation.length; ++n) u.onnx.TensorAnnotation.encode(t.quantizationAnnotation[n], e.uint32(114).fork()).ldelim();
          return e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.GraphProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.node && r.node.length || (r.node = []), r.node.push(u.onnx.NodeProto.decode(t, t.uint32()));
                break;

              case 2:
                r.name = t.string();
                break;

              case 5:
                r.initializer && r.initializer.length || (r.initializer = []), r.initializer.push(u.onnx.TensorProto.decode(t, t.uint32()));
                break;

              case 10:
                r.docString = t.string();
                break;

              case 11:
                r.input && r.input.length || (r.input = []), r.input.push(u.onnx.ValueInfoProto.decode(t, t.uint32()));
                break;

              case 12:
                r.output && r.output.length || (r.output = []), r.output.push(u.onnx.ValueInfoProto.decode(t, t.uint32()));
                break;

              case 13:
                r.valueInfo && r.valueInfo.length || (r.valueInfo = []), r.valueInfo.push(u.onnx.ValueInfoProto.decode(t, t.uint32()));
                break;

              case 14:
                r.quantizationAnnotation && r.quantizationAnnotation.length || (r.quantizationAnnotation = []), r.quantizationAnnotation.push(u.onnx.TensorAnnotation.decode(t, t.uint32()));
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";

          if (null != t.node && t.hasOwnProperty("node")) {
            if (!Array.isArray(t.node)) return "node: array expected";

            for (var e = 0; e < t.node.length; ++e) {
              if (n = u.onnx.NodeProto.verify(t.node[e])) return "node." + n;
            }
          }

          if (null != t.name && t.hasOwnProperty("name") && !a.isString(t.name)) return "name: string expected";

          if (null != t.initializer && t.hasOwnProperty("initializer")) {
            if (!Array.isArray(t.initializer)) return "initializer: array expected";

            for (e = 0; e < t.initializer.length; ++e) {
              if (n = u.onnx.TensorProto.verify(t.initializer[e])) return "initializer." + n;
            }
          }

          if (null != t.docString && t.hasOwnProperty("docString") && !a.isString(t.docString)) return "docString: string expected";

          if (null != t.input && t.hasOwnProperty("input")) {
            if (!Array.isArray(t.input)) return "input: array expected";

            for (e = 0; e < t.input.length; ++e) {
              if (n = u.onnx.ValueInfoProto.verify(t.input[e])) return "input." + n;
            }
          }

          if (null != t.output && t.hasOwnProperty("output")) {
            if (!Array.isArray(t.output)) return "output: array expected";

            for (e = 0; e < t.output.length; ++e) {
              if (n = u.onnx.ValueInfoProto.verify(t.output[e])) return "output." + n;
            }
          }

          if (null != t.valueInfo && t.hasOwnProperty("valueInfo")) {
            if (!Array.isArray(t.valueInfo)) return "valueInfo: array expected";

            for (e = 0; e < t.valueInfo.length; ++e) {
              if (n = u.onnx.ValueInfoProto.verify(t.valueInfo[e])) return "valueInfo." + n;
            }
          }

          if (null != t.quantizationAnnotation && t.hasOwnProperty("quantizationAnnotation")) {
            if (!Array.isArray(t.quantizationAnnotation)) return "quantizationAnnotation: array expected";

            for (e = 0; e < t.quantizationAnnotation.length; ++e) {
              var n;
              if (n = u.onnx.TensorAnnotation.verify(t.quantizationAnnotation[e])) return "quantizationAnnotation." + n;
            }
          }

          return null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.GraphProto) return t;
          var e = new u.onnx.GraphProto();

          if (t.node) {
            if (!Array.isArray(t.node)) throw TypeError(".onnx.GraphProto.node: array expected");
            e.node = [];

            for (var n = 0; n < t.node.length; ++n) {
              if ("object" != typeof t.node[n]) throw TypeError(".onnx.GraphProto.node: object expected");
              e.node[n] = u.onnx.NodeProto.fromObject(t.node[n]);
            }
          }

          if (null != t.name && (e.name = String(t.name)), t.initializer) {
            if (!Array.isArray(t.initializer)) throw TypeError(".onnx.GraphProto.initializer: array expected");
            e.initializer = [];

            for (n = 0; n < t.initializer.length; ++n) {
              if ("object" != typeof t.initializer[n]) throw TypeError(".onnx.GraphProto.initializer: object expected");
              e.initializer[n] = u.onnx.TensorProto.fromObject(t.initializer[n]);
            }
          }

          if (null != t.docString && (e.docString = String(t.docString)), t.input) {
            if (!Array.isArray(t.input)) throw TypeError(".onnx.GraphProto.input: array expected");
            e.input = [];

            for (n = 0; n < t.input.length; ++n) {
              if ("object" != typeof t.input[n]) throw TypeError(".onnx.GraphProto.input: object expected");
              e.input[n] = u.onnx.ValueInfoProto.fromObject(t.input[n]);
            }
          }

          if (t.output) {
            if (!Array.isArray(t.output)) throw TypeError(".onnx.GraphProto.output: array expected");
            e.output = [];

            for (n = 0; n < t.output.length; ++n) {
              if ("object" != typeof t.output[n]) throw TypeError(".onnx.GraphProto.output: object expected");
              e.output[n] = u.onnx.ValueInfoProto.fromObject(t.output[n]);
            }
          }

          if (t.valueInfo) {
            if (!Array.isArray(t.valueInfo)) throw TypeError(".onnx.GraphProto.valueInfo: array expected");
            e.valueInfo = [];

            for (n = 0; n < t.valueInfo.length; ++n) {
              if ("object" != typeof t.valueInfo[n]) throw TypeError(".onnx.GraphProto.valueInfo: object expected");
              e.valueInfo[n] = u.onnx.ValueInfoProto.fromObject(t.valueInfo[n]);
            }
          }

          if (t.quantizationAnnotation) {
            if (!Array.isArray(t.quantizationAnnotation)) throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");
            e.quantizationAnnotation = [];

            for (n = 0; n < t.quantizationAnnotation.length; ++n) {
              if ("object" != typeof t.quantizationAnnotation[n]) throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");
              e.quantizationAnnotation[n] = u.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[n]);
            }
          }

          return e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.node = [], n.initializer = [], n.input = [], n.output = [], n.valueInfo = [], n.quantizationAnnotation = []), e.defaults && (n.name = "", n.docString = ""), t.node && t.node.length) {
            n.node = [];

            for (var r = 0; r < t.node.length; ++r) n.node[r] = u.onnx.NodeProto.toObject(t.node[r], e);
          }

          if (null != t.name && t.hasOwnProperty("name") && (n.name = t.name), t.initializer && t.initializer.length) {
            n.initializer = [];

            for (r = 0; r < t.initializer.length; ++r) n.initializer[r] = u.onnx.TensorProto.toObject(t.initializer[r], e);
          }

          if (null != t.docString && t.hasOwnProperty("docString") && (n.docString = t.docString), t.input && t.input.length) {
            n.input = [];

            for (r = 0; r < t.input.length; ++r) n.input[r] = u.onnx.ValueInfoProto.toObject(t.input[r], e);
          }

          if (t.output && t.output.length) {
            n.output = [];

            for (r = 0; r < t.output.length; ++r) n.output[r] = u.onnx.ValueInfoProto.toObject(t.output[r], e);
          }

          if (t.valueInfo && t.valueInfo.length) {
            n.valueInfo = [];

            for (r = 0; r < t.valueInfo.length; ++r) n.valueInfo[r] = u.onnx.ValueInfoProto.toObject(t.valueInfo[r], e);
          }

          if (t.quantizationAnnotation && t.quantizationAnnotation.length) {
            n.quantizationAnnotation = [];

            for (r = 0; r < t.quantizationAnnotation.length; ++r) n.quantizationAnnotation[r] = u.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[r], e);
          }

          return n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n.TensorProto = function () {
        function t(t) {
          if (this.dims = [], this.floatData = [], this.int32Data = [], this.stringData = [], this.int64Data = [], this.externalData = [], this.doubleData = [], this.uint64Data = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.dims = a.emptyArray, t.prototype.dataType = 0, t.prototype.segment = null, t.prototype.floatData = a.emptyArray, t.prototype.int32Data = a.emptyArray, t.prototype.stringData = a.emptyArray, t.prototype.int64Data = a.emptyArray, t.prototype.name = "", t.prototype.docString = "", t.prototype.rawData = a.newBuffer([]), t.prototype.externalData = a.emptyArray, t.prototype.dataLocation = 0, t.prototype.doubleData = a.emptyArray, t.prototype.uint64Data = a.emptyArray, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.dims && t.dims.length) {
            e.uint32(10).fork();

            for (var n = 0; n < t.dims.length; ++n) e.int64(t.dims[n]);

            e.ldelim();
          }

          if (null != t.dataType && t.hasOwnProperty("dataType") && e.uint32(16).int32(t.dataType), null != t.segment && t.hasOwnProperty("segment") && u.onnx.TensorProto.Segment.encode(t.segment, e.uint32(26).fork()).ldelim(), null != t.floatData && t.floatData.length) {
            e.uint32(34).fork();

            for (n = 0; n < t.floatData.length; ++n) e.float(t.floatData[n]);

            e.ldelim();
          }

          if (null != t.int32Data && t.int32Data.length) {
            e.uint32(42).fork();

            for (n = 0; n < t.int32Data.length; ++n) e.int32(t.int32Data[n]);

            e.ldelim();
          }

          if (null != t.stringData && t.stringData.length) for (n = 0; n < t.stringData.length; ++n) e.uint32(50).bytes(t.stringData[n]);

          if (null != t.int64Data && t.int64Data.length) {
            e.uint32(58).fork();

            for (n = 0; n < t.int64Data.length; ++n) e.int64(t.int64Data[n]);

            e.ldelim();
          }

          if (null != t.name && t.hasOwnProperty("name") && e.uint32(66).string(t.name), null != t.rawData && t.hasOwnProperty("rawData") && e.uint32(74).bytes(t.rawData), null != t.doubleData && t.doubleData.length) {
            e.uint32(82).fork();

            for (n = 0; n < t.doubleData.length; ++n) e.double(t.doubleData[n]);

            e.ldelim();
          }

          if (null != t.uint64Data && t.uint64Data.length) {
            e.uint32(90).fork();

            for (n = 0; n < t.uint64Data.length; ++n) e.uint64(t.uint64Data[n]);

            e.ldelim();
          }

          if (null != t.docString && t.hasOwnProperty("docString") && e.uint32(98).string(t.docString), null != t.externalData && t.externalData.length) for (n = 0; n < t.externalData.length; ++n) u.onnx.StringStringEntryProto.encode(t.externalData[n], e.uint32(106).fork()).ldelim();
          return null != t.dataLocation && t.hasOwnProperty("dataLocation") && e.uint32(112).int32(t.dataLocation), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TensorProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                if (r.dims && r.dims.length || (r.dims = []), 2 == (7 & i)) for (var a = t.uint32() + t.pos; t.pos < a;) r.dims.push(t.int64());else r.dims.push(t.int64());
                break;

              case 2:
                r.dataType = t.int32();
                break;

              case 3:
                r.segment = u.onnx.TensorProto.Segment.decode(t, t.uint32());
                break;

              case 4:
                if (r.floatData && r.floatData.length || (r.floatData = []), 2 == (7 & i)) for (a = t.uint32() + t.pos; t.pos < a;) r.floatData.push(t.float());else r.floatData.push(t.float());
                break;

              case 5:
                if (r.int32Data && r.int32Data.length || (r.int32Data = []), 2 == (7 & i)) for (a = t.uint32() + t.pos; t.pos < a;) r.int32Data.push(t.int32());else r.int32Data.push(t.int32());
                break;

              case 6:
                r.stringData && r.stringData.length || (r.stringData = []), r.stringData.push(t.bytes());
                break;

              case 7:
                if (r.int64Data && r.int64Data.length || (r.int64Data = []), 2 == (7 & i)) for (a = t.uint32() + t.pos; t.pos < a;) r.int64Data.push(t.int64());else r.int64Data.push(t.int64());
                break;

              case 8:
                r.name = t.string();
                break;

              case 12:
                r.docString = t.string();
                break;

              case 9:
                r.rawData = t.bytes();
                break;

              case 13:
                r.externalData && r.externalData.length || (r.externalData = []), r.externalData.push(u.onnx.StringStringEntryProto.decode(t, t.uint32()));
                break;

              case 14:
                r.dataLocation = t.int32();
                break;

              case 10:
                if (r.doubleData && r.doubleData.length || (r.doubleData = []), 2 == (7 & i)) for (a = t.uint32() + t.pos; t.pos < a;) r.doubleData.push(t.double());else r.doubleData.push(t.double());
                break;

              case 11:
                if (r.uint64Data && r.uint64Data.length || (r.uint64Data = []), 2 == (7 & i)) for (a = t.uint32() + t.pos; t.pos < a;) r.uint64Data.push(t.uint64());else r.uint64Data.push(t.uint64());
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";

          if (null != t.dims && t.hasOwnProperty("dims")) {
            if (!Array.isArray(t.dims)) return "dims: array expected";

            for (var e = 0; e < t.dims.length; ++e) if (!(a.isInteger(t.dims[e]) || t.dims[e] && a.isInteger(t.dims[e].low) && a.isInteger(t.dims[e].high))) return "dims: integer|Long[] expected";
          }

          if (null != t.dataType && t.hasOwnProperty("dataType") && !a.isInteger(t.dataType)) return "dataType: integer expected";
          if (null != t.segment && t.hasOwnProperty("segment") && (n = u.onnx.TensorProto.Segment.verify(t.segment))) return "segment." + n;

          if (null != t.floatData && t.hasOwnProperty("floatData")) {
            if (!Array.isArray(t.floatData)) return "floatData: array expected";

            for (e = 0; e < t.floatData.length; ++e) if ("number" != typeof t.floatData[e]) return "floatData: number[] expected";
          }

          if (null != t.int32Data && t.hasOwnProperty("int32Data")) {
            if (!Array.isArray(t.int32Data)) return "int32Data: array expected";

            for (e = 0; e < t.int32Data.length; ++e) if (!a.isInteger(t.int32Data[e])) return "int32Data: integer[] expected";
          }

          if (null != t.stringData && t.hasOwnProperty("stringData")) {
            if (!Array.isArray(t.stringData)) return "stringData: array expected";

            for (e = 0; e < t.stringData.length; ++e) if (!(t.stringData[e] && "number" == typeof t.stringData[e].length || a.isString(t.stringData[e]))) return "stringData: buffer[] expected";
          }

          if (null != t.int64Data && t.hasOwnProperty("int64Data")) {
            if (!Array.isArray(t.int64Data)) return "int64Data: array expected";

            for (e = 0; e < t.int64Data.length; ++e) if (!(a.isInteger(t.int64Data[e]) || t.int64Data[e] && a.isInteger(t.int64Data[e].low) && a.isInteger(t.int64Data[e].high))) return "int64Data: integer|Long[] expected";
          }

          if (null != t.name && t.hasOwnProperty("name") && !a.isString(t.name)) return "name: string expected";
          if (null != t.docString && t.hasOwnProperty("docString") && !a.isString(t.docString)) return "docString: string expected";
          if (null != t.rawData && t.hasOwnProperty("rawData") && !(t.rawData && "number" == typeof t.rawData.length || a.isString(t.rawData))) return "rawData: buffer expected";

          if (null != t.externalData && t.hasOwnProperty("externalData")) {
            if (!Array.isArray(t.externalData)) return "externalData: array expected";

            for (e = 0; e < t.externalData.length; ++e) {
              var n;
              if (n = u.onnx.StringStringEntryProto.verify(t.externalData[e])) return "externalData." + n;
            }
          }

          if (null != t.dataLocation && t.hasOwnProperty("dataLocation")) switch (t.dataLocation) {
            default:
              return "dataLocation: enum value expected";

            case 0:
            case 1:
          }

          if (null != t.doubleData && t.hasOwnProperty("doubleData")) {
            if (!Array.isArray(t.doubleData)) return "doubleData: array expected";

            for (e = 0; e < t.doubleData.length; ++e) if ("number" != typeof t.doubleData[e]) return "doubleData: number[] expected";
          }

          if (null != t.uint64Data && t.hasOwnProperty("uint64Data")) {
            if (!Array.isArray(t.uint64Data)) return "uint64Data: array expected";

            for (e = 0; e < t.uint64Data.length; ++e) if (!(a.isInteger(t.uint64Data[e]) || t.uint64Data[e] && a.isInteger(t.uint64Data[e].low) && a.isInteger(t.uint64Data[e].high))) return "uint64Data: integer|Long[] expected";
          }

          return null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.TensorProto) return t;
          var e = new u.onnx.TensorProto();

          if (t.dims) {
            if (!Array.isArray(t.dims)) throw TypeError(".onnx.TensorProto.dims: array expected");
            e.dims = [];

            for (var n = 0; n < t.dims.length; ++n) a.Long ? (e.dims[n] = a.Long.fromValue(t.dims[n])).unsigned = !1 : "string" == typeof t.dims[n] ? e.dims[n] = parseInt(t.dims[n], 10) : "number" == typeof t.dims[n] ? e.dims[n] = t.dims[n] : "object" == typeof t.dims[n] && (e.dims[n] = new a.LongBits(t.dims[n].low >>> 0, t.dims[n].high >>> 0).toNumber());
          }

          if (null != t.dataType && (e.dataType = 0 | t.dataType), null != t.segment) {
            if ("object" != typeof t.segment) throw TypeError(".onnx.TensorProto.segment: object expected");
            e.segment = u.onnx.TensorProto.Segment.fromObject(t.segment);
          }

          if (t.floatData) {
            if (!Array.isArray(t.floatData)) throw TypeError(".onnx.TensorProto.floatData: array expected");
            e.floatData = [];

            for (n = 0; n < t.floatData.length; ++n) e.floatData[n] = Number(t.floatData[n]);
          }

          if (t.int32Data) {
            if (!Array.isArray(t.int32Data)) throw TypeError(".onnx.TensorProto.int32Data: array expected");
            e.int32Data = [];

            for (n = 0; n < t.int32Data.length; ++n) e.int32Data[n] = 0 | t.int32Data[n];
          }

          if (t.stringData) {
            if (!Array.isArray(t.stringData)) throw TypeError(".onnx.TensorProto.stringData: array expected");
            e.stringData = [];

            for (n = 0; n < t.stringData.length; ++n) "string" == typeof t.stringData[n] ? a.base64.decode(t.stringData[n], e.stringData[n] = a.newBuffer(a.base64.length(t.stringData[n])), 0) : t.stringData[n].length && (e.stringData[n] = t.stringData[n]);
          }

          if (t.int64Data) {
            if (!Array.isArray(t.int64Data)) throw TypeError(".onnx.TensorProto.int64Data: array expected");
            e.int64Data = [];

            for (n = 0; n < t.int64Data.length; ++n) a.Long ? (e.int64Data[n] = a.Long.fromValue(t.int64Data[n])).unsigned = !1 : "string" == typeof t.int64Data[n] ? e.int64Data[n] = parseInt(t.int64Data[n], 10) : "number" == typeof t.int64Data[n] ? e.int64Data[n] = t.int64Data[n] : "object" == typeof t.int64Data[n] && (e.int64Data[n] = new a.LongBits(t.int64Data[n].low >>> 0, t.int64Data[n].high >>> 0).toNumber());
          }

          if (null != t.name && (e.name = String(t.name)), null != t.docString && (e.docString = String(t.docString)), null != t.rawData && ("string" == typeof t.rawData ? a.base64.decode(t.rawData, e.rawData = a.newBuffer(a.base64.length(t.rawData)), 0) : t.rawData.length && (e.rawData = t.rawData)), t.externalData) {
            if (!Array.isArray(t.externalData)) throw TypeError(".onnx.TensorProto.externalData: array expected");
            e.externalData = [];

            for (n = 0; n < t.externalData.length; ++n) {
              if ("object" != typeof t.externalData[n]) throw TypeError(".onnx.TensorProto.externalData: object expected");
              e.externalData[n] = u.onnx.StringStringEntryProto.fromObject(t.externalData[n]);
            }
          }

          switch (t.dataLocation) {
            case "DEFAULT":
            case 0:
              e.dataLocation = 0;
              break;

            case "EXTERNAL":
            case 1:
              e.dataLocation = 1;
          }

          if (t.doubleData) {
            if (!Array.isArray(t.doubleData)) throw TypeError(".onnx.TensorProto.doubleData: array expected");
            e.doubleData = [];

            for (n = 0; n < t.doubleData.length; ++n) e.doubleData[n] = Number(t.doubleData[n]);
          }

          if (t.uint64Data) {
            if (!Array.isArray(t.uint64Data)) throw TypeError(".onnx.TensorProto.uint64Data: array expected");
            e.uint64Data = [];

            for (n = 0; n < t.uint64Data.length; ++n) a.Long ? (e.uint64Data[n] = a.Long.fromValue(t.uint64Data[n])).unsigned = !0 : "string" == typeof t.uint64Data[n] ? e.uint64Data[n] = parseInt(t.uint64Data[n], 10) : "number" == typeof t.uint64Data[n] ? e.uint64Data[n] = t.uint64Data[n] : "object" == typeof t.uint64Data[n] && (e.uint64Data[n] = new a.LongBits(t.uint64Data[n].low >>> 0, t.uint64Data[n].high >>> 0).toNumber(!0));
          }

          return e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.dims = [], n.floatData = [], n.int32Data = [], n.stringData = [], n.int64Data = [], n.doubleData = [], n.uint64Data = [], n.externalData = []), e.defaults && (n.dataType = 0, n.segment = null, n.name = "", e.bytes === String ? n.rawData = "" : (n.rawData = [], e.bytes !== Array && (n.rawData = a.newBuffer(n.rawData))), n.docString = "", n.dataLocation = e.enums === String ? "DEFAULT" : 0), t.dims && t.dims.length) {
            n.dims = [];

            for (var r = 0; r < t.dims.length; ++r) "number" == typeof t.dims[r] ? n.dims[r] = e.longs === String ? String(t.dims[r]) : t.dims[r] : n.dims[r] = e.longs === String ? a.Long.prototype.toString.call(t.dims[r]) : e.longs === Number ? new a.LongBits(t.dims[r].low >>> 0, t.dims[r].high >>> 0).toNumber() : t.dims[r];
          }

          if (null != t.dataType && t.hasOwnProperty("dataType") && (n.dataType = t.dataType), null != t.segment && t.hasOwnProperty("segment") && (n.segment = u.onnx.TensorProto.Segment.toObject(t.segment, e)), t.floatData && t.floatData.length) {
            n.floatData = [];

            for (r = 0; r < t.floatData.length; ++r) n.floatData[r] = e.json && !isFinite(t.floatData[r]) ? String(t.floatData[r]) : t.floatData[r];
          }

          if (t.int32Data && t.int32Data.length) {
            n.int32Data = [];

            for (r = 0; r < t.int32Data.length; ++r) n.int32Data[r] = t.int32Data[r];
          }

          if (t.stringData && t.stringData.length) {
            n.stringData = [];

            for (r = 0; r < t.stringData.length; ++r) n.stringData[r] = e.bytes === String ? a.base64.encode(t.stringData[r], 0, t.stringData[r].length) : e.bytes === Array ? Array.prototype.slice.call(t.stringData[r]) : t.stringData[r];
          }

          if (t.int64Data && t.int64Data.length) {
            n.int64Data = [];

            for (r = 0; r < t.int64Data.length; ++r) "number" == typeof t.int64Data[r] ? n.int64Data[r] = e.longs === String ? String(t.int64Data[r]) : t.int64Data[r] : n.int64Data[r] = e.longs === String ? a.Long.prototype.toString.call(t.int64Data[r]) : e.longs === Number ? new a.LongBits(t.int64Data[r].low >>> 0, t.int64Data[r].high >>> 0).toNumber() : t.int64Data[r];
          }

          if (null != t.name && t.hasOwnProperty("name") && (n.name = t.name), null != t.rawData && t.hasOwnProperty("rawData") && (n.rawData = e.bytes === String ? a.base64.encode(t.rawData, 0, t.rawData.length) : e.bytes === Array ? Array.prototype.slice.call(t.rawData) : t.rawData), t.doubleData && t.doubleData.length) {
            n.doubleData = [];

            for (r = 0; r < t.doubleData.length; ++r) n.doubleData[r] = e.json && !isFinite(t.doubleData[r]) ? String(t.doubleData[r]) : t.doubleData[r];
          }

          if (t.uint64Data && t.uint64Data.length) {
            n.uint64Data = [];

            for (r = 0; r < t.uint64Data.length; ++r) "number" == typeof t.uint64Data[r] ? n.uint64Data[r] = e.longs === String ? String(t.uint64Data[r]) : t.uint64Data[r] : n.uint64Data[r] = e.longs === String ? a.Long.prototype.toString.call(t.uint64Data[r]) : e.longs === Number ? new a.LongBits(t.uint64Data[r].low >>> 0, t.uint64Data[r].high >>> 0).toNumber(!0) : t.uint64Data[r];
          }

          if (null != t.docString && t.hasOwnProperty("docString") && (n.docString = t.docString), t.externalData && t.externalData.length) {
            n.externalData = [];

            for (r = 0; r < t.externalData.length; ++r) n.externalData[r] = u.onnx.StringStringEntryProto.toObject(t.externalData[r], e);
          }

          return null != t.dataLocation && t.hasOwnProperty("dataLocation") && (n.dataLocation = e.enums === String ? u.onnx.TensorProto.DataLocation[t.dataLocation] : t.dataLocation), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t.DataType = function () {
          var t = {},
              e = Object.create(t);
          return e[t[0] = "UNDEFINED"] = 0, e[t[1] = "FLOAT"] = 1, e[t[2] = "UINT8"] = 2, e[t[3] = "INT8"] = 3, e[t[4] = "UINT16"] = 4, e[t[5] = "INT16"] = 5, e[t[6] = "INT32"] = 6, e[t[7] = "INT64"] = 7, e[t[8] = "STRING"] = 8, e[t[9] = "BOOL"] = 9, e[t[10] = "FLOAT16"] = 10, e[t[11] = "DOUBLE"] = 11, e[t[12] = "UINT32"] = 12, e[t[13] = "UINT64"] = 13, e[t[14] = "COMPLEX64"] = 14, e[t[15] = "COMPLEX128"] = 15, e[t[16] = "BFLOAT16"] = 16, e;
        }(), t.Segment = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
          }

          return t.prototype.begin = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.prototype.end = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.create = function (e) {
            return new t(e);
          }, t.encode = function (t, e) {
            return e || (e = i.create()), null != t.begin && t.hasOwnProperty("begin") && e.uint32(8).int64(t.begin), null != t.end && t.hasOwnProperty("end") && e.uint32(16).int64(t.end), e;
          }, t.encodeDelimited = function (t, e) {
            return this.encode(t, e).ldelim();
          }, t.decode = function (t, e) {
            t instanceof o || (t = o.create(t));

            for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TensorProto.Segment(); t.pos < n;) {
              var i = t.uint32();

              switch (i >>> 3) {
                case 1:
                  r.begin = t.int64();
                  break;

                case 2:
                  r.end = t.int64();
                  break;

                default:
                  t.skipType(7 & i);
              }
            }

            return r;
          }, t.decodeDelimited = function (t) {
            return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
          }, t.verify = function (t) {
            return "object" != typeof t || null === t ? "object expected" : null != t.begin && t.hasOwnProperty("begin") && !(a.isInteger(t.begin) || t.begin && a.isInteger(t.begin.low) && a.isInteger(t.begin.high)) ? "begin: integer|Long expected" : null != t.end && t.hasOwnProperty("end") && !(a.isInteger(t.end) || t.end && a.isInteger(t.end.low) && a.isInteger(t.end.high)) ? "end: integer|Long expected" : null;
          }, t.fromObject = function (t) {
            if (t instanceof u.onnx.TensorProto.Segment) return t;
            var e = new u.onnx.TensorProto.Segment();
            return null != t.begin && (a.Long ? (e.begin = a.Long.fromValue(t.begin)).unsigned = !1 : "string" == typeof t.begin ? e.begin = parseInt(t.begin, 10) : "number" == typeof t.begin ? e.begin = t.begin : "object" == typeof t.begin && (e.begin = new a.LongBits(t.begin.low >>> 0, t.begin.high >>> 0).toNumber())), null != t.end && (a.Long ? (e.end = a.Long.fromValue(t.end)).unsigned = !1 : "string" == typeof t.end ? e.end = parseInt(t.end, 10) : "number" == typeof t.end ? e.end = t.end : "object" == typeof t.end && (e.end = new a.LongBits(t.end.low >>> 0, t.end.high >>> 0).toNumber())), e;
          }, t.toObject = function (t, e) {
            e || (e = {});
            var n = {};

            if (e.defaults) {
              if (a.Long) {
                var r = new a.Long(0, 0, !1);
                n.begin = e.longs === String ? r.toString() : e.longs === Number ? r.toNumber() : r;
              } else n.begin = e.longs === String ? "0" : 0;

              if (a.Long) {
                r = new a.Long(0, 0, !1);
                n.end = e.longs === String ? r.toString() : e.longs === Number ? r.toNumber() : r;
              } else n.end = e.longs === String ? "0" : 0;
            }

            return null != t.begin && t.hasOwnProperty("begin") && ("number" == typeof t.begin ? n.begin = e.longs === String ? String(t.begin) : t.begin : n.begin = e.longs === String ? a.Long.prototype.toString.call(t.begin) : e.longs === Number ? new a.LongBits(t.begin.low >>> 0, t.begin.high >>> 0).toNumber() : t.begin), null != t.end && t.hasOwnProperty("end") && ("number" == typeof t.end ? n.end = e.longs === String ? String(t.end) : t.end : n.end = e.longs === String ? a.Long.prototype.toString.call(t.end) : e.longs === Number ? new a.LongBits(t.end.low >>> 0, t.end.high >>> 0).toNumber() : t.end), n;
          }, t.prototype.toJSON = function () {
            return this.constructor.toObject(this, r.util.toJSONOptions);
          }, t;
        }(), t.DataLocation = function () {
          var t = {},
              e = Object.create(t);
          return e[t[0] = "DEFAULT"] = 0, e[t[1] = "EXTERNAL"] = 1, e;
        }(), t;
      }(), n.TensorShapeProto = function () {
        function t(t) {
          if (this.dim = [], t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.dim = a.emptyArray, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          if (e || (e = i.create()), null != t.dim && t.dim.length) for (var n = 0; n < t.dim.length; ++n) u.onnx.TensorShapeProto.Dimension.encode(t.dim[n], e.uint32(10).fork()).ldelim();
          return e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TensorShapeProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.dim && r.dim.length || (r.dim = []), r.dim.push(u.onnx.TensorShapeProto.Dimension.decode(t, t.uint32()));
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";

          if (null != t.dim && t.hasOwnProperty("dim")) {
            if (!Array.isArray(t.dim)) return "dim: array expected";

            for (var e = 0; e < t.dim.length; ++e) {
              var n = u.onnx.TensorShapeProto.Dimension.verify(t.dim[e]);
              if (n) return "dim." + n;
            }
          }

          return null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.TensorShapeProto) return t;
          var e = new u.onnx.TensorShapeProto();

          if (t.dim) {
            if (!Array.isArray(t.dim)) throw TypeError(".onnx.TensorShapeProto.dim: array expected");
            e.dim = [];

            for (var n = 0; n < t.dim.length; ++n) {
              if ("object" != typeof t.dim[n]) throw TypeError(".onnx.TensorShapeProto.dim: object expected");
              e.dim[n] = u.onnx.TensorShapeProto.Dimension.fromObject(t.dim[n]);
            }
          }

          return e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};

          if ((e.arrays || e.defaults) && (n.dim = []), t.dim && t.dim.length) {
            n.dim = [];

            for (var r = 0; r < t.dim.length; ++r) n.dim[r] = u.onnx.TensorShapeProto.Dimension.toObject(t.dim[r], e);
          }

          return n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t.Dimension = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
          }

          var e;
          return t.prototype.dimValue = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.prototype.dimParam = "", t.prototype.denotation = "", Object.defineProperty(t.prototype, "value", {
            get: a.oneOfGetter(e = ["dimValue", "dimParam"]),
            set: a.oneOfSetter(e)
          }), t.create = function (e) {
            return new t(e);
          }, t.encode = function (t, e) {
            return e || (e = i.create()), null != t.dimValue && t.hasOwnProperty("dimValue") && e.uint32(8).int64(t.dimValue), null != t.dimParam && t.hasOwnProperty("dimParam") && e.uint32(18).string(t.dimParam), null != t.denotation && t.hasOwnProperty("denotation") && e.uint32(26).string(t.denotation), e;
          }, t.encodeDelimited = function (t, e) {
            return this.encode(t, e).ldelim();
          }, t.decode = function (t, e) {
            t instanceof o || (t = o.create(t));

            for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TensorShapeProto.Dimension(); t.pos < n;) {
              var i = t.uint32();

              switch (i >>> 3) {
                case 1:
                  r.dimValue = t.int64();
                  break;

                case 2:
                  r.dimParam = t.string();
                  break;

                case 3:
                  r.denotation = t.string();
                  break;

                default:
                  t.skipType(7 & i);
              }
            }

            return r;
          }, t.decodeDelimited = function (t) {
            return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
          }, t.verify = function (t) {
            if ("object" != typeof t || null === t) return "object expected";
            var e = {};
            if (null != t.dimValue && t.hasOwnProperty("dimValue") && (e.value = 1, !(a.isInteger(t.dimValue) || t.dimValue && a.isInteger(t.dimValue.low) && a.isInteger(t.dimValue.high)))) return "dimValue: integer|Long expected";

            if (null != t.dimParam && t.hasOwnProperty("dimParam")) {
              if (1 === e.value) return "value: multiple values";
              if (e.value = 1, !a.isString(t.dimParam)) return "dimParam: string expected";
            }

            return null != t.denotation && t.hasOwnProperty("denotation") && !a.isString(t.denotation) ? "denotation: string expected" : null;
          }, t.fromObject = function (t) {
            if (t instanceof u.onnx.TensorShapeProto.Dimension) return t;
            var e = new u.onnx.TensorShapeProto.Dimension();
            return null != t.dimValue && (a.Long ? (e.dimValue = a.Long.fromValue(t.dimValue)).unsigned = !1 : "string" == typeof t.dimValue ? e.dimValue = parseInt(t.dimValue, 10) : "number" == typeof t.dimValue ? e.dimValue = t.dimValue : "object" == typeof t.dimValue && (e.dimValue = new a.LongBits(t.dimValue.low >>> 0, t.dimValue.high >>> 0).toNumber())), null != t.dimParam && (e.dimParam = String(t.dimParam)), null != t.denotation && (e.denotation = String(t.denotation)), e;
          }, t.toObject = function (t, e) {
            e || (e = {});
            var n = {};
            return e.defaults && (n.denotation = ""), null != t.dimValue && t.hasOwnProperty("dimValue") && ("number" == typeof t.dimValue ? n.dimValue = e.longs === String ? String(t.dimValue) : t.dimValue : n.dimValue = e.longs === String ? a.Long.prototype.toString.call(t.dimValue) : e.longs === Number ? new a.LongBits(t.dimValue.low >>> 0, t.dimValue.high >>> 0).toNumber() : t.dimValue, e.oneofs && (n.value = "dimValue")), null != t.dimParam && t.hasOwnProperty("dimParam") && (n.dimParam = t.dimParam, e.oneofs && (n.value = "dimParam")), null != t.denotation && t.hasOwnProperty("denotation") && (n.denotation = t.denotation), n;
          }, t.prototype.toJSON = function () {
            return this.constructor.toObject(this, r.util.toJSONOptions);
          }, t;
        }(), t;
      }(), n.TypeProto = function () {
        function t(t) {
          if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        var e;
        return t.prototype.tensorType = null, t.prototype.denotation = "", Object.defineProperty(t.prototype, "value", {
          get: a.oneOfGetter(e = ["tensorType"]),
          set: a.oneOfSetter(e)
        }), t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          return e || (e = i.create()), null != t.tensorType && t.hasOwnProperty("tensorType") && u.onnx.TypeProto.Tensor.encode(t.tensorType, e.uint32(10).fork()).ldelim(), null != t.denotation && t.hasOwnProperty("denotation") && e.uint32(50).string(t.denotation), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TypeProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.tensorType = u.onnx.TypeProto.Tensor.decode(t, t.uint32());
                break;

              case 6:
                r.denotation = t.string();
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          if ("object" != typeof t || null === t) return "object expected";

          if (null != t.tensorType && t.hasOwnProperty("tensorType")) {
            var e = u.onnx.TypeProto.Tensor.verify(t.tensorType);
            if (e) return "tensorType." + e;
          }

          return null != t.denotation && t.hasOwnProperty("denotation") && !a.isString(t.denotation) ? "denotation: string expected" : null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.TypeProto) return t;
          var e = new u.onnx.TypeProto();

          if (null != t.tensorType) {
            if ("object" != typeof t.tensorType) throw TypeError(".onnx.TypeProto.tensorType: object expected");
            e.tensorType = u.onnx.TypeProto.Tensor.fromObject(t.tensorType);
          }

          return null != t.denotation && (e.denotation = String(t.denotation)), e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};
          return e.defaults && (n.denotation = ""), null != t.tensorType && t.hasOwnProperty("tensorType") && (n.tensorType = u.onnx.TypeProto.Tensor.toObject(t.tensorType, e), e.oneofs && (n.value = "tensorType")), null != t.denotation && t.hasOwnProperty("denotation") && (n.denotation = t.denotation), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t.Tensor = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
          }

          return t.prototype.elemType = 0, t.prototype.shape = null, t.create = function (e) {
            return new t(e);
          }, t.encode = function (t, e) {
            return e || (e = i.create()), null != t.elemType && t.hasOwnProperty("elemType") && e.uint32(8).int32(t.elemType), null != t.shape && t.hasOwnProperty("shape") && u.onnx.TensorShapeProto.encode(t.shape, e.uint32(18).fork()).ldelim(), e;
          }, t.encodeDelimited = function (t, e) {
            return this.encode(t, e).ldelim();
          }, t.decode = function (t, e) {
            t instanceof o || (t = o.create(t));

            for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.TypeProto.Tensor(); t.pos < n;) {
              var i = t.uint32();

              switch (i >>> 3) {
                case 1:
                  r.elemType = t.int32();
                  break;

                case 2:
                  r.shape = u.onnx.TensorShapeProto.decode(t, t.uint32());
                  break;

                default:
                  t.skipType(7 & i);
              }
            }

            return r;
          }, t.decodeDelimited = function (t) {
            return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
          }, t.verify = function (t) {
            if ("object" != typeof t || null === t) return "object expected";
            if (null != t.elemType && t.hasOwnProperty("elemType") && !a.isInteger(t.elemType)) return "elemType: integer expected";

            if (null != t.shape && t.hasOwnProperty("shape")) {
              var e = u.onnx.TensorShapeProto.verify(t.shape);
              if (e) return "shape." + e;
            }

            return null;
          }, t.fromObject = function (t) {
            if (t instanceof u.onnx.TypeProto.Tensor) return t;
            var e = new u.onnx.TypeProto.Tensor();

            if (null != t.elemType && (e.elemType = 0 | t.elemType), null != t.shape) {
              if ("object" != typeof t.shape) throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");
              e.shape = u.onnx.TensorShapeProto.fromObject(t.shape);
            }

            return e;
          }, t.toObject = function (t, e) {
            e || (e = {});
            var n = {};
            return e.defaults && (n.elemType = 0, n.shape = null), null != t.elemType && t.hasOwnProperty("elemType") && (n.elemType = t.elemType), null != t.shape && t.hasOwnProperty("shape") && (n.shape = u.onnx.TensorShapeProto.toObject(t.shape, e)), n;
          }, t.prototype.toJSON = function () {
            return this.constructor.toObject(this, r.util.toJSONOptions);
          }, t;
        }(), t;
      }(), n.OperatorSetIdProto = function () {
        function t(t) {
          if (t) for (var e = Object.keys(t), n = 0; n < e.length; ++n) null != t[e[n]] && (this[e[n]] = t[e[n]]);
        }

        return t.prototype.domain = "", t.prototype.version = a.Long ? a.Long.fromBits(0, 0, !1) : 0, t.create = function (e) {
          return new t(e);
        }, t.encode = function (t, e) {
          return e || (e = i.create()), null != t.domain && t.hasOwnProperty("domain") && e.uint32(10).string(t.domain), null != t.version && t.hasOwnProperty("version") && e.uint32(16).int64(t.version), e;
        }, t.encodeDelimited = function (t, e) {
          return this.encode(t, e).ldelim();
        }, t.decode = function (t, e) {
          t instanceof o || (t = o.create(t));

          for (var n = void 0 === e ? t.len : t.pos + e, r = new u.onnx.OperatorSetIdProto(); t.pos < n;) {
            var i = t.uint32();

            switch (i >>> 3) {
              case 1:
                r.domain = t.string();
                break;

              case 2:
                r.version = t.int64();
                break;

              default:
                t.skipType(7 & i);
            }
          }

          return r;
        }, t.decodeDelimited = function (t) {
          return t instanceof o || (t = new o(t)), this.decode(t, t.uint32());
        }, t.verify = function (t) {
          return "object" != typeof t || null === t ? "object expected" : null != t.domain && t.hasOwnProperty("domain") && !a.isString(t.domain) ? "domain: string expected" : null != t.version && t.hasOwnProperty("version") && !(a.isInteger(t.version) || t.version && a.isInteger(t.version.low) && a.isInteger(t.version.high)) ? "version: integer|Long expected" : null;
        }, t.fromObject = function (t) {
          if (t instanceof u.onnx.OperatorSetIdProto) return t;
          var e = new u.onnx.OperatorSetIdProto();
          return null != t.domain && (e.domain = String(t.domain)), null != t.version && (a.Long ? (e.version = a.Long.fromValue(t.version)).unsigned = !1 : "string" == typeof t.version ? e.version = parseInt(t.version, 10) : "number" == typeof t.version ? e.version = t.version : "object" == typeof t.version && (e.version = new a.LongBits(t.version.low >>> 0, t.version.high >>> 0).toNumber())), e;
        }, t.toObject = function (t, e) {
          e || (e = {});
          var n = {};
          if (e.defaults) if (n.domain = "", a.Long) {
            var r = new a.Long(0, 0, !1);
            n.version = e.longs === String ? r.toString() : e.longs === Number ? r.toNumber() : r;
          } else n.version = e.longs === String ? "0" : 0;
          return null != t.domain && t.hasOwnProperty("domain") && (n.domain = t.domain), null != t.version && t.hasOwnProperty("version") && ("number" == typeof t.version ? n.version = e.longs === String ? String(t.version) : t.version : n.version = e.longs === String ? a.Long.prototype.toString.call(t.version) : e.longs === Number ? new a.LongBits(t.version.low >>> 0, t.version.high >>> 0).toNumber() : t.version), n;
        }, t.prototype.toJSON = function () {
          return this.constructor.toObject(this, r.util.toJSONOptions);
        }, t;
      }(), n;
    }(), t.exports = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(36),
        a = n(0),
        u = n(46),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = a.ShapeUtil.calculateReshapedDims(e[0].dims, e[1].integerData);
        return [l(t, e[0], n)];
      }, e;
    }(i.Reshape);

    function l(t, e, n) {
      var r = t.getOrCreateTextureData(e),
          o = n;
      4 === r.channels && (o = u.getPackedShape(n));
      var i = {
        channels: r.channels,
        height: r.height,
        width: r.width,
        shape: 0 !== o.length ? o : [1],
        strides: a.ShapeUtil.computeStrides(o),
        unpackedShape: n
      };
      return t.createSharedTextureData(i, e.type, r.texture, e.dataId).tensor;
    }

    e.WebGLReshape = s, e.reshape = l;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    function o(t, e) {
      if (e.endsWith("+")) {
        var n = Number.parseInt(e.substring(0, e.length - 1), 10);
        return !isNaN(n) && n <= t;
      }

      if (2 === e.split("-").length) {
        var r = e.split("-"),
            o = (n = Number.parseInt(r[0], 10), Number.parseInt(r[1], 10));
        return !isNaN(n) && !isNaN(o) && n <= t && t <= o;
      }

      return Number.parseInt(e, 10) === t;
    }

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.resolveOperator = function (t, e, n) {
      var i, a, u, s;

      try {
        for (var l = r(n), c = l.next(); !c.done; c = l.next()) {
          var f = c.value,
              p = f[0],
              h = f[1],
              d = f[2],
              y = f[3];
          if (t.opType === p) try {
            for (var g = (u = void 0, r(e)), m = g.next(); !m.done; m = g.next()) {
              var v = m.value;
              if ((v.domain === h || "ai.onnx" === v.domain && "" === h) && o(v.version, d)) return y(t);
            }
          } catch (t) {
            u = {
              error: t
            };
          } finally {
            try {
              m && !m.done && (s = g.return) && s.call(g);
            } finally {
              if (u) throw u.error;
            }
          }
        }
      } catch (t) {
        i = {
          error: t
        };
      } finally {
        try {
          c && !c.done && (a = l.return) && a.call(l);
        } finally {
          if (i) throw i.error;
        }
      }

      throw new TypeError("cannot resolve operator '" + t.opType + "' with opsets: " + e.map(function (t) {
        return (t.domain || "ai.onnx") + " v" + t.version;
      }).join(", "));
    };
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var r = n(55),
          o = n(56),
          i = n(57);

      function a() {
        return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }

      function u(t, e) {
        if (a() < e) throw new RangeError("Invalid typed array length");
        return s.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = s.prototype : (null === t && (t = new s(e)), t.length = e), t;
      }

      function s(t, e, n) {
        if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(t, e, n);

        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return f(this, t);
        }

        return l(this, t, e, n);
      }

      function l(t, e, n, r) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, n, r) {
          if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
          s.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = s.prototype : t = p(t, e);
          return t;
        }(t, e, n, r) : "string" == typeof e ? function (t, e, n) {
          "string" == typeof n && "" !== n || (n = "utf8");
          if (!s.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
          var r = 0 | d(e, n),
              o = (t = u(t, r)).write(e, n);
          o !== r && (t = t.slice(0, o));
          return t;
        }(t, e, n) : function (t, e) {
          if (s.isBuffer(e)) {
            var n = 0 | h(e.length);
            return 0 === (t = u(t, n)).length ? t : (e.copy(t, 0, 0, n), t);
          }

          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? u(t, 0) : p(t, e);
            if ("Buffer" === e.type && i(e.data)) return p(t, e.data);
          }

          var r;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }(t, e);
      }

      function c(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }

      function f(t, e) {
        if (c(e), t = u(t, e < 0 ? 0 : 0 | h(e)), !s.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) t[n] = 0;
        return t;
      }

      function p(t, e) {
        var n = e.length < 0 ? 0 : 0 | h(e.length);
        t = u(t, n);

        for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];

        return t;
      }

      function h(t) {
        if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
        return 0 | t;
      }

      function d(t, e) {
        if (s.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;

        for (var r = !1;;) switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return n;

          case "utf8":
          case "utf-8":
          case void 0:
            return U(t).length;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * n;

          case "hex":
            return n >>> 1;

          case "base64":
            return G(t).length;

          default:
            if (r) return U(t).length;
            e = ("" + e).toLowerCase(), r = !0;
        }
      }

      function y(t, e, n) {
        var r = t[e];
        t[e] = t[n], t[n] = r;
      }

      function g(t, e, n, r, o) {
        if (0 === t.length) return -1;

        if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
          if (o) return -1;
          n = t.length - 1;
        } else if (n < 0) {
          if (!o) return -1;
          n = 0;
        }

        if ("string" == typeof e && (e = s.from(e, r)), s.isBuffer(e)) return 0 === e.length ? -1 : m(t, e, n, r, o);
        if ("number" == typeof e) return e &= 255, s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : m(t, [e], n, r, o);
        throw new TypeError("val must be string, number or Buffer");
      }

      function m(t, e, n, r, o) {
        var i,
            a = 1,
            u = t.length,
            s = e.length;

        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
          if (t.length < 2 || e.length < 2) return -1;
          a = 2, u /= 2, s /= 2, n /= 2;
        }

        function l(t, e) {
          return 1 === a ? t[e] : t.readUInt16BE(e * a);
        }

        if (o) {
          var c = -1;

          for (i = n; i < u; i++) if (l(t, i) === l(e, -1 === c ? 0 : i - c)) {
            if (-1 === c && (c = i), i - c + 1 === s) return c * a;
          } else -1 !== c && (i -= i - c), c = -1;
        } else for (n + s > u && (n = u - s), i = n; i >= 0; i--) {
          for (var f = !0, p = 0; p < s; p++) if (l(t, i + p) !== l(e, p)) {
            f = !1;
            break;
          }

          if (f) return i;
        }

        return -1;
      }

      function v(t, e, n, r) {
        n = Number(n) || 0;
        var o = t.length - n;
        r ? (r = Number(r)) > o && (r = o) : r = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        r > i / 2 && (r = i / 2);

        for (var a = 0; a < r; ++a) {
          var u = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(u)) return a;
          t[n + a] = u;
        }

        return a;
      }

      function b(t, e, n, r) {
        return z(U(e, t.length - n), t, n, r);
      }

      function w(t, e, n, r) {
        return z(function (t) {
          for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));

          return e;
        }(e), t, n, r);
      }

      function _(t, e, n, r) {
        return w(t, e, n, r);
      }

      function x(t, e, n, r) {
        return z(G(e), t, n, r);
      }

      function T(t, e, n, r) {
        return z(function (t, e) {
          for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) n = t.charCodeAt(a), r = n >> 8, o = n % 256, i.push(o), i.push(r);

          return i;
        }(e, t.length - n), t, n, r);
      }

      function O(t, e, n) {
        return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n));
      }

      function S(t, e, n) {
        n = Math.min(t.length, n);

        for (var r = [], o = e; o < n;) {
          var i,
              a,
              u,
              s,
              l = t[o],
              c = null,
              f = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
          if (o + f <= n) switch (f) {
            case 1:
              l < 128 && (c = l);
              break;

            case 2:
              128 == (192 & (i = t[o + 1])) && (s = (31 & l) << 6 | 63 & i) > 127 && (c = s);
              break;

            case 3:
              i = t[o + 1], a = t[o + 2], 128 == (192 & i) && 128 == (192 & a) && (s = (15 & l) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (s < 55296 || s > 57343) && (c = s);
              break;

            case 4:
              i = t[o + 1], a = t[o + 2], u = t[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & u) && (s = (15 & l) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & u) > 65535 && s < 1114112 && (c = s);
          }
          null === c ? (c = 65533, f = 1) : c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), o += f;
        }

        return function (t) {
          var e = t.length;
          if (e <= P) return String.fromCharCode.apply(String, t);
          var n = "",
              r = 0;

          for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += P));

          return n;
        }(r);
      }

      e.Buffer = s, e.SlowBuffer = function (t) {
        +t != t && (t = 0);
        return s.alloc(+t);
      }, e.INSPECT_MAX_BYTES = 50, s.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function () {
              return 42;
            }
          }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
        } catch (t) {
          return !1;
        }
      }(), e.kMaxLength = a(), s.poolSize = 8192, s._augment = function (t) {
        return t.__proto__ = s.prototype, t;
      }, s.from = function (t, e, n) {
        return l(null, t, e, n);
      }, s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
        value: null,
        configurable: !0
      })), s.alloc = function (t, e, n) {
        return function (t, e, n, r) {
          return c(e), e <= 0 ? u(t, e) : void 0 !== n ? "string" == typeof r ? u(t, e).fill(n, r) : u(t, e).fill(n) : u(t, e);
        }(null, t, e, n);
      }, s.allocUnsafe = function (t) {
        return f(null, t);
      }, s.allocUnsafeSlow = function (t) {
        return f(null, t);
      }, s.isBuffer = function (t) {
        return !(null == t || !t._isBuffer);
      }, s.compare = function (t, e) {
        if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;

        for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o) if (t[o] !== e[o]) {
          n = t[o], r = e[o];
          break;
        }

        return n < r ? -1 : r < n ? 1 : 0;
      }, s.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;

          default:
            return !1;
        }
      }, s.concat = function (t, e) {
        if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return s.alloc(0);
        var n;
        if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
        var r = s.allocUnsafe(e),
            o = 0;

        for (n = 0; n < t.length; ++n) {
          var a = t[n];
          if (!s.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
          a.copy(r, o), o += a.length;
        }

        return r;
      }, s.byteLength = d, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

        for (var e = 0; e < t; e += 2) y(this, e, e + 1);

        return this;
      }, s.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

        for (var e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);

        return this;
      }, s.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

        for (var e = 0; e < t; e += 8) y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);

        return this;
      }, s.prototype.toString = function () {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : function (t, e, n) {
          var r = !1;
          if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
          if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
          if ((n >>>= 0) <= (e >>>= 0)) return "";

          for (t || (t = "utf8");;) switch (t) {
            case "hex":
              return E(this, e, n);

            case "utf8":
            case "utf-8":
              return S(this, e, n);

            case "ascii":
              return A(this, e, n);

            case "latin1":
            case "binary":
              return D(this, e, n);

            case "base64":
              return O(this, e, n);

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return I(this, e, n);

            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), r = !0;
          }
        }.apply(this, arguments);
      }, s.prototype.equals = function (t) {
        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === s.compare(this, t);
      }, s.prototype.inspect = function () {
        var t = "",
            n = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">";
      }, s.prototype.compare = function (t, e, n, r, o) {
        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
        if (r >= o && e >= n) return 0;
        if (r >= o) return -1;
        if (e >= n) return 1;
        if (this === t) return 0;

        for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0), u = Math.min(i, a), l = this.slice(r, o), c = t.slice(e, n), f = 0; f < u; ++f) if (l[f] !== c[f]) {
          i = l[f], a = c[f];
          break;
        }

        return i < a ? -1 : a < i ? 1 : 0;
      }, s.prototype.includes = function (t, e, n) {
        return -1 !== this.indexOf(t, e, n);
      }, s.prototype.indexOf = function (t, e, n) {
        return g(this, t, e, n, !0);
      }, s.prototype.lastIndexOf = function (t, e, n) {
        return g(this, t, e, n, !1);
      }, s.prototype.write = function (t, e, n, r) {
        if (void 0 === e) r = "utf8", n = this.length, e = 0;else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
        }
        var o = this.length - e;
        if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        r || (r = "utf8");

        for (var i = !1;;) switch (r) {
          case "hex":
            return v(this, t, e, n);

          case "utf8":
          case "utf-8":
            return b(this, t, e, n);

          case "ascii":
            return w(this, t, e, n);

          case "latin1":
          case "binary":
            return _(this, t, e, n);

          case "base64":
            return x(this, t, e, n);

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return T(this, t, e, n);

          default:
            if (i) throw new TypeError("Unknown encoding: " + r);
            r = ("" + r).toLowerCase(), i = !0;
        }
      }, s.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      var P = 4096;

      function A(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);

        for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);

        return r;
      }

      function D(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);

        for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);

        return r;
      }

      function E(t, e, n) {
        var r = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);

        for (var o = "", i = e; i < n; ++i) o += B(t[i]);

        return o;
      }

      function I(t, e, n) {
        for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);

        return o;
      }

      function L(t, e, n) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n) throw new RangeError("Trying to access beyond buffer length");
      }

      function k(t, e, n, r, o, i) {
        if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range");
      }

      function M(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);

        for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);
      }

      function j(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);

        for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255;
      }

      function R(t, e, n, r, o, i) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }

      function C(t, e, n, r, i) {
        return i || R(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4;
      }

      function N(t, e, n, r, i) {
        return i || R(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8;
      }

      s.prototype.slice = function (t, e) {
        var n,
            r = this.length;
        if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), s.TYPED_ARRAY_SUPPORT) (n = this.subarray(t, e)).__proto__ = s.prototype;else {
          var o = e - t;
          n = new s(o, void 0);

          for (var i = 0; i < o; ++i) n[i] = this[i + t];
        }
        return n;
      }, s.prototype.readUIntLE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);

        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;

        return r;
      }, s.prototype.readUIntBE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);

        for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o;

        return r;
      }, s.prototype.readUInt8 = function (t, e) {
        return e || L(t, 1, this.length), this[t];
      }, s.prototype.readUInt16LE = function (t, e) {
        return e || L(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, s.prototype.readUInt16BE = function (t, e) {
        return e || L(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, s.prototype.readUInt32LE = function (t, e) {
        return e || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, s.prototype.readUInt32BE = function (t, e) {
        return e || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, s.prototype.readIntLE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);

        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;

        return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r;
      }, s.prototype.readIntBE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);

        for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o;

        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
      }, s.prototype.readInt8 = function (t, e) {
        return e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, s.prototype.readInt16LE = function (t, e) {
        e || L(t, 2, this.length);
        var n = this[t] | this[t + 1] << 8;
        return 32768 & n ? 4294901760 | n : n;
      }, s.prototype.readInt16BE = function (t, e) {
        e || L(t, 2, this.length);
        var n = this[t + 1] | this[t] << 8;
        return 32768 & n ? 4294901760 | n : n;
      }, s.prototype.readInt32LE = function (t, e) {
        return e || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, s.prototype.readInt32BE = function (t, e) {
        return e || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, s.prototype.readFloatLE = function (t, e) {
        return e || L(t, 4, this.length), o.read(this, t, !0, 23, 4);
      }, s.prototype.readFloatBE = function (t, e) {
        return e || L(t, 4, this.length), o.read(this, t, !1, 23, 4);
      }, s.prototype.readDoubleLE = function (t, e) {
        return e || L(t, 8, this.length), o.read(this, t, !0, 52, 8);
      }, s.prototype.readDoubleBE = function (t, e) {
        return e || L(t, 8, this.length), o.read(this, t, !1, 52, 8);
      }, s.prototype.writeUIntLE = function (t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = 1,
            i = 0;

        for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;

        return e + n;
      }, s.prototype.writeUIntBE = function (t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = n - 1,
            i = 1;

        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;

        return e + n;
      }, s.prototype.writeUInt8 = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
      }, s.prototype.writeUInt16LE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : M(this, t, e, !0), e + 2;
      }, s.prototype.writeUInt16BE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : M(this, t, e, !1), e + 2;
      }, s.prototype.writeUInt32LE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : j(this, t, e, !0), e + 4;
      }, s.prototype.writeUInt32BE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4;
      }, s.prototype.writeIntLE = function (t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          k(this, t, e, n, o - 1, -o);
        }

        var i = 0,
            a = 1,
            u = 0;

        for (this[e] = 255 & t; ++i < n && (a *= 256);) t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;

        return e + n;
      }, s.prototype.writeIntBE = function (t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          k(this, t, e, n, o - 1, -o);
        }

        var i = n - 1,
            a = 1,
            u = 0;

        for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;

        return e + n;
      }, s.prototype.writeInt8 = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, s.prototype.writeInt16LE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : M(this, t, e, !0), e + 2;
      }, s.prototype.writeInt16BE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : M(this, t, e, !1), e + 2;
      }, s.prototype.writeInt32LE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : j(this, t, e, !0), e + 4;
      }, s.prototype.writeInt32BE = function (t, e, n) {
        return t = +t, e |= 0, n || k(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4;
      }, s.prototype.writeFloatLE = function (t, e, n) {
        return C(this, t, e, !0, n);
      }, s.prototype.writeFloatBE = function (t, e, n) {
        return C(this, t, e, !1, n);
      }, s.prototype.writeDoubleLE = function (t, e, n) {
        return N(this, t, e, !0, n);
      }, s.prototype.writeDoubleBE = function (t, e, n) {
        return N(this, t, e, !1, n);
      }, s.prototype.copy = function (t, e, n, r) {
        if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
        if (r < 0) throw new RangeError("sourceEnd out of bounds");
        r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
        var o,
            i = r - n;
        if (this === t && n < e && e < r) for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];else if (i < 1e3 || !s.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) t[o + e] = this[o + n];else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
        return i;
      }, s.prototype.fill = function (t, e, n, r) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o);
          }

          if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
          if ("string" == typeof r && !s.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
        } else "number" == typeof t && (t &= 255);

        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
        if (n <= e) return this;
        var i;
        if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (i = e; i < n; ++i) this[i] = t;else {
          var a = s.isBuffer(t) ? t : U(new s(t, r).toString()),
              u = a.length;

          for (i = 0; i < n - e; ++i) this[i + e] = a[i % u];
        }
        return this;
      };
      var F = /[^+\/0-9A-Za-z-_]/g;

      function B(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }

      function U(t, e) {
        var n;
        e = e || 1 / 0;

        for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
          if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
            if (!o) {
              if (n > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }

              if (a + 1 === r) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }

              o = n;
              continue;
            }

            if (n < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), o = n;
              continue;
            }

            n = 65536 + (o - 55296 << 10 | n - 56320);
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);

          if (o = null, n < 128) {
            if ((e -= 1) < 0) break;
            i.push(n);
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            i.push(n >> 6 | 192, 63 & n | 128);
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
          }
        }

        return i;
      }

      function G(t) {
        return r.toByteArray(function (t) {
          if ((t = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
          }(t).replace(F, "")).length < 2) return "";

          for (; t.length % 4 != 0;) t += "=";

          return t;
        }(t));
      }

      function z(t, e, n, r) {
        for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];

        return o;
      }
    }).call(this, n(8));
  }, function (t, e) {
    t.exports = r;
    var n = null;

    try {
      n = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
    } catch (t) {}

    function r(t, e, n) {
      this.low = 0 | t, this.high = 0 | e, this.unsigned = !!n;
    }

    function o(t) {
      return !0 === (t && t.__isLong__);
    }

    r.prototype.__isLong__, Object.defineProperty(r.prototype, "__isLong__", {
      value: !0
    }), r.isLong = o;
    var i = {},
        a = {};

    function u(t, e) {
      var n, r, o;
      return e ? (o = 0 <= (t >>>= 0) && t < 256) && (r = a[t]) ? r : (n = l(t, (0 | t) < 0 ? -1 : 0, !0), o && (a[t] = n), n) : (o = -128 <= (t |= 0) && t < 128) && (r = i[t]) ? r : (n = l(t, t < 0 ? -1 : 0, !1), o && (i[t] = n), n);
    }

    function s(t, e) {
      if (isNaN(t)) return e ? v : m;

      if (e) {
        if (t < 0) return v;
        if (t >= d) return T;
      } else {
        if (t <= -y) return O;
        if (t + 1 >= y) return x;
      }

      return t < 0 ? s(-t, e).neg() : l(t % h | 0, t / h | 0, e);
    }

    function l(t, e, n) {
      return new r(t, e, n);
    }

    r.fromInt = u, r.fromNumber = s, r.fromBits = l;
    var c = Math.pow;

    function f(t, e, n) {
      if (0 === t.length) throw Error("empty string");
      if ("NaN" === t || "Infinity" === t || "+Infinity" === t || "-Infinity" === t) return m;
      if ("number" == typeof e ? (n = e, e = !1) : e = !!e, (n = n || 10) < 2 || 36 < n) throw RangeError("radix");
      var r;
      if ((r = t.indexOf("-")) > 0) throw Error("interior hyphen");
      if (0 === r) return f(t.substring(1), e, n).neg();

      for (var o = s(c(n, 8)), i = m, a = 0; a < t.length; a += 8) {
        var u = Math.min(8, t.length - a),
            l = parseInt(t.substring(a, a + u), n);

        if (u < 8) {
          var p = s(c(n, u));
          i = i.mul(p).add(s(l));
        } else i = (i = i.mul(o)).add(s(l));
      }

      return i.unsigned = e, i;
    }

    function p(t, e) {
      return "number" == typeof t ? s(t, e) : "string" == typeof t ? f(t, e) : l(t.low, t.high, "boolean" == typeof e ? e : t.unsigned);
    }

    r.fromString = f, r.fromValue = p;
    var h = 4294967296,
        d = h * h,
        y = d / 2,
        g = u(1 << 24),
        m = u(0);
    r.ZERO = m;
    var v = u(0, !0);
    r.UZERO = v;
    var b = u(1);
    r.ONE = b;
    var w = u(1, !0);
    r.UONE = w;

    var _ = u(-1);

    r.NEG_ONE = _;
    var x = l(-1, 2147483647, !1);
    r.MAX_VALUE = x;
    var T = l(-1, -1, !0);
    r.MAX_UNSIGNED_VALUE = T;
    var O = l(0, -2147483648, !1);
    r.MIN_VALUE = O;
    var S = r.prototype;
    S.toInt = function () {
      return this.unsigned ? this.low >>> 0 : this.low;
    }, S.toNumber = function () {
      return this.unsigned ? (this.high >>> 0) * h + (this.low >>> 0) : this.high * h + (this.low >>> 0);
    }, S.toString = function (t) {
      if ((t = t || 10) < 2 || 36 < t) throw RangeError("radix");
      if (this.isZero()) return "0";

      if (this.isNegative()) {
        if (this.eq(O)) {
          var e = s(t),
              n = this.div(e),
              r = n.mul(e).sub(this);
          return n.toString(t) + r.toInt().toString(t);
        }

        return "-" + this.neg().toString(t);
      }

      for (var o = s(c(t, 6), this.unsigned), i = this, a = "";;) {
        var u = i.div(o),
            l = (i.sub(u.mul(o)).toInt() >>> 0).toString(t);
        if ((i = u).isZero()) return l + a;

        for (; l.length < 6;) l = "0" + l;

        a = "" + l + a;
      }
    }, S.getHighBits = function () {
      return this.high;
    }, S.getHighBitsUnsigned = function () {
      return this.high >>> 0;
    }, S.getLowBits = function () {
      return this.low;
    }, S.getLowBitsUnsigned = function () {
      return this.low >>> 0;
    }, S.getNumBitsAbs = function () {
      if (this.isNegative()) return this.eq(O) ? 64 : this.neg().getNumBitsAbs();

      for (var t = 0 != this.high ? this.high : this.low, e = 31; e > 0 && 0 == (t & 1 << e); e--);

      return 0 != this.high ? e + 33 : e + 1;
    }, S.isZero = function () {
      return 0 === this.high && 0 === this.low;
    }, S.eqz = S.isZero, S.isNegative = function () {
      return !this.unsigned && this.high < 0;
    }, S.isPositive = function () {
      return this.unsigned || this.high >= 0;
    }, S.isOdd = function () {
      return 1 == (1 & this.low);
    }, S.isEven = function () {
      return 0 == (1 & this.low);
    }, S.equals = function (t) {
      return o(t) || (t = p(t)), (this.unsigned === t.unsigned || this.high >>> 31 != 1 || t.high >>> 31 != 1) && this.high === t.high && this.low === t.low;
    }, S.eq = S.equals, S.notEquals = function (t) {
      return !this.eq(t);
    }, S.neq = S.notEquals, S.ne = S.notEquals, S.lessThan = function (t) {
      return this.comp(t) < 0;
    }, S.lt = S.lessThan, S.lessThanOrEqual = function (t) {
      return this.comp(t) <= 0;
    }, S.lte = S.lessThanOrEqual, S.le = S.lessThanOrEqual, S.greaterThan = function (t) {
      return this.comp(t) > 0;
    }, S.gt = S.greaterThan, S.greaterThanOrEqual = function (t) {
      return this.comp(t) >= 0;
    }, S.gte = S.greaterThanOrEqual, S.ge = S.greaterThanOrEqual, S.compare = function (t) {
      if (o(t) || (t = p(t)), this.eq(t)) return 0;
      var e = this.isNegative(),
          n = t.isNegative();
      return e && !n ? -1 : !e && n ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
    }, S.comp = S.compare, S.negate = function () {
      return !this.unsigned && this.eq(O) ? O : this.not().add(b);
    }, S.neg = S.negate, S.add = function (t) {
      o(t) || (t = p(t));
      var e = this.high >>> 16,
          n = 65535 & this.high,
          r = this.low >>> 16,
          i = 65535 & this.low,
          a = t.high >>> 16,
          u = 65535 & t.high,
          s = t.low >>> 16,
          c = 0,
          f = 0,
          h = 0,
          d = 0;
      return h += (d += i + (65535 & t.low)) >>> 16, f += (h += r + s) >>> 16, c += (f += n + u) >>> 16, c += e + a, l((h &= 65535) << 16 | (d &= 65535), (c &= 65535) << 16 | (f &= 65535), this.unsigned);
    }, S.subtract = function (t) {
      return o(t) || (t = p(t)), this.add(t.neg());
    }, S.sub = S.subtract, S.multiply = function (t) {
      if (this.isZero()) return m;
      if (o(t) || (t = p(t)), n) return l(n.mul(this.low, this.high, t.low, t.high), n.get_high(), this.unsigned);
      if (t.isZero()) return m;
      if (this.eq(O)) return t.isOdd() ? O : m;
      if (t.eq(O)) return this.isOdd() ? O : m;
      if (this.isNegative()) return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
      if (t.isNegative()) return this.mul(t.neg()).neg();
      if (this.lt(g) && t.lt(g)) return s(this.toNumber() * t.toNumber(), this.unsigned);
      var e = this.high >>> 16,
          r = 65535 & this.high,
          i = this.low >>> 16,
          a = 65535 & this.low,
          u = t.high >>> 16,
          c = 65535 & t.high,
          f = t.low >>> 16,
          h = 65535 & t.low,
          d = 0,
          y = 0,
          v = 0,
          b = 0;
      return v += (b += a * h) >>> 16, y += (v += i * h) >>> 16, v &= 65535, y += (v += a * f) >>> 16, d += (y += r * h) >>> 16, y &= 65535, d += (y += i * f) >>> 16, y &= 65535, d += (y += a * c) >>> 16, d += e * h + r * f + i * c + a * u, l((v &= 65535) << 16 | (b &= 65535), (d &= 65535) << 16 | (y &= 65535), this.unsigned);
    }, S.mul = S.multiply, S.divide = function (t) {
      if (o(t) || (t = p(t)), t.isZero()) throw Error("division by zero");
      var e, r, i;
      if (n) return this.unsigned || -2147483648 !== this.high || -1 !== t.low || -1 !== t.high ? l((this.unsigned ? n.div_u : n.div_s)(this.low, this.high, t.low, t.high), n.get_high(), this.unsigned) : this;
      if (this.isZero()) return this.unsigned ? v : m;

      if (this.unsigned) {
        if (t.unsigned || (t = t.toUnsigned()), t.gt(this)) return v;
        if (t.gt(this.shru(1))) return w;
        i = v;
      } else {
        if (this.eq(O)) return t.eq(b) || t.eq(_) ? O : t.eq(O) ? b : (e = this.shr(1).div(t).shl(1)).eq(m) ? t.isNegative() ? b : _ : (r = this.sub(t.mul(e)), i = e.add(r.div(t)));
        if (t.eq(O)) return this.unsigned ? v : m;
        if (this.isNegative()) return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
        if (t.isNegative()) return this.div(t.neg()).neg();
        i = m;
      }

      for (r = this; r.gte(t);) {
        e = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));

        for (var a = Math.ceil(Math.log(e) / Math.LN2), u = a <= 48 ? 1 : c(2, a - 48), f = s(e), h = f.mul(t); h.isNegative() || h.gt(r);) h = (f = s(e -= u, this.unsigned)).mul(t);

        f.isZero() && (f = b), i = i.add(f), r = r.sub(h);
      }

      return i;
    }, S.div = S.divide, S.modulo = function (t) {
      return o(t) || (t = p(t)), n ? l((this.unsigned ? n.rem_u : n.rem_s)(this.low, this.high, t.low, t.high), n.get_high(), this.unsigned) : this.sub(this.div(t).mul(t));
    }, S.mod = S.modulo, S.rem = S.modulo, S.not = function () {
      return l(~this.low, ~this.high, this.unsigned);
    }, S.and = function (t) {
      return o(t) || (t = p(t)), l(this.low & t.low, this.high & t.high, this.unsigned);
    }, S.or = function (t) {
      return o(t) || (t = p(t)), l(this.low | t.low, this.high | t.high, this.unsigned);
    }, S.xor = function (t) {
      return o(t) || (t = p(t)), l(this.low ^ t.low, this.high ^ t.high, this.unsigned);
    }, S.shiftLeft = function (t) {
      return o(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? l(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : l(0, this.low << t - 32, this.unsigned);
    }, S.shl = S.shiftLeft, S.shiftRight = function (t) {
      return o(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? l(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : l(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
    }, S.shr = S.shiftRight, S.shiftRightUnsigned = function (t) {
      if (o(t) && (t = t.toInt()), 0 === (t &= 63)) return this;
      var e = this.high;
      return t < 32 ? l(this.low >>> t | e << 32 - t, e >>> t, this.unsigned) : l(32 === t ? e : e >>> t - 32, 0, this.unsigned);
    }, S.shru = S.shiftRightUnsigned, S.shr_u = S.shiftRightUnsigned, S.toSigned = function () {
      return this.unsigned ? l(this.low, this.high, !1) : this;
    }, S.toUnsigned = function () {
      return this.unsigned ? this : l(this.low, this.high, !0);
    }, S.toBytes = function (t) {
      return t ? this.toBytesLE() : this.toBytesBE();
    }, S.toBytesLE = function () {
      var t = this.high,
          e = this.low;
      return [255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24, 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24];
    }, S.toBytesBE = function () {
      var t = this.high,
          e = this.low;
      return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t, e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e];
    }, r.fromBytes = function (t, e, n) {
      return n ? r.fromBytesLE(t, e) : r.fromBytesBE(t, e);
    }, r.fromBytesLE = function (t, e) {
      return new r(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24, t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24, e);
    }, r.fromBytesBE = function (t, e) {
      return new r(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], e);
    };
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.epsilon = t.getFloat("epsilon", 1e-5), this.momentum = t.getFloat("momentum", .9), this.spatial = t.getInt("spatial", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 5 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        var e = t[0],
            n = t[1],
            r = t[2],
            o = t[3],
            i = t[4];
        return !(e.dims.length < 3 || 1 !== n.dims.length || 1 !== r.dims.length || 1 !== o.dims.length || 1 !== i.dims.length) && n.dims[0] === e.dims[1] && r.dims[0] === e.dims[1] && o.dims[0] === e.dims[1] && i.dims[0] === e.dims[1] && !("float32" !== e.type && "float64" !== e.type || "float32" !== n.type && "float64" !== n.type || "float32" !== r.type && "float64" !== r.type || "float32" !== o.type && "float64" !== o.type || "float32" !== i.type && "float64" !== i.type);
      }, t;
    }();

    e.BatchNormalization = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t(t, e, n) {
        this.typeConstraint = t, this.opType = e, this.resultType = n;
      }

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        return !(!t || 2 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return -1 !== this.typeConstraint.indexOf(t[0].type) && t[0].type === t[1].type;
      }, t;
    }();

    e.BinaryOp = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.autoPad = t.getString("auto_pad", "NOTSET"), this.dilations = t.getInts("dilations", [1, 1]), this.group = t.getInt("group", 1), this.kernelShape = t.getInts("kernel_shape", []), this.pads = t.getInts("pads", [0, 0, 0, 0]), this.strides = t.getInts("strides", [1, 1]);
      }, t.prototype.checkInputs = function (t) {
        if (!t || 2 !== t.length && 3 !== t.length) return !1;
        if (4 !== t[0].dims.length || 4 !== t[1].dims.length) return !1;
        if (t[0].dims[1] !== t[1].dims[1] * this.group) return !1;
        if (3 === t.length && (1 !== t[2].dims.length || t[1].dims[0] !== t[2].dims[0])) return !1;
        var e = t[0].dims.length - 2;
        return this.dilations.length === e && this.strides.length === e && this.pads.length === 2 * e && (0 === this.kernelShape.length || this.kernelShape.length === t[1].dims.length - 2) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type && "float32" === t[1].type && (3 !== t.length || "float32" === t[2].type);
      }, t;
    }();

    e.Conv = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(18),
        u = n(1),
        s = n(0),
        l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [c(e[0], e[1])];
      }, e;
    }(a.MatMul);

    function c(t, e) {
      var n = i(s.MatMulUtil.preprocessInputShapes(t.dims, e.dims), 2),
          r = n[0],
          o = n[1],
          a = [r[r.length - 2], o[o.length - 1]],
          l = s.BroadcastUtil.calcShape(r, o, !0);
      if (!l) throw new Error("input dimensions do not match the requirement");

      for (var c = s.ShapeUtil.size(l) / (a[0] * a[1]), p = new u.Tensor(l, "float64" === t.type || "float64" === e.type ? "float64" : "float32"), h = 0, d = new Array(l.length), y = new Array(t.dims.length), g = new Array(e.dims.length), m = 0; m < c; m++) {
        d[l.length - 2] = 0, d[l.length - 1] = 0;

        for (var v = m, b = l.length - 3; b >= 0; b--) d[b] = v % l[b], v = Math.floor(v / l[b]);

        s.BroadcastUtil.fillIndex(d, t.dims, y), s.BroadcastUtil.fillIndex(d, e.dims, g);

        var w = y.length <= 2 ? 0 : s.ShapeUtil.indicesToOffset(y, t.strides, l.length - 2),
            _ = g.length <= 2 ? 0 : s.ShapeUtil.indicesToOffset(g, e.strides, l.length - 2);

        f(t.floatData.subarray(w), e.floatData.subarray(_), p.floatData.subarray(h), !1, !1, 1, 0, a[0], a[1], r[r.length - 1]), h += a[0] * a[1];
      }

      return p;
    }

    function f(t, e, n, r, o, i, a, u, s, l) {
      return r && o ? function (t, e, n, r, o, i, a, u) {
        for (var s = 0, l = 0, c = 0, f = 0; f < i; f++) {
          for (var p = 0; p < a; p++) {
            for (var h = 0, d = 0; d < u; d++) h += t[s] * e[l], s += i, l += 1;

            s -= i * u, l -= u, n[c] = r * h + o * n[c], c++, l += u;
          }

          l -= a * u, s++;
        }
      }(t, e, n, i, a, u, s, l) : r ? function (t, e, n, r, o, i, a, u) {
        for (var s = 0, l = 0, c = 0, f = 0; f < i; f++) {
          for (var p = 0; p < a; p++) {
            for (var h = 0, d = 0; d < u; d++) h += t[s] * e[l], s += i, l += a;

            s -= i * u, l -= a * u, n[c] = r * h + o * n[c], c++, l++;
          }

          l -= a, s++;
        }
      }(t, e, n, i, a, u, s, l) : o ? function (t, e, n, r, o, i, a, u) {
        for (var s = 0, l = 0, c = 0, f = 0; f < i; f++) {
          for (var p = 0; p < a; p++) {
            for (var h = 0, d = 0; d < u; d++) h += t[s] * e[l], s += 1, l += 1;

            s -= u, l -= u, n[c] = r * h + o * n[c], c++, l += u;
          }

          l -= a * u, s += u;
        }
      }(t, e, n, i, a, u, s, l) : function (t, e, n, r, o, i, a, u) {
        for (var s = 0, l = 0, c = 0, f = 0; f < i; f++) {
          for (var p = 0; p < a; p++) {
            for (var h = 0, d = 0; d < u; d++) h += t[s] * e[l], s += 1, l += a;

            s -= u, l -= a * u, n[c] = r * h + o * n[c], c++, l++;
          }

          l -= a, s += u;
        }
      }(t, e, n, i, a, u, s, l);
    }

    e.CpuMatMul = l, e.matMul = c, e.matMul2d = f;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        return !(!t || 2 !== t.length) && t[0].dims[t[0].dims.length - 1] === t[1].dims[t[1].dims.length - 2] && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return ("float32" === t[0].type || "float64" === t[0].type) && ("float32" === t[1].type || "float64" === t[1].type) && t[0].type === t[1].type;
      }, t;
    }();

    e.MatMul = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.transA = 0 !== t.getInt("transA", 0), this.transB = 0 !== t.getInt("transB", 0), this.alpha = t.getFloat("alpha", 1), this.beta = t.getFloat("beta", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 3 !== t.length) && (1 === t[2].dims.length || 2 === t[2].dims.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return !("float32" !== t[0].type && "float64" !== t[0].type || "float32" !== t[1].type && "float64" !== t[1].type || "float32" !== t[2].type && "float64" !== t[2].type) && t[0].type === t[1].type && t[0].type === t[2].type;
      }, t;
    }();

    e.Gemm = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function () {
      function t() {}

      return t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }(),
        a = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.initialize = function (t) {
        if (this.autoPad = t.getString("auto_pad", "NOTSET"), this.kernelShape = t.getInts("kernel_shape"), this.strides = t.getInts("strides", []), this.pads = t.getInts("pads", []), this.countIncludePad = 0 !== t.getInt("count_include_pad", 0), this.ceilMode = t.getInt("ceil_mode", 0), 0 !== this.ceilMode) throw new Error("using ceil() in shape computation is not yet supported for AveragePool");
      }, e;
    }(i);

    e.AveragePool = a;

    var u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.initialize = function (t) {
        this.countIncludePad = 0 !== t.getInt("count_include_pad", 0);
      }, e;
    }(i);

    e.GlobalAveragePool = u;

    var s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.initialize = function (t) {
        if (this.autoPad = t.getString("auto_pad", "NOTSET"), this.kernelShape = t.getInts("kernel_shape"), this.strides = t.getInts("strides", []), this.pads = t.getInts("pads", []), this.ceilMode = t.getInt("ceil_mode", 0), this.storageOrder = t.getInt("storage_order", 0), 0 !== this.storageOrder) throw new Error("column major storage order is not yet supported for MaxPool");
        if (0 !== this.ceilMode) throw new Error("using ceil() in shape computation is not yet supported for MaxPool");
      }, e;
    }(i);

    e.MaxPool = s;

    var l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.initialize = function (t) {}, e;
    }(i);

    e.GlobalMaxPool = l;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axis = t.getInt("axis", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Softmax = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        if (!t || 0 === t.length) return !1;

        for (var e = t[0].dims.length, n = 1; n < t.length; n++) {
          if (e !== t[n].dims.length) return !1;

          for (var r = 0; r < e; r++) if (t[0].dims[r] !== t[n].dims[r]) return !1;
        }

        return this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        if ("float32" !== t[0].type && "float64" !== t[0].type) return !1;

        for (var e = 1; e < t.length; e++) if (t[0].type !== t[e].type) return !1;

        return !0;
      }, t;
    }();

    e.Sum = r;
  }, function (t, e) {
    var n,
        r,
        o = t.exports = {};

    function i() {
      throw new Error("setTimeout has not been defined");
    }

    function a() {
      throw new Error("clearTimeout has not been defined");
    }

    function u(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);

      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }

    !function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i;
      } catch (t) {
        n = i;
      }

      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (t) {
        r = a;
      }
    }();
    var s,
        l = [],
        c = !1,
        f = -1;

    function p() {
      c && s && (c = !1, s.length ? l = s.concat(l) : f = -1, l.length && h());
    }

    function h() {
      if (!c) {
        var t = u(p);
        c = !0;

        for (var e = l.length; e;) {
          for (s = l, l = []; ++f < e;) s && s[f].run();

          f = -1, e = l.length;
        }

        s = null, c = !1, function (t) {
          if (r === clearTimeout) return clearTimeout(t);
          if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);

          try {
            r(t);
          } catch (e) {
            try {
              return r.call(null, t);
            } catch (e) {
              return r.call(this, t);
            }
          }
        }(t);
      }
    }

    function d(t, e) {
      this.fun = t, this.array = e;
    }

    function y() {}

    o.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      l.push(new d(t, e)), 1 !== l.length || c || u(h);
    }, d.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (t) {
      return [];
    }, o.binding = function (t) {
      throw new Error("process.binding is not supported");
    }, o.cwd = function () {
      return "/";
    }, o.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    }, o.umask = function () {
      return 0;
    };
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = r(n(148)),
        i = r(n(25)),
        a = function () {
      return function () {
        this.onnx = i, this.backend = i.backend, this.platform = o, this.debug = !1;
      };
    }();

    e.env = new a();
  }, function (t, e, n) {
    "use strict";

    (function (e) {
      var r = (this && this.__importStar || function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e;
      })(n(49)),
          o = r;

      ("undefined" != typeof window ? window : e).onnx = o, t.exports = r;
    }).call(this, n(8));
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = n(7),
        i = n(53),
        a = n(73),
        u = n(74),
        s = n(75),
        l = n(76),
        c = n(77),
        f = n(78),
        p = n(79),
        h = n(80),
        d = n(81),
        y = n(82),
        g = n(83),
        m = n(17),
        v = n(85),
        b = r(n(86)),
        w = n(87),
        _ = n(88),
        x = n(89),
        T = n(90),
        O = n(91),
        S = n(92),
        P = n(93),
        A = r(n(41)),
        D = n(41),
        E = n(94);

    e.CPU_OP_RESOLVE_RULES = [["Abs", "", "6+", function () {
      return new D.CpuUnaryOp(o.NUMBER_TYPES, A.abs);
    }], ["Acos", "", "7+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.acos);
    }], ["Acosh", "", "9+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.acosh);
    }], ["Add", "", "7+", function () {
      return new u.CpuBinaryOp(o.NUMBER_TYPES, function (t, e) {
        return t + e;
      });
    }], ["And", "", "7+", function () {
      return new u.CpuBinaryOp(["bool"], function (t, e) {
        return t && e;
      });
    }], ["ArgMax", "", "1+", function () {
      return new i.CpuArgMax();
    }], ["Asin", "", "7+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.asin);
    }], ["Asinh", "", "9+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.asinh);
    }], ["Atan", "", "7+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.atan);
    }], ["Atanh", "", "9+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.atanh);
    }], ["AveragePool", "", "7+", function () {
      return new v.CpuAveragePool();
    }], ["BatchNormalization", "", "7+", function () {
      return new a.CpuBatchNormalization();
    }], ["Ceil", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.ceil);
    }], ["Clip", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.clip, A.clipInitializer);
    }], ["Concat", "", "4+", function () {
      return new s.CpuConcat();
    }], ["Conv", "", "1+", function () {
      return new l.CpuConv();
    }], ["Cos", "", "7+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.cos);
    }], ["Cosh", "", "9+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.cosh);
    }], ["Div", "", "7+", function () {
      return new u.CpuBinaryOp(o.NUMBER_TYPES, function (t, e) {
        return t / e;
      });
    }], ["Dropout", "", "7+", function () {
      return new c.CpuDropout();
    }], ["Elu", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.elu, A.eluInitializer);
    }], ["Exp", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.exp);
    }], ["Flatten", "", "1+", function () {
      return new f.CpuFlatten();
    }], ["Floor", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.floor);
    }], ["Gather", "", "1+", function () {
      return new p.CpuGather();
    }], ["Gemm", "", "7+", function () {
      return new h.CpuGemm();
    }], ["GlobalAveragePool", "", "1+", function () {
      return new v.CpuGlobalAveragePool();
    }], ["GlobalMaxPool", "", "1+", function () {
      return new v.CpuGlobalMaxPool();
    }], ["ImageScaler", "", "1+", function () {
      return new d.CpuImageScaler();
    }], ["InstanceNormalization", "", "6+", function () {
      return new y.CpuInstanceNormalization();
    }], ["IsNaN", "", "9+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.isNan, void 0, "bool");
    }], ["LeakyRelu", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.leakyRelu, A.leakyReluInitializer);
    }], ["Log", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.log);
    }], ["LRN", "", "1+", function () {
      return new g.CpuLrn();
    }], ["MatMul", "", "1+", function () {
      return new m.CpuMatMul();
    }], ["MaxPool", "", "1+", function () {
      return new v.CpuMaxPool();
    }], ["Mul", "", "7+", function () {
      return new u.CpuBinaryOp(o.NUMBER_TYPES, function (t, e) {
        return t * e;
      });
    }], ["Neg", "", "6+", function () {
      return new D.CpuUnaryOp(o.NUMBER_TYPES, A.neg);
    }], ["Not", "", "1+", function () {
      return new D.CpuUnaryOp(["bool"], A.not, void 0, "bool");
    }], ["Or", "", "7+", function () {
      return new u.CpuBinaryOp(["bool"], function (t, e) {
        return t || e;
      });
    }], ["PRelu", "", "7+", function () {
      return new u.CpuBinaryOp(o.NUMBER_TYPES, function (t, e) {
        return t >= 0 ? t : t * e;
      });
    }], ["Reciprocal", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.reciprocal);
    }], ["ReduceLogSum", "", "1+", function () {
      return new b.CpuReduceLogSum();
    }], ["ReduceMax", "", "1+", function () {
      return new b.CpuReduceMax();
    }], ["ReduceMean", "", "1+", function () {
      return new b.CpuReduceMean();
    }], ["ReduceMin", "", "1+", function () {
      return new b.CpuReduceMin();
    }], ["ReduceProd", "", "1+", function () {
      return new b.CpuReduceProd();
    }], ["ReduceSum", "", "1+", function () {
      return new b.CpuReduceSum();
    }], ["ReduceSumSquare", "", "1+", function () {
      return new b.CpuReduceSumSquare();
    }], ["Relu", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.relu);
    }], ["Reshape", "", "5+", function () {
      return new w.CpuReshape();
    }], ["Sigmoid", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.sigmoid);
    }], ["Sign", "", "9+", function () {
      return new D.CpuUnaryOp(o.NUMBER_TYPES, A.sign);
    }], ["Sin", "", "7+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.sin);
    }], ["Sinh", "", "9+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.sinh);
    }], ["Slice", "", "10+", function () {
      return new _.CpuSliceV10();
    }], ["Slice", "", "1-9", function () {
      return new _.CpuSlice();
    }], ["Softmax", "", "1+", function () {
      return new x.CpuSoftmax();
    }], ["Sqrt", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.sqrt);
    }], ["Squeeze", "", "1+", function () {
      return new T.CpuSqueeze();
    }], ["Sub", "", "7+", function () {
      return new u.CpuBinaryOp(o.NUMBER_TYPES, function (t, e) {
        return t - e;
      });
    }], ["Sum", "", "6+", function () {
      return new O.CpuSum();
    }], ["Tan", "", "7+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.tan);
    }], ["Tanh", "", "6+", function () {
      return new D.CpuUnaryOp(o.FLOAT_TYPES, A.tanh);
    }], ["Tile", "", "6+", function () {
      return new S.CpuTile();
    }], ["Transpose", "", "1+", function () {
      return new P.CpuTranspose();
    }], ["Unsqueeze", "", "1+", function () {
      return new E.CpuUnsqueeze();
    }], ["Xor", "", "7+", function () {
      return new u.CpuBinaryOp(["bool"], function (t, e) {
        return t ^ e;
      });
    }]];
  }, function (t, e, n) {
    "use strict";

    t.exports = f;
    var r,
        o = n(6),
        i = o.LongBits,
        a = o.base64,
        u = o.utf8;

    function s(t, e, n) {
      this.fn = t, this.len = e, this.next = void 0, this.val = n;
    }

    function l() {}

    function c(t) {
      this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states;
    }

    function f() {
      this.len = 0, this.head = new s(l, 0, 0), this.tail = this.head, this.states = null;
    }

    function p(t, e, n) {
      e[n] = 255 & t;
    }

    function h(t, e) {
      this.len = t, this.next = void 0, this.val = e;
    }

    function d(t, e, n) {
      for (; t.hi;) e[n++] = 127 & t.lo | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, t.hi >>>= 7;

      for (; t.lo > 127;) e[n++] = 127 & t.lo | 128, t.lo = t.lo >>> 7;

      e[n++] = t.lo;
    }

    function y(t, e, n) {
      e[n] = 255 & t, e[n + 1] = t >>> 8 & 255, e[n + 2] = t >>> 16 & 255, e[n + 3] = t >>> 24;
    }

    f.create = o.Buffer ? function () {
      return (f.create = function () {
        return new r();
      })();
    } : function () {
      return new f();
    }, f.alloc = function (t) {
      return new o.Array(t);
    }, o.Array !== Array && (f.alloc = o.pool(f.alloc, o.Array.prototype.subarray)), f.prototype._push = function (t, e, n) {
      return this.tail = this.tail.next = new s(t, e, n), this.len += e, this;
    }, h.prototype = Object.create(s.prototype), h.prototype.fn = function (t, e, n) {
      for (; t > 127;) e[n++] = 127 & t | 128, t >>>= 7;

      e[n] = t;
    }, f.prototype.uint32 = function (t) {
      return this.len += (this.tail = this.tail.next = new h((t >>>= 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, this;
    }, f.prototype.int32 = function (t) {
      return t < 0 ? this._push(d, 10, i.fromNumber(t)) : this.uint32(t);
    }, f.prototype.sint32 = function (t) {
      return this.uint32((t << 1 ^ t >> 31) >>> 0);
    }, f.prototype.uint64 = function (t) {
      var e = i.from(t);
      return this._push(d, e.length(), e);
    }, f.prototype.int64 = f.prototype.uint64, f.prototype.sint64 = function (t) {
      var e = i.from(t).zzEncode();
      return this._push(d, e.length(), e);
    }, f.prototype.bool = function (t) {
      return this._push(p, 1, t ? 1 : 0);
    }, f.prototype.fixed32 = function (t) {
      return this._push(y, 4, t >>> 0);
    }, f.prototype.sfixed32 = f.prototype.fixed32, f.prototype.fixed64 = function (t) {
      var e = i.from(t);
      return this._push(y, 4, e.lo)._push(y, 4, e.hi);
    }, f.prototype.sfixed64 = f.prototype.fixed64, f.prototype.float = function (t) {
      return this._push(o.float.writeFloatLE, 4, t);
    }, f.prototype.double = function (t) {
      return this._push(o.float.writeDoubleLE, 8, t);
    };
    var g = o.Array.prototype.set ? function (t, e, n) {
      e.set(t, n);
    } : function (t, e, n) {
      for (var r = 0; r < t.length; ++r) e[n + r] = t[r];
    };
    f.prototype.bytes = function (t) {
      var e = t.length >>> 0;
      if (!e) return this._push(p, 1, 0);

      if (o.isString(t)) {
        var n = f.alloc(e = a.length(t));
        a.decode(t, n, 0), t = n;
      }

      return this.uint32(e)._push(g, e, t);
    }, f.prototype.string = function (t) {
      var e = u.length(t);
      return e ? this.uint32(e)._push(u.write, e, t) : this._push(p, 1, 0);
    }, f.prototype.fork = function () {
      return this.states = new c(this), this.head = this.tail = new s(l, 0, 0), this.len = 0, this;
    }, f.prototype.reset = function () {
      return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new s(l, 0, 0), this.len = 0), this;
    }, f.prototype.ldelim = function () {
      var t = this.head,
          e = this.tail,
          n = this.len;
      return this.reset().uint32(n), n && (this.tail.next = t.next, this.tail = e, this.len += n), this;
    }, f.prototype.finish = function () {
      for (var t = this.head.next, e = this.constructor.alloc(this.len), n = 0; t;) t.fn(t.val, e, n), n += t.len, t = t.next;

      return e;
    }, f._configure = function (t) {
      r = t;
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = s;
    var r,
        o = n(6),
        i = o.LongBits,
        a = o.utf8;

    function u(t, e) {
      return RangeError("index out of range: " + t.pos + " + " + (e || 1) + " > " + t.len);
    }

    function s(t) {
      this.buf = t, this.pos = 0, this.len = t.length;
    }

    var l,
        c = "undefined" != typeof Uint8Array ? function (t) {
      if (t instanceof Uint8Array || Array.isArray(t)) return new s(t);
      throw Error("illegal buffer");
    } : function (t) {
      if (Array.isArray(t)) return new s(t);
      throw Error("illegal buffer");
    };

    function f() {
      var t = new i(0, 0),
          e = 0;

      if (!(this.len - this.pos > 4)) {
        for (; e < 3; ++e) {
          if (this.pos >= this.len) throw u(this);
          if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * e) >>> 0, this.buf[this.pos++] < 128) return t;
        }

        return t.lo = (t.lo | (127 & this.buf[this.pos++]) << 7 * e) >>> 0, t;
      }

      for (; e < 4; ++e) if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * e) >>> 0, this.buf[this.pos++] < 128) return t;

      if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 28) >>> 0, t.hi = (t.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return t;

      if (e = 0, this.len - this.pos > 4) {
        for (; e < 5; ++e) if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * e + 3) >>> 0, this.buf[this.pos++] < 128) return t;
      } else for (; e < 5; ++e) {
        if (this.pos >= this.len) throw u(this);
        if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * e + 3) >>> 0, this.buf[this.pos++] < 128) return t;
      }

      throw Error("invalid varint encoding");
    }

    function p(t, e) {
      return (t[e - 4] | t[e - 3] << 8 | t[e - 2] << 16 | t[e - 1] << 24) >>> 0;
    }

    function h() {
      if (this.pos + 8 > this.len) throw u(this, 8);
      return new i(p(this.buf, this.pos += 4), p(this.buf, this.pos += 4));
    }

    s.create = o.Buffer ? function (t) {
      return (s.create = function (t) {
        return o.Buffer.isBuffer(t) ? new r(t) : c(t);
      })(t);
    } : c, s.prototype._slice = o.Array.prototype.subarray || o.Array.prototype.slice, s.prototype.uint32 = (l = 4294967295, function () {
      if (l = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return l;
      if (l = (l | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return l;
      if (l = (l | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return l;
      if (l = (l | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return l;
      if (l = (l | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return l;
      if ((this.pos += 5) > this.len) throw this.pos = this.len, u(this, 10);
      return l;
    }), s.prototype.int32 = function () {
      return 0 | this.uint32();
    }, s.prototype.sint32 = function () {
      var t = this.uint32();
      return t >>> 1 ^ -(1 & t) | 0;
    }, s.prototype.bool = function () {
      return 0 !== this.uint32();
    }, s.prototype.fixed32 = function () {
      if (this.pos + 4 > this.len) throw u(this, 4);
      return p(this.buf, this.pos += 4);
    }, s.prototype.sfixed32 = function () {
      if (this.pos + 4 > this.len) throw u(this, 4);
      return 0 | p(this.buf, this.pos += 4);
    }, s.prototype.float = function () {
      if (this.pos + 4 > this.len) throw u(this, 4);
      var t = o.float.readFloatLE(this.buf, this.pos);
      return this.pos += 4, t;
    }, s.prototype.double = function () {
      if (this.pos + 8 > this.len) throw u(this, 4);
      var t = o.float.readDoubleLE(this.buf, this.pos);
      return this.pos += 8, t;
    }, s.prototype.bytes = function () {
      var t = this.uint32(),
          e = this.pos,
          n = this.pos + t;
      if (n > this.len) throw u(this, t);
      return this.pos += t, Array.isArray(this.buf) ? this.buf.slice(e, n) : e === n ? new this.buf.constructor(0) : this._slice.call(this.buf, e, n);
    }, s.prototype.string = function () {
      var t = this.bytes();
      return a.read(t, 0, t.length);
    }, s.prototype.skip = function (t) {
      if ("number" == typeof t) {
        if (this.pos + t > this.len) throw u(this, t);
        this.pos += t;
      } else do {
        if (this.pos >= this.len) throw u(this);
      } while (128 & this.buf[this.pos++]);

      return this;
    }, s.prototype.skipType = function (t) {
      switch (t) {
        case 0:
          this.skip();
          break;

        case 1:
          this.skip(8);
          break;

        case 2:
          this.skip(this.uint32());
          break;

        case 3:
          for (; 4 != (t = 7 & this.uint32());) this.skipType(t);

          break;

        case 5:
          this.skip(4);
          break;

        default:
          throw Error("invalid wire type " + t + " at offset " + this.pos);
      }

      return this;
    }, s._configure = function (t) {
      r = t;
      var e = o.Long ? "toLong" : "toNumber";
      o.merge(s.prototype, {
        int64: function () {
          return f.call(this)[e](!1);
        },
        uint64: function () {
          return f.call(this)[e](!0);
        },
        sint64: function () {
          return f.call(this).zzDecode()[e](!1);
        },
        fixed64: function () {
          return h.call(this)[e](!0);
        },
        sfixed64: function () {
          return h.call(this)[e](!1);
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axis = t.getInt("axis");
      }, t.prototype.checkInputs = function (t) {
        return !(!t || t.length < 1) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        var e,
            n,
            o = t[0].type,
            i = t[0].dims.length;
        if ("string" === o) return !1;

        try {
          for (var a = r(t), u = a.next(); !u.done; u = a.next()) {
            var s = u.value;
            if (s.type !== o) return !1;
            if (s.dims.length !== i) return !1;
          }
        } catch (t) {
          e = {
            error: t
          };
        } finally {
          try {
            u && !u.done && (n = a.return) && n.call(a);
          } finally {
            if (e) throw e.error;
          }
        }

        return !0;
      }, t;
    }();

    e.Concat = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.ratio = t.getFloat("ratio", .5), this.testMode = !0;
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Dropout = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axis = t.getInt("axis", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && 0 !== t[0].dims.length && !(this.axis < 0 || this.axis > t[0].dims.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "string" !== t[0].type;
      }, t;
    }();

    e.Flatten = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(7),
        o = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axis = t.getInt("axis", 0);
      }, t.prototype.checkInputs = function (t) {
        if (!t || 2 !== t.length) return !1;
        var e = t[0].dims.length;
        return !(e < 1) && !(this.axis < -e || this.axis > e - 1) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return -1 !== r.NUMBER_TYPES.indexOf(t[0].type) && ("int32" === t[1].type || "int16" === t[1].type);
      }, t;
    }();

    e.Gather = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.scale = t.getFloat("scale"), this.bias = t.getFloats("bias");
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && 4 === t[0].dims.length && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.ImageScaler = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.epsilon = t.getFloat("epsilon", 1e-5);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 3 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        var e = t[0],
            n = t[1],
            r = t[2];
        return !(e.dims.length < 3 || 1 !== n.dims.length || 1 !== r.dims.length) && n.dims[0] === e.dims[1] && r.dims[0] === e.dims[1] && !("float32" !== e.type && "float64" !== e.type || "float32" !== n.type && "float64" !== n.type || "float32" !== r.type && "float64" !== r.type);
      }, t;
    }();

    e.InstanceNormalization = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(7),
        o = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axes = t.getInts("axes", []), this.keepDims = 1 === t.getInt("keepdims", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return -1 !== r.NUMBER_TYPES.indexOf(t[0].type);
      }, t;
    }();

    e.ReduceBase = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        return !(!t || 2 !== t.length || 1 !== t[1].dims.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return ("float32" === t[0].type || "float64" === t[0].type) && "int32" === t[1].type;
      }, t;
    }();

    e.Reshape = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.starts = t.getInts("starts"), this.ends = t.getInts("ends"), this.axes = t.getInts("axes", []);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Slice = r;

    var o = function () {
      function t() {}

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        return !(!t || t.length < 3 || t.length > 5) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "int32" === t[1].type && 1 === t[1].dims.length && "int32" === t[2].type && 1 === t[2].dims.length && (!(t.length >= 4) || "int32" === t[3].type && 1 === t[3].dims.length) && (!(t.length >= 5) || "int32" === t[4].type && 1 === t[4].dims.length);
      }, t;
    }();

    e.SliceV10 = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axes = t.getInts("axes");
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "string" !== t[0].type;
      }, t;
    }();

    e.Squeeze = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(7),
        o = function () {
      function t() {}

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        return !(!t || 2 !== t.length) && 1 === t[1].dims.length && t[1].dims[0] === t[0].dims.length && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return -1 !== r.NUMBER_TYPES.indexOf(t[0].type) && ("int32" === t[1].type || "int16" === t[1].type);
      }, t;
    }();

    e.Tile = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.perm = t.getInts("perm", []);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Transpose = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(42),
        a = n(1),
        u = function (t) {
      function e(e, n, r, o) {
        var i = t.call(this, e, o) || this;
        return i.func = n, i.attributesInitializer = r, i;
      }

      return o(e, t), e.prototype.initialize = function (t) {
        this.attributesInitializer && (this.attributes = this.attributesInitializer(t));
      }, e.prototype.run = function (t, e) {
        return [s(e[0], this.func, this.attributes, this.resultType)];
      }, e;
    }(i.UnaryOp);

    function s(t, e, n, r) {
      var o = new a.Tensor(t.dims, r || t.type);
      return e(t.data, o.data, n), o;
    }

    e.CpuUnaryOp = u, e.unaryOp = s, e.abs = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.abs(t[n]);
    }, e.acos = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.acos(t[n]);
    }, e.acosh = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.acosh(t[n]);
    }, e.asin = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.asin(t[n]);
    }, e.asinh = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.asinh(t[n]);
    }, e.atan = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.atan(t[n]);
    }, e.atanh = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.atanh(t[n]);
    }, e.ceil = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.ceil(t[n]);
    }, e.clipInitializer = function (t) {
      return {
        min: t.getFloat("min", -3.4028234663852886e38),
        max: t.getFloat("max", 3.4028234663852886e38)
      };
    }, e.clip = function (t, e, n) {
      for (var r = n.min, o = n.max, i = 0; i < t.length; i++) {
        var a = t[i];
        e[i] = a < r ? r : a > o ? o : a;
      }
    }, e.cos = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.cos(t[n]);
    }, e.cosh = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.cosh(t[n]);
    }, e.eluInitializer = function (t) {
      return t.getFloat("alpha", 1);
    }, e.elu = function (t, e, n) {
      for (var r = n, o = 0; o < t.length; o++) {
        var i = t[o];
        e[o] = i >= 0 ? i : r * (Math.exp(i) - 1);
      }
    }, e.exp = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.exp(t[n]);
    }, e.floor = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.floor(t[n]);
    }, e.isNan = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Number.isNaN(t[n]) ? 1 : 0;
    }, e.leakyReluInitializer = function (t) {
      return t.getFloat("alpha", .01);
    }, e.leakyRelu = function (t, e, n) {
      for (var r = n, o = 0; o < t.length; o++) {
        var i = t[o];
        e[o] = i >= 0 ? i : r * i;
      }
    }, e.log = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.log(t[n]);
    }, e.neg = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = -t[n];
    }, e.not = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = t[n] ? 0 : 1;
    }, e.reciprocal = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = 1 / t[n];
    }, e.relu = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.max(0, t[n]);
    }, e.sigmoid = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = 1 / (1 + Math.exp(-t[n]));
    }, e.sign = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = t[n] > 0 ? 1 : t[n] < 0 ? -1 : 0;
    }, e.sin = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.sin(t[n]);
    }, e.sinh = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.sinh(t[n]);
    }, e.sqrt = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.sqrt(t[n]);
    }, e.tan = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.tan(t[n]);
    }, e.tanh = function (t, e) {
      for (var n = 0; n < t.length; n++) e[n] = Math.tanh(t[n]);
    };
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t(t, e) {
        this.typeConstraint = t, this.resultType = e;
      }

      return t.prototype.initialize = function (t) {}, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return -1 !== this.typeConstraint.indexOf(t[0].type);
      }, t;
    }();

    e.UnaryOp = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axes = t.getInts("axes");
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "string" !== t[0].type;
      }, t;
    }();

    e.Unsqueeze = r;
  }, function (t, e) {}, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.min = t.getFloat("min", -3.4028234663852886e38), this.max = t.getFloat("max", 3.4028234663852886e38);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Clip = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.getPackedShape = function (t) {
      var e = t.length;
      return t.slice(0, e - 1).concat(t[e - 1] / 4);
    };
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        o = this && this.__spread || function () {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(r(arguments[e]));

      return t;
    },
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(1),
        u = i(n(48)),
        s = function () {
      function t(t, e, n) {
        var r = n || [t.length];
        if (0 === t.length) throw new RangeError("Tensor data should contain at least one element.");
        Array.isArray(t) && "string" !== e ? "float32" === e ? this.data = Float32Array.from(t) : "bool" === e ? this.data = Uint8Array.from(t) : "int32" === e && (this.data = Int32Array.from(t)) : this.data = t, this.dims = r, this.type = e, this.internalTensor = new a.Tensor(this.dims, this.type, void 0, void 0, this.data), this.size = this.internalTensor.size;
      }

      return t.prototype.get = function (t) {
        for (var e = this, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];

        var i = [];
        if ("number" == typeof t) i = o([t], n);else {
          if (!t) throw new Error("Input index array is undefined. ");
          i = t;
        }
        if (u.validateIndices(i), i.length !== this.dims.length) throw new RangeError("Input index array dims don't match the tensor dims.");
        i.forEach(function (t, n) {
          if (t >= e.dims[n]) throw new RangeError("Input index array dims don't match the tensor dims.");
        });
        var a = this.internalTensor.get(i);
        return "bool" === this.type ? 1 === a : a;
      }, t.prototype.set = function (t, e) {
        for (var n = this, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];

        u.matchElementType(this.type, t);
        var a = [];
        if ("number" == typeof e) a = o([e], r);else {
          if (!e) throw new Error("Input index array is undefined.");
          a = e;
        }
        if (u.validateIndices(a), a.length !== this.dims.length) throw new RangeError("Input index array dims don't match the tensor dims.");
        a.forEach(function (t, e) {
          if (t >= n.dims[e]) throw new RangeError("Input index array dims don't match the tensor dims.");
        }), "boolean" == typeof t ? this.internalTensor.set(a, t ? 1 : 0) : this.internalTensor.set(a, t);
      }, t;
    }();

    e.Tensor = s;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = n(1),
        i = n(47);
    e.fromInternalTensor = function (t) {
      switch (t.type) {
        case "bool":
          return new i.Tensor(new Uint8Array(t.integerData), "bool", t.dims);

        case "float32":
          return new i.Tensor(t.floatData, "float32", t.dims);

        case "float64":
          return new i.Tensor(new Float32Array(t.floatData), "float32", t.dims);

        case "string":
          return new i.Tensor(t.stringData, "string", t.dims);

        case "int8":
          return new i.Tensor(new Int32Array(t.integerData), "int32", t.dims);

        case "int32":
          return new i.Tensor(t.integerData, "int32", t.dims);

        default:
          throw new TypeError("Tensor type is not supported. ");
      }
    }, e.toInternalTensor = function (t) {
      return new o.Tensor(t.dims, t.type, void 0, void 0, t.data);
    }, e.matchElementType = function (t, e) {
      switch (typeof e) {
        case "string":
          if ("string" !== t) throw new TypeError("The new element type doesn't match the tensor data type.");
          break;

        case "number":
          if ("float32" !== t && "int32" !== t) throw new TypeError("The new element type doesn't match the tensor data type.");
          if ("float32" === t && Number.isInteger(e)) throw new TypeError("The new element type doesn't match the tensor data type.");
          if ("int32" === t && !Number.isInteger(e)) throw new TypeError("The new element type doesn't match the tensor data type.");
          break;

        case "boolean":
          if ("bool" !== t) throw new TypeError("The new element type doesn't match the tensor data type.");
          break;

        default:
          throw new TypeError("The new element type is not supported.");
      }
    }, e.validateIndices = function (t) {
      var e, n;
      if (t.length < 0 || t.length > 6) throw new RangeError("Only rank 0 to 6 is supported for tensor shape.");

      try {
        for (var o = r(t), i = o.next(); !i.done; i = o.next()) {
          var a = i.value;
          if (!Number.isInteger(a)) throw new TypeError("Invalid index: " + a + " is not an integer");
          if (a < 0 || a > 2147483647) throw new TypeError("Invalid index: length " + a + " is not allowed");
        }
      } catch (t) {
        e = {
          error: t
        };
      } finally {
        try {
          i && !i.done && (n = o.return) && n.call(o);
        } finally {
          if (e) throw e.error;
        }
      }
    };
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
    }

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = n(50),
        i = n(95),
        a = n(113),
        u = n(163);
    r(n(164)), r(n(165)), e.backend = {
      cpu: new o.CpuBackend(),
      wasm: new i.WasmBackend(),
      webgl: new a.WebGLBackend()
    }, e.ENV = u.envImpl;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(51),
        o = function () {
      function t() {}

      return t.prototype.initialize = function () {
        return !0;
      }, t.prototype.createSessionHandler = function (t) {
        return new r.CpuSessionHandler(this, t);
      }, t.prototype.dispose = function () {}, t;
    }();

    e.CpuBackend = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(11),
        o = n(52),
        i = n(26),
        a = function () {
      function t(t, e) {
        this.backend = t, this.context = e;
      }

      return t.prototype.createInferenceHandler = function () {
        return new o.CpuInferenceHandler(this, this.context.profiler);
      }, t.prototype.dispose = function () {}, t.prototype.resolve = function (t, e) {
        var n = r.resolveOperator(t, e, i.CPU_OP_RESOLVE_RULES);
        return n.initialize(t.attributes), n;
      }, t;
    }();

    e.CpuSessionHandler = a;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t(t, e) {
        this.session = t, this.profiler = e;
      }

      return t.prototype.dispose = function () {}, t;
    }();

    e.CpuInferenceHandler = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(54),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], this.axis, this.keepDims)];
      }, e;
    }(i.ArgMax);

    function l(t, e, n) {
      var r = t.dims ? t.dims.length : 1;
      e = u.ShapeUtil.parseAxis(e, r);

      for (var o = u.ReduceUtil.calcReduceShape(t.dims, [e], !0), i = t.data, s = new Int32Array(u.ShapeUtil.size(o)), l = u.ShapeUtil.sizeFromDimension(t.dims, e + 1), c = u.ShapeUtil.computeStrides(o), f = u.ShapeUtil.computeStrides(t.dims), p = new Array(t.dims.length), h = 0; h < s.length; h++) {
        var d = u.ShapeUtil.offsetToIndices(h, c);
        u.BroadcastUtil.fillIndex(d, t.dims, p);

        for (var y = u.ShapeUtil.indicesToOffset(p, f), g = t.data[y], m = 0, v = 0; v < t.dims[e]; ++v) {
          var b = i[y + v * l];
          b > g && (g = b, m = v);
        }

        s[h] = m;
      }

      return new a.Tensor(n ? o : u.ReduceUtil.calcReduceShape(t.dims, [e], n), "int32", void 0, void 0, s);
    }

    e.CpuArgMax = s, e.argMax = l;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(7),
        o = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.axis = t.getInt("axis", 0), this.keepDims = 1 === t.getInt("keepdims", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return -1 !== r.NUMBER_TYPES.indexOf(t[0].type);
      }, t;
    }();

    e.ArgMax = o;
  }, function (t, e, n) {
    "use strict";

    e.byteLength = function (t) {
      var e = l(t),
          n = e[0],
          r = e[1];
      return 3 * (n + r) / 4 - r;
    }, e.toByteArray = function (t) {
      for (var e, n = l(t), r = n[0], a = n[1], u = new i(function (t, e, n) {
        return 3 * (e + n) / 4 - n;
      }(0, r, a)), s = 0, c = a > 0 ? r - 4 : r, f = 0; f < c; f += 4) e = o[t.charCodeAt(f)] << 18 | o[t.charCodeAt(f + 1)] << 12 | o[t.charCodeAt(f + 2)] << 6 | o[t.charCodeAt(f + 3)], u[s++] = e >> 16 & 255, u[s++] = e >> 8 & 255, u[s++] = 255 & e;

      2 === a && (e = o[t.charCodeAt(f)] << 2 | o[t.charCodeAt(f + 1)] >> 4, u[s++] = 255 & e);
      1 === a && (e = o[t.charCodeAt(f)] << 10 | o[t.charCodeAt(f + 1)] << 4 | o[t.charCodeAt(f + 2)] >> 2, u[s++] = e >> 8 & 255, u[s++] = 255 & e);
      return u;
    }, e.fromByteArray = function (t) {
      for (var e, n = t.length, o = n % 3, i = [], a = 0, u = n - o; a < u; a += 16383) i.push(c(t, a, a + 16383 > u ? u : a + 16383));

      1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
      return i.join("");
    };

    for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = a.length; u < s; ++u) r[u] = a[u], o[a.charCodeAt(u)] = u;

    function l(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var n = t.indexOf("=");
      return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4];
    }

    function c(t, e, n) {
      for (var o, i, a = [], u = e; u < n; u += 3) o = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), a.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);

      return a.join("");
    }

    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63;
  }, function (t, e) {
    e.read = function (t, e, n, r, o) {
      var i,
          a,
          u = 8 * o - r - 1,
          s = (1 << u) - 1,
          l = s >> 1,
          c = -7,
          f = n ? o - 1 : 0,
          p = n ? -1 : 1,
          h = t[e + f];

      for (f += p, i = h & (1 << -c) - 1, h >>= -c, c += u; c > 0; i = 256 * i + t[e + f], f += p, c -= 8);

      for (a = i & (1 << -c) - 1, i >>= -c, c += r; c > 0; a = 256 * a + t[e + f], f += p, c -= 8);

      if (0 === i) i = 1 - l;else {
        if (i === s) return a ? NaN : 1 / 0 * (h ? -1 : 1);
        a += Math.pow(2, r), i -= l;
      }
      return (h ? -1 : 1) * a * Math.pow(2, i - r);
    }, e.write = function (t, e, n, r, o, i) {
      var a,
          u,
          s,
          l = 8 * i - o - 1,
          c = (1 << l) - 1,
          f = c >> 1,
          p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          h = r ? 0 : i - 1,
          d = r ? 1 : -1,
          y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;

      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, a = c) : (a = Math.floor(Math.log(e) / Math.LN2), e * (s = Math.pow(2, -a)) < 1 && (a--, s *= 2), (e += a + f >= 1 ? p / s : p * Math.pow(2, 1 - f)) * s >= 2 && (a++, s /= 2), a + f >= c ? (u = 0, a = c) : a + f >= 1 ? (u = (e * s - 1) * Math.pow(2, o), a += f) : (u = e * Math.pow(2, f - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + h] = 255 & u, h += d, u /= 256, o -= 8);

      for (a = a << o | u, l += o; l > 0; t[n + h] = 255 & a, h += d, a /= 256, l -= 8);

      t[n + h - d] |= 128 * y;
    };
  }, function (t, e) {
    var n = {}.toString;

    t.exports = Array.isArray || function (t) {
      return "[object Array]" == n.call(t);
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = n(59);
  }, function (t, e, n) {
    "use strict";

    var r = e;

    function o() {
      r.Reader._configure(r.BufferReader), r.util._configure();
    }

    r.build = "minimal", r.Writer = n(27), r.BufferWriter = n(68), r.Reader = n(28), r.BufferReader = n(69), r.util = n(6), r.rpc = n(70), r.roots = n(72), r.configure = o, r.Writer._configure(r.BufferWriter), o();
  }, function (t, e, n) {
    "use strict";

    t.exports = function (t, e) {
      var n = new Array(arguments.length - 1),
          r = 0,
          o = 2,
          i = !0;

      for (; o < arguments.length;) n[r++] = arguments[o++];

      return new Promise(function (o, a) {
        n[r] = function (t) {
          if (i) if (i = !1, t) a(t);else {
            for (var e = new Array(arguments.length - 1), n = 0; n < e.length;) e[n++] = arguments[n];

            o.apply(null, e);
          }
        };

        try {
          t.apply(e || null, n);
        } catch (t) {
          i && (i = !1, a(t));
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = e;

    r.length = function (t) {
      var e = t.length;
      if (!e) return 0;

      for (var n = 0; --e % 4 > 1 && "=" === t.charAt(e);) ++n;

      return Math.ceil(3 * t.length) / 4 - n;
    };

    for (var o = new Array(64), i = new Array(123), a = 0; a < 64;) i[o[a] = a < 26 ? a + 65 : a < 52 ? a + 71 : a < 62 ? a - 4 : a - 59 | 43] = a++;

    r.encode = function (t, e, n) {
      for (var r, i = null, a = [], u = 0, s = 0; e < n;) {
        var l = t[e++];

        switch (s) {
          case 0:
            a[u++] = o[l >> 2], r = (3 & l) << 4, s = 1;
            break;

          case 1:
            a[u++] = o[r | l >> 4], r = (15 & l) << 2, s = 2;
            break;

          case 2:
            a[u++] = o[r | l >> 6], a[u++] = o[63 & l], s = 0;
        }

        u > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, a)), u = 0);
      }

      return s && (a[u++] = o[r], a[u++] = 61, 1 === s && (a[u++] = 61)), i ? (u && i.push(String.fromCharCode.apply(String, a.slice(0, u))), i.join("")) : String.fromCharCode.apply(String, a.slice(0, u));
    };

    r.decode = function (t, e, n) {
      for (var r, o = n, a = 0, u = 0; u < t.length;) {
        var s = t.charCodeAt(u++);
        if (61 === s && a > 1) break;
        if (void 0 === (s = i[s])) throw Error("invalid encoding");

        switch (a) {
          case 0:
            r = s, a = 1;
            break;

          case 1:
            e[n++] = r << 2 | (48 & s) >> 4, r = s, a = 2;
            break;

          case 2:
            e[n++] = (15 & r) << 4 | (60 & s) >> 2, r = s, a = 3;
            break;

          case 3:
            e[n++] = (3 & r) << 6 | s, a = 0;
        }
      }

      if (1 === a) throw Error("invalid encoding");
      return n - o;
    }, r.test = function (t) {
      return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(t);
    };
  }, function (t, e, n) {
    "use strict";

    function r() {
      this._listeners = {};
    }

    t.exports = r, r.prototype.on = function (t, e, n) {
      return (this._listeners[t] || (this._listeners[t] = [])).push({
        fn: e,
        ctx: n || this
      }), this;
    }, r.prototype.off = function (t, e) {
      if (void 0 === t) this._listeners = {};else if (void 0 === e) this._listeners[t] = [];else for (var n = this._listeners[t], r = 0; r < n.length;) n[r].fn === e ? n.splice(r, 1) : ++r;
      return this;
    }, r.prototype.emit = function (t) {
      var e = this._listeners[t];

      if (e) {
        for (var n = [], r = 1; r < arguments.length;) n.push(arguments[r++]);

        for (r = 0; r < e.length;) e[r].fn.apply(e[r++].ctx, n);
      }

      return this;
    };
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      return "undefined" != typeof Float32Array ? function () {
        var e = new Float32Array([-0]),
            n = new Uint8Array(e.buffer),
            r = 128 === n[3];

        function o(t, r, o) {
          e[0] = t, r[o] = n[0], r[o + 1] = n[1], r[o + 2] = n[2], r[o + 3] = n[3];
        }

        function i(t, r, o) {
          e[0] = t, r[o] = n[3], r[o + 1] = n[2], r[o + 2] = n[1], r[o + 3] = n[0];
        }

        function a(t, r) {
          return n[0] = t[r], n[1] = t[r + 1], n[2] = t[r + 2], n[3] = t[r + 3], e[0];
        }

        function u(t, r) {
          return n[3] = t[r], n[2] = t[r + 1], n[1] = t[r + 2], n[0] = t[r + 3], e[0];
        }

        t.writeFloatLE = r ? o : i, t.writeFloatBE = r ? i : o, t.readFloatLE = r ? a : u, t.readFloatBE = r ? u : a;
      }() : function () {
        function e(t, e, n, r) {
          var o = e < 0 ? 1 : 0;
          if (o && (e = -e), 0 === e) t(1 / e > 0 ? 0 : 2147483648, n, r);else if (isNaN(e)) t(2143289344, n, r);else if (e > 3.4028234663852886e38) t((o << 31 | 2139095040) >>> 0, n, r);else if (e < 1.1754943508222875e-38) t((o << 31 | Math.round(e / 1.401298464324817e-45)) >>> 0, n, r);else {
            var i = Math.floor(Math.log(e) / Math.LN2);
            t((o << 31 | i + 127 << 23 | 8388607 & Math.round(e * Math.pow(2, -i) * 8388608)) >>> 0, n, r);
          }
        }

        function n(t, e, n) {
          var r = t(e, n),
              o = 2 * (r >> 31) + 1,
              i = r >>> 23 & 255,
              a = 8388607 & r;
          return 255 === i ? a ? NaN : o * (1 / 0) : 0 === i ? 1.401298464324817e-45 * o * a : o * Math.pow(2, i - 150) * (a + 8388608);
        }

        t.writeFloatLE = e.bind(null, o), t.writeFloatBE = e.bind(null, i), t.readFloatLE = n.bind(null, a), t.readFloatBE = n.bind(null, u);
      }(), "undefined" != typeof Float64Array ? function () {
        var e = new Float64Array([-0]),
            n = new Uint8Array(e.buffer),
            r = 128 === n[7];

        function o(t, r, o) {
          e[0] = t, r[o] = n[0], r[o + 1] = n[1], r[o + 2] = n[2], r[o + 3] = n[3], r[o + 4] = n[4], r[o + 5] = n[5], r[o + 6] = n[6], r[o + 7] = n[7];
        }

        function i(t, r, o) {
          e[0] = t, r[o] = n[7], r[o + 1] = n[6], r[o + 2] = n[5], r[o + 3] = n[4], r[o + 4] = n[3], r[o + 5] = n[2], r[o + 6] = n[1], r[o + 7] = n[0];
        }

        function a(t, r) {
          return n[0] = t[r], n[1] = t[r + 1], n[2] = t[r + 2], n[3] = t[r + 3], n[4] = t[r + 4], n[5] = t[r + 5], n[6] = t[r + 6], n[7] = t[r + 7], e[0];
        }

        function u(t, r) {
          return n[7] = t[r], n[6] = t[r + 1], n[5] = t[r + 2], n[4] = t[r + 3], n[3] = t[r + 4], n[2] = t[r + 5], n[1] = t[r + 6], n[0] = t[r + 7], e[0];
        }

        t.writeDoubleLE = r ? o : i, t.writeDoubleBE = r ? i : o, t.readDoubleLE = r ? a : u, t.readDoubleBE = r ? u : a;
      }() : function () {
        function e(t, e, n, r, o, i) {
          var a = r < 0 ? 1 : 0;
          if (a && (r = -r), 0 === r) t(0, o, i + e), t(1 / r > 0 ? 0 : 2147483648, o, i + n);else if (isNaN(r)) t(0, o, i + e), t(2146959360, o, i + n);else if (r > 1.7976931348623157e308) t(0, o, i + e), t((a << 31 | 2146435072) >>> 0, o, i + n);else {
            var u;
            if (r < 2.2250738585072014e-308) t((u = r / 5e-324) >>> 0, o, i + e), t((a << 31 | u / 4294967296) >>> 0, o, i + n);else {
              var s = Math.floor(Math.log(r) / Math.LN2);
              1024 === s && (s = 1023), t(4503599627370496 * (u = r * Math.pow(2, -s)) >>> 0, o, i + e), t((a << 31 | s + 1023 << 20 | 1048576 * u & 1048575) >>> 0, o, i + n);
            }
          }
        }

        function n(t, e, n, r, o) {
          var i = t(r, o + e),
              a = t(r, o + n),
              u = 2 * (a >> 31) + 1,
              s = a >>> 20 & 2047,
              l = 4294967296 * (1048575 & a) + i;
          return 2047 === s ? l ? NaN : u * (1 / 0) : 0 === s ? 5e-324 * u * l : u * Math.pow(2, s - 1075) * (l + 4503599627370496);
        }

        t.writeDoubleLE = e.bind(null, o, 0, 4), t.writeDoubleBE = e.bind(null, i, 4, 0), t.readDoubleLE = n.bind(null, a, 0, 4), t.readDoubleBE = n.bind(null, u, 4, 0);
      }(), t;
    }

    function o(t, e, n) {
      e[n] = 255 & t, e[n + 1] = t >>> 8 & 255, e[n + 2] = t >>> 16 & 255, e[n + 3] = t >>> 24;
    }

    function i(t, e, n) {
      e[n] = t >>> 24, e[n + 1] = t >>> 16 & 255, e[n + 2] = t >>> 8 & 255, e[n + 3] = 255 & t;
    }

    function a(t, e) {
      return (t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24) >>> 0;
    }

    function u(t, e) {
      return (t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3]) >>> 0;
    }

    t.exports = r(r);
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length)) return mod;
      } catch (t) {}

      return null;
    }

    module.exports = inquire;
  }, function (t, e, n) {
    "use strict";

    var r = e;
    r.length = function (t) {
      for (var e = 0, n = 0, r = 0; r < t.length; ++r) (n = t.charCodeAt(r)) < 128 ? e += 1 : n < 2048 ? e += 2 : 55296 == (64512 & n) && 56320 == (64512 & t.charCodeAt(r + 1)) ? (++r, e += 4) : e += 3;

      return e;
    }, r.read = function (t, e, n) {
      if (n - e < 1) return "";

      for (var r, o = null, i = [], a = 0; e < n;) (r = t[e++]) < 128 ? i[a++] = r : r > 191 && r < 224 ? i[a++] = (31 & r) << 6 | 63 & t[e++] : r > 239 && r < 365 ? (r = ((7 & r) << 18 | (63 & t[e++]) << 12 | (63 & t[e++]) << 6 | 63 & t[e++]) - 65536, i[a++] = 55296 + (r >> 10), i[a++] = 56320 + (1023 & r)) : i[a++] = (15 & r) << 12 | (63 & t[e++]) << 6 | 63 & t[e++], a > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), a = 0);

      return o ? (a && o.push(String.fromCharCode.apply(String, i.slice(0, a))), o.join("")) : String.fromCharCode.apply(String, i.slice(0, a));
    }, r.write = function (t, e, n) {
      for (var r, o, i = n, a = 0; a < t.length; ++a) (r = t.charCodeAt(a)) < 128 ? e[n++] = r : r < 2048 ? (e[n++] = r >> 6 | 192, e[n++] = 63 & r | 128) : 55296 == (64512 & r) && 56320 == (64512 & (o = t.charCodeAt(a + 1))) ? (r = 65536 + ((1023 & r) << 10) + (1023 & o), ++a, e[n++] = r >> 18 | 240, e[n++] = r >> 12 & 63 | 128, e[n++] = r >> 6 & 63 | 128, e[n++] = 63 & r | 128) : (e[n++] = r >> 12 | 224, e[n++] = r >> 6 & 63 | 128, e[n++] = 63 & r | 128);

      return n - i;
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = function (t, e, n) {
      var r = n || 8192,
          o = r >>> 1,
          i = null,
          a = r;
      return function (n) {
        if (n < 1 || n > o) return t(n);
        a + n > r && (i = t(r), a = 0);
        var u = e.call(i, a, a += n);
        return 7 & a && (a = 1 + (7 | a)), u;
      };
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = o;
    var r = n(6);

    function o(t, e) {
      this.lo = t >>> 0, this.hi = e >>> 0;
    }

    var i = o.zero = new o(0, 0);
    i.toNumber = function () {
      return 0;
    }, i.zzEncode = i.zzDecode = function () {
      return this;
    }, i.length = function () {
      return 1;
    };
    var a = o.zeroHash = "\0\0\0\0\0\0\0\0";
    o.fromNumber = function (t) {
      if (0 === t) return i;
      var e = t < 0;
      e && (t = -t);
      var n = t >>> 0,
          r = (t - n) / 4294967296 >>> 0;
      return e && (r = ~r >>> 0, n = ~n >>> 0, ++n > 4294967295 && (n = 0, ++r > 4294967295 && (r = 0))), new o(n, r);
    }, o.from = function (t) {
      if ("number" == typeof t) return o.fromNumber(t);

      if (r.isString(t)) {
        if (!r.Long) return o.fromNumber(parseInt(t, 10));
        t = r.Long.fromString(t);
      }

      return t.low || t.high ? new o(t.low >>> 0, t.high >>> 0) : i;
    }, o.prototype.toNumber = function (t) {
      if (!t && this.hi >>> 31) {
        var e = 1 + ~this.lo >>> 0,
            n = ~this.hi >>> 0;
        return e || (n = n + 1 >>> 0), -(e + 4294967296 * n);
      }

      return this.lo + 4294967296 * this.hi;
    }, o.prototype.toLong = function (t) {
      return r.Long ? new r.Long(0 | this.lo, 0 | this.hi, Boolean(t)) : {
        low: 0 | this.lo,
        high: 0 | this.hi,
        unsigned: Boolean(t)
      };
    };
    var u = String.prototype.charCodeAt;
    o.fromHash = function (t) {
      return t === a ? i : new o((u.call(t, 0) | u.call(t, 1) << 8 | u.call(t, 2) << 16 | u.call(t, 3) << 24) >>> 0, (u.call(t, 4) | u.call(t, 5) << 8 | u.call(t, 6) << 16 | u.call(t, 7) << 24) >>> 0);
    }, o.prototype.toHash = function () {
      return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    }, o.prototype.zzEncode = function () {
      var t = this.hi >> 31;
      return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ t) >>> 0, this.lo = (this.lo << 1 ^ t) >>> 0, this;
    }, o.prototype.zzDecode = function () {
      var t = -(1 & this.lo);
      return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ t) >>> 0, this.hi = (this.hi >>> 1 ^ t) >>> 0, this;
    }, o.prototype.length = function () {
      var t = this.lo,
          e = (this.lo >>> 28 | this.hi << 4) >>> 0,
          n = this.hi >>> 24;
      return 0 === n ? 0 === e ? t < 16384 ? t < 128 ? 1 : 2 : t < 2097152 ? 3 : 4 : e < 16384 ? e < 128 ? 5 : 6 : e < 2097152 ? 7 : 8 : n < 128 ? 9 : 10;
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = a;
    var r = n(27);
    (a.prototype = Object.create(r.prototype)).constructor = a;
    var o = n(6),
        i = o.Buffer;

    function a() {
      r.call(this);
    }

    a.alloc = function (t) {
      return (a.alloc = o._Buffer_allocUnsafe)(t);
    };

    var u = i && i.prototype instanceof Uint8Array && "set" === i.prototype.set.name ? function (t, e, n) {
      e.set(t, n);
    } : function (t, e, n) {
      if (t.copy) t.copy(e, n, 0, t.length);else for (var r = 0; r < t.length;) e[n++] = t[r++];
    };

    function s(t, e, n) {
      t.length < 40 ? o.utf8.write(t, e, n) : e.utf8Write(t, n);
    }

    a.prototype.bytes = function (t) {
      o.isString(t) && (t = o._Buffer_from(t, "base64"));
      var e = t.length >>> 0;
      return this.uint32(e), e && this._push(u, e, t), this;
    }, a.prototype.string = function (t) {
      var e = i.byteLength(t);
      return this.uint32(e), e && this._push(s, e, t), this;
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = i;
    var r = n(28);
    (i.prototype = Object.create(r.prototype)).constructor = i;
    var o = n(6);

    function i(t) {
      r.call(this, t);
    }

    o.Buffer && (i.prototype._slice = o.Buffer.prototype.slice), i.prototype.string = function () {
      var t = this.uint32();
      return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + t, this.len));
    };
  }, function (t, e, n) {
    "use strict";

    e.Service = n(71);
  }, function (t, e, n) {
    "use strict";

    t.exports = o;
    var r = n(6);

    function o(t, e, n) {
      if ("function" != typeof t) throw TypeError("rpcImpl must be a function");
      r.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = Boolean(e), this.responseDelimited = Boolean(n);
    }

    (o.prototype = Object.create(r.EventEmitter.prototype)).constructor = o, o.prototype.rpcCall = function t(e, n, o, i, a) {
      if (!i) throw TypeError("request must be specified");
      var u = this;
      if (!a) return r.asPromise(t, u, e, n, o, i);
      if (u.rpcImpl) try {
        return u.rpcImpl(e, n[u.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function (t, n) {
          if (t) return u.emit("error", t, e), a(t);

          if (null !== n) {
            if (!(n instanceof o)) try {
              n = o[u.responseDelimited ? "decodeDelimited" : "decode"](n);
            } catch (t) {
              return u.emit("error", t, e), a(t);
            }
            return u.emit("data", n, e), a(null, n);
          }

          u.end(!0);
        });
      } catch (t) {
        return u.emit("error", t, e), void setTimeout(function () {
          a(t);
        }, 0);
      } else setTimeout(function () {
        a(Error("already ended"));
      }, 0);
    }, o.prototype.end = function (t) {
      return this.rpcImpl && (t || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
    };
  }, function (t, e, n) {
    "use strict";

    t.exports = {};
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(14),
        a = n(1),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [s(e[0], e[1], e[2], e[3], e[4], this.epsilon, this.momentum, this.spatial)];
      }, e;
    }(i.BatchNormalization);

    function s(t, e, n, r, o, i, u, s) {
      for (var l = t.dims, c = l[0], f = l[1], p = 1, h = 2; h < l.length; h++) p *= l[h];

      for (var d = new a.Tensor(t.dims, t.type), y = t.floatData, g = d.floatData, m = e.numberData, v = n.numberData, b = r.numberData, w = o.numberData, _ = 0; _ < c * f; _++) {
        var x = _ * p;

        for (h = 0; h < p; h++) g[x + h] = m[_ % f] * ((y[x + h] - b[_ % f]) / Math.sqrt(w[_ % f] + i)) + v[_ % f];
      }

      return d;
    }

    e.CpuBatchNormalization = u, e.batchNormalization = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(15),
        a = n(0),
        u = function (t) {
      function e(e, n, r, o) {
        var i = t.call(this, e, r, o) || this;
        return i.opLambda = n, i;
      }

      return o(e, t), e.prototype.initialize = function (t) {
        if (!this.opType && !this.opLambda) throw new Error("Both opType and opLambda cannot be missing for a binary op");
        if (!this.opLambda) throw this.opType, new Error("Binary op could not be initialized. Missing op lambda.");
      }, e.prototype.run = function (t, e) {
        return [function (t, e, n, r, o) {
          var i = a.BroadcastUtil.calc(t, e, n, r, o);
          if (!i) throw new Error("not broadcastable");
          return i;
        }(e[0], e[1], this.opLambda, !1, this.resultType)];
      }, e;
    }(i.BinaryOp);

    e.CpuBinaryOp = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(29),
        u = n(1),
        s = i(n(0)),
        l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [c(e, this.axis)];
      }, e;
    }(a.Concat);

    function c(t, e) {
      var n = t[0],
          r = n.dims;
      if (e >= r.length || e < -1 * r.length) throw new Error("axis specified for concat doesn't match input dimensionality");
      e < 0 && (e = r.length + e);

      for (var o = r[e], i = new Array(r.length), a = 1; a < t.length; a++) for (var l = (g = t[a]).dims, c = 0; c < r.length; c++) {
        if (c === e) o += l[c];else if (r[c] !== l[c]) throw new Error("non concat dimensions must match");
        i[c] = l[c];
      }

      i[e] = o;
      var f = new u.Tensor(i, n.type),
          p = f.numberData,
          h = 1;

      for (a = i.length - 1; a >= e; a--) h *= i[a];

      for (var d = 0, y = 0; y < t.length; y++) {
        var g,
            m = 1;

        for (a = (g = t[y]).dims.length - 1; a >= e; a--) m *= g.dims[a];

        for (var v = g.numberData, b = s.ShapeUtil.size(g.dims), w = d, _ = (a = 0, 0); a < b; a++) p[w + a] = v[a], ++_ === m && (w += h - m, _ = 0);

        d += m;
      }

      return f;
    }

    e.CpuConcat = l, e.concat = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(16),
        a = n(1),
        u = n(0),
        s = n(17),
        l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = e[0],
            r = e[1],
            o = 3 === e.length ? e[2] : void 0;
        if (0 === this.kernelShape.length) for (var i = e[1].dims, s = 2; s < i.length; ++s) this.kernelShape.push(i[s]);
        var l = u.PoolConvUtil.computeConvOutputShape(n.dims, r.dims, this.strides, this.dilations, this.kernelShape, this.pads, this.autoPad),
            f = new a.Tensor(l, n.type);
        return c(f, n, r, o, this.dilations, this.group, this.pads, this.strides), [f];
      }, e;
    }(i.Conv);

    function c(t, e, n, r, o, i, a, u) {
      for (var l = e.dims[0], c = e.dims[1], p = e.dims[2], h = e.dims[3], d = n.dims[0], y = n.dims[1], g = n.dims[2], m = n.dims[3], v = d * y * g * m, b = [g, m], w = t.dims[0], _ = t.dims[1], x = t.dims[2], T = t.dims[3], O = x * T, S = c / i * (p * h), P = w * _ * x * T / w / i, A = v / i, D = c / i * (b[0] * b[1]), E = new Float32Array(D * O), I = 0; I < l; ++I) {
        for (var L = 0, k = 0, M = 0; M < i; ++M) f(e.floatData.subarray(L + M * S), E, c / i, p, h, b[0], b[1], o[0], o[1], a[0], a[1], a[2], a[3], u[0], u[1]), s.matMul2d(n.floatData.subarray(M * A), E, t.floatData.subarray(k + M * P), !1, !1, 1, 0, d / i, O, D);

        L += S * i, k += P * i;
      }

      if (r) for (var j = r.floatData, R = t.floatData, C = t.dims[0], N = t.dims[1], F = t.dims[2] * t.dims[3], B = N * F, U = 0; U < C; ++U) for (var G = 0; G < N; ++G) for (var z = U * B + G * F, W = 0; W < F; ++W) R[z + W] += j[G];
    }

    function f(t, e, n, r, o, i, a, u, s, l, c, f, p, h, d) {
      var y = 1 + ~~((r + f + l - (u * (i - 1) + 1)) / h),
          g = 1 + ~~((o + c + p - (s * (a - 1) + 1)) / d);
      if (1 !== u || 1 !== s || 0 !== c || 0 !== p || 0 !== l || 0 !== f) for (var m = 1 + ~~((r + l + f - (u * (i - 1) + 1)) / h), v = 1 + ~~((o + c + p - (s * (a - 1) + 1)) / d), b = n * i * a, w = 0; w < b; ++w) for (var _ = w % a, x = ~~(w / a) % i, T = ~~(w / (i * a)), O = 0; O < m; ++O) for (var S = 0; S < v; ++S) {
        var P = O * h - l + x * u,
            A = S * d - c + _ * s;
        e[(w * m + O) * v + S] = P >= 0 && P < r && A >= 0 && A < o ? t[(T * r + P) * o + A] : 0;
      } else for (var D = 0; D < n * i * a; D++) for (var E = ~~(D / (i * a)), I = D % (i * a), L = ~~(I / a), k = I % a, M = E * (i * a * y * g) + L * (a * y * g) + k * (y * g), j = E * (r * o), R = 0; R < y; R++) {
        var C = R * h + L,
            N = k;
        if (1 === d) e.set(t.subarray(j + C * o + N, j + C * o + N + g), M + R * g);else for (var F = 0; F < g; F++) e[M + (R * g + F)] = t[j + (C * o + N + F * d)];
      }
    }

    e.CpuConv = l, e.conv2d = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(30),
        a = n(1),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [s(e[0], this.ratio, this.testMode)];
      }, e;
    }(i.Dropout);

    function s(t, e, n) {
      if (!n) throw new Error("only test mode is supported");
      var r = new a.Tensor(t.dims, t.type),
          o = t.floatData;
      return r.numberData.set(o), r;
    }

    e.CpuDropout = u, e.dropout = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(31),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], this.axis)];
      }, e;
    }(i.Flatten);

    function l(t, e) {
      var n = u.ShapeUtil.flattenShape(t.dims, e),
          r = new a.Tensor(n, t.type),
          o = t.numberData;
      return r.numberData.set(o), r;
    }

    e.CpuFlatten = s, e.flatten = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(32),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], e[1], this.axis)];
      }, e;
    }(i.Gather);

    function l(t, e, n) {
      n = u.ShapeUtil.parseAxis(n, t.dims.length);
      var r = t.dims.slice(),
          o = r.slice(),
          i = e.data;
      o[n] = i.length;

      for (var s = u.ShapeUtil.computeStrides(r), l = u.ShapeUtil.computeStrides(o), c = new a.Tensor(o, t.type).numberData, f = t.data, p = 0; p < c.length; ++p) {
        var h = u.ShapeUtil.offsetToIndices(p, l),
            d = h.slice();
        d[n] = i[h[n]];
        var y = u.ShapeUtil.indicesToOffset(d, s);
        c[p] = f[y];
      }

      var g = r.slice(0, n).concat(e.dims).concat(r.slice(n + 1));
      return new a.Tensor(g, t.type, void 0, void 0, c);
    }

    e.CpuGather = s, e.gather = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        a = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(19),
        s = n(1),
        l = a(n(0)),
        c = n(17),
        f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [p(e[0], e[1], e[2], this.alpha, this.beta, this.transA, this.transB)];
      }, e;
    }(u.Gemm);

    function p(t, e, n, r, o, a, u) {
      var f = i(l.GemmUtil.getShapeOfGemmResult(t.dims, a, e.dims, u, n.dims), 3),
          p = f[0],
          h = f[1],
          d = f[2],
          y = new s.Tensor([p, h], t.type);
      if (l.BroadcastUtil.calc(y, n, function (t, e) {
        return e;
      }, !0) !== y) throw new Error("tensor C is not broadcastable to [M,N]");
      return c.matMul2d(t.floatData, e.floatData, y.floatData, a, u, r, o, p, h, d), y;
    }

    e.CpuGemm = f, e.gemm = p;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(33),
        u = n(1),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], this.bias, this.scale)];
      }, e;
    }(a.ImageScaler);

    function l(t, e, n) {
      for (var r = i(t.dims, 4), o = r[0], a = r[1], s = r[2], l = r[3], c = new u.Tensor([o, a, s, l], t.type), f = t.floatData, p = c.floatData, h = 0; h < o * a; h++) for (var d = 0; d < s * l; d++) {
        var y = h * s * l + d;
        p[y] = f[y] * n + e[h % a];
      }

      return c;
    }

    e.CpuImageScaler = s, e.imageScaler = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(34),
        a = n(1),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [s(e[0], e[1], e[2], this.epsilon)];
      }, e;
    }(i.InstanceNormalization);

    function s(t, e, n, r) {
      for (var o = t.dims, i = o[0], u = o[1], s = 1, l = 2; l < o.length; l++) s *= o[l];

      for (var c, f, p, h, d, y, g = new a.Tensor(t.dims, t.type), m = t.floatData, v = g.floatData, b = e.numberData, w = n.numberData, _ = 0; _ < i * u; _++) {
        d = (h = _ * s) + s, y = _ % u, c = 0;

        for (l = h; l < d; ++l) c += m[l];

        f = c / s, c = 0;

        for (l = h; l < d; ++l) c += Math.pow(m[l] - f, 2);

        p = c / s;

        for (l = h; l < d; ++l) v[l] = b[y] * ((m[l] - f) / Math.sqrt(p + r)) + w[y];
      }

      return g;
    }

    e.CpuInstanceNormalization = u, e.instanceNormalization = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(84),
        u = n(1),
        s = i(n(0)),
        l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [c(e[0], this.alpha, this.beta, this.bias, this.size)];
      }, e;
    }(a.Lrn);

    function c(t, e, n, r, o) {
      for (var i = t.dims[0], a = t.dims[1], l = t.floatData, c = 1, f = 2; f < t.dims.length; ++f) c *= t.dims[f];

      var p = c * a,
          h = new u.Tensor(t.dims, t.type),
          d = new Array(s.ShapeUtil.size(t.dims));

      for (f = 0; f < d.length; ++f) d[f] = r;

      for (var y = new Float64Array((a + o - 1) * c), g = e / o, m = (o - 1) / 2, v = 0; v < i; ++v) {
        s.MathUtil.sqr(y, l, m * c, p * v, p);

        for (var b = 0; b < o; ++b) s.MathUtil.axpy(d, y, p * v, b * c, c, g);

        for (b = 1; b < a; ++b) {
          var w = v * p + b * c;
          s.arrayCopyHelper(d, d, w, w - c, c), s.MathUtil.axpy(d, y, w, (b + o - 1) * c, c, g), s.MathUtil.axpy(d, y, w, (b - 1) * c, c, -g);
        }
      }

      return s.MathUtil.powx(d, d, 0, 0, s.ShapeUtil.size(t.dims), -n), s.MathUtil.mul(d, l, 0, 0, s.ShapeUtil.size(t.dims)), h.floatData.set(d), h;
    }

    e.CpuLrn = l, e.lrn = c;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.alpha = t.getFloat("alpha", 1e-4), this.beta = t.getFloat("beta", .75), this.bias = t.getFloat("bias", 1), this.size = t.getInt("size");
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && !(t[0].dims.length < 3) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Lrn = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(20),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [p(e[0], this.autoPad, this.countIncludePad, this.kernelShape, this.pads, this.strides)];
      }, e;
    }(i.AveragePool);

    e.CpuAveragePool = s;

    var l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [h(e[0])];
      }, e;
    }(i.GlobalAveragePool);

    e.CpuGlobalAveragePool = l;

    var c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [d(e[0], this.autoPad, this.kernelShape, this.pads, this.strides)];
      }, e;
    }(i.MaxPool);

    e.CpuMaxPool = c;

    var f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [y(e[0])];
      }, e;
    }(i.GlobalMaxPool);

    function p(t, e, n, r, o, i) {
      return g(!1, t, e, n, r, o, i, 0, function (t, e) {
        return t + e;
      }, function (t, e) {
        return t / e;
      });
    }

    function h(t) {
      return g(!0, t, "NOTSET", !1, [], [], [], 0, function (t, e) {
        return t + e;
      }, function (t, e) {
        return t / e;
      });
    }

    function d(t, e, n, r, o) {
      return g(!1, t, e, !1, n, r, o, Number.MIN_SAFE_INTEGER, function (t, e) {
        return Math.max(t, e);
      }, function (t, e) {
        return t;
      });
    }

    function y(t) {
      return g(!0, t, "NOTSET", !1, [], [], [], Number.MIN_SAFE_INTEGER, function (t, e) {
        return Math.max(t, e);
      }, function (t, e) {
        return t;
      });
    }

    function g(t, e, n, r, o, i, s, l, c, f) {
      u.PoolConvUtil.adjustPoolAttributes(t, e.dims, o, s, i);

      for (var p = u.PoolConvUtil.computePoolOutputShape(t, e.dims, s, o, i, n), h = u.ShapeUtil.size(o), d = u.ShapeUtil.computeStrides(o), y = d.length, g = p.length, m = u.ShapeUtil.size(p), v = new a.Tensor(p, e.type), b = u.ShapeUtil.computeStrides(p), w = 0; w < m; w++) {
        for (var _ = u.ShapeUtil.offsetToIndices(w, b), x = _.slice(0), T = _.slice(0), O = 0; O < y; O++) x[g - y + O] = _[g - y + O] * s[O];

        var S = l,
            P = 0,
            A = !1;

        for (O = 0; O < h; O++) {
          var D = u.ShapeUtil.offsetToIndices(O, d);
          A = !1;

          for (var E = g - y; E < g; E++) if (T[E] = x[E] + D[E - g + y] - i[E - 2], T[E] >= e.dims[E] || T[E] < 0) {
            P++, A = !0;
            break;
          }

          S = A ? S : c(S, e.get(T));
        }

        S = f(S, r ? h : h - P), v.set(_, S);
      }

      return v;
    }

    e.CpuGlobalMaxPool = f, e.averagePool = p, e.globalAveragePool = h, e.maxPool = d, e.globalMaxPool = y, e.pool = g;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(35),
        a = n(0),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [d(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    e.CpuReduceSum = u;

    var s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [y(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    e.CpuReduceSumSquare = s;

    var l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [g(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    e.CpuReduceLogSum = l;

    var c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [m(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    e.CpuReduceMax = c;

    var f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [v(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    e.CpuReduceMin = f;

    var p = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [b(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    e.CpuReduceMean = p;

    var h = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [w(e[0], this.axes, this.keepDims)];
      }, e;
    }(i.ReduceBase);

    function d(t, e, n) {
      return a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t;
      }, function (t, e) {
        return t + e;
      });
    }

    function y(t, e, n) {
      return a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t * t;
      }, function (t, e) {
        return t + e;
      });
    }

    function g(t, e, n) {
      for (var r = a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t;
      }, function (t, e) {
        return t + e;
      }), o = r.floatData.length, i = 0; i < o; i++) r.floatData[i] = Math.log(r.floatData[i]);

      return r;
    }

    function m(t, e, n) {
      return a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t;
      }, function (t, e) {
        return Math.max(t, e);
      });
    }

    function v(t, e, n) {
      return a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t;
      }, function (t, e) {
        return Math.min(t, e);
      });
    }

    function b(t, e, n) {
      for (var r = a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t;
      }, function (t, e) {
        return t + e;
      }), o = a.ReduceUtil.calcReduceShape(t.dims, e, n), i = a.ShapeUtil.size(t.dims) / a.ShapeUtil.size(o), u = r.floatData.length, s = 0; s < u; s++) r.floatData[s] = r.floatData[s] / i;

      return r;
    }

    function w(t, e, n) {
      return a.ReduceUtil.calcReduce(t, e, n, function (t) {
        return t;
      }, function (t, e) {
        return t * e;
      });
    }

    e.CpuReduceProd = h, e.reduceSum = d, e.reduceSumSquare = y, e.reduceLogSum = g, e.reduceMax = m, e.reduceMin = v, e.reduceMean = b, e.reduceProd = w;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(36),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], e[1])];
      }, e;
    }(i.Reshape);

    function l(t, e) {
      var n = u.ShapeUtil.calculateReshapedDims(t.dims, e.integerData),
          r = new a.Tensor(n, t.type);
      return r.floatData.set(t.floatData), r;
    }

    e.CpuReshape = s, e.reshape = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(37),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [c(e[0], this.starts, this.ends, this.axes)];
      }, e;
    }(i.Slice);

    e.CpuSlice = s;

    var l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        if (e.length >= 5 && e[4].integerData.some(function (t) {
          return 1 !== t;
        })) throw new Error("currently non-1 steps is not supported for Slice");
        var n = Array.from(e[1].integerData),
            r = Array.from(e[2].integerData),
            o = e.length >= 4 ? Array.from(e[3].integerData) : [];
        return [c(e[0], n, r, o)];
      }, e;
    }(i.SliceV10);

    function c(t, e, n, r) {
      0 === r.length && (r = t.dims.map(function (t, e) {
        return e;
      })), r = r.map(function (e) {
        return u.ShapeUtil.parseAxis(e, t.dims.length);
      }), e = e.map(function (e, n) {
        return e > t.dims[r[n]] - 1 ? t.dims[r[n]] : u.ShapeUtil.parseAxis(e, t.dims[r[n]]);
      }), n = n.map(function (e, n) {
        return e > t.dims[r[n]] - 1 ? t.dims[r[n]] : u.ShapeUtil.parseAxis(e, t.dims[r[n]]);
      });
      var o = [],
          i = [];
      r.forEach(function (t, r) {
        o[t] = n[r] - e[r], i[t] = e[r];
      });

      for (var s = 0; s < t.dims.length; s++) o[s] = o[s] || t.dims[s], i[s] = i[s] || 0;

      var l = u.ShapeUtil.computeStrides(o),
          c = u.ShapeUtil.computeStrides(t.dims ? t.dims : [t.data.length]),
          f = t.data,
          p = new a.Tensor(o, t.type),
          h = p.data;

      for (s = 0; s < h.length; ++s) {
        var d = u.ShapeUtil.offsetToIndices(s, l).map(function (t, e) {
          return t + i[e];
        }),
            y = u.ShapeUtil.indicesToOffset(d, c);
        h[s] = f[y];
      }

      return p;
    }

    e.CpuSliceV10 = l, e.slice = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(21),
        u = n(1),
        s = i(n(0)),
        l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [c(e[0], this.axis)];
      }, e;
    }(a.Softmax);

    function c(t, e) {
      for (var n = t.dims, r = n.length, o = s.ShapeUtil.parseAxis(e, r), i = s.ShapeUtil.sizeToDimension(n, o), a = s.ShapeUtil.sizeFromDimension(n, o), l = t.numberData, c = new u.Tensor(t.dims, t.type), f = c.numberData, p = 0; p < i; p++) {
        for (var h = p * a, d = Number.MIN_VALUE, y = 0; y < a; y++) l[h + y] > d && (d = l[h + y]);

        var g = 0;

        for (y = 0; y < a; y++) {
          var m = l[h + y] - d;
          f[h + y] = Math.exp(m), g += Math.exp(m);
        }

        for (y = 0; y < a; y++) 0 === g ? f[h + y] = 0 : f[h + y] /= g;
      }

      return c;
    }

    e.CpuSoftmax = l, e.softmax = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(38),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], this.axes)];
      }, e;
    }(i.Squeeze);

    function l(t, e) {
      var n = u.ShapeUtil.squeezeShape(t.dims, e),
          r = new a.Tensor(n, t.type),
          o = t.numberData;
      return r.numberData.set(o), r;
    }

    e.CpuSqueeze = s, e.squeeze = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(22),
        a = n(1),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [s(e)];
      }, e;
    }(i.Sum);

    function s(t) {
      for (var e = new a.Tensor(t[0].dims, t[0].type), n = t[0].floatData.length, r = e.floatData, o = 0; o < t.length; o++) for (var i = t[o].floatData, u = 0; u < n; ++u) r[u] += i[u];

      return e;
    }

    e.CpuSum = u, e.sum = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(39),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], e[1])];
      }, e;
    }(i.Tile);

    function l(t, e) {
      for (var n = t.dims ? t.dims : [t.data.length], r = n.length, o = new Array(r), i = 0; i < r; i++) o[i] = n[i] * e.numberData[i];

      var s = u.ShapeUtil.computeStrides(n),
          l = u.ShapeUtil.computeStrides(o),
          c = new a.Tensor(o, t.type),
          f = c.numberData,
          p = t.data;

      for (i = 0; i < f.length; ++i) {
        for (var h = u.ShapeUtil.offsetToIndices(i, l), d = new Array(r), y = 0; y < r; ++y) d[y] = h[y] % t.dims[y];

        var g = u.ShapeUtil.indicesToOffset(d, s);
        f[i] = p[g];
      }

      return c;
    }

    e.CpuTile = s, e.tile = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(40),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], this.perm)];
      }, e;
    }(i.Transpose);

    function l(t, e) {
      var n = t.dims,
          r = n.length,
          o = new Array(r);
      if (e.length === r) o = e;else for (var i = 0; i < r; i++) o[i] = r - i - 1;
      var s = new Array(r),
          l = new Array(r);

      for (i = 0; i < r; i++) {
        var c = o[i];
        s[i] = n[c], l[i] = c + 1 < r ? u.ShapeUtil.sizeFromDimension(n, c + 1) : 1;
      }

      var f,
          p,
          h,
          d = new a.Tensor(s, t.type),
          y = t.floatData,
          g = d.floatData,
          m = 0,
          v = 1,
          b = 1,
          w = !0;

      for (i = r - 1; i >= 0; --i) {
        var _ = o[i];
        w && _ === i ? v *= n[_] : (w = !1, b *= n[_], ++m);
      }

      return 1 === b ? (f = v, p = g, h = y, u.arrayCopyHelper(p, h, 0, 0, f)) : 1 === v ? function (t, e, n, r, o, i) {
        for (var a = new Array(t).fill(0), s = 0, l = 0; l < n; ++l) {
          var c = u.ShapeUtil.indicesToOffset(a, r, t);
          o[s++] = i[c], u.ShapeUtil.incrementIndex(a, e, t);
        }
      }(m, s, b, l, g, y) : function (t, e, n, r, o, i, a) {
        for (var s = new Array(t).fill(0), l = 0, c = 0; c < n; ++c) {
          var f = u.ShapeUtil.indicesToOffset(s, o, t);
          u.arrayCopyHelper(i, a, l, 0 + f, r), u.ShapeUtil.incrementIndex(s, e, t), l += r;
        }
      }(m, s, b, v, l, g, y), d;
    }

    e.CpuTranspose = s, e.transpose = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(43),
        a = n(1),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return [l(e[0], this.axes)];
      }, e;
    }(i.Unsqueeze);

    function l(t, e) {
      var n = u.ShapeUtil.unsqueezeShape(t.dims, e),
          r = new a.Tensor(n, t.type),
          o = t.numberData;
      return r.numberData.set(o), r;
    }

    e.CpuUnsqueeze = s, e.unsqueeze = l;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__awaiter || function (t, e, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            i(t);
          }
        }

        function u(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            i(t);
          }
        }

        function s(t) {
          t.done ? o(t.value) : new n(function (e) {
            e(t.value);
          }).then(a, u);
        }

        s((r = r.apply(t, e || [])).next());
      });
    },
        o = this && this.__generator || function (t, e) {
      var n,
          r,
          o,
          i,
          a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      };
      return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this;
      }), i;

      function u(i) {
        return function (u) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");

            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return a.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;

                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break;
                  }

                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break;
                  }

                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break;
                  }

                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }

              i = e.call(t, a);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }

            if (5 & i[0]) throw i[1];
            return {
              value: i[0] ? i[1] : void 0,
              done: !0
            };
          }([i, u]);
        };
      }
    },
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(3),
        u = i(n(4)),
        s = n(100),
        l = function () {
      function t() {
        this.cpuFallback = !0, this.worker = 3, this.initTimeout = 5e3;
      }

      return t.prototype.initialize = function () {
        return r(this, void 0, void 0, function () {
          return o(this, function (t) {
            switch (t.label) {
              case 0:
                return this.checkIfNumWorkersIsValid(), [4, this.isWasmSupported()];

              case 1:
                return t.sent() ? [2, !0] : [2, !1];
            }
          });
        });
      }, t.prototype.createSessionHandler = function (t) {
        return new s.WasmSessionHandler(this, t, this.cpuFallback);
      }, t.prototype.dispose = function () {}, t.prototype.checkIfNumWorkersIsValid = function () {
        if (!Number.isFinite(this.worker) || Number.isNaN(this.worker)) throw new Error(this.worker + " is not valid number of workers");
        if (!Number.isInteger(this.worker)) throw new Error(this.worker + " is not an integer and hence not valid number of workers");
      }, t.prototype.isWasmSupported = function () {
        return r(this, void 0, void 0, function () {
          var t;
          return o(this, function (e) {
            switch (e.label) {
              case 0:
                return e.trys.push([0, 2,, 3]), [4, u.init(this.worker, this.initTimeout)];

              case 1:
                return e.sent(), [2, !0];

              case 2:
                return t = e.sent(), a.Logger.warning("WebAssembly", "Unable to initialize WebAssembly backend. " + t), [2, !1];

              case 3:
                return [2];
            }
          });
        });
      }, t;
    }();

    e.WasmBackend = l;
  }, function (t, e, n) {
    "use strict";

    var r;
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = !1,
        i = !1;

    e.init = function () {
      if (o) return Promise.resolve();
      if (i) throw new Error("multiple calls to 'init()' detected.");
      return i = !0, new Promise(function (t, e) {
        (r = n(97))(r).then(function () {
          t(), i = !1, o = !0;
        }, function (t) {
          i = !1, e(t);
        });
      });
    };

    var a = function () {
      function t() {
        this.ptr8 = 0, this.numBytesAllocated = 0;
      }

      return t.prototype.ccall = function (n) {
        for (var i = [], a = 1; a < arguments.length; a++) i[a - 1] = arguments[a];

        if (!o) throw new Error("wasm not initialized. please ensure 'init()' is called.");
        var u = e.now(),
            s = [],
            l = t.calculateOffsets(s, i);
        l > this.numBytesAllocated && this.expandMemory(l), t.ccallSerialize(r.HEAPU8.subarray(this.ptr8, this.ptr8 + l), s, i);
        var c = e.now();
        this.func(n, this.ptr8);
        var f = e.now();
        return t.ccallDeserialize(r.HEAPU8.subarray(this.ptr8, this.ptr8 + l), s, i), {
          startTime: u,
          endTime: e.now(),
          startTimeFunc: c,
          endTimeFunc: f
        };
      }, t.prototype.ccallRaw = function (t, n) {
        if (!o) throw new Error("wasm not initialized. please ensure 'init()' is called.");
        var i = e.now(),
            a = n.byteLength;
        a > this.numBytesAllocated && this.expandMemory(a), r.HEAPU8.subarray(this.ptr8, this.ptr8 + a).set(n);
        var u = e.now();
        this.func(t, this.ptr8);
        var s = e.now();
        return n.set(r.HEAPU8.subarray(this.ptr8, this.ptr8 + a)), {
          startTime: i,
          endTime: e.now(),
          startTimeFunc: u,
          endTimeFunc: s
        };
      }, t.prototype.func = function (t, e) {
        (0, r[t])(e);
      }, t.calculateOffsets = function (t, e) {
        for (var n = 4 + 4 * e.length, r = 0; r < e.length; r++) {
          var o = e[r],
              i = o[0],
              a = o[1],
              u = o[2],
              s = 0;

          switch (a) {
            case "bool":
            case "int32":
            case "float32":
              s = 4;
              break;

            case "float64":
              s = 8;
              break;

            case "boolptr":
              if (!i) {
                t.push(0);
                continue;
              }

              if (!Array.isArray(i) && !ArrayBuffer.isView(i)) throw new Error("boolptr requires boolean array or Uint8Array");
              s = 4 * Math.ceil(i.length / 4);
              break;

            case "int32ptr":
            case "float32ptr":
              if (!i) {
                t.push(0);
                continue;
              }

              if (Array.isArray(i)) {
                if ("inout" === u || "out" === u) throw new TypeError("inout/out parameters must be ArrayBufferView for ptr types.");
                s = 4 * i.length;
              } else {
                if (!ArrayBuffer.isView(i)) throw new TypeError("unsupported data type in 'ccall()'");
                s = i.byteLength;
              }

              break;

            default:
              throw new Error("not supported parameter type: " + a);
          }

          t.push(n), n += s;
        }

        return n;
      }, t.ccallSerialize = function (t, e, n) {
        var r = new Int32Array(t.buffer, t.byteOffset),
            o = new Uint32Array(t.buffer, t.byteOffset),
            i = new Float32Array(t.buffer, t.byteOffset);
        o[0] = n.length;

        for (var a = 0; a < n.length; a++) {
          var u = n[a],
              s = u[0],
              l = u[1],
              c = u[2],
              f = e[a],
              p = f >> 2;
          if (o[a + 1] = f, "out" !== c && 0 !== f) switch (l) {
            case "bool":
              t[f] = !0 === s ? 1 : 0;
              break;

            case "int32":
              r[p] = s;
              break;

            case "float32":
              i[p] = s;
              break;

            case "boolptr":
              var h = s;
              t.subarray(f, f + h.length).set(s);
              break;

            case "int32ptr":
              var d = s;
              r.subarray(p, p + d.length).set(d);
              break;

            case "float32ptr":
              var y = s;
              i.subarray(p, p + y.length).set(y);
              break;

            default:
              throw new Error("not supported parameter type: " + l);
          }
        }
      }, t.ccallDeserialize = function (t, e, n) {
        for (var r = new Float32Array(t.buffer, t.byteOffset), o = new Uint8Array(t.buffer, t.byteOffset), i = 0; i < n.length; i++) {
          var a = n[i],
              u = a[0],
              s = a[1],
              l = a[2],
              c = e[i],
              f = c >> 2;
          if ("out" === l || "inout" === l) switch (s) {
            case "float32ptr":
              var p = u;
              p.set(r.subarray(f, f + p.length));
              break;

            case "boolptr":
              var h = u;
              h.set(o.subarray(c, c + h.length));
              break;

            default:
              throw new Error("not supported parameter type: " + s);
          }
        }
      }, t.prototype.expandMemory = function (t) {
        if (0 !== this.ptr8 && r._free(this.ptr8), this.numBytesAllocated = 2 * t, this.ptr8 = r._malloc(this.numBytesAllocated), 0 === this.ptr8) throw new Error("Unable to allocate requested amount of memory. Failing.");
      }, t.prototype.dispose = function () {
        if (!o) throw new Error("wasm not initialized. please ensure 'init()' is called.");
        0 !== this.ptr8 && r._free(this.ptr8);
      }, t;
    }();

    e.WasmBinding = a, e.now = "undefined" != typeof performance && performance.now ? function () {
      return performance.now();
    } : Date.now;
  }, function (t, e, n) {
    (function (e, r) {
      var o,
          i = (o = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0, function (t) {
        t = void 0 !== (t = t || {}) ? t : {};
        var i,
            a = {};

        for (i in t) t.hasOwnProperty(i) && (a[i] = t[i]);

        t.arguments = [], t.thisProgram = "./this.program", t.quit = function (t, e) {
          throw e;
        }, t.preRun = [], t.postRun = [];
        var u,
            s,
            l = !1,
            c = !1;
        l = "object" == typeof window, c = "function" == typeof importScripts, u = "object" == typeof e && !l && !c, s = !l && !u && !c;
        var f,
            p,
            h = "";
        u ? (h = r + "/", t.read = function (t, e) {
          var r;
          return f || (f = n(44)), p || (p = n(98)), t = p.normalize(t), r = f.readFileSync(t), e ? r : r.toString();
        }, t.readBinary = function (e) {
          var n = t.read(e, !0);
          return n.buffer || (n = new Uint8Array(n)), _(n.buffer), n;
        }, e.argv.length > 1 && (t.thisProgram = e.argv[1].replace(/\\/g, "/")), t.arguments = e.argv.slice(2), e.on("uncaughtException", function (t) {
          if (!(t instanceof ut)) throw t;
        }), e.on("unhandledRejection", lt), t.quit = function (t) {
          e.exit(t);
        }, t.inspect = function () {
          return "[Emscripten Module object]";
        }) : s ? ("undefined" != typeof read && (t.read = function (t) {
          return read(t);
        }), t.readBinary = function (t) {
          var e;
          return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t)) : (_("object" == typeof (e = read(t, "binary"))), e);
        }, "undefined" != typeof scriptArgs ? t.arguments = scriptArgs : void 0 !== arguments && (t.arguments = arguments), "function" == typeof quit && (t.quit = function (t) {
          quit(t);
        })) : (l || c) && (c ? h = self.location.href : document.currentScript && (h = document.currentScript.src), o && (h = o), h = 0 !== h.indexOf("blob:") ? h.substr(0, h.lastIndexOf("/") + 1) : "", t.read = function (t) {
          var e = new XMLHttpRequest();
          return e.open("GET", t, !1), e.send(null), e.responseText;
        }, c && (t.readBinary = function (t) {
          var e = new XMLHttpRequest();
          return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
        }), t.readAsync = function (t, e, n) {
          var r = new XMLHttpRequest();
          r.open("GET", t, !0), r.responseType = "arraybuffer", r.onload = function () {
            200 == r.status || 0 == r.status && r.response ? e(r.response) : n();
          }, r.onerror = n, r.send(null);
        }, t.setWindowTitle = function (t) {
          document.title = t;
        });
        var d = t.print || ("undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null),
            y = t.printErr || ("undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || d);

        for (i in a) a.hasOwnProperty(i) && (t[i] = a[i]);

        a = void 0;
        var g = {
          "f64-rem": function (t, e) {
            return t % e;
          },
          debugger: function () {}
        };
        new Array(0);

        var m,
            v = 0,
            b = function (t) {
          v = t;
        };

        "object" != typeof WebAssembly && y("no native wasm support detected");
        var w = !1;

        function _(t, e) {
          t || lt("Assertion failed: " + e);
        }

        var x,
            T,
            O,
            S,
            P = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

        function A(t, e, n) {
          for (var r = e + n, o = e; t[o] && !(o >= r);) ++o;

          if (o - e > 16 && t.subarray && P) return P.decode(t.subarray(e, o));

          for (var i = ""; e < o;) {
            var a = t[e++];

            if (128 & a) {
              var u = 63 & t[e++];

              if (192 != (224 & a)) {
                var s = 63 & t[e++];
                if ((a = 224 == (240 & a) ? (15 & a) << 12 | u << 6 | s : (7 & a) << 18 | u << 12 | s << 6 | 63 & t[e++]) < 65536) i += String.fromCharCode(a);else {
                  var l = a - 65536;
                  i += String.fromCharCode(55296 | l >> 10, 56320 | 1023 & l);
                }
              } else i += String.fromCharCode((31 & a) << 6 | u);
            } else i += String.fromCharCode(a);
          }

          return i;
        }

        function D(t, e) {
          return t ? A(O, t, e) : "";
        }

        function E(t, e) {
          return t % e > 0 && (t += e - t % e), t;
        }

        function I() {
          t.HEAP8 = T = new Int8Array(x), t.HEAP16 = new Int16Array(x), t.HEAP32 = S = new Int32Array(x), t.HEAPU8 = O = new Uint8Array(x), t.HEAPU16 = new Uint16Array(x), t.HEAPU32 = new Uint32Array(x), t.HEAPF32 = new Float32Array(x), t.HEAPF64 = new Float64Array(x);
        }

        "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
        var L = 6096,
            k = t.TOTAL_MEMORY || 16777216;

        function M(e) {
          for (; e.length > 0;) {
            var n = e.shift();

            if ("function" != typeof n) {
              var r = n.func;
              "number" == typeof r ? void 0 === n.arg ? t.dynCall_v(r) : t.dynCall_vi(r, n.arg) : r(void 0 === n.arg ? null : n.arg);
            } else n();
          }
        }

        k < 5242880 && y("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + k + "! (TOTAL_STACK=5242880)"), t.buffer ? x = t.buffer : "object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? (m = new WebAssembly.Memory({
          initial: k / 65536
        }), x = m.buffer) : x = new ArrayBuffer(k), I(), S[L >> 2] = 5249232;
        var j = [],
            R = [],
            C = [],
            N = [],
            F = [],
            B = !1;
        Math.abs, Math.ceil, Math.floor, Math.min;
        var U = 0,
            G = null,
            z = null;
        t.preloadedImages = {}, t.preloadedAudios = {};
        var W = "data:application/octet-stream;base64,";

        function V(t) {
          return String.prototype.startsWith ? t.startsWith(W) : 0 === t.indexOf(W);
        }

        var q,
            H = "onnx-wasm.wasm";

        function Y() {
          try {
            if (t.wasmBinary) return new Uint8Array(t.wasmBinary);
            if (t.readBinary) return t.readBinary(H);
            throw "both async and sync fetching of the wasm failed";
          } catch (t) {
            lt(t);
          }
        }

        function X(e) {
          var n = {
            env: e,
            global: {
              NaN: NaN,
              Infinity: 1 / 0
            },
            "global.Math": Math,
            asm2wasm: g
          };

          function r(e, n) {
            var r = e.exports;
            t.asm = r, function (e) {
              if (U--, t.monitorRunDependencies && t.monitorRunDependencies(U), 0 == U && (null !== G && (clearInterval(G), G = null), z)) {
                var n = z;
                z = null, n();
              }
            }();
          }

          if (U++, t.monitorRunDependencies && t.monitorRunDependencies(U), t.instantiateWasm) try {
            return t.instantiateWasm(n, r);
          } catch (t) {
            return y("Module.instantiateWasm callback failed with error: " + t), !1;
          }

          function o(t) {
            r(t.instance);
          }

          function i(e) {
            (t.wasmBinary || !l && !c || "function" != typeof fetch ? new Promise(function (t, e) {
              t(Y());
            }) : fetch(H, {
              credentials: "same-origin"
            }).then(function (t) {
              if (!t.ok) throw "failed to load wasm binary file at '" + H + "'";
              return t.arrayBuffer();
            }).catch(function () {
              return Y();
            })).then(function (t) {
              return WebAssembly.instantiate(t, n);
            }).then(e, function (t) {
              y("failed to asynchronously prepare wasm: " + t), lt(t);
            });
          }

          return t.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || V(H) || "function" != typeof fetch ? i(o) : WebAssembly.instantiateStreaming(fetch(H, {
            credentials: "same-origin"
          }), n).then(o, function (t) {
            y("wasm streaming compile failed: " + t), y("falling back to ArrayBuffer instantiation"), i(o);
          }), {};
        }

        function K() {
          return !!K.uncaught_exception;
        }

        function J(t) {
          try {
            return it(t);
          } catch (t) {}
        }

        V(H) || (q = H, H = t.locateFile ? t.locateFile(q, h) : h + q), t.asm = function (t, e, n) {
          return e.memory = m, e.table = new WebAssembly.Table({
            initial: 41,
            maximum: 41,
            element: "anyfunc"
          }), e.__memory_base = 1024, e.__table_base = 0, X(e);
        };
        var $ = {
          last: 0,
          caught: [],
          infos: {},
          deAdjust: function (t) {
            if (!t || $.infos[t]) return t;

            for (var e in $.infos) for (var n = +e, r = $.infos[n].adjusted, o = r.length, i = 0; i < o; i++) if (r[i] === t) return n;

            return t;
          },
          addRef: function (t) {
            t && $.infos[t].refcount++;
          },
          decRef: function (e) {
            if (e) {
              var n = $.infos[e];
              _(n.refcount > 0), n.refcount--, 0 !== n.refcount || n.rethrown || (n.destructor && t.dynCall_vi(n.destructor, e), delete $.infos[e], J(e));
            }
          },
          clearRef: function (t) {
            t && ($.infos[t].refcount = 0);
          }
        },
            Z = {
          buffers: [null, [], []],
          printChar: function (t, e) {
            var n = Z.buffers[t];
            0 === e || 10 === e ? ((1 === t ? d : y)(A(n, 0)), n.length = 0) : n.push(e);
          },
          varargs: 0,
          get: function (t) {
            return Z.varargs += 4, S[Z.varargs - 4 >> 2];
          },
          getStr: function () {
            return D(Z.get());
          },
          get64: function () {
            var t = Z.get();
            return Z.get(), t;
          },
          getZero: function () {
            Z.get();
          }
        };

        function Q() {
          var e = t._fflush;
          e && e(0);
          var n = Z.buffers;
          n[1].length && Z.printChar(1, 10), n[2].length && Z.printChar(2, 10);
        }

        function tt() {
          return T.length;
        }

        function et(t) {
          t = E(t, 65536);
          var e = x.byteLength;

          try {
            return -1 !== m.grow((t - e) / 65536) ? x = m.buffer : null;
          } catch (t) {
            return null;
          }
        }

        function nt(t) {
          var e = tt();
          if (t > 2147418112) return !1;

          for (var n = Math.max(e, 16777216); n < t;) n = n <= 536870912 ? E(2 * n, 65536) : Math.min(E((3 * n + 2147483648) / 4, 65536), 2147418112);

          var r = et(n);
          return !(!r || r.byteLength != n || (I(), 0));
        }

        N.push(Q);
        var rt = {
          abort: lt,
          setTempRet0: b,
          getTempRet0: function () {
            return v;
          },
          __ZSt18uncaught_exceptionv: K,
          ___assert_fail: function (t, e, n, r) {
            lt("Assertion failed: " + D(t) + ", at: " + [e ? D(e) : "unknown filename", n, r ? D(r) : "unknown function"]);
          },
          ___cxa_allocate_exception: function (t) {
            return at(t);
          },
          ___cxa_find_matching_catch: function e() {
            var n = $.last;
            if (!n) return 0 | (b(0), 0);
            var r = $.infos[n],
                o = r.type;
            if (!o) return 0 | (b(0), n);
            var i = Array.prototype.slice.call(arguments);
            t.___cxa_is_pointer_type(o), e.buffer || (e.buffer = at(4)), S[e.buffer >> 2] = n, n = e.buffer;

            for (var a = 0; a < i.length; a++) if (i[a] && t.___cxa_can_catch(i[a], o, n)) return n = S[n >> 2], r.adjusted.push(n), 0 | (b(i[a]), n);

            return n = S[n >> 2], 0 | (b(o), n);
          },
          ___cxa_free_exception: J,
          ___cxa_throw: function (t, e, n) {
            throw $.infos[t] = {
              ptr: t,
              adjusted: [t],
              type: e,
              destructor: n,
              refcount: 0,
              caught: !1,
              rethrown: !1
            }, $.last = t, "uncaught_exception" in K ? K.uncaught_exception++ : K.uncaught_exception = 1, t;
          },
          ___gxx_personality_v0: function () {},
          ___lock: function () {},
          ___resumeException: function (t) {
            throw $.last || ($.last = t), t;
          },
          ___setErrNo: function (e) {
            return t.___errno_location && (S[t.___errno_location() >> 2] = e), e;
          },
          ___syscall140: function (t, e) {
            Z.varargs = e;

            try {
              var n = Z.getStreamFromFD(),
                  r = (Z.get(), Z.get()),
                  o = Z.get(),
                  i = Z.get(),
                  a = r;
              return FS.llseek(n, a, i), S[o >> 2] = n.position, n.getdents && 0 === a && 0 === i && (n.getdents = null), 0;
            } catch (t) {
              return "undefined" != typeof FS && t instanceof FS.ErrnoError || lt(t), -t.errno;
            }
          },
          ___syscall146: function (t, e) {
            Z.varargs = e;

            try {
              for (var n = Z.get(), r = Z.get(), o = Z.get(), i = 0, a = 0; a < o; a++) {
                for (var u = S[r + 8 * a >> 2], s = S[r + (8 * a + 4) >> 2], l = 0; l < s; l++) Z.printChar(n, O[u + l]);

                i += s;
              }

              return i;
            } catch (t) {
              return "undefined" != typeof FS && t instanceof FS.ErrnoError || lt(t), -t.errno;
            }
          },
          ___syscall54: function (t, e) {
            Z.varargs = e;

            try {
              return 0;
            } catch (t) {
              return "undefined" != typeof FS && t instanceof FS.ErrnoError || lt(t), -t.errno;
            }
          },
          ___syscall6: function (t, e) {
            Z.varargs = e;

            try {
              var n = Z.getStreamFromFD();
              return FS.close(n), 0;
            } catch (t) {
              return "undefined" != typeof FS && t instanceof FS.ErrnoError || lt(t), -t.errno;
            }
          },
          ___unlock: function () {},
          _abort: function () {
            t.abort();
          },
          _emscripten_get_heap_size: tt,
          _emscripten_memcpy_big: function (t, e, n) {
            O.set(O.subarray(e, e + n), t);
          },
          _emscripten_resize_heap: nt,
          _llvm_trap: function () {
            lt("trap!");
          },
          abortOnCannotGrowMemory: function (t) {
            lt("OOM");
          },
          emscripten_realloc_buffer: et,
          flush_NO_FILESYSTEM: Q,
          tempDoublePtr: 6336,
          DYNAMICTOP_PTR: L
        },
            ot = t.asm({}, rt, x);
        t.asm = ot, t.___errno_location = function () {
          return t.asm.___errno_location.apply(null, arguments);
        }, t._add_f32 = function () {
          return t.asm._add_f32.apply(null, arguments);
        }, t._and_u8 = function () {
          return t.asm._and_u8.apply(null, arguments);
        }, t._average_pool_f32 = function () {
          return t.asm._average_pool_f32.apply(null, arguments);
        }, t._batch_normalization_f32 = function () {
          return t.asm._batch_normalization_f32.apply(null, arguments);
        }, t._clip_f32 = function () {
          return t.asm._clip_f32.apply(null, arguments);
        }, t._conv_f32 = function () {
          return t.asm._conv_f32.apply(null, arguments);
        }, t._div_f32 = function () {
          return t.asm._div_f32.apply(null, arguments);
        }, t._emscripten_replace_memory = function () {
          return t.asm._emscripten_replace_memory.apply(null, arguments);
        }, t._fflush = function () {
          return t.asm._fflush.apply(null, arguments);
        };

        var it = t._free = function () {
          return t.asm._free.apply(null, arguments);
        },
            at = (t._gemm_f32 = function () {
          return t.asm._gemm_f32.apply(null, arguments);
        }, t._instance_normalization_f32 = function () {
          return t.asm._instance_normalization_f32.apply(null, arguments);
        }, t._malloc = function () {
          return t.asm._malloc.apply(null, arguments);
        });

        function ut(t) {
          this.name = "ExitStatus", this.message = "Program terminated with exit(" + t + ")", this.status = t;
        }

        function st(e) {
          function n() {
            t.calledRun || (t.calledRun = !0, w || (B || (B = !0, M(R)), M(C), t.onRuntimeInitialized && t.onRuntimeInitialized(), function () {
              if (t.postRun) for ("function" == typeof t.postRun && (t.postRun = [t.postRun]); t.postRun.length;) e = t.postRun.shift(), F.unshift(e);
              var e;
              M(F);
            }()));
          }

          e = e || t.arguments, U > 0 || (function () {
            if (t.preRun) for ("function" == typeof t.preRun && (t.preRun = [t.preRun]); t.preRun.length;) e = t.preRun.shift(), j.unshift(e);
            var e;
            M(j);
          }(), U > 0 || t.calledRun || (t.setStatus ? (t.setStatus("Running..."), setTimeout(function () {
            setTimeout(function () {
              t.setStatus("");
            }, 1), n();
          }, 1)) : n()));
        }

        function lt(e) {
          throw t.onAbort && t.onAbort(e), void 0 !== e ? (d(e), y(e), e = JSON.stringify(e)) : e = "", w = !0, "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.";
        }

        if (t._matmul_f32 = function () {
          return t.asm._matmul_f32.apply(null, arguments);
        }, t._max_pool_f32 = function () {
          return t.asm._max_pool_f32.apply(null, arguments);
        }, t._memcpy = function () {
          return t.asm._memcpy.apply(null, arguments);
        }, t._memset = function () {
          return t.asm._memset.apply(null, arguments);
        }, t._mul_f32 = function () {
          return t.asm._mul_f32.apply(null, arguments);
        }, t._or_u8 = function () {
          return t.asm._or_u8.apply(null, arguments);
        }, t._prelu_f32 = function () {
          return t.asm._prelu_f32.apply(null, arguments);
        }, t._sbrk = function () {
          return t.asm._sbrk.apply(null, arguments);
        }, t._softmax_f32 = function () {
          return t.asm._softmax_f32.apply(null, arguments);
        }, t._sub_f32 = function () {
          return t.asm._sub_f32.apply(null, arguments);
        }, t._sum_f32 = function () {
          return t.asm._sum_f32.apply(null, arguments);
        }, t._xor_u8 = function () {
          return t.asm._xor_u8.apply(null, arguments);
        }, t.establishStackSpace = function () {
          return t.asm.establishStackSpace.apply(null, arguments);
        }, t.stackAlloc = function () {
          return t.asm.stackAlloc.apply(null, arguments);
        }, t.stackRestore = function () {
          return t.asm.stackRestore.apply(null, arguments);
        }, t.stackSave = function () {
          return t.asm.stackSave.apply(null, arguments);
        }, t.dynCall_ii = function () {
          return t.asm.dynCall_ii.apply(null, arguments);
        }, t.dynCall_iiii = function () {
          return t.asm.dynCall_iiii.apply(null, arguments);
        }, t.dynCall_v = function () {
          return t.asm.dynCall_v.apply(null, arguments);
        }, t.dynCall_vi = function () {
          return t.asm.dynCall_vi.apply(null, arguments);
        }, t.dynCall_viiii = function () {
          return t.asm.dynCall_viiii.apply(null, arguments);
        }, t.dynCall_viiiii = function () {
          return t.asm.dynCall_viiiii.apply(null, arguments);
        }, t.dynCall_viiiiii = function () {
          return t.asm.dynCall_viiiiii.apply(null, arguments);
        }, t.asm = ot, t.then = function (e) {
          if (t.calledRun) e(t);else {
            var n = t.onRuntimeInitialized;

            t.onRuntimeInitialized = function () {
              n && n(), e(t);
            };
          }
          return t;
        }, ut.prototype = new Error(), ut.prototype.constructor = ut, z = function e() {
          t.calledRun || st(), t.calledRun || (z = e);
        }, t.run = st, t.abort = lt, t.preInit) for ("function" == typeof t.preInit && (t.preInit = [t.preInit]); t.preInit.length > 0;) t.preInit.pop()();
        return st(), t;
      });
      t.exports = i;
    }).call(this, n(23), "/");
  }, function (t, e, n) {
    (function (t) {
      function n(t, e) {
        for (var n = 0, r = t.length - 1; r >= 0; r--) {
          var o = t[r];
          "." === o ? t.splice(r, 1) : ".." === o ? (t.splice(r, 1), n++) : n && (t.splice(r, 1), n--);
        }

        if (e) for (; n--; n) t.unshift("..");
        return t;
      }

      var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
          o = function (t) {
        return r.exec(t).slice(1);
      };

      function i(t, e) {
        if (t.filter) return t.filter(e);

        for (var n = [], r = 0; r < t.length; r++) e(t[r], r, t) && n.push(t[r]);

        return n;
      }

      e.resolve = function () {
        for (var e = "", r = !1, o = arguments.length - 1; o >= -1 && !r; o--) {
          var a = o >= 0 ? arguments[o] : t.cwd();
          if ("string" != typeof a) throw new TypeError("Arguments to path.resolve must be strings");
          a && (e = a + "/" + e, r = "/" === a.charAt(0));
        }

        return (r ? "/" : "") + (e = n(i(e.split("/"), function (t) {
          return !!t;
        }), !r).join("/")) || ".";
      }, e.normalize = function (t) {
        var r = e.isAbsolute(t),
            o = "/" === a(t, -1);
        return (t = n(i(t.split("/"), function (t) {
          return !!t;
        }), !r).join("/")) || r || (t = "."), t && o && (t += "/"), (r ? "/" : "") + t;
      }, e.isAbsolute = function (t) {
        return "/" === t.charAt(0);
      }, e.join = function () {
        var t = Array.prototype.slice.call(arguments, 0);
        return e.normalize(i(t, function (t, e) {
          if ("string" != typeof t) throw new TypeError("Arguments to path.join must be strings");
          return t;
        }).join("/"));
      }, e.relative = function (t, n) {
        function r(t) {
          for (var e = 0; e < t.length && "" === t[e]; e++);

          for (var n = t.length - 1; n >= 0 && "" === t[n]; n--);

          return e > n ? [] : t.slice(e, n - e + 1);
        }

        t = e.resolve(t).substr(1), n = e.resolve(n).substr(1);

        for (var o = r(t.split("/")), i = r(n.split("/")), a = Math.min(o.length, i.length), u = a, s = 0; s < a; s++) if (o[s] !== i[s]) {
          u = s;
          break;
        }

        var l = [];

        for (s = u; s < o.length; s++) l.push("..");

        return (l = l.concat(i.slice(u))).join("/");
      }, e.sep = "/", e.delimiter = ":", e.dirname = function (t) {
        var e = o(t),
            n = e[0],
            r = e[1];
        return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : ".";
      }, e.basename = function (t, e) {
        var n = o(t)[2];
        return e && n.substr(-1 * e.length) === e && (n = n.substr(0, n.length - e.length)), n;
      }, e.extname = function (t) {
        return o(t)[3];
      };
      var a = "b" === "ab".substr(-1) ? function (t, e, n) {
        return t.substr(e, n);
      } : function (t, e, n) {
        return e < 0 && (e = t.length + e), t.substr(e, n);
      };
    }).call(this, n(23));
  }, function (t, e, n) {
    t.exports = function () {
      return new Worker(n.p + "./onnx-worker.js");
    };
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(11),
        o = n(26),
        i = n(101),
        a = n(102),
        u = function () {
      function t(t, e, n) {
        this.backend = t, this.context = e, this.opResolveRules = n ? a.WASM_OP_RESOLVE_RULES.concat(o.CPU_OP_RESOLVE_RULES) : a.WASM_OP_RESOLVE_RULES;
      }

      return t.prototype.createInferenceHandler = function () {
        return new i.WasmInferenceHandler(this, this.context.profiler);
      }, t.prototype.dispose = function () {}, t.prototype.resolve = function (t, e) {
        var n = r.resolveOperator(t, e, this.opResolveRules);
        return n.initialize(t.attributes), n;
      }, t;
    }();

    e.WasmSessionHandler = u;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t(t, e) {
        this.session = t, this.profiler = e;
      }

      return t.prototype.dispose = function () {}, t;
    }();

    e.WasmInferenceHandler = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = n(103),
        o = n(104),
        i = n(105),
        a = n(106),
        u = n(107),
        s = n(108),
        l = n(109),
        c = n(110),
        f = n(111),
        p = n(112);
    e.WASM_OP_RESOLVE_RULES = [["Add", "", "7+", function () {
      return new o.WasmBinaryOp(["float32"], "Add");
    }], ["And", "", "7+", function () {
      return new o.WasmBinaryOp(["bool"], "And");
    }], ["AveragePool", "", "7+", function () {
      return new c.WasmAveragePool();
    }], ["BatchNormalization", "", "7+", function () {
      return new r.WasmBatchNormalization();
    }], ["Clip", "", "6+", function () {
      return new i.WasmClip();
    }], ["Conv", "", "1+", function () {
      return new a.WasmConv();
    }], ["Div", "", "7+", function () {
      return new o.WasmBinaryOp(["float32"], "Div");
    }], ["Gemm", "", "7+", function () {
      return new u.WasmGemm();
    }], ["GlobalAveragePool", "", "1+", function () {
      return new c.WasmGlobalAveragePool();
    }], ["GlobalMaxPool", "", "1+", function () {
      return new c.WasmGlobalMaxPool();
    }], ["InstanceNormalization", "", "6+", function () {
      return new s.WasmInstanceNormalization();
    }], ["MatMul", "", "1+", function () {
      return new l.WasmMatMul();
    }], ["MaxPool", "", "1+", function () {
      return new c.WasmMaxPool();
    }], ["Mul", "", "7+", function () {
      return new o.WasmBinaryOp(["float32"], "Mul");
    }], ["Or", "", "7+", function () {
      return new o.WasmBinaryOp(["bool"], "Or");
    }], ["PRelu", "", "7+", function () {
      return new o.WasmBinaryOp(["float32"], "PRelu");
    }], ["Softmax", "", "1+", function () {
      return new f.WasmSoftmax();
    }], ["Sub", "", "7+", function () {
      return new o.WasmBinaryOp(["float32"], "Sub");
    }], ["Sum", "", "6+", function () {
      return new p.WasmSum();
    }], ["Xor", "", "7+", function () {
      return new o.WasmBinaryOp(["bool"], "Xor");
    }]];
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(14),
        a = n(1),
        u = n(4),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        for (var n = e[0], r = e[1], o = e[2], i = e[3], s = e[4], l = 1, c = 2; c < n.dims.length; c++) l *= n.dims[c];

        var f = new a.Tensor(n.dims, n.type);
        return u.WasmBinding.getInstance().ccall("_batch_normalization_f32", [n.floatData, "float32ptr"], [f.floatData, "float32ptr", "out"], [n.dims[0], "int32"], [n.dims[1], "int32"], [l, "int32"], [r.floatData, "float32ptr"], [o.floatData, "float32ptr"], [i.floatData, "float32ptr"], [s.floatData, "float32ptr"], [this.epsilon, "float32"]), [f];
      }, e.prototype.checkInputTypes = function (t) {
        var e = t[0],
            n = t[1],
            r = t[2],
            o = t[3],
            i = t[4];
        return !(e.dims.length < 3 || 1 !== n.dims.length || 1 !== r.dims.length || 1 !== o.dims.length || 1 !== i.dims.length) && n.dims[0] === e.dims[1] && r.dims[0] === e.dims[1] && o.dims[0] === e.dims[1] && i.dims[0] === e.dims[1] && "float32" === e.type && "float32" === n.type && "float32" === r.type && "float32" === o.type && "float32" === i.type;
      }, e;
    }(i.BatchNormalization);

    e.WasmBatchNormalization = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(15),
        a = n(1),
        u = n(0),
        s = n(4),
        l = function (t) {
      function e(e, n, r) {
        return t.call(this, e, n, r) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = u.BroadcastUtil.calcShape(e[0].dims, e[1].dims, !1);
        if (!n) throw new Error("not broadcastable");
        var r,
            o = "",
            i = "";

        switch (this.opType) {
          case "Add":
            "float32" === e[0].type && (o = "_add_f32", i = "float32InFloat32Out");
            break;

          case "Sub":
            "float32" === e[0].type && (o = "_sub_f32", i = "float32InFloat32Out");
            break;

          case "Mul":
            "float32" === e[0].type && (o = "_mul_f32", i = "float32InFloat32Out");
            break;

          case "Div":
            "float32" === e[0].type && (o = "_div_f32", i = "float32InFloat32Out");
            break;

          case "PRelu":
            "float32" === e[0].type && (o = "_prelu_f32", i = "float32InFloat32Out");
            break;

          case "Xor":
            o = "_xor_u8", i = "boolInBoolOut";
            break;

          case "Or":
            o = "_or_u8", i = "boolInBoolOut";
            break;

          case "And":
            o = "_and_u8", i = "boolInBoolOut";
            break;

          default:
            throw Error("unsupported binary op by the Wasm backend");
        }

        if ("float32InFloat32Out" === i) r = new a.Tensor(n, "float32"), s.WasmBinding.getInstance().ccall(o, [e[0].floatData, "float32ptr"], [e[0].dims.length, "int32"], [e[0].dims, "int32ptr"], [e[1].floatData, "float32ptr"], [e[1].dims.length, "int32"], [e[1].dims, "int32ptr"], [r.floatData, "float32ptr", "out"], [r.floatData.length, "int32"], [n.length, "int32"], [n, "int32ptr"]);else {
          if ("boolInBoolOut" !== i) throw new Error("Unsupported binary op format. Probably unsupported data types.");
          r = new a.Tensor(n, "bool"), s.WasmBinding.getInstance().ccall(o, [e[0].integerData, "boolptr"], [e[0].dims.length, "int32"], [e[0].dims, "int32ptr"], [e[1].integerData, "boolptr"], [e[1].dims.length, "int32"], [e[1].dims, "int32ptr"], [r.integerData, "boolptr", "out"], [r.integerData.length, "int32"], [n.length, "int32"], [n, "int32ptr"]);
        }
        return [r];
      }, e;
    }(i.BinaryOp);

    e.WasmBinaryOp = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(45),
        a = n(1),
        u = n(4),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = new a.Tensor(e[0].dims, e[0].type),
            r = n.floatData.length;
        if ("float32" !== e[0].type) throw new Error("Unsupported input type for Clip operator.");
        return u.WasmBinding.getInstance().ccall("_clip_f32", [e[0].floatData, "float32ptr"], [n.floatData, "float32ptr", "out"], [r, "int32"], [this.min, "float32"], [this.max, "float32"]), [n];
      }, e.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type;
      }, e;
    }(i.Clip);

    e.WasmClip = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__awaiter || function (t, e, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            i(t);
          }
        }

        function u(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            i(t);
          }
        }

        function s(t) {
          t.done ? o(t.value) : new n(function (e) {
            e(t.value);
          }).then(a, u);
        }

        s((r = r.apply(t, e || [])).next());
      });
    },
        a = this && this.__generator || function (t, e) {
      var n,
          r,
          o,
          i,
          a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      };
      return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this;
      }), i;

      function u(i) {
        return function (u) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");

            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return a.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;

                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break;
                  }

                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break;
                  }

                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break;
                  }

                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }

              i = e.call(t, a);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }

            if (5 & i[0]) throw i[1];
            return {
              value: i[0] ? i[1] : void 0,
              done: !0
            };
          }([i, u]);
        };
      }
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(16),
        s = n(1),
        l = n(0),
        c = n(4),
        f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return i(this, void 0, void 0, function () {
          var t, n, r, o, i, u, f, p, h, d, y, g, m, v, b, w, _, x;

          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (t = e[0], n = e[1], r = 3 === e.length ? e[2] : void 0, 0 === this.kernelShape.length) for (o = e[1].dims, x = 2; x < o.length; ++x) this.kernelShape.push(o[x]);
                return i = l.PoolConvUtil.computeConvOutputShape(t.dims, n.dims, this.strides, this.dilations, this.kernelShape, this.pads, this.autoPad), u = new s.Tensor(i, t.type), 1 !== (f = function (t, e, n, r) {
                  if (1 !== t || 1 !== e || 1 === n || r <= 0) return 1;
                  return Math.min(n, r + 1);
                }(t.dims[0], this.group, n.dims[0], c.WasmBinding.workerNumber)) ? [3, 1] : (c.WasmBinding.getInstance().ccall("_conv_f32", [t.floatData, "float32ptr"], [t.dims, "int32ptr"], [n.floatData, "float32ptr"], [n.dims, "int32ptr"], [u.floatData, "float32ptr", "out"], [u.dims, "int32ptr"], [r ? r.floatData : null, "float32ptr"], [this.dilations, "int32ptr"], [this.group, "int32"], [this.pads, "int32ptr"], [this.strides, "int32ptr"]), [2, [u]]);

              case 1:
                for ((p = n.dims.slice(0))[0] = Math.floor(n.dims[0] / f), h = p[0] * p[1] * p[2] * p[3], (d = n.dims.slice(0))[0] = n.dims[0] - (f - 1) * p[0], y = [1, p[0], i[2], i[3]], g = p[0] * i[2] * i[3], m = [1, d[0], i[2], i[3]], v = new Array(f), b = new Array(f), w = new Array(f), _ = new Array(f - 1), x = 0; x < f; ++x) x !== f - 1 ? (v[x] = n.floatData.subarray(x * h, (x + 1) * h), b[x] = u.floatData.subarray(x * g, (x + 1) * g), r && (w[x] = r.floatData.subarray(x * p[0], (x + 1) * p[0])), _[x] = c.WasmBinding.getInstance().ccallRemote(x, "_conv_f32", [t.floatData, "float32ptr"], [t.dims, "int32ptr"], [v[x], "float32ptr"], [p, "int32ptr"], [b[x], "float32ptr", "out"], [y, "int32ptr"], [w.length > 0 ? w[x] : null, "float32ptr"], [this.dilations, "int32ptr"], [this.group, "int32"], [this.pads, "int32ptr"], [this.strides, "int32ptr"])) : (v[x] = n.floatData.subarray(x * h), b[x] = u.floatData.subarray(x * g), r && (w[x] = r.floatData.subarray(x * p[0])), c.WasmBinding.getInstance().ccall("_conv_f32", [t.floatData, "float32ptr"], [t.dims, "int32ptr"], [v[x], "float32ptr"], [d, "int32ptr"], [b[x], "float32ptr", "out"], [m, "int32ptr"], [w.length > 0 ? w[x] : null, "float32ptr"], [this.dilations, "int32ptr"], [this.group, "int32"], [this.pads, "int32ptr"], [this.strides, "int32ptr"]));

                return [4, Promise.all(_)];

              case 2:
                return a.sent(), [2, [u]];
            }
          });
        });
      }, e.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type && "float32" === t[1].type && (3 !== t.length || "float32" === t[2].type);
      }, e;
    }(u.Conv);

    e.WasmConv = f;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(19),
        u = n(1),
        s = n(0),
        l = n(4),
        c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = e[0],
            r = e[1],
            o = e[2],
            a = i(s.GemmUtil.getShapeOfGemmResult(n.dims, this.transA, r.dims, this.transB, o.dims), 2),
            c = a[0],
            f = a[1],
            p = new u.Tensor([c, f], n.type);
        if (!s.BroadcastUtil.calc(p, o, function (t, e) {
          return e;
        }, !0)) throw new Error("c is not broadcastable to the shape of the result of the Gemm operator");
        return l.WasmBinding.getInstance().ccall("_gemm_f32", [this.transA, "bool"], [this.transB, "bool"], [this.transA ? n.dims[1] : n.dims[0], "int32"], [this.transB ? r.dims[0] : r.dims[1], "int32"], [this.transA ? n.dims[0] : n.dims[1], "int32"], [this.alpha, "float32"], [n.floatData, "float32ptr"], [r.floatData, "float32ptr"], [this.beta, "float32"], [p.floatData, "float32ptr", "inout"]), [p];
      }, e.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type && "float32" === t[1].type && "float32" === t[2].type && t[0].type === t[1].type && t[0].type === t[2].type;
      }, e;
    }(a.Gemm);

    e.WasmGemm = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(34),
        a = n(1),
        u = n(4),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        for (var n = e[0], r = e[1], o = e[2], i = 1, s = 2; s < n.dims.length; s++) i *= n.dims[s];

        var l = new a.Tensor(n.dims, n.type);
        return u.WasmBinding.getInstance().ccall("_instance_normalization_f32", [n.floatData, "float32ptr"], [l.floatData, "float32ptr", "out"], [n.dims[0], "int32"], [n.dims[1], "int32"], [i, "int32"], [r.floatData, "float32ptr"], [o.floatData, "float32ptr"], [this.epsilon, "float32"]), [l];
      }, e.prototype.checkInputTypes = function (t) {
        var e = t[0],
            n = t[1],
            r = t[2];
        return !(e.dims.length < 3 || 1 !== n.dims.length || 1 !== r.dims.length) && n.dims[0] === e.dims[1] && r.dims[0] === e.dims[1] && "float32" === e.type && "float32" === n.type && "float32" === r.type;
      }, e;
    }(i.InstanceNormalization);

    e.WasmInstanceNormalization = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(18),
        u = n(1),
        s = n(0),
        l = n(4),
        c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = i(s.MatMulUtil.preprocessInputShapes(e[0].dims, e[1].dims), 2),
            r = n[0],
            o = n[1],
            a = s.BroadcastUtil.calcShape(r, o, !0);
        if (!a) throw new Error("input dimensions do not match the requirement");
        var c = s.ShapeUtil.size(a),
            f = new Float32Array(c);
        l.WasmBinding.getInstance().ccall("_matmul_f32", [e[0].floatData, "float32ptr"], [e[0].dims, "int32ptr"], [e[0].dims.length, "int32"], [e[1].floatData, "float32ptr"], [e[1].dims, "int32ptr"], [e[1].dims.length, "int32"], [f, "float32ptr", "out"], [f.length, "int32"], [a, "int32ptr"], [a.length, "int32"]), s.MatMulUtil.postprocessOutputShape(a, e[0].dims.length, e[1].dims.length);
        var p = new u.Tensor(a, e[0].type);
        return p.floatData.set(f), [p];
      }, e.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type && "float32" === t[1].type && t[0].type === t[1].type;
      }, e;
    }(a.MatMul);

    e.WasmMatMul = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__awaiter || function (t, e, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            i(t);
          }
        }

        function u(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            i(t);
          }
        }

        function s(t) {
          t.done ? o(t.value) : new n(function (e) {
            e(t.value);
          }).then(a, u);
        }

        s((r = r.apply(t, e || [])).next());
      });
    },
        a = this && this.__generator || function (t, e) {
      var n,
          r,
          o,
          i,
          a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      };
      return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this;
      }), i;

      function u(i) {
        return function (u) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");

            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return a.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;

                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break;
                  }

                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break;
                  }

                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break;
                  }

                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }

              i = e.call(t, a);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }

            if (5 & i[0]) throw i[1];
            return {
              value: i[0] ? i[1] : void 0,
              done: !0
            };
          }([i, u]);
        };
      }
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(20),
        s = n(1),
        l = n(0),
        c = n(4),
        f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.checkInputTypes = function (t) {
        return y(t);
      }, e.prototype.run = function (t, e) {
        return i(this, void 0, void 0, function () {
          return a(this, function (t) {
            return [2, g(e[0], this.autoPad, this.countIncludePad, this.kernelShape, this.pads, this.strides)];
          });
        });
      }, e;
    }(u.AveragePool);

    e.WasmAveragePool = f;

    var p = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.checkInputTypes = function (t) {
        return y(t);
      }, e.prototype.run = function (t, e) {
        return i(this, void 0, void 0, function () {
          return a(this, function (t) {
            return [2, m(e[0])];
          });
        });
      }, e;
    }(u.GlobalAveragePool);

    e.WasmGlobalAveragePool = p;

    var h = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.checkInputTypes = function (t) {
        return y(t);
      }, e.prototype.run = function (t, e) {
        return i(this, void 0, void 0, function () {
          return a(this, function (t) {
            return [2, v(e[0], this.autoPad, this.kernelShape, this.pads, this.strides)];
          });
        });
      }, e;
    }(u.MaxPool);

    e.WasmMaxPool = h;

    var d = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.checkInputTypes = function (t) {
        return y(t);
      }, e.prototype.run = function (t, e) {
        return i(this, void 0, void 0, function () {
          return a(this, function (t) {
            return [2, b(e[0])];
          });
        });
      }, e;
    }(u.GlobalMaxPool);

    function y(t) {
      return "float32" === t[0].type;
    }

    function g(t, e, n, r, o, u) {
      return i(this, void 0, void 0, function () {
        return a(this, function (i) {
          return [2, w(!1, 1, t, e, n, r, o, u)];
        });
      });
    }

    function m(t) {
      return i(this, void 0, void 0, function () {
        return a(this, function (e) {
          return [2, w(!0, 1, t, "NOTSET", !1, [], [], [])];
        });
      });
    }

    function v(t, e, n, r, o) {
      return i(this, void 0, void 0, function () {
        return a(this, function (i) {
          return [2, w(!1, 2, t, e, !1, n, r, o)];
        });
      });
    }

    function b(t) {
      return i(this, void 0, void 0, function () {
        return a(this, function (e) {
          return [2, w(!0, 2, t, "NOTSET", !1, [], [], [])];
        });
      });
    }

    function w(t, e, n, r, o, u, f, p) {
      return i(this, void 0, void 0, function () {
        var i, h, d, y, g, m, v, b, w, _, x, T, O, S;

        return a(this, function (a) {
          switch (a.label) {
            case 0:
              switch (i = "", e) {
                case 1:
                  i = "_average_pool_f32";
                  break;

                case 2:
                  i = "_max_pool_f32";
                  break;

                default:
                  throw new Error("unknown pool type");
              }

              return l.PoolConvUtil.adjustPoolAttributes(t, n.dims, u, p, f), h = l.PoolConvUtil.computePoolOutputShape(t, n.dims, p, u, f, r), d = new s.Tensor(h, n.type), 1 !== (y = function (t, e, n) {
                if (1 !== t || 1 === e || n <= 0) return 1;
                return Math.min(e, n + 1);
              }(n.dims[0], n.dims[1], c.WasmBinding.workerNumber)) ? [3, 1] : (c.WasmBinding.getInstance().ccall(i, [u.length, "int32"], [t, "bool"], [n.floatData, "float32ptr"], [n.dims, "int32ptr"], [d.floatData, "float32ptr", "out"], [d.dims, "int32ptr"], [u, "int32ptr"], [f, "int32ptr"], [p, "int32ptr"], [o, "bool"]), [3, 3]);

            case 1:
              for ((g = n.dims.slice(0))[1] = Math.floor(n.dims[1] / y), m = l.ShapeUtil.size(g), (v = n.dims.slice(0))[1] = n.dims[1] - (y - 1) * g[1], (b = h.slice(0))[1] = g[1], w = l.ShapeUtil.size(b), (_ = h.slice(0))[1] = v[1], x = new Array(y - 1), T = n.floatData, O = d.floatData, S = 0; S < y; ++S) S !== y - 1 ? x[S] = c.WasmBinding.getInstance().ccallRemote(S, i, [u.length, "int32"], [t, "bool"], [T.subarray(S * m, (S + 1) * m), "float32ptr"], [g, "int32ptr"], [O.subarray(S * w, (S + 1) * w), "float32ptr", "out"], [b, "int32ptr"], [u, "int32ptr"], [f, "int32ptr"], [p, "int32ptr"], [o, "bool"]) : c.WasmBinding.getInstance().ccall(i, [u.length, "int32"], [t, "bool"], [T.subarray((y - 1) * m), "float32ptr"], [v, "int32ptr"], [O.subarray((y - 1) * w), "float32ptr", "out"], [_, "int32ptr"], [u, "int32ptr"], [f, "int32ptr"], [p, "int32ptr"], [o, "bool"]);

              return [4, Promise.all(x)];

            case 2:
              a.sent(), a.label = 3;

            case 3:
              return [2, [d]];
          }
        });
      });
    }

    e.WasmGlobalMaxPool = d;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(21),
        a = n(1),
        u = n(0),
        s = n(4),
        l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = e[0],
            r = u.ShapeUtil.parseAxis(this.axis, n.dims.length),
            o = u.ShapeUtil.sizeToDimension(n.dims, r),
            i = u.ShapeUtil.sizeFromDimension(n.dims, r),
            l = new a.Tensor(n.dims, n.type);
        return s.WasmBinding.getInstance().ccall("_softmax_f32", [n.floatData, "float32ptr"], [l.floatData, "float32ptr", "out"], [o, "int32"], [i, "int32"]), [l];
      }, e.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type;
      }, e;
    }(i.Softmax);

    e.WasmSoftmax = l;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        a = this && this.__spread || function () {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(i(arguments[e]));

      return t;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(22),
        s = n(1),
        l = n(4),
        c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        for (var n, r = new s.Tensor(e[0].dims, e[0].type), o = e[0].floatData.length, i = new Array(e.length), u = 0; u < e.length; u++) i[u] = [e[u].floatData, "float32ptr"];

        return (n = l.WasmBinding.getInstance()).ccall.apply(n, a(["_sum_f32", [e.length, "int32"], [o, "int32"], [r.floatData, "float32ptr", "inout"]], i)), [r];
      }, e.prototype.checkInputTypes = function (t) {
        if ("float32" !== t[0].type) return !1;

        for (var e = 1; e < t.length; e++) if (t[0].type !== t[e].type) return !1;

        return !0;
      }, e;
    }(u.Sum);

    e.WasmSum = c;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(3),
        o = n(114),
        i = n(160),
        a = function () {
      function t() {}

      return t.prototype.initialize = function () {
        try {
          return this.glContext = i.createWebGLContext(this.contextId), "number" != typeof this.matmulMaxBatchSize && (this.matmulMaxBatchSize = 16), "string" != typeof this.textureCacheMode && (this.textureCacheMode = "full"), r.Logger.verbose("WebGLBackend", "Created WebGLContext: " + typeof this.glContext), !0;
        } catch (t) {
          return r.Logger.warning("WebGLBackend", "Unable to initialize WebGLBackend. " + t), !1;
        }
      }, t.prototype.createSessionHandler = function (t) {
        return new o.WebGLSessionHandler(this, t);
      }, t.prototype.dispose = function () {
        this.glContext.dispose();
      }, t;
    }();

    e.WebGLBackend = a;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(3),
        o = n(11),
        i = n(115),
        a = n(117),
        u = n(147),
        s = n(158),
        l = n(159),
        c = function () {
      function t(t, e) {
        this.backend = t, this.context = e, this.programManager = new u.ProgramManager(this.context.profiler, t.glContext), this.layoutStrategy = new s.AlwaysKeepOriginalSizeStrategy(t.glContext.maxTextureSize), this.textureManager = new l.TextureManager(t.glContext, this.layoutStrategy, this.context.profiler, {
          reuseTextures: "full" === t.textureCacheMode
        }), this.textureDataCache = new Map();
      }

      return t.prototype.createInferenceHandler = function () {
        return new i.WebGLInferenceHandler(this);
      }, t.prototype.onGraphInitialized = function (t) {
        var e = t.getValues().filter(function (t) {
          return -1 === t.from && t.tensor;
        }).map(function (t) {
          return t.tensor.dataId;
        });
        this.initializers = new Set(e);
      }, t.prototype.isInitializer = function (t) {
        return !!this.initializers && this.initializers.has(t);
      }, t.prototype.getTextureData = function (t) {
        return this.textureDataCache.get(t);
      }, t.prototype.setTextureData = function (t, e) {
        r.Logger.verbose("WebGLSessionHandler", "Storing Texture data in cache"), this.textureDataCache.set(t, e);
      }, t.prototype.dispose = function () {
        var t = this;
        this.programManager.dispose(), this.textureManager.clearActiveTextures(), this.textureDataCache.forEach(function (e) {
          return t.textureManager.releaseTexture(e, !0);
        }), this.textureDataCache = new Map();
      }, t.prototype.resolve = function (t, e) {
        var n = o.resolveOperator(t, e, a.WEBGL_OP_RESOLVE_RULES);
        return n.initialize(t.attributes), n;
      }, t;
    }();

    e.WebGLSessionHandler = c;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__assign || function () {
      return (r = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    },
        o = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(3),
        a = n(1),
        u = n(0),
        s = n(116),
        l = n(46),
        c = function () {
      function t(t) {
        this.session = t, this.textureDataCache = new Map();
      }

      return t.prototype.run = function (t, e) {
        var n = this.session.programManager.getArtifact(t);

        if (!n) {
          var r = t.createProgramInfo(this, e);
          n = this.session.programManager.build(r), this.session.programManager.setArtifact(t, n);
        }

        var o = t.createRunData(this, n.programInfo, e);
        return this.session.programManager.run(n, o), [o.outputTextureData.tensor];
      }, t.prototype.getOrCreateTextureData = function (t, e) {
        var n = this.getTextureData(t.dataId);
        return n ? i.Logger.verbose("InferenceHandler", "Retrieving TextureData from cache: [" + t.dims + "]") : (i.Logger.verbose("InferenceHandler", "Creating new TextureData for dims: [" + t.dims + "]"), e || (e = this.createTextureLayoutFromShape(t.dims.slice())), n = this.createTextureData(e, t.type, t.numberData, t, 1)), n;
      }, t.prototype.createTextureDataFromLayout = function (t, e) {
        return this.createTextureData(t, e);
      }, t.prototype.createTextureDataFromLayoutBindTensor = function (t, e, n, r) {
        return this.createTextureData(t, e, n, r, 1);
      }, t.prototype.createTextureData = function (t, e, n, r, o) {
        i.Logger.verbose("InferenceHandler", "Creating TextureData: layout:[" + JSON.stringify(t) + "]");
        var a = this.session.textureManager.createTextureFromLayout(e, t, n, o);
        return this.createTextureDataFromTexture(t, e, a, r);
      }, t.prototype.createSharedTextureData = function (t, e, n, r) {
        return this.createTextureDataFromTexture(t, e, n, void 0, r);
      }, t.prototype.createTextureDataFromTexture = function (t, e, n, o, i) {
        var u = this,
            s = r({}, t, {
          tensor: o || new a.Tensor(t.unpackedShape, e, function (t) {
            return u.readTexture(s);
          }, void 0, void 0, i),
          texture: n
        });
        return this.setTextureData(s.tensor.dataId, s), s;
      }, t.prototype.getTextureData = function (t) {
        return this.session.isInitializer(t) ? this.session.getTextureData(t) : this.textureDataCache.get(t);
      }, t.prototype.setTextureData = function (t, e) {
        this.session.isInitializer(t) ? this.session.setTextureData(t, e) : this.textureDataCache.set(t, e);
      }, t.prototype.getOrCreateTextureLayout = function (t, e, n) {
        void 0 === e && (e = 1);
        var r = this.getTextureData(t.dataId);
        return r || this.createTextureLayoutFromShape(1 === e ? t.dims.slice() : l.getPackedShape(t.dims.slice()), e, n);
      }, t.prototype.createTextureLayoutFromShape = function (t, e, n, r) {
        void 0 === e && (e = 1);
        var i = o(this.session.layoutStrategy.computeTextureWH(t, r), 2),
            a = i[0],
            s = i[1],
            l = t;
        if (0 === t.length && (l = [1]), 1 === e) n = t;else if (!n) throw new Error("Unpacked shape is needed when using channels > 1");
        return {
          width: a,
          height: s,
          channels: e || 1,
          shape: l,
          strides: u.ShapeUtil.computeStrides(l),
          unpackedShape: n
        };
      }, t.prototype.dispose = function () {
        var t = this;
        this.session.textureManager.clearActiveTextures(), this.textureDataCache.forEach(function (e) {
          return t.session.textureManager.releaseTexture(e);
        }), this.textureDataCache = new Map();
      }, t.prototype.readTexture = function (t) {
        if (!this.session.backend.glContext.isFloat32DownloadSupported) {
          var e = new s.WebGLUint8Encode().runInternal(this, t);
          return this.session.textureManager.readUint8TextureAsFloat(e);
        }

        return this.session.textureManager.readTexture(t, t.tensor.type, t.channels);
      }, t;
    }();

    e.WebGLInferenceHandler = c;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = n(0),
        i = n(2),
        a = function () {
      function t() {}

      return t.prototype.runInternal = function (t, e) {
        var n = e.shape,
            a = r(t.session.layoutStrategy.computeTextureWH(e.shape), 2),
            u = {
          width: a[0],
          height: a[1],
          channels: 4,
          shape: n,
          strides: o.ShapeUtil.computeStrides(n),
          unpackedShape: n
        },
            s = i.getGlsl(t.session.backend.glContext.version),
            l = {
          inputLayouts: [e],
          outputLayout: u,
          samplers: ["X"],
          shaderSource: "\n      const float FLOAT_MAX = 1.70141184e38;\n      const float FLOAT_MIN = 1.17549435e-38;\n\n      bool isNaN(float val) {\n        return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;\n      }\n\n      highp vec4 encodeAsUint8(highp float v) {\n        if (isNaN(v)) {\n          return vec4(255, 255, 255, 255);\n        }\n\n        highp float av = abs(v);\n\n        if(av < FLOAT_MIN) {\n          return vec4(0.0, 0.0, 0.0, 0.0);\n        } else if(v > FLOAT_MAX) {\n          return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;\n        } else if(v < -FLOAT_MAX) {\n          return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;\n        }\n\n        highp vec4 c = vec4(0,0,0,0);\n\n        highp float e = floor(log2(av));\n        highp float m = exp2(fract(log2(av))) - 1.0;\n\n        c[2] = floor(128.0 * m);\n        m -= c[2] / 128.0;\n        c[1] = floor(32768.0 * m);\n        m -= c[1] / 32768.0;\n        c[0] = floor(8388608.0 * m);\n\n        highp float ebias = e + 127.0;\n        c[3] = floor(ebias / 2.0);\n        ebias -= c[3] * 2.0;\n        c[2] += floor(ebias) * 128.0;\n\n        c[3] += 128.0 * step(0.0, -v);\n\n        return c / 255.0;\n      }\n\n      void main() {\n        float value = " + s.texture2D + "(X,TexCoords).r;\n        " + s.output + " = encodeAsUint8(value);\n      }",
          hasMain: !0
        },
            c = t.session.programManager.build(l),
            f = t.session.backend.glContext.getEncoder("byte", 4),
            p = t.session.backend.glContext.allocateTexture(u.width, u.height, f),
            h = {
          inputTextureDatas: [e],
          outputTextureData: t.createSharedTextureData(u, "uint8", p, {}),
          uniformData: {}
        };
        return t.session.programManager.run(c, h), h.outputTextureData;
      }, t;
    }();

    e.WebGLUint8Encode = a;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = n(7),
        i = n(118),
        a = r(n(119)),
        u = n(120),
        s = n(121),
        l = n(122),
        c = n(123),
        f = n(124),
        p = n(126),
        h = n(127),
        d = n(128),
        y = n(129),
        g = n(130),
        m = n(132),
        v = n(133),
        b = n(135),
        w = r(n(136)),
        _ = n(10),
        x = n(137),
        T = n(138),
        O = n(139),
        S = n(141),
        P = n(142),
        A = n(143),
        D = n(144),
        E = r(n(145)),
        I = n(146);

    e.WEBGL_OP_RESOLVE_RULES = [["Abs", "", "6+", function () {
      return new E.WebGLUnaryOp(o.NUMBER_TYPES, E.glslAbs());
    }], ["Acos", "", "7+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslAcos());
    }], ["Add", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslAdd());
    }], ["And", "", "7+", function () {
      return new a.WebGLBinaryOp(["bool"], a.glslAnd());
    }], ["Asin", "", "7+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslAsin());
    }], ["Atan", "", "7+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslAtan());
    }], ["AveragePool", "", "7+", function () {
      return new b.WebGLAveragePool();
    }], ["BatchNormalization", "", "7+", function () {
      return new i.WebGLBatchNormalization();
    }], ["Ceil", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslCeil());
    }], ["Clip", "", "6+", function () {
      return new u.WebGLClip();
    }], ["Concat", "", "4+", function () {
      return new s.WebGLConcat();
    }], ["Conv", "", "1+", function () {
      return new l.WebGLConv();
    }], ["Cos", "", "7+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslCos());
    }], ["Div", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslDiv());
    }], ["Dropout", "", "7+", function () {
      return new c.WebGLDropout();
    }], ["Equal", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslEqual(), void 0, "bool");
    }], ["Elu", "", "6+", function () {
      return new f.WebGLElu();
    }], ["Exp", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslExp());
    }], ["Flatten", "", "1+", function () {
      return new p.WebGLFlatten();
    }], ["Floor", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslFloor());
    }], ["Gather", "", "1+", function () {
      return new h.WebGLGather();
    }], ["Gemm", "", "7+", function () {
      return new d.WebGLGemm();
    }], ["GlobalAveragePool", "", "1+", function () {
      return new b.WebGLGlobalAveragePool();
    }], ["GlobalMaxPool", "", "1+", function () {
      return new b.WebGLGlobalMaxPool();
    }], ["Greater", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslGreater(), void 0, "bool");
    }], ["Identity", "", "1+", function () {
      return new E.WebGLUnaryOp(o.NUMBER_TYPES, E.glslIdentity());
    }], ["ImageScaler", "", "1+", function () {
      return new y.WebGLImageScaler();
    }], ["LeakyRelu", "", "6+", function () {
      return new g.WebGLLeakyRelu();
    }], ["Less", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslLess(), void 0, "bool");
    }], ["Log", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslLog());
    }], ["MatMul", "", "1+", function () {
      return new m.WebGLMatMul();
    }], ["MaxPool", "", "1+", function () {
      return new b.WebGLMaxPool();
    }], ["Mul", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslMul());
    }], ["Neg", "", "6+", function () {
      return new E.WebGLUnaryOp(o.NUMBER_TYPES, E.glslNeg());
    }], ["Not", "", "1+", function () {
      return new E.WebGLUnaryOp(["bool"], E.glslNot());
    }], ["Or", "", "7+", function () {
      return new a.WebGLBinaryOp(["bool"], a.glslOr());
    }], ["Pad", "", "2+", function () {
      return new v.WebGLPad();
    }], ["Pow", "", "7+", function () {
      return new a.WebGLBinaryOp(o.FLOAT_TYPES, a.glslPow());
    }], ["PRelu", "", "7+", function () {
      return new a.WebGLBinaryOp(o.FLOAT_TYPES, a.glslPRelu());
    }], ["ReduceLogSum", "", "1+", function () {
      return new w.WebGLReduceLogSum();
    }], ["ReduceMax", "", "1+", function () {
      return new w.WebGLReduceMax();
    }], ["ReduceMean", "", "1+", function () {
      return new w.WebGLReduceMean();
    }], ["ReduceMin", "", "1+", function () {
      return new w.WebGLReduceMin();
    }], ["ReduceProd", "", "1+", function () {
      return new w.WebGLReduceProd();
    }], ["ReduceSum", "", "1+", function () {
      return new w.WebGLReduceSum();
    }], ["ReduceSumSquare", "", "1+", function () {
      return new w.WebGLReduceSumSquare();
    }], ["Relu", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslRelu());
    }], ["Reshape", "", "5+", function () {
      return new _.WebGLReshape();
    }], ["Sigmoid", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslSigmoid());
    }], ["Sin", "", "7+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslSin());
    }], ["Slice", "", "10+", function () {
      return new x.WebGLSliceV10();
    }], ["Slice", "", "1-9", function () {
      return new x.WebGLSlice();
    }], ["Softmax", "", "1+", function () {
      return new T.WebGLSoftmax();
    }], ["Split", "", "2+", function (t) {
      return new O.WebGLSplit(t.outputs.length);
    }], ["Sqrt", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslSqrt());
    }], ["Squeeze", "", "1+", function () {
      return new S.WebGLSqueeze();
    }], ["Sub", "", "7+", function () {
      return new a.WebGLBinaryOp(o.NUMBER_TYPES, a.glslSub());
    }], ["Sum", "", "6+", function () {
      return new P.WebGLSum();
    }], ["Tan", "", "7+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslTan());
    }], ["Tanh", "", "6+", function () {
      return new E.WebGLUnaryOp(o.FLOAT_TYPES, E.glslTanh());
    }], ["Tile", "", "6+", function () {
      return new A.WebGLTile();
    }], ["Transpose", "", "1+", function () {
      return new D.WebGLTranspose();
    }], ["Unsqueeze", "", "1+", function () {
      return new I.WebGLUnsqueeze();
    }], ["Xor", "", "7+", function () {
      return new a.WebGLBinaryOp(["bool"], a.glslXor());
    }]];
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(14),
        a = n(2),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e.map(function (e) {
          return t.getOrCreateTextureLayout(e);
        }),
            r = e[0].dims.slice(),
            o = r.length,
            i = n[1],
            u = a.getGlsl(t.session.backend.glContext.version),
            s = "\n      float process(int[" + o + "] indices) {\n        vec2 position = offsetToCoords(indices[1], " + i.width + ", " + i.height + ");\n        float scale = getColorAsFloat(" + u.texture2D + "(Scale, position));\n        float mean = getColorAsFloat(" + u.texture2D + "(Mean, position));\n        float variance = getColorAsFloat(" + u.texture2D + "(Variance, position));\n        float b = getColorAsFloat(" + u.texture2D + "(B, position));\n\n        return scale * ( (_A(indices) - mean) / sqrt(variance + float(" + this.epsilon + ")) ) + b;\n      }";
        return {
          inputLayouts: n,
          outputLayout: t.createTextureLayoutFromShape(r),
          samplers: ["A", "Scale", "B", "Mean", "Variance"],
          shaderSource: s
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        n.slice(1).forEach(function (e) {
          return r.push(t.getOrCreateTextureData(e));
        });
        var o = t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type);
        return {
          inputTextureDatas: r,
          outputTextureData: o,
          uniformData: {}
        };
      }, e;
    }(i.BatchNormalization);

    e.WebGLBatchNormalization = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(15),
        a = n(0),
        u = n(5),
        s = n(2),
        l = function (t) {
      function e(e, n, r, o) {
        var i = t.call(this, e, r, o) || this;
        return i.glslFunc = n, i;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e.map(function (e) {
          return t.getOrCreateTextureLayout(e);
        });

        if (!a.ShapeUtil.areEqual(e[0].dims, e[1].dims)) {
          var r = a.BroadcastUtil.calcShape(e[0].dims, e[1].dims, !1);
          if (!r) throw new Error("Can't perform binary op on the given tensors");
          var o = r.length,
              i = 0 !== e[0].dims.length ? e[0].dims.length : 1,
              u = 0 !== e[1].dims.length ? e[1].dims.length : 1,
              l = 0 !== e[0].dims.length ? "bcastIndices_A(indices, aindices);" : "aindices[0] = 0;",
              c = 0 !== e[1].dims.length ? "bcastIndices_B(indices, bindices);" : "bindices[0] = 0;",
              f = "\n      " + this.glslFunc.body + "\n      float process(int indices[" + o + "]) {\n        int aindices[" + i + "];\n        int bindices[" + u + "];\n        " + l + "\n        " + c + "\n        return " + this.glslFunc.name + "(_A(aindices), _B(bindices));\n    }";
          return {
            inputLayouts: n,
            outputLayout: t.createTextureLayoutFromShape(r),
            samplers: ["A", "B"],
            shaderSource: f
          };
        }

        var p = s.getGlsl(t.session.backend.glContext.version),
            h = "\n    " + this.glslFunc.body + "\n    void main() {\n      vec4 v1 = " + p.texture2D + "(A, TexCoords);\n      vec4 v2 = " + p.texture2D + "(B, TexCoords);\n      vec4 result = " + this.glslFunc.name + "(v1, v2);\n      " + p.output + " = result;\n    }\n    ";
        return {
          hasMain: !0,
          inputLayouts: n,
          outputLayout: t.createTextureLayoutFromShape(e[0].dims),
          samplers: ["A", "B"],
          shaderSource: h
        };
      }, e.prototype.createRunData = function (t, e, n) {
        return {
          inputTextureDatas: n.map(function (n, r) {
            return t.getOrCreateTextureData(n, e.inputLayouts[r]);
          }),
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, this.resultType ? this.resultType : n[0].type),
          uniformData: {}
        };
      }, e;
    }(i.BinaryOp);

    e.WebGLBinaryOp = l, e.glslAdd = function () {
      return {
        body: "\n  float add_(float a, float b) {\n    return a + b;\n  }\n  vec4 add_(vec4 v1, vec4 v2) {\n    return v1 + v2;\n  }\n  ",
        name: "add_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslDiv = function () {
      return {
        body: "\n  float div_(float a, float b) {\n    return a / b;\n  }\n  vec4 div_(vec4 v1, vec4 v2) {\n    return v1 / v2;\n  }\n  ",
        name: "div_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslMul = function () {
      return {
        body: "\n  float mul_(float a, float b) {\n    return a * b;\n  }\n  vec4 mul_(vec4 v1, vec4 v2) {\n    return v1 * v2;\n  }\n  ",
        name: "mul_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslSub = function () {
      return {
        body: "\n  float sub_(float a, float b) {\n    return a - b;\n  }\n  vec4 sub_(vec4 v1, vec4 v2) {\n    return v1 - v2;\n  }\n  ",
        name: "sub_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslEqual = function () {
      return {
        body: "\n  float equal_(float a, float b) {\n    return float(a == b);\n  }\n  vec4 equal_(vec4 v1, vec4 v2) {\n    return vec4( v1 == v2 );\n  }\n  ",
        name: "equal_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslGreater = function () {
      var t = "greater_";
      return {
        body: "\n  float greater_(float a, float b) {\n    return float(a > b);\n  }\n  vec4 greater_(vec4 v1, vec4 v2) {\n    return vec4( v1.r > v2.r ,\n      v1.g > v2.g,\n      v1.b > v2.b,\n      v1.a > v2.a );\n  }\n  ",
        name: t,
        type: u.FunctionType.ValueBased
      };
    }, e.glslLess = function () {
      return {
        body: "\n  float less_(float a, float b) {\n    return float(a < b);\n  }\n  vec4 less_(vec4 v1, vec4 v2) {\n    return vec4( v1.r < v2.r ,\n                v1.g < v2.g,\n                v1.b < v2.b,\n                v1.a < v2.a );\n  }\n  ",
        name: "less_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslAnd = function () {
      return {
        body: "\n  float and_(float a, float b) {\n    return float( bool(a) && bool(b) );\n  }\n  vec4 and_(vec4 v1, vec4 v2) {\n    bvec4 b1 = bvec4(v1);\n    bvec4 b2 = bvec4(v2);\n    return vec4( b1.r && b2.r ,\n                b1.g && b2.g,\n                b1.b && b2.b,\n                b1.a && b2.a );\n  }\n  ",
        name: "and_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslOr = function () {
      return {
        body: "\n  float or_(float a, float b) {\n    return float( bool(a) || bool(b) );\n  }\n  vec4 or_(vec4 v1, vec4 v2) {\n    bvec4 b1 = bvec4(v1);\n    bvec4 b2 = bvec4(v2);\n    return vec4( b1.r || b2.r ,\n                b1.g || b2.g,\n                b1.b || b2.b,\n                b1.a || b2.a );\n  }\n  ",
        name: "or_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslXor = function () {
      return {
        body: "\n  float xor_(float a, float b) {\n    return float( bool(a) ^^ bool(b) );\n  }\n  vec4 xor_(vec4 v1, vec4 v2) {\n    bvec4 b1 = bvec4(v1);\n    bvec4 b2 = bvec4(v2);\n    return vec4( b1.r ^^ b2.r ,\n                b1.g ^^ b2.g,\n                b1.b ^^ b2.b,\n                b1.a ^^ b2.a );\n  }\n  ",
        name: "xor_",
        type: u.FunctionType.ValueBased
      };
    }, e.glslPow = function () {
      return function (t) {
        var e = t + "_";
        return {
          body: "\n  float " + e + "(float a, float b) {\n    return " + t + "(a, b);\n  }\n  vec4 " + e + "(vec4 v1, vec4 v2) {\n    return " + t + "(v1, v2);\n  }\n  ",
          name: e,
          type: u.FunctionType.ValueBased
        };
      }("pow");
    }, e.glslPRelu = function () {
      return {
        body: "\n  float prelu_(float a, float b) {\n    return a < 0.0 ? a * b: a;\n  }\n  vec4 prelu_(vec4 v1, vec4 v2) {\n    return vec4(\n      v1.r < 0.0 ? v1.r * v2.r: v1.r,\n      v1.g < 0.0 ? v1.g * v2.g: v1.g,\n      v1.b < 0.0 ? v1.b * v2.b: v1.b,\n      v1.a < 0.0 ? v1.a * v2.a: v1.a\n      );\n  }\n  ",
        name: "prelu_",
        type: u.FunctionType.ValueBased
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(45),
        a = n(2),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = a.getGlsl(t.session.backend.glContext.version),
            o = "\n      const float min = float(" + this.min + ");\n      const float max = float(" + this.max + ");\n      void main() {\n        float v = " + r.texture2D + "(A, TexCoords).r;\n        " + r.output + " = vec4(clamp(v, min, max));\n      }\n      ";
        return {
          inputLayouts: [t.getOrCreateTextureLayout(e[0])],
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["A"],
          shaderSource: o,
          hasMain: !0
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.Clip);

    e.WebGLClip = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice();
        if (this.axis >= n.length || this.axis < -1 * n.length) throw new Error("axis specified for concat doesn't match input dimensionality");
        this.axis < 0 && (this.axis = n.length + this.axis);

        for (var r = n.slice(0), o = 1; o < e.length; o++) for (var i = e[o].dims.slice(), a = 0; a < n.length; a++) if (a === this.axis) r[this.axis] += i[a];else if (n[a] !== i[a]) throw new Error("non concat dimensions must match");

        var u = r.length,
            s = "";
        s = e.length < 5 ? this.getTextureIndexWhereDataResidesLinearSearch(e.length) : this.getTextureIndexWhereDataResidesBinarySearch(e.length);
        var l = this.fetchDataFromCorrectTextureMethod(e.length, u),
            c = this.getValueFromArrayIndexMethod(e.length),
            f = e.map(function (t, e) {
          return "X" + e;
        }),
            p = "\n      " + l + "\n      " + c + "\n      " + s + "\n      float process(int indices[" + u + "]) {\n        int textureIndex = getTextureWhereDataResides (indices[" + this.axis + "]);\n\n        if(textureIndex != 0) {\n          indices[" + this.axis + "] = indices[" + this.axis + "] - int(getValueFromArrayIndex(sizeInConcatAxis, textureIndex-int(1)));\n        }\n\n        return fetchDataFromCorrectTexture(textureIndex, indices);\n      }";
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(r),
          samplers: f,
          variables: [{
            name: "sizeInConcatAxis",
            type: "int",
            arrayLength: e.length
          }],
          shaderSource: p
        };
      }, e.prototype.createRunData = function (t, e, n) {
        for (var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        }), o = new Array(e.inputLayouts.length), i = 0, a = 0; a < e.inputLayouts.length; ++a) i += e.inputLayouts[a].shape[this.axis], o[a] = i;

        var u = {
          sizeInConcatAxis: o
        };
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: u
        };
      }, e.prototype.getTextureIndexWhereDataResidesLinearSearch = function (t) {
        return "int getTextureWhereDataResides(int index) {\n      for(int i=0; i<" + t + "; i++) {\n          if(index < int(sizeInConcatAxis[i])){\n              return i;\n          }\n        }\n      }";
      }, e.prototype.getTextureIndexWhereDataResidesBinarySearch = function (t) {
        return this.getTextureIndexWhereDataResidesLinearSearch(t);
      }, e.prototype.fetchDataFromCorrectTextureMethod = function (t, e) {
        for (var n = ["float fetchDataFromCorrectTexture(int textureIndex, int indices[" + e + "]) {"], r = 0; r < t; ++r) 0 === r ? n.push("\tif (textureIndex == " + r + ") { return _X" + r + "(indices); }") : r === t - 1 ? n.push("\telse { return _X" + r + "(indices); }") : n.push("\telse if (textureIndex == " + r + ") { return _X" + r + "(indices); }");

        return n.push("\t}"), n.join("\n");
      }, e.prototype.getValueFromArrayIndexMethod = function (t) {
        for (var e = ["int getValueFromArrayIndex(int arr[" + t + "], int index) {"], n = 0; n < t; ++n) 0 === n ? e.push("\tif (index == " + n + ") { return arr[" + n + "]; }") : n === t - 1 ? e.push("\telse { return arr[" + n + "]; }") : e.push("\telse if (index == " + n + ") { return arr[" + n + "]; }");

        return e.push("\t}"), e.join("\n");
      }, e;
    }(n(29).Concat);

    e.WebGLConcat = i;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        a = this && this.__spread || function () {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(i(arguments[e]));

      return t;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(3),
        s = n(16),
        l = n(0),
        c = n(2),
        f = function (t) {
      function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.readSize = 8, e.blockSize = 64, e;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = t.session.programManager;

        if (!this.artifacts) {
          this.artifacts = [];

          for (var r = this.createProgramInfos(t, e), o = 0; o < r.length; ++o) {
            var i = t.session.programManager.build(r[o]);
            this.artifacts.push(i);
          }
        }

        var a = this.createRunDatas(t, this.artifacts.map(function (t) {
          return t.programInfo;
        }), e);
        return n.run(this.artifacts[0], a[0]), n.run(this.artifacts[1], a[1]), [a[1].outputTextureData.tensor];
      }, e.prototype.createProgramInfos = function (t, n) {
        var r = n[0].dims.slice(),
            o = n[1].dims.slice();
        if (0 === this.kernelShape.length) for (var i = n[1].dims, a = 2; a < i.length; ++a) this.kernelShape.push(i[a]);
        l.PoolConvUtil.adjustPadsBasedOnAutoPad(n[0].dims, this.strides, this.dilations, this.kernelShape, this.pads, this.autoPad), u.Logger.verbose("Conv", "autpPad:" + this.autoPad + ", dilations:" + this.dilations + ", group:" + this.group + ", kernelShape:" + this.kernelShape + ", pads:" + this.pads + ", strides:" + this.strides);
        var s = e.calcOutputShape(r, o, this.dilations, this.pads, this.strides),
            c = this.createIm2ColProgramInfo(t, n, s);
        return [c, this.createDotProductProgramInfo(t, c.outputLayout, n, s)];
      }, e.prototype.createRunDatas = function (t, n, r) {
        var o = r[1],
            i = r.length >= 3 ? r[2] : void 0,
            a = t.getTextureData(o.dataId);

        if (!a) {
          u.Logger.verbose("Conv", "Did not find the adjustedKernel texture in the cache. Creating rew.");
          var s = e.prepKernelForDotProduct(o.dims.slice(), this.group, 4, o.floatData);
          a = t.createTextureDataFromLayoutBindTensor(n[1].inputLayouts[1], o.type, s, o);
        }

        var l = {
          inputTextureDatas: [t.getOrCreateTextureData(r[0])],
          outputTextureData: t.createTextureDataFromLayout(n[0].outputLayout, r[0].type),
          uniformData: {}
        },
            c = [l.outputTextureData, a];
        return i && c.push(t.getOrCreateTextureData(i)), [l, {
          inputTextureDatas: c,
          outputTextureData: t.createTextureDataFromLayout(n[1].outputLayout, r[0].type),
          uniformData: {},
          draw: function (t, e) {
            for (var n = t.gl, r = e.programInfo.params.sharedDim, o = e.programInfo.params.sharedDimReadSize, i = e.uniformLocations.find(function (t) {
              return "sharedDimOffset" === t.name;
            }).location, a = !1, s = 0; s < r; s += o) u.Logger.verbose("MatMul2D", "k = " + s + ", sharedDim: " + r + ", readSize = " + o), s === o && (a = !0, n.enable(n.BLEND), t.checkError(), n.blendEquation(n.FUNC_ADD), t.checkError(), n.blendFunc(n.ONE, n.ONE), t.checkError()), n.uniform1i(i, s), t.checkError(), t.draw();

            a && (n.disable(n.BLEND), t.checkError());
          }
        }];
      }, e.prototype.createIm2ColProgramInfo = function (t, n, r) {
        var o = n[0].dims.slice(),
            i = n[1].dims.slice(),
            a = r.length,
            u = e.calcIm2ColDims(o, i, r, 4),
            s = t.createTextureLayoutFromShape(u, 4, [u[0], u[1], u[2], 4 * u[3]], {
          breakAxis: 3
        }),
            l = "\n      const int XC = " + o[1] + ";\n      const int XH = " + o[2] + ";\n      const int XW = " + o[3] + ";\n      const int KH = " + this.kernelShape[0] + ";\n      const int KW = " + this.kernelShape[1] + ";\n      const int dilationH = " + this.dilations[0] + ";\n      const int dilationW = " + this.dilations[1] + ";\n      const int strideH = " + this.strides[0] + ";\n      const int strideW = " + this.strides[1] + ";\n      const int padH = " + this.pads[0] + ";\n      const int padW = " + this.pads[1] + ";\n      const int KHKW = KH*KW;\n      const int XCKHKW = XC * KHKW;\n      const int outputChannels = 4;\n\n      vec4 process(int indices[" + a + "]) {\n        int b  = indices[0]; // batch size\n        int oh = indices[1] * strideH - padH; //output height\n        int ow = indices[2] * strideW - padW; //output width\n        int p = indices[3] * outputChannels; //patch\n        vec4 v = vec4(0.0);\n        for(int i=0; i < outputChannels; ++i) {\n          if(p < XCKHKW) {\n            int patchC = p / KHKW;\n            int patchH = (p - patchC*KHKW) / KW;\n            int patchW = (p - patchC*KHKW) - patchH * KW;\n            int xh2 = oh + patchH * dilationH;\n            int xw2 = ow + patchW * dilationW;\n            int x[" + o.length + "];\n            x[0] = b;\n            x[1] = patchC;\n            x[2] = xh2;\n            x[3] = xw2;\n            if(xh2 >= 0 &&\n                xh2 < XH &&\n                xw2 >= 0 &&\n                xw2 < XW) {\n              v[i] = _X(x);\n            }\n          }\n          ++p;\n        }\n        return v;\n      }\n      ";
        return {
          inputLayouts: [t.createTextureLayoutFromShape(o)],
          outputLayout: s,
          samplers: ["X"],
          shaderSource: l
        };
      }, e.prototype.createDotProductProgramInfo = function (t, e, n, r) {
        var o,
            i = n[0].dims.slice(),
            a = n[1].dims.slice(),
            u = [a[0], Math.ceil(i[1] * a[2] * a[3] / 4)],
            s = t.createTextureLayoutFromShape(u, 4, [u[0], 4 * u[1]], {
          breakAxis: 1
        }),
            l = r.length,
            f = [e, s];
        3 === n.length && (o = t.createTextureLayoutFromShape(n[2].dims.slice()), f.push(o));
        var p = t.createTextureLayoutFromShape(r),
            h = n.length < 3 ? "0.0" : "_B(b)",
            d = e.shape[3],
            y = t.session.backend.glContext.isBlendSupported && t.session.backend.matmulMaxBatchSize ? this.calcSharedDimReadSize(t.session.backend.matmulMaxBatchSize, d) : d,
            g = ["Im2Col", "K"];
        3 === n.length && g.push("B");
        var m = c.getGlsl(t.session.backend.glContext.version),
            v = "\n    float process(int indices[" + l + "]) {\n      int b[1];\n      b[0] = indices[1];\n      int im2col[" + e.shape.length + "];\n      im2col[0] = indices[0];\n      im2col[1] = indices[2];\n      im2col[2] = indices[3];\n      int im2colOffset = im2col[0] * " + e.strides[0] + " + im2col[1] * " + e.strides[1] + " + im2col[2] * " + e.strides[2] + " + sharedDimOffset;\n      int kernelOffset = indices[1] * " + s.strides[0] + " + sharedDimOffset;\n      float sum = sharedDimOffset == 0 ? " + h + " : 0.0;\n      for (int i = 0; i < " + y + "; ++i) {\n        vec2 im2colCoords = offsetToCoords(im2colOffset, " + e.width + ", " + e.height + ");\n        vec2 kernelCoords = offsetToCoords(kernelOffset, " + s.width + ", " + s.height + ");\n        sum += dot(" + m.texture2D + "(Im2Col, im2colCoords), " + m.texture2D + "(K, kernelCoords));\n        ++im2colOffset;\n        ++kernelOffset;\n      }\n      return sum;\n    }";
        return {
          inputLayouts: 3 === n.length ? [e, s, o] : [e, s],
          outputLayout: p,
          shaderSource: v,
          samplers: g,
          variables: [{
            name: "sharedDimOffset",
            type: "int"
          }],
          params: {
            sharedDim: d,
            sharedDimReadSize: y
          }
        };
      }, e.prepKernelForDotProduct = function (t, e, n, r) {
        if (1 === e && (1 === n || t[2] * t[3] % n == 0)) return r;

        for (var o = l.ShapeUtil.computeStrides(t), i = t[1] * t[2] * t[3], a = Math.ceil(i / n) * n, u = t[0] * a, s = new Float32Array(u), c = new Float32Array(a), f = 0; f < t[0]; ++f) {
          var p = f * o[0];
          c.set(r.slice(p, p + i), 0);
          var h = f * a;
          s.set(c, h);
        }

        return s;
      }, e.calcIm2ColDims = function (t, e, n, r) {
        return void 0 === r && (r = 1), [n[0], n[2], n[3], Math.ceil(t[1] * e[2] * e[3] / r)];
      }, e.calcOutputShape = function (t, e, n, r, o) {
        var i,
            u = t[0],
            s = t.slice(2),
            l = s.length,
            c = e[0],
            f = e.slice(2).map(function (t, e) {
          return t + (t - 1) * (n[e] - 1);
        }),
            p = s.map(function (t, e) {
          return t + r[e] + r[e + l];
        }).map(function (t, e) {
          return Math.floor((t - f[e] + o[e]) / o[e]);
        });
        return (i = [u, c]).concat.apply(i, a(p));
      }, e.prototype.calcSharedDimReadSize = function (t, e) {
        return t <= 0 || e < t || e % t != 0 ? e : t;
      }, e.prototype.calcBlockSize = function (t) {
        if (!(t.height < 64)) return [64, 64];
      }, e;
    }(s.Conv);

    e.WebGLConv = f;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        if (this.testMode) return [e[0]];
        throw new Error("Non test mode Dropout is not implemented yet");
      }, e.prototype.createProgramInfo = function (t, e) {
        throw new Error("Non test mode Dropout is not implemented yet");
      }, e.prototype.createRunData = function (t, e, n) {
        throw new Error("Non test mode Dropout is not implemented yet");
      }, e;
    }(n(30).Dropout);

    e.WebGLDropout = i;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(125),
        a = n(2),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = a.getGlsl(t.session.backend.glContext.version),
            o = "\n      void main() {\n        float v = " + r.texture2D + "(A, TexCoords).r;\n        " + r.output + " = vec4(v >= 0.0 ? v: (exp(v) - 1.0) * " + this.alpha.toExponential() + "); /* float number format */\n      }\n      ";
        return {
          inputLayouts: [t.getOrCreateTextureLayout(e[0])],
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["A"],
          shaderSource: o,
          hasMain: !0
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.Elu);

    e.WebGLElu = u;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.alpha = t.getFloat("alpha", 1);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Elu = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(31),
        a = n(0),
        u = n(10),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = a.ShapeUtil.flattenShape(e[0].dims, this.axis);
        return [u.reshape(t, e[0], n)];
      }, e;
    }(i.Flatten);

    e.WebGLFlatten = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = e[1].dims.slice(),
            o = new Array(n.length + r.length - 1);
        if (0 === o.length) throw Error("A scalar tensor output has not been supported");

        for (var i = [], a = 0; a < o.length; a++) a < this.axis ? (o[a] = n[a], i.push("inputIdx[" + a + "] = outputIdx[" + a + "];")) : a < this.axis + r.length ? (o[a] = r[a - this.axis], i.push("indexDataIdx[" + (a - this.axis) + "] = outputIdx[" + a + "];")) : (o[a] = n[a - r.length + 1], i.push("inputIdx[" + (a - r.length + 1) + "] = outputIdx[" + a + "];"));

        var u = "\n      float process(int outputIdx[" + o.length + "]) {\n        int inputIdx[" + n.length + "];\n        int indexDataIdx[" + r.length + "];\n        " + i.join("\n        ") + "\n        inputIdx[" + this.axis + "] = int(_B(indexDataIdx));\n        return _A(inputIdx);\n      }";
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(o),
          samplers: ["A", "B"],
          shaderSource: u
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        });
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(n(32).Gather);

    e.WebGLGather = i;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(19),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = e[1].dims.slice(),
            o = e[2].dims.slice(),
            a = i(u.GemmUtil.getShapeOfGemmResult(n, this.transA, r, this.transB, o), 2),
            s = [a[0], a[1]];
        if (!s) throw new Error("Can't use gemm on the given tensors");
        var l = n[n.length - 1],
            c = "";
        this.transA && (l = n[0]), this.transA && this.transB ? c = "value += _A_T(a) * _B_T(b);" : this.transA && !this.transB ? c = "value += _A_T(a) * _B(b);" : !this.transA && this.transB ? c = "value += _A(a) * _B_T(b);" : this.transA || this.transB || (c = "value += _A(a) * _B(b);");
        var f = s.length,
            p = "\n      float process(int indices[" + f + "]) {\n          int a[" + f + "];\n          int b[" + f + "];\n          int c[" + o.length + "];\n\n          copyVec(indices, a);\n          copyVec(indices, b);\n          bcastIndices_C(indices, c);\n\n          float value = 0.0;\n          for (int k=0; k<" + l + "; ++k) {\n              a[" + (f - 1) + "] = k;\n              b[" + (f - 2) + "] = k;\n              " + c + "\n          }\n\n          value = value * alpha;\n          value += beta * _C(c);\n          return value;\n      }";
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(s),
          samplers: ["A", "B", "C"],
          variables: [{
            name: "alpha",
            type: "float"
          }, {
            name: "beta",
            type: "float"
          }],
          shaderSource: p
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        });
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {
            alpha: this.alpha,
            beta: this.beta
          }
        };
      }, e;
    }(a.Gemm);

    e.WebGLGemm = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = n.length,
            o = "\n      " + this.createGetBiasMethod(this.bias.length) + "\n      float process(int indices[" + r + "]) {\n        return _X(indices) * scale + getBias(bias, indices[1]);\n      }";
        return {
          inputLayouts: [t.getOrCreateTextureLayout(e[0])],
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["X"],
          variables: [{
            name: "bias",
            type: "float",
            arrayLength: this.bias.length
          }, {
            name: "scale",
            type: "float"
          }],
          shaderSource: o
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {
            bias: this.bias,
            scale: this.scale
          }
        };
      }, e.prototype.createGetBiasMethod = function (t) {
        for (var e = ["float getBias(float bias[" + t + "], int channel) {"], n = 0; n < t; ++n) 0 === n ? e.push("\tif (channel == " + n + ") { return bias[" + n + "]; }") : n === t - 1 ? e.push("\telse { return bias[" + n + "]; }") : e.push("\telse if (channel == " + n + ") { return bias[" + n + "]; }");

        return e.push("\t}"), e.join("\n");
      }, e;
    }(n(33).ImageScaler);

    e.WebGLImageScaler = i;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(131),
        a = n(2),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = a.getGlsl(t.session.backend.glContext.version),
            o = "\n      void main() {\n        float v = " + r.texture2D + "(A, TexCoords).r;\n        " + r.output + " = vec4(v < 0.0 ? v * float(" + this.alpha + ") : v);\n      }\n      ";
        return {
          hasMain: !0,
          inputLayouts: [t.getOrCreateTextureLayout(e[0])],
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["A"],
          shaderSource: o
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.LeakyRelu);

    e.WebGLLeakyRelu = u;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.alpha = t.getFloat("alpha", .01);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.LeakyRelu = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(18),
        a = n(0),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims,
            r = e[1].dims,
            o = a.BroadcastUtil.calcShape(n, r, !0);
        if (!o) throw new Error("Can't use matmul on the given tensors");
        var i = o.length,
            u = n.length,
            s = r.length,
            l = "\n      float process(int indices[" + i + "]) {\n          int a[" + u + "];\n          int b[" + s + "];\n          bcastMatmulIndices_A(indices, a);\n          bcastMatmulIndices_B(indices, b);\n\n          float value;\n          for (int k=0; k<" + n[n.length - 1] + "; ++k) {\n              a[" + (u - 1) + "] = k;\n              b[" + (s - 2) + "] = k;\n              value += _A(a) * _B(b);\n          }\n          return value;\n      }";
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(o),
          samplers: ["A", "B"],
          shaderSource: l
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        });
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.MatMul);

    e.WebGLMatMul = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(134),
        a = n(0),
        u = n(2),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = a.ShapeUtil.padShape(e[0].dims.slice(), this.pads),
            r = n.length,
            o = t.getOrCreateTextureLayout(e[0]),
            i = "\n      " + l(u.getGlsl(t.session.backend.glContext.version), "A", o, this.mode, this.pads, this.value) + "\n      float process(int[" + r + "] indices) {\n          return padA(indices);\n      }";
        return {
          inputLayouts: [o],
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["A"],
          shaderSource: i
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.Pad);

    function l(t, e, n, r, o, i) {
      switch (r) {
        case "constant":
          return function (t, e, n, r, o, i, a, u) {
            for (var s = n.length, l = "", c = s - 1; c >= 0; --c) l += "\n          k = m[" + c + "] - " + a[c] + ";\n          if (k < 0)  return constant;\n          if (k >= " + n[c] + ") return constant;\n          offset += k * " + r[c] + ";\n          ";

            return "\n        float pad" + e + "(int m[" + s + "]) {\n          const float constant = float(" + u + ");\n          int offset = 0;\n          int k = 0;\n          " + l + "\n          vec2 coords = offsetToCoords(offset, " + o + ", " + i + ");\n          float value = getColorAsFloat(" + t.texture2D + "(" + e + ", coords));\n          return value;\n        }\n        ";
          }(t, e, n.shape, n.strides, n.width, n.height, o, i);

        case "reflect":
          return function (t, e, n, r, o, i, a) {
            for (var u = n.length, s = "", l = u - 1; l >= 0; --l) s += "\n        k = m[" + l + "] - " + a[l] + ";\n        if (k < 0) { k = -k; }\n        {\n          const int _2n_1 = " + 2 * (n[l] - 1) + ";\n          k = int( mod( float(k), float(_2n_1) ) ) ;\n          if(k >= " + n[l] + ") { k = _2n_1 - k; }\n        }\n        offset += k * " + r[l] + ";\n        ";

            return "\n      float pad" + e + "(int m[" + u + "]) {\n        int offset = 0;\n        int k = 0;\n        " + s + "\n        vec2 coords = offsetToCoords(offset, " + o + ", " + i + ");\n        float value = getColorAsFloat(" + t.texture2D + "(" + e + ", coords));\n        return value;\n      }\n      ";
          }(t, e, n.shape, n.strides, n.width, n.height, o);

        case "edge":
          return function (t, e, n, r, o, i, a) {
            for (var u = n.length, s = "", l = u - 1; l >= 0; --l) s += "\n      k = m[" + l + "] - " + a[l] + ";\n      if (k < 0)  k = 0;\n      if (k >= " + n[l] + ") k = " + (n[l] - 1) + ";\n      offset += k * " + r[l] + ";\n      ";

            return "\n    float pad" + e + "(int m[" + u + "]) {\n      int offset = 0;\n      int k = 0;\n      " + s + "\n      vec2 coords = offsetToCoords(offset, " + o + ", " + i + ");\n      float value = getColorAsFloat(" + t.texture2D + "(" + e + ", coords));\n      return value;\n    }\n    ";
          }(t, e, n.shape, n.strides, n.width, n.height, o);

        default:
          throw new Error("Invalid mode");
      }
    }

    e.WebGLPad = s, e.getPadFunction = l;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t() {}

      return t.prototype.initialize = function (t) {
        this.mode = t.getString("mode", "constant"), this.value = t.getFloat("value", 0), this.pads = t.getInts("pads");
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "float32" === t[0].type || "float64" === t[0].type;
      }, t;
    }();

    e.Pad = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(20),
        a = n(0),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        return l(t, e, !0, this.kernelShape, this.autoPad, this.strides, this.pads, this.countIncludePad);
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.GlobalAveragePool);

    e.WebGLGlobalAveragePool = u;

    var s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        return l(t, e, !1, this.kernelShape, this.autoPad, this.strides, this.pads, this.countIncludePad);
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.AveragePool);

    function l(t, e, n, r, o, i, u, s) {
      void 0 === r && (r = []), void 0 === o && (o = ""), void 0 === i && (i = []), void 0 === u && (u = []);
      var l = e[0].dims.slice();
      a.PoolConvUtil.adjustPoolAttributes(n, l, r, i, u);
      var c = a.PoolConvUtil.computePoolOutputShape(n, l, i, r, u, o),
          f = a.ShapeUtil.size(r),
          p = "";
      p += s ? "value /= float(" + f + ");" : "value /= float(" + f + " - pad);";
      var d = t.getOrCreateTextureLayout(e[0]),
          y = "\n      " + h(d, r, u, i, "value += _X(x);", p, "0.0") + "\n    ";
      return {
        inputLayouts: [d],
        outputLayout: t.createTextureLayoutFromShape(c),
        samplers: ["X"],
        shaderSource: y
      };
    }

    e.WebGLAveragePool = s;

    var c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        return p(t, e, !0, this.kernelShape, this.autoPad, this.strides, this.pads);
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.GlobalMaxPool);

    e.WebGLGlobalMaxPool = c;

    var f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        return p(t, e, !1, this.kernelShape, this.autoPad, this.strides, this.pads);
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.MaxPool);

    function p(t, e, n, r, o, i, u) {
      void 0 === r && (r = []), void 0 === o && (o = ""), void 0 === i && (i = []), void 0 === u && (u = []);
      var s = e[0].dims.slice();
      a.PoolConvUtil.adjustPoolAttributes(n, s, r, i, u);
      var l = a.PoolConvUtil.computePoolOutputShape(n, s, i, r, u, o),
          c = t.createTextureLayoutFromShape(s),
          f = "\n    " + h(c, r, u, i, "\n              value = max(_X(x), value);\n      ", "", "-1e5") + "\n  ";
      return {
        inputLayouts: [c],
        outputLayout: t.createTextureLayoutFromShape(l),
        samplers: ["X"],
        shaderSource: f
      };
    }

    function h(t, e, n, r, o, i, u) {
      var s = t.shape,
          l = t.shape.length;

      if (e.length <= 2) {
        var c = e[e.length - 1],
            f = r[r.length - 1],
            p = n[n.length / 2 - 1],
            h = n[n.length - 1],
            g = s[l - 1],
            m = "",
            v = "",
            b = "";

        if (m = p + h !== 0 ? "\n                for (int i = 0; i < " + c + "; i++) {\n                  x[" + l + " - 1] = indices[" + l + " - 1] * " + f + " - " + p + " + i;\n                  if (x[" + l + " - 1] < 0 || x[" + l + " - 1] >= " + g + ") {\n                    pad++;\n                    continue;\n                  }\n                  " + o + "\n                }" : "\n                for (int i = 0; i < " + c + "; i++) {\n                  x[" + l + " - 1] = indices[" + l + " - 1] * " + f + " - " + p + " + i;\n                  " + o + "\n                }", 2 === e.length) {
          var w = e[e.length - 2],
              _ = r[r.length - 2],
              x = n[n.length / 2 - 2],
              T = n[n.length - 2],
              O = s[l - 2];
          v = x + T !== 0 ? "\n              for (int j = 0; j < " + w + "; j++) {\n                x[" + l + " - 2] = indices[" + l + " - 2] * " + _ + " - " + x + " + j;\n                if (x[" + l + " - 2] < 0 || x[" + l + " - 2] >= " + O + ") {\n                  pad+= " + c + ";\n                  continue;\n                }\n            " : "\n                for (int j = 0; j < " + w + "; j++) {\n                  x[" + l + " - 2] = indices[" + l + " - 2] * " + _ + " - " + x + " + j;\n                ", b = "\n              }\n            ";
        }

        return "\n            float process(int indices[" + l + "]) {\n              int x[" + l + "];\n              copyVec(indices, x);\n\n              float value = " + u + ";\n              int pad = 0;\n              " + v + "\n              " + m + "\n              " + b + "\n              " + i + "\n              return value;\n            }\n          ";
      }

      var S = a.ShapeUtil.size(e),
          P = a.ShapeUtil.computeStrides(e),
          A = P.length,
          D = n.length,
          E = y(A),
          I = d(s, "inputDims"),
          L = d(n, "pads"),
          k = d(P, "kernelStrides");
      return "\n            " + E + "\n            float process(int indices[" + l + "]) {\n                int x[" + l + "];\n                copyVec(indices, x);\n                int offset[" + A + "];\n                int pads[" + D + "];\n                int inputDims[" + l + "];\n                int kernelStrides[" + A + "];\n                int strides[" + A + "];\n                " + L + "\n                " + I + "\n                " + d(r, "strides") + "\n                " + k + "\n\n                float value = " + u + ";\n                int pad = 0;\n                bool isPad = false;\n                for (int i = 0; i < " + S + "; i++) {\n                    offsetToIndices(i, kernelStrides, offset);\n                    isPad = false;\n                    for (int j = " + l + " - " + A + "; j < " + l + "; j++) {\n                      x[j] = indices[j] * strides[j - " + l + " + " + A + "]\n                        + offset[j - " + l + " + " + A + "] - pads[j - 2];\n                      " + (n.reduce(function (t, e) {
        return t + e;
      }) ? "\n                if (x[j] >= inputDims[j] || x[j] < 0) {\n                  pad++;\n                  isPad = true;\n                  break;\n                }\n              }\n              if (!isPad) {\n                " + o + "\n              }" : "\n                  }\n                  " + o) + "\n                }\n                " + i + "\n\n                return value;\n            }";
    }

    function d(t, e) {
      for (var n = "", r = 0; r < t.length; r++) n += "\n      " + e + "[" + r + "] = " + t[r] + ";\n    ";

      return n;
    }

    function y(t) {
      return "\n    void offsetToIndices(int offset, int[" + t + "] strides, out int[" + t + "] indices) {\n      if (" + t + " == 0) {\n        return;\n      }\n      for (int i = 0; i < " + t + " - 1; ++i) {\n        indices[i] = offset / strides[i];\n        offset -= indices[i] * strides[i];\n      }\n      indices[" + t + " - 1] = offset;\n    }";
    }

    e.WebGLMaxPool = f, e.GeneratePoolingCode = h, e.copyArray = d, e.offsetToIndices = y;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        for (var n = [], r = e[0].dims.length || 1, o = [], i = this.getOps(e), a = i[1], u = 0; u < e[0].dims.length; u++) this.axes.indexOf(u) >= 0 || 0 === this.axes.length ? (this.keepDims && n.push(1), a = "\n        for(int j" + u + " = 0; j" + u + " < " + e[0].dims[u] + "; j" + u + "++) {\n          inputIdx[" + u + "] = j" + u + ";\n          " + a + "\n        }\n        ") : (o.push("inputIdx[" + u + "] = outputIdx[" + n.length + "];"), n.push(e[0].dims[u]));

        var s = "\n      float process(int outputIdx[" + (n.length || 1) + "]) {\n        float value;                 // final result\n        int inputIdx[" + r + "];      // addressing input data\n        " + o.join("\n") + "\n        " + i[0] + "       // init ops for reduce max/min\n        " + a + "\n        " + i[2] + "       // final computation for reduce mean\n        return value;\n      }";
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["A"],
          shaderSource: s
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        });
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(n(35).ReduceBase),
        a = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        return ["value = 0.0;", "value += _A(inputIdx);", ""];
      }, e;
    }(i);

    e.WebGLReduceSum = a;

    var u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        for (var e = 1, n = 0; n < t[0].dims.length; n++) (this.axes.indexOf(n) >= 0 || 0 === this.axes.length) && (e *= t[0].dims[n]);

        return ["value = 0.0;", "value += _A(inputIdx);", "value /= " + e + ".;"];
      }, e;
    }(i);

    e.WebGLReduceMean = u;

    var s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        for (var e = [], n = 0; n < t[0].dims.length; n++) (this.axes.indexOf(n) >= 0 || 0 === this.axes.length) && e.push("inputIdx[" + n + "] = 0;");

        return [e.join("\n") + "\nvalue = _A(inputIdx);", "value = max(value, _A(inputIdx));", ""];
      }, e;
    }(i);

    e.WebGLReduceMax = s;

    var l = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        for (var e = [], n = 0; n < t[0].dims.length; n++) (this.axes.indexOf(n) >= 0 || 0 === this.axes.length) && e.push("inputIdx[" + n + "] = 0;");

        return [e.join("\n") + "\nvalue = _A(inputIdx);", "value = min(value, _A(inputIdx));", ""];
      }, e;
    }(i);

    e.WebGLReduceMin = l;

    var c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        return ["value = 1.0;", "value *= _A(inputIdx);", ""];
      }, e;
    }(i);

    e.WebGLReduceProd = c;

    var f = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        return ["value = 0.0;", "value += _A(inputIdx);", "value = log(value);"];
      }, e;
    }(i);

    e.WebGLReduceLogSum = f;

    var p = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.getOps = function (t) {
        return ["float t; value = 0.0;", "t = _A(inputIdx); value += t * t;", ""];
      }, e;
    }(i);

    e.WebGLReduceSumSquare = p;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(37),
        a = n(0),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        return l(t, e[0], this.starts, this.ends, this.axes);
      }, e.prototype.createRunData = function (t, e, n) {
        return c(t, e, n);
      }, e;
    }(i.Slice);

    e.WebGLSlice = u;

    var s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        if (!t.session.isInitializer(e[1].dataId) || !t.session.isInitializer(e[2].dataId) || e.length >= 4 && !t.session.isInitializer(e[3].dataId) || e.length >= 5 && !t.session.isInitializer(e[4].dataId)) throw new Error("dynamic slice attributes are not allowed");
        if (e.length >= 5 && e[4].integerData.some(function (t) {
          return 1 !== t;
        })) throw new Error("currently non-1 steps is not supported for Slice");
        var n = Array.from(e[1].integerData),
            r = Array.from(e[2].integerData),
            o = e.length >= 4 ? Array.from(e[3].integerData) : [];
        return l(t, e[0], n, r, o);
      }, e.prototype.createRunData = function (t, e, n) {
        return c(t, e, n);
      }, e;
    }(i.SliceV10);

    function l(t, e, n, r, o) {
      0 === o.length && (o = e.dims.slice(0).map(function (t, e) {
        return e;
      })), o = o.map(function (t) {
        return a.ShapeUtil.parseAxis(t, e.dims.length);
      }), n = n.map(function (t, n) {
        return t > e.dims[o[n]] - 1 ? e.dims[o[n]] : a.ShapeUtil.parseAxis(t, e.dims[o[n]]);
      }), r = r.map(function (t, n) {
        return t > e.dims[o[n]] - 1 ? e.dims[o[n]] : a.ShapeUtil.parseAxis(t, e.dims[o[n]]);
      });

      for (var i = e.dims.slice(), u = [], s = 0; s < o.length; s++) i[o[s]] = r[s] - n[s], n[s] > 0 && u.push("outputIdx[" + o[s] + "] += " + n[s] + ";");

      var l = "\n      float process(int outputIdx[" + i.length + "]) {\n        " + u.join("\n      ") + "\n        return _A(outputIdx);\n      }";
      return {
        inputLayouts: [t.getOrCreateTextureLayout(e)],
        outputLayout: t.createTextureLayoutFromShape(i),
        samplers: ["A"],
        shaderSource: l
      };
    }

    function c(t, e, n) {
      var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
      return {
        inputTextureDatas: r,
        outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
        uniformData: {}
      };
    }

    e.WebGLSliceV10 = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        a = this && this.__spread || function () {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(i(arguments[e]));

      return t;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(21),
        s = n(0),
        l = n(2),
        c = function (t) {
      function e() {
        return t.call(this) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = this;
        this.artifacts || (this.artifacts = [], this.createProgramInfos(t, e).forEach(function (e, r) {
          var o = t.session.programManager.build(e);
          n.artifacts.push(o);
        }));
        var r = this.createRunDatas(t, this.artifacts.map(function (t) {
          return t.programInfo;
        }), e);
        return r.forEach(function (e, r) {
          return t.session.programManager.run(n.artifacts[r], e);
        }), [r[r.length - 1].outputTextureData.tensor];
      }, e.prototype.createSoftMaxProgramInfo = function (t, e, n, r, o, i) {
        var a = e.dims.slice(),
            u = t.createTextureLayoutFromShape(a),
            s = a,
            l = s.length,
            c = u.width,
            f = u.height;
        if (n < 1 || r < 1) throw new Error("Logical row count N and feature count D must be greater than or equal to 1");
        if (1 !== o.shape.length || 1 !== i.shape.length) throw new Error("Dimensionality of the intermediate results should be 1");
        if (o.shape[0] !== n || i.shape[0] !== n) throw new Error("Shape of the intermediate results should be equal to logical row count");
        var p = "\n    float process(int[" + l + "] indices) {\n\n      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)\n      int offset = coordsToOffset(TexCoords, " + c + ", " + f + ");\n\n      //determine the logical row for this index\n      int logical_row_index[1];\n      logical_row_index[0] = offset / " + r + ";\n\n      float norm_factor = _Norm(logical_row_index);\n\n      // avoid possible division by 0\n      // if norm_facor is 0, all elements are zero\n      // if so, return 0\n      if(norm_factor == 0.0)\n        return 0.0;\n\n      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;\n    }";
        return {
          inputLayouts: [u, o, i],
          outputLayout: t.createTextureLayoutFromShape(s),
          samplers: ["A", "Max", "Norm"],
          shaderSource: p
        };
      }, e.prototype.createComputScaleProgramInfo = function (t, e, n, r, o, i) {
        var a = t.createTextureLayoutFromShape(e.dims.slice()),
            u = i.length,
            s = a.width,
            c = a.height;
        if (n < 1 || r < 1) throw new Error("Logical row count N and feature count D must be greater than or equal to 1");
        if (1 !== i.length) throw new Error("Dimensionality of the output should be 1");
        if (i[0] !== n) throw new Error("Shape of the output should be equal to logical row count");
        if (1 !== o.shape.length) throw new Error("Dimensionality of the intermediate results should be 1");
        if (o.shape[0] !== n) throw new Error("Shape of the intermediate results should be equal to logical row count");
        var f = "\n    float process(int[" + u + "] indices) {\n\n      int logical_row_start_offset = indices[0] * " + r + ";\n\n      float norm_factor = 0.0;\n      float max = _Max(indices);\n      for(int i=0; i<" + r + "; ++i)\n      {\n        norm_factor += exp(getColorAsFloat(" + l.getGlsl(t.session.backend.glContext.version).texture2D + "(A, offsetToCoords(logical_row_start_offset + i, " + s + ", " + c + "))) - max);\n      }\n\n      return norm_factor;\n    }";
        return {
          inputLayouts: [a, o],
          outputLayout: t.createTextureLayoutFromShape(i),
          samplers: ["A", "Max"],
          shaderSource: f
        };
      }, e.prototype.createComputeMaxProgramInfo = function (t, e, n, r, o) {
        var i = t.createTextureLayoutFromShape(e.dims.slice()),
            a = o.length,
            u = i.width,
            s = i.height;
        if (n < 1 || r < 1) throw new Error("Logical row count N and feature count D must be greater than or equal to 1");
        if (1 !== o.length) throw new Error("Dimensionality of the output should be 1");
        if (o[0] !== n) throw new Error("Shape of the output should be equal to logical row count");
        var c = l.getGlsl(t.session.backend.glContext.version),
            f = "\n        float process(int[" + a + "] indices) {\n\n          int logical_row_start_offset = indices[0] * " + r + ";\n\n          float max = getColorAsFloat(" + c.texture2D + "(A, offsetToCoords(logical_row_start_offset, " + u + ", " + s + " )));\n          for(int i=1; i<" + r + "; ++i)\n          {\n            float current = getColorAsFloat(" + c.texture2D + "(A, offsetToCoords(logical_row_start_offset + i, " + u + ", " + s + ")));\n            if(current > max)\n              max = current;\n          }\n\n          return max;\n        }";
        return {
          inputLayouts: [i],
          outputLayout: t.createTextureLayoutFromShape(o),
          samplers: ["A"],
          shaderSource: f
        };
      }, e.prototype.createProgramInfos = function (t, e) {
        var n = e[0].dims.slice(),
            r = s.ShapeUtil.parseAxis(this.axis, n.length),
            o = s.ShapeUtil.sizeToDimension(n, r),
            i = s.ShapeUtil.sizeFromDimension(n, r),
            a = this.createComputeMaxProgramInfo(t, e[0], o, i, [o]),
            u = this.createComputScaleProgramInfo(t, e[0], o, i, a.outputLayout, [o]);
        return [a, u, this.createSoftMaxProgramInfo(t, e[0], o, i, a.outputLayout, u.outputLayout)];
      }, e.prototype.createRunDatas = function (t, e, n) {
        var r = n[0].type,
            o = t.getOrCreateTextureData(n[0], e[0].inputLayouts[0]),
            i = [];
        i.push({
          inputTextureDatas: [o],
          outputTextureData: t.createTextureDataFromLayout(e[0].outputLayout, r),
          uniformData: {}
        });

        for (var u = 1; u < e.length; ++u) i.push({
          inputTextureDatas: a(i[u - 1].inputTextureDatas, [i[u - 1].outputTextureData]),
          outputTextureData: t.createTextureDataFromLayout(e[u].outputLayout, r),
          uniformData: {}
        });

        return i;
      }, e;
    }(u.Softmax);

    e.WebGLSoftmax = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(140),
        u = n(0),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = this,
            r = this.getProgramCount(t, e);

        if (!this.artifacts) {
          this.artifacts = [];

          for (var o = 0; o < r; ++o) {
            var i = this.createProgramInfo(t, e[0], o),
                a = t.session.programManager.build(i);
            this.artifacts.push(a);
          }
        }

        var u = [];
        return this.artifacts.forEach(function (r) {
          var o = n.createRunData(t, r.programInfo, e);
          t.session.programManager.run(r, o), u.push(o.outputTextureData.tensor);
        }), u;
      }, e.prototype.getProgramCount = function (t, e) {
        return i(u.SplitUtil.splitShape(e[0].dims, this.axis, this.split, this.numOutputs), 2)[1].length;
      }, e.prototype.createProgramInfo = function (t, e, n) {
        var r = i(u.SplitUtil.splitShape(e.dims, this.axis, this.split, this.numOutputs), 2),
            o = r[0],
            a = r[1][n],
            s = o[n],
            l = "\n      float process(int indices[" + s.length + "]) {\n        indices[" + this.axis + "] += " + a + ";\n        return _A(indices);\n      }";
        return {
          inputLayouts: [t.getOrCreateTextureLayout(e)],
          outputLayout: t.createTextureLayoutFromShape(s),
          samplers: ["A"],
          shaderSource: l
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(a.Split);

    e.WebGLSplit = s;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = function () {
      function t(t) {
        this.numOutputs = t;
      }

      return t.prototype.initialize = function (t) {
        this.axis = t.getInt("axis", 0), this.split = t.getInts("split", []);
      }, t.prototype.checkInputs = function (t) {
        return !(!t || 1 !== t.length) && this.checkInputTypes(t);
      }, t.prototype.checkInputTypes = function (t) {
        return "int8" === t[0].type || "uint8" === t[0].type || "int16" === t[0].type || "uint16" === t[0].type || "int32" === t[0].type || "uint32" === t[0].type || "float32" === t[0].type || "float64" === t[0].type || "bool" === t[0].type;
      }, t;
    }();

    e.Split = r;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(38),
        a = n(0),
        u = n(10),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = a.ShapeUtil.squeezeShape(e[0].dims, this.axes);
        return [u.reshape(t, e[0], n)];
      }, e;
    }(i.Squeeze);

    e.WebGLSqueeze = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(22),
        a = n(2),
        u = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = a.getGlsl(t.session.backend.glContext.version),
            r = e[0].dims.slice(),
            o = e.map(function (t, e) {
          return n.texture2D + "(X" + e + ",TexCoords)";
        }).join(" + "),
            i = e.map(function (t, e) {
          return "X" + e;
        });
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(r),
          samplers: i,
          shaderSource: "\n      void main() {\n        vec4 result = " + o + ";\n        " + n.output + " = result;\n      }",
          hasMain: !0
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        });
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.Sum);

    e.WebGLSum = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        for (var n = e[0].dims.slice(), r = new Array(n.length), o = [], i = 0; i < n.length; i++) r[i] = n[i] * e[1].numberData[i], o.push("inputIdx[" + i + "] = int(mod(float(outputIdx[" + i + "]), " + n[i] + ".));");

        var a = r.length,
            u = "\n    float process(int outputIdx[" + a + "]) {\n      int inputIdx[" + a + "];\n      " + o.join("\n") + "\n      return _A(inputIdx);\n    }";
        return {
          inputLayouts: e.map(function (e) {
            return t.getOrCreateTextureLayout(e);
          }),
          outputLayout: t.createTextureLayoutFromShape(r),
          samplers: ["A"],
          shaderSource: u
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = n.map(function (n, r) {
          return t.getOrCreateTextureData(n, e.inputLayouts[r]);
        });
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(n(39).Tile);

    e.WebGLTile = i;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        a = this && this.__spread || function () {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(i(arguments[e]));

      return t;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var u = n(40),
        s = n(0),
        l = n(5),
        c = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.getOutputShape = function (t) {
        var e = this.getAdjustedPerm(t[0]);
        return s.ShapeUtil.sortBasedOnPerm(t[0], e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e.map(function (t) {
          return t.dims.slice();
        }),
            r = this.getAdjustedPerm(n[0]),
            o = this.getOutputShape(n),
            i = e[0].dims.length,
            a = "\n      " + this.getPermFunctionBody("perm", r, i) + "\n      float process(int indices[" + i + "]) {\n        int a[" + i + "];\n        perm(a, indices);\n        return _A(a);\n      }",
            u = t.createTextureLayoutFromShape(o, 1, o);
        return {
          inputLayouts: [t.getOrCreateTextureLayout(e[0])],
          outputLayout: u,
          samplers: ["A"],
          shaderSource: a
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e.prototype.getPositionalFunction = function (t, e, n) {
        var r = this.getOutputShape([e]);
        return n || (n = "perm"), {
          name: n,
          body: this.getPermFunctionBody(n, this.getAdjustedPerm(e), r.length),
          type: l.FunctionType.Positional,
          inputShape: e,
          outputShape: r
        };
      }, e.prototype.getAdjustedPerm = function (t) {
        var e = this.perm;
        return e && e.length !== t.length && (e = a(t.keys()).reverse()), e;
      }, e.prototype.getPermFunctionBody = function (t, e, n) {
        var r = [];
        r.push("void " + t + "(out int a[" + n + "], int src[" + n + "]) {");

        for (var o = 0; o < n; ++o) r.push("\ta[" + e[o] + "]=src[" + o + "];");

        return r.push("\t}"), r.join("\n");
      }, e;
    }(u.Transpose);

    e.WebGLTranspose = c;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(42),
        a = n(5),
        u = n(2),
        s = function (t) {
      function e(e, n) {
        var r = t.call(this, e) || this;
        return r.typeConstraint = e, r.glslFunc = n, r;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        return t.run(this, e);
      }, e.prototype.createProgramInfo = function (t, e) {
        var n = e[0].dims.slice(),
            r = t.getOrCreateTextureLayout(e[0]),
            o = u.getGlsl(t.session.backend.glContext.version),
            i = "\n      " + this.glslFunc.body + "\n      void main() {\n        vec4 v = " + o.texture2D + "(A, TexCoords);\n        v = " + this.glslFunc.name + "(v);\n        " + o.output + " = v;\n      }\n      ";
        return {
          inputLayouts: [r],
          outputLayout: t.createTextureLayoutFromShape(n),
          samplers: ["A"],
          shaderSource: i,
          hasMain: !0
        };
      }, e.prototype.createRunData = function (t, e, n) {
        var r = [t.getOrCreateTextureData(n[0], e.inputLayouts[0])];
        return {
          inputTextureDatas: r,
          outputTextureData: t.createTextureDataFromLayout(e.outputLayout, r[0].tensor.type),
          uniformData: {}
        };
      }, e;
    }(i.UnaryOp);

    function l(t) {
      var e = t + "_";
      return {
        body: "\n  float " + e + "(float a) {\n    return " + t + "(a);\n  }\n  vec4 " + e + "(vec4 v) {\n    return " + t + "(v);\n  }\n  ",
        name: e,
        type: a.FunctionType.ValueBased
      };
    }

    e.WebGLUnaryOp = s, e.glslAbs = function () {
      return l("abs");
    }, e.glslAcos = function () {
      return l("acos");
    }, e.glslAsin = function () {
      return l("asin");
    }, e.glslAtan = function () {
      return l("atan");
    }, e.glslCeil = function () {
      return l("ceil");
    }, e.glslCos = function () {
      return l("cos");
    }, e.glslExp = function () {
      return l("exp");
    }, e.glslFloor = function () {
      return l("floor");
    }, e.glslIdentity = function () {
      var t = "indentity_";
      return {
        body: "\n  float indentity_(float a) {\n    return a;\n  }\n  vec4 indentity_(vec4 v) {\n    return v;\n  }\n  ",
        name: t,
        type: a.FunctionType.ValueBased
      };
    }, e.glslLog = function () {
      return l("log");
    }, e.glslNeg = function () {
      return {
        body: "\n  float neg_(float a) {\n    return -a;\n  }\n  vec4 neg_(vec4 v) {\n    return -v;\n  }\n  ",
        name: "neg_",
        type: a.FunctionType.ValueBased
      };
    }, e.glslNot = function () {
      return {
        body: "\n  float not_(float a) {\n    return float( ! bool(a) );\n  }\n  bool not_(bool a) {\n    return !a;\n  }\n  vec4 not_(vec4 v) {\n    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));\n  }\n  bvec4 not_(bvec4 v) {\n    return bvec4(!v.x, !v.y, !v.z, !v.w);\n  }\n  ",
        name: "not_",
        type: a.FunctionType.ValueBased
      };
    }, e.glslSin = function () {
      return l("sin");
    }, e.glslRelu = function () {
      return {
        body: "\n  float relu_(float a) {\n    return max( a, 0.0 );\n  }\n  vec4 relu_(vec4 v) {\n    return max( v, 0.0 );\n  }\n  ",
        name: "relu_",
        type: a.FunctionType.ValueBased
      };
    }, e.glslSigmoid = function () {
      var t = "sigmoid_";
      return {
        body: "\n  float sigmoid_(float a) {\n    return 1.0 / (1.0 + exp(-a));\n  }\n  vec4 sigmoid_(vec4 v) {\n    return 1.0 / (1.0 + exp(-v));\n  }\n  ",
        name: t,
        type: a.FunctionType.ValueBased
      };
    }, e.glslSqrt = function () {
      return l("sqrt");
    }, e.glslTan = function () {
      return l("tan");
    }, e.glslTanh = function () {
      return {
        body: "\n  float tanh_(float a) {\n    a = clamp(a, -10., 10.);\n    a = exp(2.*a);\n    return (a - 1.) / (a + 1.);\n  }\n  vec4 tanh_(vec4 v) {\n    v = clamp(v, -10., 10.);\n    v = exp(2.*v);\n    return (v - 1.) / (v + 1.);\n  }\n  ",
        name: "tanh_",
        type: a.FunctionType.ValueBased
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(43),
        a = n(0),
        u = n(10),
        s = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return o(e, t), e.prototype.run = function (t, e) {
        var n = a.ShapeUtil.unsqueezeShape(e[0].dims, this.axes);
        return [u.reshape(t, e[0], n)];
      }, e;
    }(i.Unsqueeze);

    e.WebGLUnsqueeze = s;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__assign || function () {
      return (r = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    },
        o = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var i = n(24),
        a = n(3),
        u = n(150),
        s = n(2),
        l = function () {
      function t(t, e) {
        this.profiler = t, this.glContext = e, this.repo = new Map(), this.attributesBound = !1;
      }

      return t.prototype.getArtifact = function (t) {
        return this.repo.get(t);
      }, t.prototype.setArtifact = function (t, e) {
        this.repo.set(t, e);
      }, t.prototype.run = function (t, e) {
        var n = this;
        this.profiler.event("backend", "ProgramManager.run", function () {
          var r = n.glContext.gl,
              o = t.program;
          r.useProgram(o);

          try {
            n.bindOutput(e.outputTextureData), n.attributesBound || n.bindAttributes(t.attribLocations), n.bindUniforms(t.uniformLocations, e.uniformData, e.inputTextureDatas);
          } catch (e) {
            throw a.Logger.error("ProgramManager", t.programInfo.shaderSource), e;
          }

          n.profiler.event("backend", "GlContext.draw()", function () {
            n.doDraw(t, e), r.flush();
          });
        });
      }, t.prototype.dispose = function () {
        var t = this;
        this.vertexShader && this.glContext.deleteShader(this.vertexShader), this.repo.forEach(function (e) {
          return t.glContext.deleteProgram(e.program);
        });
      }, t.prototype.build = function (t) {
        var e = this;
        return this.profiler.event("backend", "ProgramManager.build", function () {
          var n = new u.GlslPreprocessor(e.glContext, t),
              r = n.preprocess(),
              o = e.compile(r);
          return {
            programInfo: t,
            program: o,
            uniformLocations: e.getUniformLocations(o, n.context.programInfo.samplers, n.context.programInfo.variables),
            attribLocations: e.getAttribLocations(o)
          };
        });
      }, t.prototype.doDraw = function (t, e) {
        e.draw ? (a.Logger.verbose("ProgramManager", "Custom draw function"), e.draw(this.glContext, t)) : this.glContext.draw();
      }, t.prototype.compile = function (t) {
        if (!this.vertexShader) {
          a.Logger.verbose("ProrgramManager", "Compiling and caching Vertex shader for the first time");
          var e = s.getVertexShaderSource(this.glContext.version);
          this.vertexShader = this.glContext.compileShader(e, this.glContext.gl.VERTEX_SHADER);
        }

        i.env.debug && a.Logger.verbose("ProrgramManager", "FragShader:\n" + t + "\n");
        var n = this.glContext.compileShader(t, this.glContext.gl.FRAGMENT_SHADER),
            r = this.glContext.createProgram(this.vertexShader, n);
        return this.glContext.deleteShader(n), r;
      }, t.prototype.bindOutput = function (t) {
        a.Logger.verbose("ProrgramManager", "Binding output texture to Framebuffer: w/h=" + t.width + "/" + t.height + ", shape=" + t.shape + ", type=" + t.tensor.type), this.glContext.attachFramebuffer(t.texture, t.width, t.height);
      }, t.prototype.bindAttributes = function (t) {
        var e = t.position,
            n = t.textureCoord;
        this.glContext.setVertexAttributes(e, n), this.attributesBound = !0;
      }, t.prototype.bindUniforms = function (t, e, n) {
        var r,
            i,
            a = this.glContext.gl,
            u = 0;

        try {
          for (var s = o(t), l = s.next(); !l.done; l = s.next()) {
            var c = l.value,
                f = c.name,
                p = c.type,
                h = c.location,
                d = c.arrayLength;

            switch (p) {
              case "sampler2D":
                this.bindTexture(n[u], h, u), u++;
                break;

              case "float":
                d ? a.uniform1fv(h, e[f]) : a.uniform1f(h, e[f]);
                break;

              case "int":
                d ? a.uniform1iv(h, e[f]) : a.uniform1i(h, e[f]);
                break;

              default:
                throw new Error("Uniform not implemented: " + p);
            }
          }
        } catch (t) {
          r = {
            error: t
          };
        } finally {
          try {
            l && !l.done && (i = s.return) && i.call(s);
          } finally {
            if (r) throw r.error;
          }
        }
      }, t.prototype.bindTexture = function (t, e, n) {
        this.glContext.bindTextureToUniform(t.texture, n, e);
      }, t.prototype.getAttribLocations = function (t) {
        return {
          position: this.getAttribLocation(t, "position"),
          textureCoord: this.getAttribLocation(t, "textureCoord")
        };
      }, t.prototype.getUniformLocations = function (t, e, n) {
        var i,
            a,
            u,
            s,
            l = [];
        if (e) try {
          for (var c = o(e), f = c.next(); !f.done; f = c.next()) {
            var p = f.value;
            l.push({
              name: p,
              type: "sampler2D",
              location: this.getUniformLocation(t, p)
            });
          }
        } catch (t) {
          i = {
            error: t
          };
        } finally {
          try {
            f && !f.done && (a = c.return) && a.call(c);
          } finally {
            if (i) throw i.error;
          }
        }
        if (n) try {
          for (var h = o(n), d = h.next(); !d.done; d = h.next()) {
            var y = d.value;
            l.push(r({}, y, {
              location: this.getUniformLocation(t, y.name)
            }));
          }
        } catch (t) {
          u = {
            error: t
          };
        } finally {
          try {
            d && !d.done && (s = h.return) && s.call(h);
          } finally {
            if (u) throw u.error;
          }
        }
        return l;
      }, t.prototype.getUniformLocation = function (t, e) {
        var n = this.glContext.gl.getUniformLocation(t, e);
        if (null === n) throw new Error("Uniform " + e + " not found.");
        return n;
      }, t.prototype.getAttribLocation = function (t, e) {
        return this.glContext.gl.getAttribLocation(t, e);
      }, t;
    }();

    e.ProgramManager = l;
  }, function (t, e, n) {
    (function (t, r) {
      var o;
      /*!
       * Platform.js <https://mths.be/platform>
       * Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
       * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
       * Available under MIT license <https://mths.be/mit>
       */

      (function () {
        "use strict";

        var i = {
          function: !0,
          object: !0
        },
            a = i[typeof window] && window || this,
            u = i[typeof e] && e,
            s = i[typeof t] && t && !t.nodeType && t,
            l = u && s && "object" == typeof r && r;
        !l || l.global !== l && l.window !== l && l.self !== l || (a = l);
        var c = Math.pow(2, 53) - 1,
            f = /\bOpera/,
            p = Object.prototype,
            h = p.hasOwnProperty,
            d = p.toString;

        function y(t) {
          return (t = String(t)).charAt(0).toUpperCase() + t.slice(1);
        }

        function g(t) {
          return t = _(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : y(t);
        }

        function m(t, e) {
          for (var n in t) h.call(t, n) && e(t[n], n, t);
        }

        function v(t) {
          return null == t ? y(t) : d.call(t).slice(8, -1);
        }

        function b(t) {
          return String(t).replace(/([ -])(?!$)/g, "$1?");
        }

        function w(t, e) {
          var n = null;
          return function (t, e) {
            var n = -1,
                r = t ? t.length : 0;
            if ("number" == typeof r && r > -1 && r <= c) for (; ++n < r;) e(t[n], n, t);else m(t, e);
          }(t, function (r, o) {
            n = e(n, r, o, t);
          }), n;
        }

        function _(t) {
          return String(t).replace(/^ +| +$/g, "");
        }

        var x = function t(e) {
          var n = a,
              r = e && "object" == typeof e && "String" != v(e);
          r && (n = e, e = null);
          var o = n.navigator || {},
              i = o.userAgent || "";
          e || (e = i);

          var u,
              s,
              l,
              c,
              p,
              h = r ? !!o.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(d.toString()),
              y = r ? "Object" : "ScriptBridgingProxyObject",
              x = r ? "Object" : "Environment",
              T = r && n.java ? "JavaPackage" : v(n.java),
              O = r ? "Object" : "RuntimeObject",
              S = /\bJava/.test(T) && n.java,
              P = S && v(n.environment) == x,
              A = S ? "a" : "α",
              D = S ? "b" : "β",
              E = n.document || {},
              I = n.operamini || n.opera,
              L = f.test(L = r && I ? I["[[Class]]"] : v(I)) ? L : I = null,
              k = e,
              M = [],
              j = null,
              R = e == i,
              C = R && I && "function" == typeof I.version && I.version(),
              N = w([{
            label: "EdgeHTML",
            pattern: "Edge"
          }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
          }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function (t, n) {
            return t || RegExp("\\b" + (n.pattern || b(n)) + "\\b", "i").exec(e) && (n.label || n);
          }),
              F = function (t) {
            return w(t, function (t, n) {
              return t || RegExp("\\b" + (n.pattern || b(n)) + "\\b", "i").exec(e) && (n.label || n);
            });
          }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
            label: "Microsoft Edge",
            pattern: "Edge"
          }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
            label: "Samsung Internet",
            pattern: "SamsungBrowser"
          }, "SeaMonkey", {
            label: "Silk",
            pattern: "(?:Cloud9|Silk-Accelerated)"
          }, "Sleipnir", "SlimBrowser", {
            label: "SRWare Iron",
            pattern: "Iron"
          }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
            label: "Opera Mini",
            pattern: "OPiOS"
          }, "Opera", {
            label: "Opera",
            pattern: "OPR"
          }, "Chrome", {
            label: "Chrome Mobile",
            pattern: "(?:CriOS|CrMo)"
          }, {
            label: "Firefox",
            pattern: "(?:Firefox|Minefield)"
          }, {
            label: "Firefox for iOS",
            pattern: "FxiOS"
          }, {
            label: "IE",
            pattern: "IEMobile"
          }, {
            label: "IE",
            pattern: "MSIE"
          }, "Safari"]),
              B = z([{
            label: "BlackBerry",
            pattern: "BB10"
          }, "BlackBerry", {
            label: "Galaxy S",
            pattern: "GT-I9000"
          }, {
            label: "Galaxy S2",
            pattern: "GT-I9100"
          }, {
            label: "Galaxy S3",
            pattern: "GT-I9300"
          }, {
            label: "Galaxy S4",
            pattern: "GT-I9500"
          }, {
            label: "Galaxy S5",
            pattern: "SM-G900"
          }, {
            label: "Galaxy S6",
            pattern: "SM-G920"
          }, {
            label: "Galaxy S6 Edge",
            pattern: "SM-G925"
          }, {
            label: "Galaxy S7",
            pattern: "SM-G930"
          }, {
            label: "Galaxy S7 Edge",
            pattern: "SM-G935"
          }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
            label: "Kindle Fire",
            pattern: "(?:Cloud9|Silk-Accelerated)"
          }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
            label: "Wii U",
            pattern: "WiiU"
          }, "Wii", "Xbox One", {
            label: "Xbox 360",
            pattern: "Xbox"
          }, "Xoom"]),
              U = function (t) {
            return w(t, function (t, n, r) {
              return t || (n[B] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(B)] || RegExp("\\b" + b(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r;
            });
          }({
            Apple: {
              iPad: 1,
              iPhone: 1,
              iPod: 1
            },
            Archos: {},
            Amazon: {
              Kindle: 1,
              "Kindle Fire": 1
            },
            Asus: {
              Transformer: 1
            },
            "Barnes & Noble": {
              Nook: 1
            },
            BlackBerry: {
              PlayBook: 1
            },
            Google: {
              "Google TV": 1,
              Nexus: 1
            },
            HP: {
              TouchPad: 1
            },
            HTC: {},
            LG: {},
            Microsoft: {
              Xbox: 1,
              "Xbox One": 1
            },
            Motorola: {
              Xoom: 1
            },
            Nintendo: {
              "Wii U": 1,
              Wii: 1
            },
            Nokia: {
              Lumia: 1
            },
            Samsung: {
              "Galaxy S": 1,
              "Galaxy S2": 1,
              "Galaxy S3": 1,
              "Galaxy S4": 1
            },
            Sony: {
              PlayStation: 1,
              "PlayStation Vita": 1
            }
          }),
              G = function (t) {
            return w(t, function (t, n) {
              var r = n.pattern || b(n);
              return !t && (t = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = function (t, e, n) {
                var r = {
                  "10.0": "10",
                  6.4: "10 Technical Preview",
                  6.3: "8.1",
                  6.2: "8",
                  6.1: "Server 2008 R2 / 7",
                  "6.0": "Server 2008 / Vista",
                  5.2: "Server 2003 / XP 64-bit",
                  5.1: "XP",
                  5.01: "2000 SP1",
                  "5.0": "2000",
                  "4.0": "NT",
                  "4.90": "ME"
                };
                return e && n && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (r = r[/[\d.]+$/.exec(t)]) && (t = "Windows " + r), t = String(t), e && n && (t = t.replace(RegExp(e, "i"), n)), t = g(t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]);
              }(t, r, n.label || n)), t;
            });
          }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
          }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);

          function z(t) {
            return w(t, function (t, n) {
              var r = n.pattern || b(n);
              return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = g(t[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))), t;
            });
          }

          if (N && (N = [N]), U && !B && (B = z([U])), (u = /\bGoogle TV\b/.exec(B)) && (B = u[0]), /\bSimulator\b/i.test(e) && (B = (B ? B + " " : "") + "Simulator"), "Opera Mini" == F && /\bOPiOS\b/.test(e) && M.push("running in Turbo/Uncompressed mode"), "IE" == F && /\blike iPhone OS\b/.test(e) ? (U = (u = t(e.replace(/like iPhone OS/, ""))).manufacturer, B = u.product) : /^iP/.test(B) ? (F || (F = "Safari"), G = "iOS" + ((u = / OS ([\d_]+)/i.exec(e)) ? " " + u[1].replace(/_/g, ".") : "")) : "Konqueror" != F || /buntu/i.test(G) ? U && "Google" != U && (/Chrome/.test(F) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(B)) || /\bAndroid\b/.test(G) && /^Chrome/.test(F) && /\bVersion\//i.test(e) ? (F = "Android Browser", G = /\bAndroid\b/.test(G) ? G : "Android") : "Silk" == F ? (/\bMobi/i.test(e) || (G = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && M.unshift("accelerated")) : "PaleMoon" == F && (u = /\bFirefox\/([\d.]+)\b/.exec(e)) ? M.push("identifying as Firefox " + u[1]) : "Firefox" == F && (u = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (G || (G = "Firefox OS"), B || (B = u[1])) : !F || (u = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(F)) ? (F && !B && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(u + "/") + 8)) && (F = null), (u = B || U || G) && (B || U || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(G)) && (F = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(G) ? G : u) + " Browser")) : "Electron" == F && (u = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && M.push("Chromium " + u) : G = "Kubuntu", C || (C = w(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", b(F), "(?:Firefox|Minefield|NetFront)"], function (t, n) {
            return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null;
          })), (u = ("iCab" == N && parseFloat(C) > 3 ? "WebKit" : /\bOpera\b/.test(F) && (/\bOPR\b/.test(e) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(N) && "WebKit" || !N && /\bMSIE\b/i.test(e) && ("Mac OS" == G ? "Tasman" : "Trident") || "WebKit" == N && /\bPlayStation\b(?! Vita\b)/i.test(F) && "NetFront") && (N = [u]), "IE" == F && (u = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (F += " Mobile", G = "Windows Phone " + (/\+$/.test(u) ? u : u + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (F = "IE Mobile", G = "Windows Phone 8.x", M.unshift("desktop mode"), C || (C = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != F && "Trident" == N && (u = /\brv:([\d.]+)/.exec(e)) && (F && M.push("identifying as " + F + (C ? " " + C : "")), F = "IE", C = u[1]), R) {
            if (c = "global", p = null != (l = n) ? typeof l[c] : "number", /^(?:boolean|number|string|undefined)$/.test(p) || "object" == p && !l[c]) v(u = n.runtime) == y ? (F = "Adobe AIR", G = u.flash.system.Capabilities.os) : v(u = n.phantom) == O ? (F = "PhantomJS", C = (u = u.version || null) && u.major + "." + u.minor + "." + u.patch) : "number" == typeof E.documentMode && (u = /\bTrident\/(\d+)/i.exec(e)) ? (C = [C, E.documentMode], (u = +u[1] + 4) != C[1] && (M.push("IE " + C[1] + " mode"), N && (N[1] = ""), C[1] = u), C = "IE" == F ? String(C[1].toFixed(1)) : C[0]) : "number" == typeof E.documentMode && /^(?:Chrome|Firefox)\b/.test(F) && (M.push("masking as " + F + " " + C), F = "IE", C = "11.0", N = ["Trident"], G = "Windows");else if (S && (k = (u = S.lang.System).getProperty("os.arch"), G = G || u.getProperty("os.name") + " " + u.getProperty("os.version")), P) {
              try {
                C = n.require("ringo/engine").version.join("."), F = "RingoJS";
              } catch (t) {
                (u = n.system) && u.global.system == n.system && (F = "Narwhal", G || (G = u[0].os || null));
              }

              F || (F = "Rhino");
            } else "object" == typeof n.process && !n.process.browser && (u = n.process) && ("object" == typeof u.versions && ("string" == typeof u.versions.electron ? (M.push("Node " + u.versions.node), F = "Electron", C = u.versions.electron) : "string" == typeof u.versions.nw && (M.push("Chromium " + C, "Node " + u.versions.node), F = "NW.js", C = u.versions.nw)), F || (F = "Node.js", k = u.arch, G = u.platform, C = (C = /[\d.]+/.exec(u.version)) ? C[0] : null));
            G = G && g(G);
          }

          if (C && (u = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(C) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (R && o.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (j = /b/i.test(u) ? "beta" : "alpha", C = C.replace(RegExp(u + "\\+?$"), "") + ("beta" == j ? D : A) + (/\d+\+?/.exec(u) || "")), "Fennec" == F || "Firefox" == F && /\b(?:Android|Firefox OS)\b/.test(G)) F = "Firefox Mobile";else if ("Maxthon" == F && C) C = C.replace(/\.[\d.]+/, ".x");else if (/\bXbox\b/i.test(B)) "Xbox 360" == B && (G = null), "Xbox 360" == B && /\bIEMobile\b/.test(e) && M.unshift("mobile mode");else if (!/^(?:Chrome|IE|Opera)$/.test(F) && (!F || B || /Browser|Mobi/.test(F)) || "Windows CE" != G && !/Mobi/i.test(e)) {
            if ("IE" == F && R) try {
              null === n.external && M.unshift("platform preview");
            } catch (t) {
              M.unshift("embedded");
            } else (/\bBlackBerry\b/.test(B) || /\bBB10\b/.test(e)) && (u = (RegExp(B.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || C) ? (G = ((u = [u, /BB10/.test(e)])[1] ? (B = null, U = "BlackBerry") : "Device Software") + " " + u[0], C = null) : this != m && "Wii" != B && (R && I || /Opera/.test(F) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == F && /\bOS X (?:\d+\.){2,}/.test(G) || "IE" == F && (G && !/^Win/.test(G) && C > 5.5 || /\bWindows XP\b/.test(G) && C > 8 || 8 == C && !/\bTrident\b/.test(e))) && !f.test(u = t.call(m, e.replace(f, "") + ";")) && u.name && (u = "ing as " + u.name + ((u = u.version) ? " " + u : ""), f.test(F) ? (/\bIE\b/.test(u) && "Mac OS" == G && (G = null), u = "identify" + u) : (u = "mask" + u, F = L ? g(L.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(u) && (G = null), R || (C = null)), N = ["Presto"], M.push(u));
          } else F += " Mobile";
          (u = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (u = [parseFloat(u.replace(/\.(\d)$/, ".0$1")), u], "Safari" == F && "+" == u[1].slice(-1) ? (F = "WebKit Nightly", j = "alpha", C = u[1].slice(0, -1)) : C != u[1] && C != (u[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1]) || (C = null), u[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == u[0] && 537.36 == u[2] && parseFloat(u[1]) >= 28 && "WebKit" == N && (N = ["Blink"]), R && (h || u[1]) ? (N && (N[1] = "like Chrome"), u = u[1] || ((u = u[0]) < 530 ? 1 : u < 532 ? 2 : u < 532.05 ? 3 : u < 533 ? 4 : u < 534.03 ? 5 : u < 534.07 ? 6 : u < 534.1 ? 7 : u < 534.13 ? 8 : u < 534.16 ? 9 : u < 534.24 ? 10 : u < 534.3 ? 11 : u < 535.01 ? 12 : u < 535.02 ? "13+" : u < 535.07 ? 15 : u < 535.11 ? 16 : u < 535.19 ? 17 : u < 536.05 ? 18 : u < 536.1 ? 19 : u < 537.01 ? 20 : u < 537.11 ? "21+" : u < 537.13 ? 23 : u < 537.18 ? 24 : u < 537.24 ? 25 : u < 537.36 ? 26 : "Blink" != N ? "27" : "28")) : (N && (N[1] = "like Safari"), u = (u = u[0]) < 400 ? 1 : u < 500 ? 2 : u < 526 ? 3 : u < 533 ? 4 : u < 534 ? "4+" : u < 535 ? 5 : u < 537 ? 6 : u < 538 ? 7 : u < 601 ? 8 : "8"), N && (N[1] += " " + (u += "number" == typeof u ? ".x" : /[.+]/.test(u) ? "" : "+")), "Safari" == F && (!C || parseInt(C) > 45) && (C = u)), "Opera" == F && (u = /\bzbov|zvav$/.exec(G)) ? (F += " ", M.unshift("desktop mode"), "zvav" == u ? (F += "Mini", C = null) : F += "Mobile", G = G.replace(RegExp(" *" + u + "$"), "")) : "Safari" == F && /\bChrome\b/.exec(N && N[1]) && (M.unshift("desktop mode"), F = "Chrome Mobile", C = null, /\bOS X\b/.test(G) ? (U = "Apple", G = "iOS 4.3+") : G = null), C && 0 == C.indexOf(u = /[\d.]+$/.exec(G)) && e.indexOf("/" + u + "-") > -1 && (G = _(G.replace(u, ""))), N && !/\b(?:Avant|Nook)\b/.test(F) && (/Browser|Lunascape|Maxthon/.test(F) || "Safari" != F && /^iOS/.test(G) && /\bSafari\b/.test(N[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(F) && N[1]) && (u = N[N.length - 1]) && M.push(u), M.length && (M = ["(" + M.join("; ") + ")"]), U && B && B.indexOf(U) < 0 && M.push("on " + U), B && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + B), G && (u = / ([\d.+]+)$/.exec(G), s = u && "/" == G.charAt(G.length - u[0].length - 1), G = {
            architecture: 32,
            family: u && !s ? G.replace(u[0], "") : G,
            version: u ? u[1] : null,
            toString: function () {
              var t = this.version;
              return this.family + (t && !s ? " " + t : "") + (64 == this.architecture ? " 64-bit" : "");
            }
          }), (u = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(k)) && !/\bi686\b/i.test(k) ? (G && (G.architecture = 64, G.family = G.family.replace(RegExp(" *" + u), "")), F && (/\bWOW64\b/i.test(e) || R && /\w(?:86|32)$/.test(o.cpuClass || o.platform) && !/\bWin64; x64\b/i.test(e)) && M.unshift("32-bit")) : G && /^OS X/.test(G.family) && "Chrome" == F && parseFloat(C) >= 39 && (G.architecture = 64), e || (e = null);
          var W = {};
          return W.description = e, W.layout = N && N[0], W.manufacturer = U, W.name = F, W.prerelease = j, W.product = B, W.ua = e, W.version = F && C, W.os = G || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
              return "null";
            }
          }, W.parse = t, W.toString = function () {
            return this.description || "";
          }, W.version && M.unshift(C), W.name && M.unshift(F), G && F && (G != String(G).split(" ")[0] || G != F.split(" ")[0] && !B) && M.push(B ? "(" + G + ")" : "on " + G), M.length && (W.description = M.join(" ")), W;
        }();

        a.platform = x, void 0 === (o = function () {
          return x;
        }.call(e, n, e, t)) || (t.exports = o);
      }).call(this);
    }).call(this, n(149)(t), n(8));
  }, function (t, e) {
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
        enumerable: !0,
        get: function () {
          return t.l;
        }
      }), Object.defineProperty(t, "id", {
        enumerable: !0,
        get: function () {
          return t.i;
        }
      }), t.webpackPolyfill = 1), t;
    };
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = n(5),
        i = n(151),
        a = n(152),
        u = n(2),
        s = function () {
      function t(t, e) {
        var n = this;
        this.libs = {}, this.glslLibRoutineDependencyGraph = {}, this.context = new o.GlslContext(t, e), Object.keys(a.glslRegistry).forEach(function (t) {
          var e = new a.glslRegistry[t](n.context);
          n.libs[t] = e;
        });
        var r = this.glslLibRoutineDependencyGraph;

        for (var i in this.libs) {
          var u = this.libs[i].getFunctions();

          for (var s in u) {
            var l = i + "." + s,
                c = void 0;
            r[l] ? (c = r[l]).routineBody = u[s].routineBody : (c = new o.GlslLibRoutineNode(l, u[s].routineBody), r[l] = c);
            var f = u[s].dependencies;
            if (f) for (var p = 0; p < f.length; ++p) if (r[f[p]]) c.addDependency(r[f[p]]);else {
              var h = new o.GlslLibRoutineNode(f[p]);
              r[f[p]] = h, c.addDependency(h);
            }
          }
        }
      }

      return t.prototype.preprocess = function () {
        var t = this.context.programInfo,
            e = t.shaderSource;
        return this.context.programInfo.hasMain || (e = e + "\n      " + u.getDefaultFragShaderMain(this.context.glContext.version, t.outputLayout.shape.length)), e = i.replaceInlines(e), u.getFragShaderPreamble(this.context.glContext.version) + "\n    " + this.getUniforms(t.samplers, t.variables) + "\n    " + this.getImports(e) + "\n    " + e;
      }, t.prototype.getImports = function (t) {
        var e = this.selectGlslLibRoutinesToBeIncluded(t);
        if (0 === e.length) return "";

        for (var n = "", r = 0; r < e.length; ++r) {
          if (!e[r].routineBody) throw new Error("Missing body for the Glsl Library routine: " + e[r].name);
          n += e[r].routineBody + "\n";
        }

        return n;
      }, t.prototype.selectGlslLibRoutinesToBeIncluded = function (t) {
        var e = this,
            n = [];
        return Object.keys(this.glslLibRoutineDependencyGraph).forEach(function (r) {
          var o = r.split(".")[1];
          -1 !== t.indexOf(o) && n.push(e.glslLibRoutineDependencyGraph[r]);
        }), o.TopologicalSortGlslRoutines.returnOrderedNodes(n);
      }, t.prototype.getUniforms = function (t, e) {
        var n,
            o,
            i,
            a,
            u = [];
        if (t) try {
          for (var s = r(t), l = s.next(); !l.done; l = s.next()) {
            var c = l.value;
            u.push("uniform sampler2D " + c + ";");
          }
        } catch (t) {
          n = {
            error: t
          };
        } finally {
          try {
            l && !l.done && (o = s.return) && o.call(s);
          } finally {
            if (n) throw n.error;
          }
        }
        if (e) try {
          for (var f = r(e), p = f.next(); !p.done; p = f.next()) {
            var h = p.value;
            u.push("uniform " + h.type + " " + h.name + (h.arrayLength ? "[" + h.arrayLength + "]" : "") + ";");
          }
        } catch (t) {
          i = {
            error: t
          };
        } finally {
          try {
            p && !p.done && (a = f.return) && a.call(f);
          } finally {
            if (i) throw i.error;
          }
        }
        return u.join("\n");
      }, t;
    }();

    e.GlslPreprocessor = s;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = /@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,
        o = "(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;";

    e.replaceInlines = function (t) {
      for (var e, n = {}; null !== (e = r.exec(t));) {
        var i = e[3].split(",").map(function (t) {
          var e = t.trim().split(" ");
          return e && 2 === e.length ? {
            type: e[0],
            name: e[1]
          } : null;
        }).filter(function (t) {
          return null !== t;
        });
        n[e[2]] = {
          params: i,
          body: e[4]
        };
      }

      for (var a in n) for (var u = o.replace("__FUNC__", a), s = new RegExp(u, "gm"), l = function () {
        var r = e[1],
            o = e[2],
            i = e[3].split(","),
            u = r ? r + " " + o + ";" : "",
            s = n[a].body,
            l = "";
        n[a].params.forEach(function (t, e) {
          t && (l += t.type + " " + t.name + " = " + i[e] + ";\n");
        });
        var c = "\n      " + u + "\n      {\n        " + (s = (s = l + "\n " + s).replace("return", o + " = ")) + "\n      }\n      ";
        t = t.replace(e[0], c);
      }; null !== (e = s.exec(t));) l();

      return t = t.replace(r, "");
    };
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = n(153),
        o = n(154),
        i = n(155),
        a = n(156),
        u = n(157);
    e.glslRegistry = {
      encoding: o.EncodingGlslLib,
      fragcolor: i.FragColorGlslLib,
      vec: u.VecGlslLib,
      shapeUtils: a.ShapeUtilsGlslLib,
      coordinates: r.CoordsGlslLib
    };
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__assign || function () {
      return (i = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(5),
        u = n(2),
        s = function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return o(e, t), e.prototype.getFunctions = function () {
        return i({}, this.offsetToCoords(), this.coordsToOffset(), this.toVec(), this.valueFrom());
      }, e.prototype.getCustomTypes = function () {
        return {};
      }, e.prototype.offsetToCoords = function () {
        return {
          offsetToCoords: new a.GlslLibRoutine("\n      vec2 offsetToCoords(int offset, int width, int height) {\n        int t = offset / width;\n        int s = offset - t*width;\n        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);\n        return coords;\n      }\n      ")
        };
      }, e.prototype.coordsToOffset = function () {
        return {
          coordsToOffset: new a.GlslLibRoutine("\n      int coordsToOffset(vec2 coords, int width, int height) {\n        float s = coords.s * float(width);\n        float t = coords.t * float(height);\n        int offset = int(t) * width + int(s);\n        return offset;\n      }\n      ")
        };
      }, e.prototype.toVec = function () {
        for (var t = this.context.programInfo.outputLayout, e = t.shape.length, n = t.strides, r = t.width, o = t.height, i = [], u = 0; u < e - 1; ++u) i.push("\n        c[" + u + "] = offset / " + n[u] + ";"), i.push("\n        offset -= c[" + u + "] * " + n[u] + ";");

        i.push("\n        c[" + (e - 1) + "] = offset;");
        var s = "\n      void toVec(vec2 texCoords, out int c[" + e + "]) {\n        int offset = coordsToOffset(texCoords, " + r + ", " + o + ");\n        " + i.join("") + "\n      }\n      void toVec(int offset, out int c[" + e + "]) {\n        " + i.join("") + "\n      }\n    ";
        return {
          toVec: new a.GlslLibRoutine(s, ["coordinates.coordsToOffset"])
        };
      }, e.prototype.valueFrom = function () {
        var t = this,
            e = this.context.programInfo,
            n = {};
        return this.context.programInfo.samplers.forEach(function (r, o) {
          var i = e.inputLayouts[o],
              u = i.shape.length,
              s = "_" + r;
          n[s] = new a.GlslLibRoutine(t.getValueFromSingle(r, u, i.width, i.height, !1), ["shapeUtils.indicesToOffset" + s, "coordinates.offsetToCoords", "fragcolor.getColorAsFloat"]), n[s += "_T"] = new a.GlslLibRoutine(t.getValueFromSingle(r, u, i.width, i.height, !0), ["shapeUtils.indicesToOffset" + s, "coordinates.offsetToCoords", "fragcolor.getColorAsFloat"]);
        }), n;
      }, e.prototype.getValueFromSingle = function (t, e, n, r, o) {
        var i = "_" + t;
        return o && (i += "_T"), "\n        float " + i + "(int m[" + e + "]) {\n          int offset = indicesToOffset" + i + "(m);\n          vec2 coords = offsetToCoords(offset, " + n + ", " + r + ");\n          float value = getColorAsFloat(" + u.getGlsl(this.context.glContext.version).texture2D + "(" + t + ", coords));\n          return value;\n        }\n        ";
      }, e;
    }(a.GlslLib);

    e.CoordsGlslLib = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__assign || function () {
      return (i = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(5),
        u = function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return o(e, t), e.prototype.getFunctions = function () {
        return i({}, this.encodeFloat32(), this.decodeFloat32());
      }, e.prototype.getCustomTypes = function () {
        return {};
      }, e.prototype.encodeFloat32 = function () {
        return {
          encode: new a.GlslLibRoutine("highp vec4 encode(highp float f) {\n        return vec4(f, 0.0, 0.0, 0.0);\n      }\n        ")
        };
      }, e.prototype.decodeFloat32 = function () {
        return {
          decode: new a.GlslLibRoutine("highp float decode(highp vec4 rgba) {\n        return rgba.r;\n      }\n        ")
        };
      }, e.prototype.encodeUint8 = function () {
        var t = e.isLittleEndian() ? "rgba.rgba=rgba.abgr;" : "";
        return {
          encode: new a.GlslLibRoutine("\n      highp vec4 encode(highp float f) {\n        highp float F = abs(f);\n        highp float Sign = step(0.0,-f);\n        highp float Exponent = floor(log2(F));\n        highp float Mantissa = (exp2(- Exponent) * F);\n        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));\n        highp vec4 rgba;\n        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));\n        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);\n        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));\n        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));\n        " + t + "\n        rgba = rgba / 255.0; // values need to be normalized to [0,1]\n        return rgba;\n    }\n        ")
        };
      }, e.prototype.decodeUint8 = function () {
        var t = e.isLittleEndian() ? "rgba.rgba=rgba.abgr;" : "";
        return {
          decode: new a.GlslLibRoutine("\n        highp float decode(highp vec4 rgba) {\n          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]\n          " + t + "\n          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;\n          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;\n          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);\n          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));\n          return Result;\n      }\n        ")
        };
      }, e.isLittleEndian = function () {
        var t = new ArrayBuffer(4),
            e = new Uint32Array(t),
            n = new Uint8Array(t);
        if (e[0] = 3735928559, 239 === n[0]) return !0;
        if (222 === n[0]) return !1;
        throw new Error("unknown endianness");
      }, e;
    }(a.GlslLib);

    e.EncodingGlslLib = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__assign || function () {
      return (i = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(5),
        u = n(2),
        s = function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return o(e, t), e.prototype.getFunctions = function () {
        return i({}, this.setFragColor(), this.getColorAsFloat());
      }, e.prototype.getCustomTypes = function () {
        return {};
      }, e.prototype.setFragColor = function () {
        var t = u.getGlsl(this.context.glContext.version);
        return {
          setFragColor: new a.GlslLibRoutine("\n        void setFragColor(float value) {\n            " + t.output + " = encode(value);\n        }\n        ", ["encoding.encode"])
        };
      }, e.prototype.getColorAsFloat = function () {
        return {
          getColorAsFloat: new a.GlslLibRoutine("\n        float getColorAsFloat(vec4 color) {\n            return decode(color);\n        }\n        ", ["encoding.decode"])
        };
      }, e;
    }(a.GlslLib);

    e.FragColorGlslLib = s;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__assign || function () {
      return (i = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(5),
        u = function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return o(e, t), e.prototype.getFunctions = function () {
        return i({}, this.bcastIndex(), this.bcastMatmulIndex(), this.offsetToIndices(), this.indicesToOffset(), this.incrementIndices());
      }, e.prototype.getCustomTypes = function () {
        return {};
      }, e.prototype.bcastIndex = function () {
        var t = this.context.programInfo,
            e = t.outputLayout.shape.length,
            n = {};
        return this.context.programInfo.samplers.forEach(function (r, o) {
          var i = t.inputLayouts[o].shape;

          if (i.length <= e) {
            for (var u = i.length, s = e - u, l = "bcastIndices_" + r, c = "", f = 0; f < u; ++f) c += "\n          realIndices[" + f + "] = int( mod(float(bcastedIndices[" + (s + f) + "]), " + i[f] + ".0) );\n          ";

            var p = "\n        void " + l + " (int bcastedIndices[" + e + "], out int realIndices[" + u + "]) {\n          " + c + "\n        }\n        ";
            n[l] = new a.GlslLibRoutine(p);
          }
        }), n;
      }, e.prototype.bcastMatmulIndex = function () {
        var t = this.context.programInfo,
            e = t.outputLayout.shape.length,
            n = {};
        return this.context.programInfo.samplers.forEach(function (r, o) {
          var i = t.inputLayouts[o].shape;

          if (!(i.length < 2 || i.length > e)) {
            for (var u = i.length, s = e - u, l = "bcastMatmulIndices_" + r, c = "", f = 0; f < u - 2; ++f) c += "\n          realIndices[" + f + "] = int( mod(float(bcastedIndices[" + (s + f) + "]), " + i[f] + ".0) );\n          ";

            var p = "\n        void " + l + "(int bcastedIndices[" + e + "], out int realIndices[" + u + "]) {\n          " + c + "\n          realIndices[" + (u - 1) + "] = bcastedIndices[" + (e - 1) + "];\n          realIndices[" + (u - 2) + "] = bcastedIndices[" + (e - 2) + "];\n        }\n        ";
            n[l] = new a.GlslLibRoutine(p);
          }
        }), n;
      }, e.prototype.indicesToOffset = function () {
        var t = this.context.programInfo,
            n = {};
        return this.context.programInfo.samplers.forEach(function (r, o) {
          var i = t.inputLayouts[o].shape,
              u = t.inputLayouts[o].strides,
              s = i.length,
              l = "indicesToOffset_" + r;
          n[l] = new a.GlslLibRoutine(e.indexToOffsetSingle(l, s, u)), n[l = "indicesToOffset_" + r + "_T"] = new a.GlslLibRoutine(e.indexToOffsetSingle(l, s, u.slice().reverse()));
        }), n;
      }, e.indexToOffsetSingle = function (t, e, n) {
        for (var r = "", o = e - 1; o >= 0; --o) r += "\n        offset += indices[" + o + "] * " + n[o] + ";\n        ";

        return "\n      int " + t + "(int indices[" + e + "]) {\n        int offset = 0;\n        " + r + "\n        return offset;\n      }\n      ";
      }, e.prototype.offsetToIndices = function () {
        var t = this.context.programInfo,
            n = {};
        return this.context.programInfo.samplers.forEach(function (r, o) {
          var i = t.inputLayouts[o].shape,
              u = t.inputLayouts[o].strides,
              s = i.length,
              l = "offsetToIndices_" + r;
          n[l] = new a.GlslLibRoutine(e.offsetToIndicesSingle(l, s, u)), n[l = "offsetToIndices_" + r + "_T"] = new a.GlslLibRoutine(e.offsetToIndicesSingle(l, s, u.slice().reverse()));
        }), n;
      }, e.offsetToIndicesSingle = function (t, e, n) {
        for (var r = [], o = 0; o < e - 1; ++o) r.push("\n      indices[" + o + "] = offset / " + n[o] + ";"), r.push("\n        offset -= indices[" + o + "] * " + n[o] + ";");

        return r.push("\n      indices[" + (e - 1) + "] = offset;"), "\n      void " + t + "(int offset, out int indices[" + e + "]) {\n        " + r.join("") + "\n      }\n      ";
      }, e.prototype.incrementIndices = function () {
        var t = this.context.programInfo,
            e = {};
        return this.context.programInfo.samplers.forEach(function (n, r) {
          for (var o = t.inputLayouts[r].shape, i = o.length, u = "incrementIndices_" + n, s = "", l = 0; l < i; ++l) s += "\n        shape[" + l + "] = " + o[l] + ";";

          var c = "\n        void " + u + "(int axis, out int indices[" + i + "]) {\n          int shape[" + i + "];\n          " + s + ";\n          for(int i = " + i + " -1 ; i >= 0; --i) {\n            if(i > axis) continue;\n            indices[i] += 1;\n            if(indices[i] < shape[i]) {\n              break;\n            }\n            indices[i] = 0;\n          }\n        }\n        ";
          e[u] = new a.GlslLibRoutine(c);
        }), e;
      }, e;
    }(a.GlslLib);

    e.ShapeUtilsGlslLib = u;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = this && this.__extends || (r = function (t, e) {
      return (r = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(t, e);
    }, function (t, e) {
      function n() {
        this.constructor = t;
      }

      r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
    }),
        i = this && this.__assign || function () {
      return (i = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);

        return t;
      }).apply(this, arguments);
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(5),
        u = function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return o(e, t), e.prototype.getCustomTypes = function () {
        return {};
      }, e.prototype.getFunctions = function () {
        return i({}, this.binaryVecFunctions(), this.copyVec(), this.setVecItem(), this.getVecItem());
      }, e.prototype.binaryVecFunctions = function () {
        var t = this.context.programInfo.outputLayout.shape.length,
            e = {
          add: "+=",
          sub: "-=",
          mul: "*=",
          div: "/="
        },
            n = {};

        for (var r in e) {
          for (var o = r + "Vec", i = "", u = 0; u < t; ++u) i += "\n          dest[" + u + "] " + e[r] + " src[" + u + "];\n          ";

          var s = "\n        void " + o + "(int src[" + t + "], out int dest[" + t + "]) {\n          " + i + "\n        }\n        ";
          n[o] = new a.GlslLibRoutine(s);
        }

        return n;
      }, e.prototype.copyVec = function () {
        for (var t = this.context.programInfo.outputLayout.shape.length, e = "", n = 0; n < t; ++n) e += "\n        dest[" + n + "] = src[" + n + "];\n        ";

        var r = "\n      void copyVec(int src[" + t + "], out int dest[" + t + "]) {\n        " + e + "\n      }\n      ";
        return {
          copyVec: new a.GlslLibRoutine(r)
        };
      }, e.prototype.setVecItem = function () {
        for (var t = this.context.programInfo.outputLayout.shape.length, e = "\n        if(index < 0)\n            index =" + t + " + index;\n        if (index == 0)\n            m[0] = value;\n        ", n = 1; n < t - 1; ++n) e += "\n        else if (index == " + n + ")\n            m[" + n + "] = value;\n            ";

        var r = "\n      void setVecItem(out int m[" + t + "], int index, int value) {\n        " + (e += "\n        else\n            m[" + (t - 1) + "] = value;\n        ") + "\n      }\n        ";
        return {
          setVecItem: new a.GlslLibRoutine(r)
        };
      }, e.prototype.getVecItem = function () {
        for (var t = this.context.programInfo.outputLayout.shape.length, e = "\n        if(index < 0)\n            index = " + t + " + index;\n        if (index == 0)\n            return m[0];\n      ", n = 1; n < t - 1; ++n) e += "\n        else if (index == " + n + ")\n            return m[" + n + "];\n      ";

        var r = "\n      int getVecItem(int m[" + t + "], int index) {\n        " + (e += "\n        else\n            return m[" + (t - 1) + "];\n        ") + "\n      }\n    ";
        return {
          getVecItem: new a.GlslLibRoutine(r)
        };
      }, e;
    }(a.GlslLib);

    e.VecGlslLib = u;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(3),
        o = function () {
      function t(t) {
        this.maxTextureSize = t;
      }

      return t.prototype.computeTextureWH = function (t, e) {
        if (0 === t.length) return [1, 1];
        var n = this.maxTextureSize;

        if (e) {
          var o = e.breakAxis >= t.length ? 1 : t.slice(e.breakAxis).reduce(function (t, e) {
            return t * e;
          }),
              i = e.breakAxis <= 0 ? 1 : t.slice(0, e.breakAxis).reduce(function (t, e) {
            return t * e;
          });
          if (!(o > n || i > n)) return [o, i];
          r.Logger.verbose("TextureLayout", "Given width/height preferences were unattainable: shape:" + t + ", breakAxis:" + e.breakAxis);
        }

        for (var a = t.reduce(function (t, e) {
          return t * e;
        }), u = Math.floor(Math.sqrt(a)); u < n && u < a && a % u != 0; u++);

        if (u >= n || a % u != 0) throw new Error("The given dimensions are outside this GPU's boundaries: " + t);
        return [u, a / u];
      }, t;
    }();

    e.AlwaysKeepOriginalSizeStrategy = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(3),
        o = function () {
      function t(t, e, n, r) {
        this.glContext = t, this.layoutStrategy = e, this.profiler = n, this.config = r, r.reuseTextures && (this.inUseTextures = new Map(), this.idleTextures = new Map(), this.textureLookup = new Map());
      }

      return t.prototype.createTextureFromLayout = function (t, e, n, o) {
        var i,
            a,
            u = this.toEncoderType(t),
            s = this.glContext.getEncoder(u, e.channels || 1, o);

        if (this.config.reuseTextures) {
          i = e.width + "x" + e.height + "_" + s.format + "_" + s.internalFormat + "_" + s.textureType, (a = this.inUseTextures.get(i)) || (a = [], this.inUseTextures.set(i, a));
          var l = this.idleTextures.get(i);

          if (l && l.length > 0) {
            var c = l.pop();
            return a.push(c), 1 === o && this.glContext.updateTexture(c, e.width, e.height, s, this.toTextureData(t, n)), c;
          }
        }

        r.Logger.verbose("TextureManager", "Creating new texture of size " + e.width + "x" + e.height);
        var f = this.glContext.allocateTexture(e.width, e.height, s, this.toTextureData(t, n));
        return this.config.reuseTextures && (a.push(f), this.textureLookup.set(f, i)), f;
      }, t.prototype.readTexture = function (t, e, n) {
        var r = this;
        return n || (n = 1), this.profiler.event("backend", "TextureManager.readTexture", function () {
          var o = t.shape.reduce(function (t, e) {
            return t * e;
          }) * n,
              i = r.glContext.readTexture(t.texture, t.width, t.height, o, r.toEncoderType(e), n);
          return r.toTensorData(e, i);
        });
      }, t.prototype.readUint8TextureAsFloat = function (t) {
        var e = this;
        return this.profiler.event("backend", "TextureManager.readUint8TextureAsFloat", function () {
          var n = t.shape.reduce(function (t, e) {
            return t * e;
          }),
              r = e.glContext.readTexture(t.texture, t.width, t.height, 4 * n, "byte", 4);
          return new Float32Array(r.buffer, r.byteOffset, n);
        });
      }, t.prototype.releaseTexture = function (t, e) {
        var n;

        if (this.config.reuseTextures && (n = this.textureLookup.get(t.texture))) {
          e && this.textureLookup.delete(n);
          var o = this.inUseTextures.get(n);

          if (o) {
            var i = o.indexOf(t.texture);

            if (-1 !== i) {
              o.splice(i, 1);
              var a = this.idleTextures.get(n);
              a || (a = [], this.idleTextures.set(n, a)), a.push(t.texture);
            }
          }
        }

        n && !e || (r.Logger.verbose("TextureManager", "Deleting texture of size " + t.width + "x" + t.height), this.glContext.deleteTexture(t.texture));
      }, t.prototype.toTensorData = function (t, e) {
        return e.constructor === Float32Array ? e : new Float32Array(e);
      }, t.prototype.toTextureData = function (t, e) {
        if (e) return e.constructor === Float32Array ? e : new Float32Array(e);
      }, t.prototype.toEncoderType = function (t) {
        return "float";
      }, t.prototype.clearActiveTextures = function () {
        this.glContext.clearActiveTextures();
      }, t;
    }();

    e.TextureManager = o;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = n(3),
        o = n(161),
        i = {};

    function a(t) {
      var e,
          n = function () {
        var t = document.createElement("canvas");
        return t.width = 1, t.height = 1, t;
      }(),
          i = {
        alpha: !1,
        depth: !1,
        antialias: !1,
        stencil: !1,
        preserveDrawingBuffer: !1,
        premultipliedAlpha: !1,
        failIfMajorPerformanceCaveat: !1
      };

      if ((!t || "webgl2" === t) && (e = n.getContext("webgl2", i))) try {
        return new o.WebGLContext(e, 2);
      } catch (t) {
        r.Logger.warning("GlContextFactory", "failed to create WebGLContext using contextId 'webgl2'. Error: " + t);
      }
      if ((!t || "webgl" === t) && (e = n.getContext("webgl", i) || n.getContext("experimental-webgl", i))) try {
        return new o.WebGLContext(e, 1);
      } catch (t) {
        r.Logger.warning("GlContextFactory", "failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: " + t);
      }
      throw new Error("WebGL is not supported");
    }

    e.createWebGLContext = function t(e) {
      var n;
      (!e || "webgl2" === e) && "webgl2" in i ? n = i.webgl2 : (!e || "webgl" === e) && "webgl" in i && (n = i.webgl), n = n || a(e), e = e || 1 === n.version ? "webgl" : "webgl2";
      var r = n.gl;
      return i[e] = n, r.isContextLost() ? (delete i[e], t(e)) : (r.disable(r.DEPTH_TEST), r.disable(r.STENCIL_TEST), r.disable(r.BLEND), r.disable(r.DITHER), r.disable(r.POLYGON_OFFSET_FILL), r.disable(r.SAMPLE_COVERAGE), r.enable(r.SCISSOR_TEST), r.enable(r.CULL_FACE), r.cullFace(r.BACK), n);
    }, e.createNewWebGLContext = a;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = n(24),
        i = r(n(162)),
        a = function () {
      function t(t, e) {
        this.frameBufferBound = !1, this.gl = t, this.version = e, this.getExtensions(), this.vertexbuffer = this.createVertexbuffer(), this.framebuffer = this.createFramebuffer(), this.queryVitalParameters();
      }

      return t.prototype.allocateTexture = function (t, e, n, r) {
        var o = this.gl,
            i = o.createTexture();
        o.bindTexture(o.TEXTURE_2D, i), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.NEAREST), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MAG_FILTER, o.NEAREST), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
        var a = r ? n.encode(r, t * e) : null;
        return o.texImage2D(o.TEXTURE_2D, 0, n.internalFormat, t, e, 0, n.format, n.textureType, a), this.checkError(), i;
      }, t.prototype.updateTexture = function (t, e, n, r, o) {
        var i = this.gl;
        i.bindTexture(i.TEXTURE_2D, t);
        var a = r.encode(o, e * n);
        i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, e, n, r.format, r.textureType, a), this.checkError();
      }, t.prototype.attachFramebuffer = function (t, e, n) {
        var r = this.gl;
        r.bindTexture(r.TEXTURE_2D, t), r.bindFramebuffer(r.FRAMEBUFFER, this.framebuffer), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, t, 0), this.checkError(), r.viewport(0, 0, e, n), r.scissor(0, 0, e, n);
      }, t.prototype.readTexture = function (t, e, n, r, o, i) {
        var a = this.gl;
        i || (i = 1), this.frameBufferBound || this.attachFramebuffer(t, e, n);
        var u = this.getEncoder(o, i),
            s = u.allocate(e * n);
        return a.bindTexture(a.TEXTURE_2D, t), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, t, 0), a.readPixels(0, 0, e, n, a.RGBA, u.textureType, s), this.checkError(), u.decode(s, r);
      }, t.prototype.isFramebufferReady = function () {
        return !0;
      }, t.prototype.getActiveTexture = function () {
        var t = this.gl;
        return "TEXTURE" + (t.getParameter(this.gl.ACTIVE_TEXTURE) - t.TEXTURE0);
      }, t.prototype.getTextureBinding = function () {
        return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
      }, t.prototype.getFramebufferBinding = function () {
        return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
      }, t.prototype.setVertexAttributes = function (t, e) {
        var n = this.gl;
        n.vertexAttribPointer(t, 3, n.FLOAT, !1, 20, 0), n.enableVertexAttribArray(t), -1 !== e && (n.vertexAttribPointer(e, 2, n.FLOAT, !1, 20, 12), n.enableVertexAttribArray(e)), this.checkError();
      }, t.prototype.createProgram = function (t, e) {
        var n = this.gl,
            r = n.createProgram();
        return n.attachShader(r, t), n.attachShader(r, e), n.linkProgram(r), r;
      }, t.prototype.compileShader = function (t, e) {
        var n = this.gl,
            r = n.createShader(e);
        if (!r) throw new Error("createShader() returned null with type " + e);
        if (n.shaderSource(r, t), n.compileShader(r), !1 === n.getShaderParameter(r, n.COMPILE_STATUS)) throw new Error("Failed to compile shader: " + n.getShaderInfoLog(r));
        return r;
      }, t.prototype.deleteShader = function (t) {
        this.gl.deleteShader(t);
      }, t.prototype.bindTextureToUniform = function (t, e, n) {
        var r = this.gl;
        r.activeTexture(r.TEXTURE0 + e), this.checkError(), r.bindTexture(r.TEXTURE_2D, t), this.checkError(), r.uniform1i(n, e), this.checkError();
      }, t.prototype.draw = function () {
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4), this.checkError();
      }, t.prototype.checkError = function () {
        if (o.env.debug) {
          var t = this.gl,
              e = t.getError(),
              n = "";

          switch (e) {
            case t.NO_ERROR:
              return;

            case t.INVALID_ENUM:
              n = "INVALID_ENUM";
              break;

            case t.INVALID_VALUE:
              n = "INVALID_VALUE";
              break;

            case t.INVALID_OPERATION:
              n = "INVALID_OPERATION";
              break;

            case t.INVALID_FRAMEBUFFER_OPERATION:
              n = "INVALID_FRAMEBUFFER_OPERATION";
              break;

            case t.OUT_OF_MEMORY:
              n = "OUT_OF_MEMORY";
              break;

            case t.CONTEXT_LOST_WEBGL:
              n = "CONTEXT_LOST_WEBGL";
              break;

            default:
              n = "Unknown WebGL Error: " + e.toString(16);
          }

          throw new Error(n);
        }
      }, t.prototype.deleteTexture = function (t) {
        this.gl.deleteTexture(t);
      }, t.prototype.deleteProgram = function (t) {
        this.gl.deleteProgram(t);
      }, t.prototype.getEncoder = function (t, e, n) {
        if (void 0 === n && (n = 0), 2 === this.version) return new i.RedFloat32DataEncoder(this.gl, e);

        switch (t) {
          case "float":
            return 1 === n || this.isRenderFloat32Supported ? new i.RGBAFloatDataEncoder(this.gl, e) : new i.RGBAFloatDataEncoder(this.gl, e, this.textureHalfFloatExtension.HALF_FLOAT_OES);

          case "int":
            throw new Error("not implemented");

          case "byte":
            return new i.Uint8DataEncoder(this.gl, e);

          default:
            throw new Error("Invalid dataType: " + t);
        }
      }, t.prototype.clearActiveTextures = function () {
        for (var t = this.gl, e = 0; e < this.maxTextureImageUnits; ++e) t.activeTexture(t.TEXTURE0 + e), t.bindTexture(t.TEXTURE_2D, null);
      }, t.prototype.dispose = function () {
        if (!this.disposed) {
          var t = this.gl;
          t.bindFramebuffer(t.FRAMEBUFFER, null), t.deleteFramebuffer(this.framebuffer), t.bindBuffer(t.ARRAY_BUFFER, null), t.deleteBuffer(this.vertexbuffer), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null), t.finish(), this.disposed = !0;
        }
      }, t.prototype.createDefaultGeometry = function () {
        return new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]);
      }, t.prototype.createVertexbuffer = function () {
        var t = this.gl,
            e = t.createBuffer();
        if (!e) throw new Error("createBuffer() returned null");
        var n = this.createDefaultGeometry();
        return t.bindBuffer(t.ARRAY_BUFFER, e), t.bufferData(t.ARRAY_BUFFER, n, t.STATIC_DRAW), this.checkError(), e;
      }, t.prototype.createFramebuffer = function () {
        var t = this.gl.createFramebuffer();
        if (!t) throw new Error("createFramebuffer returned null");
        return t;
      }, t.prototype.queryVitalParameters = function () {
        var t = this.gl;
        if (this.isFloatTextureAttachableToFrameBuffer = this.checkFloatTextureAttachableToFrameBuffer(), this.isRenderFloat32Supported = this.checkRenderFloat32(), this.isFloat32DownloadSupported = this.checkFloat32Download(), 1 === this.version && !this.textureHalfFloatExtension && !this.isRenderFloat32Supported) throw new Error("both float32 and float16 TextureType are not supported");
        this.isBlendSupported = !this.isRenderFloat32Supported || this.checkFloat32Blend(), this.maxTextureSize = t.getParameter(t.MAX_TEXTURE_SIZE), this.maxTextureImageUnits = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), this.version;
      }, t.prototype.getExtensions = function () {
        2 === this.version ? this.colorBufferFloatExtension = this.gl.getExtension("EXT_color_buffer_float") : (this.textureFloatExtension = this.gl.getExtension("OES_texture_float"), this.textureHalfFloatExtension = this.gl.getExtension("OES_texture_half_float"));
      }, t.prototype.checkFloatTextureAttachableToFrameBuffer = function () {
        var t = this.gl,
            e = t.createTexture();
        t.bindTexture(t.TEXTURE_2D, e);
        var n = 2 === this.version ? t.RGBA32F : t.RGBA;
        t.texImage2D(t.TEXTURE_2D, 0, n, 1, 1, 0, t.RGBA, t.FLOAT, null);
        var r = t.createFramebuffer();
        t.bindFramebuffer(t.FRAMEBUFFER, r), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, e, 0);
        var o = t.checkFramebufferStatus(t.FRAMEBUFFER) === t.FRAMEBUFFER_COMPLETE;
        return t.bindTexture(t.TEXTURE_2D, null), t.bindFramebuffer(t.FRAMEBUFFER, null), t.deleteTexture(e), t.deleteFramebuffer(r), o;
      }, t.prototype.checkRenderFloat32 = function () {
        if (2 === this.version) {
          if (!this.colorBufferFloatExtension) return !1;
        } else if (!this.textureFloatExtension) return !1;

        return this.isFloatTextureAttachableToFrameBuffer;
      }, t.prototype.checkFloat32Download = function () {
        if (2 === this.version) {
          if (!this.colorBufferFloatExtension) return !1;
        } else {
          if (!this.textureFloatExtension) return !1;
          if (!this.gl.getExtension("WEBGL_color_buffer_float")) return !1;
        }

        return this.isFloatTextureAttachableToFrameBuffer;
      }, t.prototype.checkFloat32Blend = function () {
        var t,
            e,
            n,
            r,
            o,
            i = this.gl;

        try {
          t = i.createTexture(), e = i.createFramebuffer(), i.bindTexture(i.TEXTURE_2D, t);
          var a = 2 === this.version ? i.RGBA32F : i.RGBA;
          return i.texImage2D(i.TEXTURE_2D, 0, a, 1, 1, 0, i.RGBA, i.FLOAT, null), i.bindFramebuffer(i.FRAMEBUFFER, e), i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, t, 0), i.enable(i.BLEND), (n = i.createShader(i.VERTEX_SHADER)) ? (i.shaderSource(n, "void main(){}"), i.compileShader(n), !!(r = i.createShader(i.FRAGMENT_SHADER)) && (i.shaderSource(r, "precision highp float;void main(){gl_FragColor=vec4(0.5);}"), i.compileShader(r), !!(o = i.createProgram()) && (i.attachShader(o, n), i.attachShader(o, r), i.linkProgram(o), i.useProgram(o), i.drawArrays(i.POINTS, 0, 1), i.getError() === i.NO_ERROR))) : !1;
        } finally {
          i.disable(i.BLEND), o && i.deleteProgram(o), n && i.deleteShader(n), r && i.deleteShader(r), e && (i.bindFramebuffer(i.FRAMEBUFFER, null), i.deleteFramebuffer(e)), t && (i.bindTexture(i.TEXTURE_2D, null), i.deleteTexture(t));
        }
      }, t;
    }();

    e.WebGLContext = a;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(3),
        o = function () {
      function t(t, e) {
        if (void 0 === e && (e = 1), 1 === e) this.internalFormat = t.R32F, this.format = t.RED, this.textureType = t.FLOAT, this.channelSize = e;else {
          if (4 !== e) throw new Error("Invalid number of channels: " + e);
          this.internalFormat = t.RGBA32F, this.format = t.RGBA, this.textureType = t.FLOAT, this.channelSize = e;
        }
      }

      return t.prototype.encode = function (t, e) {
        var n, o;
        return t.constructor !== Float32Array && (r.Logger.warning("Encoder", "data was not of type Float32; creating new Float32Array"), o = new Float32Array(t)), e * this.channelSize > t.length ? (r.Logger.warning("Encoder", "Source data too small. Allocating larger array"), o = t, n = this.allocate(e * this.channelSize), o.forEach(function (t, e) {
          return n[e] = t;
        })) : n = o = t, n;
      }, t.prototype.allocate = function (t) {
        return new Float32Array(4 * t);
      }, t.prototype.decode = function (t, e) {
        return 1 === this.channelSize ? t.filter(function (t, e) {
          return e % 4 == 0;
        }).subarray(0, e) : t.subarray(0, e);
      }, t;
    }();

    e.RedFloat32DataEncoder = o;

    var i = function () {
      function t(t, e, n) {
        if (void 0 === e && (e = 1), 1 !== e && 4 !== e) throw new Error("Invalid number of channels: " + e);
        this.internalFormat = t.RGBA, this.format = t.RGBA, this.channelSize = e, this.textureType = n || t.FLOAT;
      }

      return t.prototype.encode = function (t, e) {
        var n = t;
        return 1 === this.channelSize && (r.Logger.verbose("Encoder", "Exploding into a larger array"), n = this.allocate(e), t.forEach(function (t, e) {
          return n[4 * e] = t;
        })), n;
      }, t.prototype.allocate = function (t) {
        return new Float32Array(4 * t);
      }, t.prototype.decode = function (t, e) {
        return 1 === this.channelSize ? t.filter(function (t, e) {
          return e % 4 == 0;
        }).subarray(0, e) : t.subarray(0, e);
      }, t;
    }();

    e.RGBAFloatDataEncoder = i;

    var a = function () {
      function t(t, e) {
        if (void 0 === e && (e = 1), this.channelSize = 4, 1 === e) this.internalFormat = t.ALPHA, this.format = t.ALPHA, this.textureType = t.UNSIGNED_BYTE, this.channelSize = e;else {
          if (4 !== e) throw new Error("Invalid number of channels: " + e);
          this.internalFormat = t.RGBA, this.format = t.RGBA, this.textureType = t.UNSIGNED_BYTE, this.channelSize = e;
        }
      }

      return t.prototype.encode = function (t, e) {
        return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
      }, t.prototype.allocate = function (t) {
        return new Uint8Array(t * this.channelSize);
      }, t.prototype.decode = function (t, e) {
        if (t.constructor === Uint8Array) return t.subarray(0, e);
        throw new Error("Invalid array type: " + t.constructor);
      }, t;
    }();

    e.Uint8DataEncoder = a;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(24),
        o = function () {
      function t() {}

      return Object.defineProperty(t.prototype, "debug", {
        get: function () {
          return r.env.debug;
        },
        set: function (t) {
          r.env.debug = t;
        },
        enumerable: !0,
        configurable: !0
      }), t;
    }();

    e.envImpl = new o();
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = r(n(47));
    e.Tensor = o.Tensor;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = r(n(166));
    e.InferenceSession = o.InferenceSession;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__awaiter || function (t, e, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            i(t);
          }
        }

        function u(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            i(t);
          }
        }

        function s(t) {
          t.done ? o(t.value) : new n(function (e) {
            e(t.value);
          }).then(a, u);
        }

        s((r = r.apply(t, e || [])).next());
      });
    },
        o = this && this.__generator || function (t, e) {
      var n,
          r,
          o,
          i,
          a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      };
      return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this;
      }), i;

      function u(i) {
        return function (u) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");

            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return a.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;

                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break;
                  }

                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break;
                  }

                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break;
                  }

                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }

              i = e.call(t, a);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }

            if (5 & i[0]) throw i[1];
            return {
              value: i[0] ? i[1] : void 0,
              done: !0
            };
          }([i, u]);
        };
      }
    },
        i = this && this.__importStar || function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e.default = t, e;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var a = n(167),
        u = i(n(48)),
        s = function () {
      function t(t) {
        this.session = new a.Session(t);
      }

      return t.prototype.loadModel = function (t, e, n) {
        if ("string" == typeof t) return this.session.loadModel(t);

        if ("undefined" != typeof Blob && t instanceof Blob) {
          var r = URL.createObjectURL(t);
          return this.session.loadModel(r);
        }

        if (t instanceof ArrayBuffer) return this.session.loadModel(t, e, n);
        if (ArrayBuffer.isView(t)) return this.session.loadModel(t);
        throw new Error("Model type is not supported.");
      }, t.prototype.run = function (t, e) {
        return r(this, void 0, void 0, function () {
          var e, n, r, i, a, s;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return e = new Map(), t instanceof Map ? (n = new Map(), t.forEach(function (t, e) {
                  n.set(e, t.internalTensor);
                }), [4, this.session.run(n)]) : [3, 2];

              case 1:
                return e = o.sent(), [3, 5];

              case 2:
                return Array.isArray(t) ? (r = [], t.forEach(function (t) {
                  r.push(t.internalTensor);
                }), [4, this.session.run(r)]) : [3, 4];

              case 3:
                return e = o.sent(), [3, 5];

              case 4:
                for (a in i = new Map(), t) i.set(a, t[a].internalTensor);

                o.label = 5;

              case 5:
                return s = new Map(), e.forEach(function (t, e) {
                  s.set(e, u.fromInternalTensor(t));
                }), [2, s];
            }
          });
        });
      }, t.prototype.startProfiling = function () {
        this.session.startProfiling();
      }, t.prototype.endProfiling = function () {
        this.session.endProfiling();
      }, t;
    }();

    e.InferenceSession = s;
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      var r = this && this.__awaiter || function (t, e, n, r) {
        return new (n || (n = Promise))(function (o, i) {
          function a(t) {
            try {
              s(r.next(t));
            } catch (t) {
              i(t);
            }
          }

          function u(t) {
            try {
              s(r.throw(t));
            } catch (t) {
              i(t);
            }
          }

          function s(t) {
            t.done ? o(t.value) : new n(function (e) {
              e(t.value);
            }).then(a, u);
          }

          s((r = r.apply(t, e || [])).next());
        });
      },
          o = this && this.__generator || function (t, e) {
        var n,
            r,
            o,
            i,
            a = {
          label: 0,
          sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: []
        };
        return i = {
          next: u(0),
          throw: u(1),
          return: u(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
          return this;
        }), i;

        function u(i) {
          return function (u) {
            return function (i) {
              if (n) throw new TypeError("Generator is already executing.");

              for (; a;) try {
                if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

                switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                  case 0:
                  case 1:
                    o = i;
                    break;

                  case 4:
                    return a.label++, {
                      value: i[1],
                      done: !1
                    };

                  case 5:
                    a.label++, r = i[1], i = [0];
                    continue;

                  case 7:
                    i = a.ops.pop(), a.trys.pop();
                    continue;

                  default:
                    if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                      a = 0;
                      continue;
                    }

                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                      a.label = i[1];
                      break;
                    }

                    if (6 === i[0] && a.label < o[1]) {
                      a.label = o[1], o = i;
                      break;
                    }

                    if (o && a.label < o[2]) {
                      a.label = o[2], a.ops.push(i);
                      break;
                    }

                    o[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }

                i = e.call(t, a);
              } catch (t) {
                i = [6, t], r = 0;
              } finally {
                n = o = 0;
              }

              if (5 & i[0]) throw i[1];
              return {
                value: i[0] ? i[1] : void 0,
                done: !0
              };
            }([i, u]);
          };
        }
      };

      Object.defineProperty(e, "__esModule", {
        value: !0
      });

      var i = n(44),
          a = n(168),
          u = n(171),
          s = n(172),
          l = n(3),
          c = n(173),
          f = function () {
        function e(t) {
          void 0 === t && (t = {}), this._initialized = !1, this.backendHint = t.backendHint, this.profiler = l.Profiler.create(t.profiler), this.context = {
            profiler: this.profiler,
            graphInputTypes: [],
            graphInputDims: []
          };
        }

        return e.prototype.startProfiling = function () {
          this.profiler.start();
        }, e.prototype.endProfiling = function () {
          this.profiler.stop();
        }, e.prototype.loadModel = function (e, n, s) {
          return r(this, void 0, void 0, function () {
            var l = this;
            return o(this, function (f) {
              switch (f.label) {
                case 0:
                  return [4, this.profiler.event("session", "Session.loadModel", function () {
                    return r(l, void 0, void 0, function () {
                      var r, l, f;
                      return o(this, function (o) {
                        switch (o.label) {
                          case 0:
                            return [4, u.Backend(this.backendHint)];

                          case 1:
                            return r = o.sent(), this.sessionHandler = r.createSessionHandler(this.context), this._model = new c.Model(), "string" != typeof e ? [3, 7] : "undefined" != typeof fetch ? [3, 3] : [4, a.promisify(i.readFile)(e)];

                          case 2:
                            return l = o.sent(), this.initialize(t.from(l)), [3, 6];

                          case 3:
                            return [4, fetch(e)];

                          case 4:
                            return [4, o.sent().arrayBuffer()];

                          case 5:
                            l = o.sent(), this.initialize(t.from(l)), o.label = 6;

                          case 6:
                            return [3, 8];

                          case 7:
                            ArrayBuffer.isView(e) ? this.initialize(t.from(e)) : (f = new Uint8Array(e, n || 0, s || e.byteLength), this.initialize(t.from(f))), o.label = 8;

                          case 8:
                            return [2];
                        }
                      });
                    });
                  })];

                case 1:
                  return f.sent(), [2];
              }
            });
          });
        }, e.prototype.initialize = function (t) {
          var e = this;
          if (this._initialized) throw new Error("already initialized");
          this.profiler.event("session", "Session.initialize", function () {
            var n = e.sessionHandler.transformGraph ? e.sessionHandler : void 0;
            e._model.load(t, n), e.sessionHandler.onGraphInitialized && e.sessionHandler.onGraphInitialized(e._model.graph), e.initializeOps(e._model.graph), e._executionPlan = new s.ExecutionPlan(e._model.graph, e._ops, e.profiler);
          }), this._initialized = !0;
        }, e.prototype.run = function (t) {
          var e = this;
          if (!this._initialized) throw new Error("session not initialized yet");
          return this.profiler.event("session", "Session.run", function () {
            return r(e, void 0, void 0, function () {
              var e, n;
              return o(this, function (r) {
                switch (r.label) {
                  case 0:
                    return e = this.normalizeAndValidateInputs(t), [4, this._executionPlan.execute(this.sessionHandler, e)];

                  case 1:
                    return n = r.sent(), [2, this.createOutput(n)];
                }
              });
            });
          });
        }, e.prototype.normalizeAndValidateInputs = function (t) {
          var e = this._model.graph.getInputNames();

          if (Array.isArray(t)) {
            if (t.length !== e.length) throw new Error("incorrect input array length: expected " + e.length + " but got " + t.length);
          } else {
            if (t.size !== e.length) throw new Error("incorrect input map size: expected " + e.length + " but got " + t.size);

            for (var n = new Array(t.size), r = 0, o = 0; o < e.length; ++o) {
              var i = t.get(e[o]);
              if (!i) throw new Error("missing input tensor for: '" + name + "'");
              n[r++] = i;
            }

            t = n;
          }

          if (this.context.graphInputTypes && 0 !== this.context.graphInputTypes.length && this.context.graphInputDims && 0 !== this.context.graphInputDims.length) this.validateInputTensorDims(this.context.graphInputDims, t, !1);else {
            var a = this._model.graph.getInputIndices(),
                u = this._model.graph.getValues(),
                s = new Array(a.length);

            for (o = 0; o < a.length; ++o) {
              var l = u[a[o]];
              s[o] = l.type.shape.dims, this.context.graphInputTypes.push(l.type.tensorType), this.context.graphInputDims.push(t[o].dims);
            }

            this.validateInputTensorDims(s, t, !0);
          }
          return this.validateInputTensorTypes(this.context.graphInputTypes, t), t;
        }, e.prototype.validateInputTensorTypes = function (t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = t[n],
                o = e[n].type;
            if (r !== o) throw new Error("input tensor[" + n + "] check failed: expected type '" + r + "' but got " + o);
          }
        }, e.prototype.validateInputTensorDims = function (t, e, n) {
          for (var r = 0; r < e.length; r++) {
            var o = t[r],
                i = e[r].dims;
            if (!this.compareTensorDims(o, i, n)) throw new Error("input tensor[" + r + "] check failed: expected shape '[" + o.join(",") + "]' but got [" + i.join(",") + "]");
          }
        }, e.prototype.compareTensorDims = function (t, e, n) {
          if (t.length !== e.length) return !1;

          for (var r = 0; r < t.length; ++r) if (t[r] !== e[r] && (!n || 0 !== t[r])) return !1;

          return !0;
        }, e.prototype.createOutput = function (t) {
          var e = this._model.graph.getOutputNames();

          if (t.length !== e.length) throw new Error("expected number of outputs do not match number of generated outputs");

          for (var n = new Map(), r = 0; r < e.length; ++r) n.set(e[r], t[r]);

          return n;
        }, e.prototype.initializeOps = function (t) {
          var e = t.getNodes();
          this._ops = new Array(e.length);

          for (var n = 0; n < e.length; n++) this._ops[n] = this.sessionHandler.resolve(e[n], this._model.opsets);
        }, e;
      }();

      e.Session = f;
    }).call(this, n(12).Buffer);
  }, function (t, e, n) {
    (function (t) {
      var r = Object.getOwnPropertyDescriptors || function (t) {
        for (var e = Object.keys(t), n = {}, r = 0; r < e.length; r++) n[e[r]] = Object.getOwnPropertyDescriptor(t, e[r]);

        return n;
      },
          o = /%[sdj%]/g;

      e.format = function (t) {
        if (!m(t)) {
          for (var e = [], n = 0; n < arguments.length; n++) e.push(u(arguments[n]));

          return e.join(" ");
        }

        n = 1;

        for (var r = arguments, i = r.length, a = String(t).replace(o, function (t) {
          if ("%%" === t) return "%";
          if (n >= i) return t;

          switch (t) {
            case "%s":
              return String(r[n++]);

            case "%d":
              return Number(r[n++]);

            case "%j":
              try {
                return JSON.stringify(r[n++]);
              } catch (t) {
                return "[Circular]";
              }

            default:
              return t;
          }
        }), s = r[n]; n < i; s = r[++n]) y(s) || !w(s) ? a += " " + s : a += " " + u(s);

        return a;
      }, e.deprecate = function (n, r) {
        if (void 0 !== t && !0 === t.noDeprecation) return n;
        if (void 0 === t) return function () {
          return e.deprecate(n, r).apply(this, arguments);
        };
        var o = !1;
        return function () {
          if (!o) {
            if (t.throwDeprecation) throw new Error(r);
            t.traceDeprecation ? console.trace(r) : console.error(r), o = !0;
          }

          return n.apply(this, arguments);
        };
      };
      var i,
          a = {};

      function u(t, n) {
        var r = {
          seen: [],
          stylize: l
        };
        return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), d(n) ? r.showHidden = n : n && e._extend(r, n), v(r.showHidden) && (r.showHidden = !1), v(r.depth) && (r.depth = 2), v(r.colors) && (r.colors = !1), v(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = s), c(r, t, r.depth);
      }

      function s(t, e) {
        var n = u.styles[e];
        return n ? "[" + u.colors[n][0] + "m" + t + "[" + u.colors[n][1] + "m" : t;
      }

      function l(t, e) {
        return t;
      }

      function c(t, n, r) {
        if (t.customInspect && n && T(n.inspect) && n.inspect !== e.inspect && (!n.constructor || n.constructor.prototype !== n)) {
          var o = n.inspect(r, t);
          return m(o) || (o = c(t, o, r)), o;
        }

        var i = function (t, e) {
          if (v(e)) return t.stylize("undefined", "undefined");

          if (m(e)) {
            var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return t.stylize(n, "string");
          }

          if (g(e)) return t.stylize("" + e, "number");
          if (d(e)) return t.stylize("" + e, "boolean");
          if (y(e)) return t.stylize("null", "null");
        }(t, n);

        if (i) return i;

        var a = Object.keys(n),
            u = function (t) {
          var e = {};
          return t.forEach(function (t, n) {
            e[t] = !0;
          }), e;
        }(a);

        if (t.showHidden && (a = Object.getOwnPropertyNames(n)), x(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return f(n);

        if (0 === a.length) {
          if (T(n)) {
            var s = n.name ? ": " + n.name : "";
            return t.stylize("[Function" + s + "]", "special");
          }

          if (b(n)) return t.stylize(RegExp.prototype.toString.call(n), "regexp");
          if (_(n)) return t.stylize(Date.prototype.toString.call(n), "date");
          if (x(n)) return f(n);
        }

        var l,
            w = "",
            O = !1,
            S = ["{", "}"];
        (h(n) && (O = !0, S = ["[", "]"]), T(n)) && (w = " [Function" + (n.name ? ": " + n.name : "") + "]");
        return b(n) && (w = " " + RegExp.prototype.toString.call(n)), _(n) && (w = " " + Date.prototype.toUTCString.call(n)), x(n) && (w = " " + f(n)), 0 !== a.length || O && 0 != n.length ? r < 0 ? b(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(n), l = O ? function (t, e, n, r, o) {
          for (var i = [], a = 0, u = e.length; a < u; ++a) A(e, String(a)) ? i.push(p(t, e, n, r, String(a), !0)) : i.push("");

          return o.forEach(function (o) {
            o.match(/^\d+$/) || i.push(p(t, e, n, r, o, !0));
          }), i;
        }(t, n, r, u, a) : a.map(function (e) {
          return p(t, n, r, u, e, O);
        }), t.seen.pop(), function (t, e, n) {
          if (t.reduce(function (t, e) {
            return 0, e.indexOf("\n") >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0) > 60) return n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1];
          return n[0] + e + " " + t.join(", ") + " " + n[1];
        }(l, w, S)) : S[0] + w + S[1];
      }

      function f(t) {
        return "[" + Error.prototype.toString.call(t) + "]";
      }

      function p(t, e, n, r, o, i) {
        var a, u, s;

        if ((s = Object.getOwnPropertyDescriptor(e, o) || {
          value: e[o]
        }).get ? u = s.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : s.set && (u = t.stylize("[Setter]", "special")), A(r, o) || (a = "[" + o + "]"), u || (t.seen.indexOf(s.value) < 0 ? (u = y(n) ? c(t, s.value, null) : c(t, s.value, n - 1)).indexOf("\n") > -1 && (u = i ? u.split("\n").map(function (t) {
          return "  " + t;
        }).join("\n").substr(2) : "\n" + u.split("\n").map(function (t) {
          return "   " + t;
        }).join("\n")) : u = t.stylize("[Circular]", "special")), v(a)) {
          if (i && o.match(/^\d+$/)) return u;
          (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"));
        }

        return a + ": " + u;
      }

      function h(t) {
        return Array.isArray(t);
      }

      function d(t) {
        return "boolean" == typeof t;
      }

      function y(t) {
        return null === t;
      }

      function g(t) {
        return "number" == typeof t;
      }

      function m(t) {
        return "string" == typeof t;
      }

      function v(t) {
        return void 0 === t;
      }

      function b(t) {
        return w(t) && "[object RegExp]" === O(t);
      }

      function w(t) {
        return "object" == typeof t && null !== t;
      }

      function _(t) {
        return w(t) && "[object Date]" === O(t);
      }

      function x(t) {
        return w(t) && ("[object Error]" === O(t) || t instanceof Error);
      }

      function T(t) {
        return "function" == typeof t;
      }

      function O(t) {
        return Object.prototype.toString.call(t);
      }

      function S(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10);
      }

      e.debuglog = function (n) {
        if (v(i) && (i = t.env.NODE_DEBUG || ""), n = n.toUpperCase(), !a[n]) if (new RegExp("\\b" + n + "\\b", "i").test(i)) {
          var r = t.pid;

          a[n] = function () {
            var t = e.format.apply(e, arguments);
            console.error("%s %d: %s", n, r, t);
          };
        } else a[n] = function () {};
        return a[n];
      }, e.inspect = u, u.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
      }, u.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
      }, e.isArray = h, e.isBoolean = d, e.isNull = y, e.isNullOrUndefined = function (t) {
        return null == t;
      }, e.isNumber = g, e.isString = m, e.isSymbol = function (t) {
        return "symbol" == typeof t;
      }, e.isUndefined = v, e.isRegExp = b, e.isObject = w, e.isDate = _, e.isError = x, e.isFunction = T, e.isPrimitive = function (t) {
        return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t;
      }, e.isBuffer = n(169);
      var P = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      function A(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }

      e.log = function () {
        var t, n;
        console.log("%s - %s", (t = new Date(), n = [S(t.getHours()), S(t.getMinutes()), S(t.getSeconds())].join(":"), [t.getDate(), P[t.getMonth()], n].join(" ")), e.format.apply(e, arguments));
      }, e.inherits = n(170), e._extend = function (t, e) {
        if (!e || !w(e)) return t;

        for (var n = Object.keys(e), r = n.length; r--;) t[n[r]] = e[n[r]];

        return t;
      };
      var D = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;

      function E(t, e) {
        if (!t) {
          var n = new Error("Promise was rejected with a falsy value");
          n.reason = t, t = n;
        }

        return e(t);
      }

      e.promisify = function (t) {
        if ("function" != typeof t) throw new TypeError('The "original" argument must be of type Function');

        if (D && t[D]) {
          var e;
          if ("function" != typeof (e = t[D])) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
          return Object.defineProperty(e, D, {
            value: e,
            enumerable: !1,
            writable: !1,
            configurable: !0
          }), e;
        }

        function e() {
          for (var e, n, r = new Promise(function (t, r) {
            e = t, n = r;
          }), o = [], i = 0; i < arguments.length; i++) o.push(arguments[i]);

          o.push(function (t, r) {
            t ? n(t) : e(r);
          });

          try {
            t.apply(this, o);
          } catch (t) {
            n(t);
          }

          return r;
        }

        return Object.setPrototypeOf(e, Object.getPrototypeOf(t)), D && Object.defineProperty(e, D, {
          value: e,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), Object.defineProperties(e, r(t));
      }, e.promisify.custom = D, e.callbackify = function (e) {
        if ("function" != typeof e) throw new TypeError('The "original" argument must be of type Function');

        function n() {
          for (var n = [], r = 0; r < arguments.length; r++) n.push(arguments[r]);

          var o = n.pop();
          if ("function" != typeof o) throw new TypeError("The last argument must be of type Function");

          var i = this,
              a = function () {
            return o.apply(i, arguments);
          };

          e.apply(this, n).then(function (e) {
            t.nextTick(a, null, e);
          }, function (e) {
            t.nextTick(E, e, a);
          });
        }

        return Object.setPrototypeOf(n, Object.getPrototypeOf(e)), Object.defineProperties(n, r(e)), n;
      };
    }).call(this, n(23));
  }, function (t, e) {
    t.exports = function (t) {
      return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8;
    };
  }, function (t, e) {
    "function" == typeof Object.create ? t.exports = function (t, e) {
      t.super_ = e, t.prototype = Object.create(e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
    } : t.exports = function (t, e) {
      t.super_ = e;

      var n = function () {};

      n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
    };
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__awaiter || function (t, e, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            i(t);
          }
        }

        function u(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            i(t);
          }
        }

        function s(t) {
          t.done ? o(t.value) : new n(function (e) {
            e(t.value);
          }).then(a, u);
        }

        s((r = r.apply(t, e || [])).next());
      });
    },
        o = this && this.__generator || function (t, e) {
      var n,
          r,
          o,
          i,
          a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      };
      return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this;
      }), i;

      function u(i) {
        return function (u) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");

            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return a.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;

                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break;
                  }

                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break;
                  }

                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break;
                  }

                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }

              i = e.call(t, a);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }

            if (5 & i[0]) throw i[1];
            return {
              value: i[0] ? i[1] : void 0,
              done: !0
            };
          }([i, u]);
        };
      }
    },
        i = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var a = new Map();

    function u(t) {
      return r(this, void 0, void 0, function () {
        var e, n, r;
        return o(this, function (o) {
          switch (o.label) {
            case 0:
              return void 0 !== (e = onnx.backend)[t] && function (t) {
                var e = t;
                if ("initialize" in e && "function" == typeof e.initialize && "createSessionHandler" in e && "function" == typeof e.createSessionHandler && "dispose" in e && "function" == typeof e.dispose) return !0;
                return !1;
              }(e[t]) ? e[t].disabled ? [3, 3] : (n = e[t], "object" == typeof (r = n.initialize()) && "then" in r ? [4, r] : [3, 2]) : [3, 3];

            case 1:
              r = o.sent(), o.label = 2;

            case 2:
              if (r) return a.set(t, n), [2, n];
              o.label = 3;

            case 3:
              return [2, void 0];
          }
        });
      });
    }

    e.Backend = function t(e) {
      return r(this, void 0, void 0, function () {
        var n, r, s, l, c, f, p, h, d;
        return o(this, function (o) {
          switch (o.label) {
            case 0:
              return e ? [3, 1] : [2, t(["webgl", "wasm", "cpu"])];

            case 1:
              n = "string" == typeof e ? [e] : e, o.label = 2;

            case 2:
              o.trys.push([2, 7, 8, 9]), r = i(n), s = r.next(), o.label = 3;

            case 3:
              return s.done ? [3, 6] : (l = s.value, (c = a.get(l)) ? [2, c] : [4, u(l)]);

            case 4:
              if (f = o.sent()) return [2, f];
              o.label = 5;

            case 5:
              return s = r.next(), [3, 3];

            case 6:
              return [3, 9];

            case 7:
              return p = o.sent(), h = {
                error: p
              }, [3, 9];

            case 8:
              try {
                s && !s.done && (d = r.return) && d.call(r);
              } finally {
                if (h) throw h.error;
              }

              return [7];

            case 9:
              throw new Error("no available backend to use");
          }
        });
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__awaiter || function (t, e, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(t) {
          try {
            s(r.next(t));
          } catch (t) {
            i(t);
          }
        }

        function u(t) {
          try {
            s(r.throw(t));
          } catch (t) {
            i(t);
          }
        }

        function s(t) {
          t.done ? o(t.value) : new n(function (e) {
            e(t.value);
          }).then(a, u);
        }

        s((r = r.apply(t, e || [])).next());
      });
    },
        o = this && this.__generator || function (t, e) {
      var n,
          r,
          o,
          i,
          a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      };
      return i = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this;
      }), i;

      function u(i) {
        return function (u) {
          return function (i) {
            if (n) throw new TypeError("Generator is already executing.");

            for (; a;) try {
              if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

              switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                case 0:
                case 1:
                  o = i;
                  break;

                case 4:
                  return a.label++, {
                    value: i[1],
                    done: !1
                  };

                case 5:
                  a.label++, r = i[1], i = [0];
                  continue;

                case 7:
                  i = a.ops.pop(), a.trys.pop();
                  continue;

                default:
                  if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                    a = 0;
                    continue;
                  }

                  if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                    a.label = i[1];
                    break;
                  }

                  if (6 === i[0] && a.label < o[1]) {
                    a.label = o[1], o = i;
                    break;
                  }

                  if (o && a.label < o[2]) {
                    a.label = o[2], a.ops.push(i);
                    break;
                  }

                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }

              i = e.call(t, a);
            } catch (t) {
              i = [6, t], r = 0;
            } finally {
              n = o = 0;
            }

            if (5 & i[0]) throw i[1];
            return {
              value: i[0] ? i[1] : void 0,
              done: !0
            };
          }([i, u]);
        };
      }
    },
        i = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    },
        a = this && this.__read || function (t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
          o,
          i = n.call(t),
          a = [];

      try {
        for (; (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value);
      } catch (t) {
        o = {
          error: t
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }

      return a;
    },
        u = this && this.__spread || function () {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(a(arguments[e]));

      return t;
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var s = n(3),
        l = function () {
      return function (t, e) {
        this.op = t, this.node = e;
      };
    }(),
        c = function () {
      function t(t, e, n) {
        this.graph = t, this.profiler = n, this.initialize(e);
      }

      return t.prototype.initialize = function (t) {
        var e = this;
        this.profiler.event("session", "ExecutionPlan.initialize", function () {
          var n = e.graph.getNodes();
          if (n.length !== t.length) throw new Error("The size of nodes and OPs do not match.");
          e._ops = t.map(function (t, e) {
            return new l(t, n[e]);
          }), e.reset(), e._starter = [], e._ops.forEach(function (t, n) {
            var r,
                o,
                a = !0;

            try {
              for (var u = i(t.node.inputs), s = u.next(); !s.done; s = u.next()) {
                var l = s.value;

                if (!e._values[l] && -1 === e.graph.getInputIndices().indexOf(l)) {
                  a = !1;
                  break;
                }
              }
            } catch (t) {
              r = {
                error: t
              };
            } finally {
              try {
                s && !s.done && (o = u.return) && o.call(u);
              } finally {
                if (r) throw r.error;
              }
            }

            a && e._starter.push(n);
          });
        });
      }, t.prototype.reset = function () {
        this._values = this.graph.getValues().map(function (t) {
          return t.tensor;
        });
      }, t.prototype.execute = function (t, e) {
        var n = this;
        return this.profiler.event("session", "ExecutionPlan.execute", function () {
          return r(n, void 0, void 0, function () {
            var n,
                a,
                l,
                c,
                f,
                p,
                h,
                d,
                y,
                g = this;
            return o(this, function (m) {
              switch (m.label) {
                case 0:
                  if (this.reset(), n = t.createInferenceHandler(), a = this.graph.getInputIndices(), e.length !== a.length) throw new Error("number of input tensors don't match the number of inputs to the model: actual: " + e.length + " expected: " + a.length);
                  e.forEach(function (t, e) {
                    var n = a[e];
                    g._values[n] = t;
                  }), l = this._starter.slice(0), c = this.graph.getValues(), f = this.graph.getNodes(), p = 0, h = function () {
                    var t, e, a, h, y, m;
                    return o(this, function (v) {
                      switch (v.label) {
                        case 0:
                          if (t = l[p++], e = d._ops[t], -1 !== (a = e.node.inputs.map(function (t) {
                            return g._values[t];
                          })).indexOf(void 0)) throw new Error("unresolved input detected: op: " + e.node);
                          return h = a, s.Logger.verbose("ExecPlan", "Runing op:" + e.node.name + " (" + h.map(function (t, n) {
                            return "'" + e.node.inputs[n] + "': " + t.type + "[" + t.dims.join(",") + "]";
                          }).join(", ") + ")"), [4, d.profiler.event("node", e.node.name, function () {
                            return r(g, void 0, void 0, function () {
                              var t;
                              return o(this, function (r) {
                                if (!(t = e.op).checkInputs(h)) throw new Error("invalid inputs detected; op: " + e.node.name);
                                return [2, t.run(n, h)];
                              });
                            });
                          })];

                        case 1:
                          if ((y = v.sent()).length !== e.node.outputs.length) throw new Error("the size of output does not match model definition.");
                          return y.forEach(function (t, n) {
                            var r = e.node.outputs[n];
                            if (g._values[r]) throw new Error("output [" + r + "] already has value: op:" + e.node.name);
                            g._values[r] = t;
                          }), m = new Set(), y.forEach(function (t, n) {
                            var r,
                                o,
                                a,
                                u,
                                s = e.node.outputs[n];

                            try {
                              for (var l = (r = void 0, i(c[s].to)), p = l.next(); !p.done; p = l.next()) {
                                var h = p.value,
                                    d = f[h],
                                    y = !0;

                                try {
                                  for (var v = (a = void 0, i(d.inputs)), b = v.next(); !b.done; b = v.next()) {
                                    var w = b.value;

                                    if (!g._values[w]) {
                                      y = !1;
                                      break;
                                    }
                                  }
                                } catch (t) {
                                  a = {
                                    error: t
                                  };
                                } finally {
                                  try {
                                    b && !b.done && (u = v.return) && u.call(v);
                                  } finally {
                                    if (a) throw a.error;
                                  }
                                }

                                y && m.add(h);
                              }
                            } catch (t) {
                              r = {
                                error: t
                              };
                            } finally {
                              try {
                                p && !p.done && (o = l.return) && o.call(l);
                              } finally {
                                if (r) throw r.error;
                              }
                            }
                          }), l.push.apply(l, u(m)), [2];
                      }
                    });
                  }, d = this, m.label = 1;

                case 1:
                  return p < l.length ? [5, h()] : [3, 3];

                case 2:
                  return m.sent(), [3, 1];

                case 3:
                  return y = [], this.graph.getOutputIndices().forEach(function (t, e) {
                    var n = g._values[t];
                    if (void 0 === n) throw new Error("required output [" + t + "] does not have value");
                    n.data, y.push(n);
                  }), s.Logger.verbose("ExecPlan", "disposing of inferenceHandler"), n.dispose(), [2, y];
              }
            });
          });
        });
      }, t;
    }();

    e.ExecutionPlan = c;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var r = n(9),
        o = n(174),
        i = n(0),
        a = function () {
      function t() {}

      return t.prototype.load = function (t, e) {
        var n = r.onnx.ModelProto.decode(t);
        if (i.LongUtil.longToNumber(n.irVersion) < 3) throw new Error("only support ONNX model with IR_VERSION>=3");
        this._opsets = n.opsetImport.map(function (t) {
          return {
            domain: t.domain,
            version: i.LongUtil.longToNumber(t.version)
          };
        }), this._graph = o.Graph.from(n.graph, e);
      }, Object.defineProperty(t.prototype, "graph", {
        get: function () {
          return this._graph;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(t.prototype, "opsets", {
        get: function () {
          return this._opsets;
        },
        enumerable: !0,
        configurable: !0
      }), t;
    }();

    e.Model = a;
  }, function (t, e, n) {
    "use strict";

    var r = this && this.__values || function (t) {
      var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
      return e ? e.call(t) : {
        next: function () {
          return t && n >= t.length && (t = void 0), {
            value: t && t[n++],
            done: !t
          };
        }
      };
    };

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = n(175),
        i = n(1),
        a = n(0);
    e.Graph = {
      from: function (t, e) {
        return new l(t, e);
      }
    };

    var u = function () {
      function t(t) {
        this._from = void 0, this._to = [], this.tensor = void 0, this.type = void 0, t && (this.type = a.ProtoUtil.tensorValueTypeFromProto(t.type.tensorType));
      }

      return Object.defineProperty(t.prototype, "from", {
        get: function () {
          return this._from;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(t.prototype, "to", {
        get: function () {
          return this._to;
        },
        enumerable: !0,
        configurable: !0
      }), t;
    }(),
        s = function () {
      return function (t) {
        this.name = t.name, this.opType = t.opType, this.inputs = [], this.outputs = [], this.attributes = new o.Attribute(t.attribute), this.executeNode = !0;
      };
    }(),
        l = function () {
      function t(t, e) {
        if (!t) throw new TypeError("graph is empty");
        this.buildGraph(t), this.transformGraph(e), this.checkIsAcyclic();
      }

      return t.prototype.getInputIndices = function () {
        return this._allInputIndices;
      }, t.prototype.getInputNames = function () {
        return this._allInputNames;
      }, t.prototype.getOutputIndices = function () {
        return this._allOutputIndices;
      }, t.prototype.getOutputNames = function () {
        return this._allOutputNames;
      }, t.prototype.getValues = function () {
        return this._allData;
      }, t.prototype.getNodes = function () {
        return this._nodes;
      }, t.prototype.buildGraph = function (t) {
        var e,
            n,
            o,
            l,
            c,
            f,
            p,
            h,
            d,
            y,
            g,
            m,
            v = new Map();
        this._allData = [], this._allInputIndices = [], this._allInputNames = [], this._allOutputIndices = [], this._allOutputNames = [], this._nodes = [];
        var b = new Map();
        if (!t.input) throw new Error("missing information in graph: input");
        var w = [];

        try {
          for (var _ = r(t.input), x = _.next(); !x.done; x = _.next()) {
            var T = x.value;
            if (v.has(T.name)) throw new Error("duplicated input name: " + T.name);
            var O = this._allData.push(new u(T)) - 1;
            v.set(T.name, O), w.push(T.name);
          }
        } catch (t) {
          e = {
            error: t
          };
        } finally {
          try {
            x && !x.done && (n = _.return) && n.call(_);
          } finally {
            if (e) throw e.error;
          }
        }

        if (!t.initializer) throw new Error("missing information in graph: initializer");

        try {
          for (var S = r(t.initializer), P = S.next(); !P.done; P = S.next()) {
            T = P.value;
            var A = v.get(T.name);

            if (void 0 === A) {
              var D = new u();
              D.type = {
                shape: {
                  dims: a.ProtoUtil.tensorDimsFromProto(T.dims)
                },
                tensorType: a.ProtoUtil.tensorDataTypeFromProto(T.dataType)
              }, A = this._allData.push(D) - 1, v.set(T.name, A);
            }

            this._allData[A]._from = -1, this._allData[A].tensor = i.Tensor.fromProto(T);
          }
        } catch (t) {
          o = {
            error: t
          };
        } finally {
          try {
            P && !P.done && (l = S.return) && l.call(S);
          } finally {
            if (o) throw o.error;
          }
        }

        for (T = 0; T < this._allData.length; T++) this._allData[T].tensor || (this._allInputIndices.push(T), this._allInputNames.push(w[T]));

        if (!t.output) throw new Error("missing information in graph: output");

        try {
          for (var E = r(t.output), I = E.next(); !I.done; I = E.next()) {
            T = I.value;
            if (v.has(T.name)) throw new Error("duplicated output name: " + T.name);
            O = this._allData.push(new u(T)) - 1;
            v.set(T.name, O), this._allOutputIndices.push(O), this._allOutputNames.push(T.name);
          }
        } catch (t) {
          c = {
            error: t
          };
        } finally {
          try {
            I && !I.done && (f = E.return) && f.call(E);
          } finally {
            if (c) throw c.error;
          }
        }

        if (!t.node) throw new Error("missing information in graph: node");

        try {
          for (var L = r(t.node), k = L.next(); !k.done; k = L.next()) {
            if (!(B = k.value).name) for (var M = 0;; M++) {
              var j = "unnamed_" + B.opType + "_" + M;

              if (!b.has(j)) {
                B.name = j;
                break;
              }
            }
            if (b.has(B.name)) throw new Error("duplicated node name: " + B.name);
            O = this._nodes.push(new s(B)) - 1;
            b.set(B.name, O);
          }
        } catch (t) {
          p = {
            error: t
          };
        } finally {
          try {
            k && !k.done && (h = L.return) && h.call(L);
          } finally {
            if (p) throw p.error;
          }
        }

        for (T = 0; T < this._nodes.length; T++) {
          var R = this._nodes[T];
          if (!(B = t.node[T]).output) throw new Error("missing output for node: " + B.name);

          try {
            for (var C = (d = void 0, r(B.output)), N = C.next(); !N.done; N = C.next()) {
              var F = N.value;
              if (void 0 === (z = v.get(F)) && (z = this._allData.push(new u()) - 1, v.set(F, z)), R.outputs.push(z), void 0 !== this._allData[z]._from) throw new Error("multiple nodes output to one data value: " + z);

              if (this._allData[z]._from = T, "Constant" === B.opType) {
                if (!B.attribute || 1 !== B.attribute.length || !B.attribute[0].t) throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");
                if (!B.output || 1 !== B.output.length) throw new Error("missing output or incorrect number of outputs for this Constant operator");
                R.outputs.pop(), R.executeNode = !1, this._allData[z]._from = -1, this._allData[z].tensor = i.Tensor.fromProto(B.attribute[0].t);
              }
            }
          } catch (t) {
            d = {
              error: t
            };
          } finally {
            try {
              N && !N.done && (y = C.return) && y.call(C);
            } finally {
              if (d) throw d.error;
            }
          }
        }

        for (T = 0; T < this._nodes.length; T++) {
          var B;
          R = this._nodes[T];
          if (!(B = t.node[T]).input) throw new Error("missing input for node: " + B.name);

          try {
            for (var U = (g = void 0, r(B.input)), G = U.next(); !G.done; G = U.next()) {
              var z,
                  W = G.value;
              if (void 0 === (z = v.get(W))) throw new Error("unrecognized input '" + W + "' for node: " + B.name);
              R.inputs.push(z), this._allData[z]._to.push(T);
            }
          } catch (t) {
            g = {
              error: t
            };
          } finally {
            try {
              G && !G.done && (m = U.return) && m.call(U);
            } finally {
              if (g) throw g.error;
            }
          }
        }

        return !0;
      }, t.prototype.checkIsAcyclic = function () {
        var t = this,
            e = new Set();

        this._allInputIndices.forEach(function (n) {
          t._allData[n]._to.forEach(function (t) {
            e.add(t);
          });
        });

        for (var n = Array.from(e), r = new Array(this._nodes.length).fill("white"), o = function () {
          var e = n.pop();
          "gray" === r[e] ? r[e] = "black" : (n.push(e), r[e] = "gray", i._nodes[e].outputs.forEach(function (o) {
            var i = t._allData[o];
            if (void 0 !== i.tensor) throw new Error("node outputs should not be initialized");
            if (i._from !== e) throw new Error("from property of the Value object doesn't match index of Node being processed");

            i._to.forEach(function (t) {
              if ("gray" === r[t]) throw new Error("model graph is cyclic");
              "white" === r[t] && n.push(t);
            });
          }));
        }, i = this; n.length > 0;) o();
      }, t.prototype.transformGraph = function (t) {
        this.removeAllIdentityNodes(), this.removeAllDropoutNodes(), t && t.transformGraph(this), this.finalizeGraph();
      }, t.prototype.finalizeGraph = function () {
        for (var t, e = this, n = 0, r = function (r) {
          if (!o._nodes[r].executeNode) return n++, o._nodes[r].outputs.forEach(function (t) {
            e._allData[t]._from = -2;
          }), o._nodes.splice(r, 1), t = --r, "continue";
          n > 0 && (o._nodes[r].inputs.forEach(function (t) {
            var o = e._allData[t]._to.indexOf(r + n);

            -1 !== o && (e._allData[t]._to[o] = r);
          }), o._nodes[r].outputs.forEach(function (t) {
            e._allData[t]._from && e._allData[t]._from === r + n && (e._allData[t]._from = r);
          })), t = r;
        }, o = this, i = 0; i < this._nodes.length; i++) r(i), i = t;

        n = 0;

        var a,
            u = function (t) {
          if (-2 === s._allData[t].from && -1 === s._allOutputIndices.indexOf(t + n)) return n++, s._allData.splice(t, 1), a = --t, "continue";

          if (n > 0) {
            var r = -1;
            void 0 !== s._allData[t].from && -1 !== s._allData[t].from ? -1 !== (r = s._nodes[s._allData[t].from].outputs.indexOf(t + n)) && (s._nodes[s._allData[t].from].outputs[r] = t) : -1 !== (r = s._allInputIndices.indexOf(t + n)) && (s._allInputIndices[r] = t), s._allData[t].to.forEach(function (o) {
              -1 !== (r = e._nodes[o].inputs.indexOf(t + n)) && (e._nodes[o].inputs[r] = t);
            }), 0 === s._allData[t].to.length && -1 !== (r = s._allOutputIndices.indexOf(t + n)) && (s._allOutputIndices[r] = t);
          }

          a = t;
        },
            s = this;

        for (i = 0; i < this._allData.length; i++) u(i), i = a;
      }, t.prototype.deleteNode = function (t) {
        var e,
            n,
            o = this._nodes[t];
        if (o.inputs.length > 1) throw new Error("Node deletion with multiple inputs is not supported. ");
        if (o.outputs.length > 1) for (var i = 1; i < o.outputs.length; i++) if (this._allData[o.outputs[i]].to.length > 0) throw new Error("Node deletion with more than one output connected to other nodes is not supported. ");
        o.executeNode = !1;

        var a = o.inputs[0],
            u = o.outputs[0],
            s = this._allData[u].to,
            l = this._allData[a].to.indexOf(t);

        if (-1 === l) throw new Error("The Value object doesn't have the current Node in it's 'to' property ");
        this._allData[a].to.splice(l, 1), this._allData[u]._to = [];

        var c = this._allOutputIndices.indexOf(u);

        if (-1 !== c && (this._allOutputIndices[c] = a), s && s.length > 0) try {
          for (var f = r(s), p = f.next(); !p.done; p = f.next()) {
            var h = p.value,
                d = this._nodes[h].inputs.indexOf(u);

            if (-1 === d) throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");
            this._nodes[h].inputs[d] = a, this._allData[a].to.push(h);
          }
        } catch (t) {
          e = {
            error: t
          };
        } finally {
          try {
            p && !p.done && (n = f.return) && n.call(f);
          } finally {
            if (e) throw e.error;
          }
        }
      }, t.prototype.removeAllDropoutNodes = function () {
        var t,
            e,
            n = 0;

        try {
          for (var o = r(this._nodes), i = o.next(); !i.done; i = o.next()) {
            var a = i.value;

            if ("Dropout" === a.opType) {
              if (1 !== a.inputs.length) throw new Error("Dropout nodes should only contain one input. ");
              if (1 !== a.outputs.length && 2 !== a.outputs.length) throw new Error("Dropout nodes should contain either 1 or 2 output(s)");
              if (2 === a.outputs.length && 0 !== this._allData[a.outputs[1]]._to.length) throw new Error("Dropout nodes's second output should not be referenced by other nodes");
              this.deleteNode(n);
            }

            n++;
          }
        } catch (e) {
          t = {
            error: e
          };
        } finally {
          try {
            i && !i.done && (e = o.return) && e.call(o);
          } finally {
            if (t) throw t.error;
          }
        }
      }, t.prototype.removeAllIdentityNodes = function () {
        var t,
            e,
            n = 0;

        try {
          for (var o = r(this._nodes), i = o.next(); !i.done; i = o.next()) {
            "Identity" === i.value.opType && this.deleteNode(n), n++;
          }
        } catch (e) {
          t = {
            error: e
          };
        } finally {
          try {
            i && !i.done && (e = o.return) && e.call(o);
          } finally {
            if (t) throw t.error;
          }
        }
      }, t;
    }();
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      var r = this && this.__values || function (t) {
        var e = "function" == typeof Symbol && t[Symbol.iterator],
            n = 0;
        return e ? e.call(t) : {
          next: function () {
            return t && n >= t.length && (t = void 0), {
              value: t && t[n++],
              done: !t
            };
          }
        };
      },
          o = this && this.__importDefault || function (t) {
        return t && t.__esModule ? t : {
          default: t
        };
      };

      Object.defineProperty(e, "__esModule", {
        value: !0
      });

      var i = o(n(13)),
          a = n(9),
          u = n(1),
          s = n(0),
          l = function () {
        function e(t) {
          var n, o;

          if (this._attributes = new Map(), null != t) {
            try {
              for (var i = r(t), a = i.next(); !a.done; a = i.next()) {
                var u = a.value;

                this._attributes.set(u.name, [e.getValue(u), e.getType(u)]);
              }
            } catch (t) {
              n = {
                error: t
              };
            } finally {
              try {
                a && !a.done && (o = i.return) && o.call(i);
              } finally {
                if (n) throw n.error;
              }
            }

            if (this._attributes.size < t.length) throw new Error("duplicated attribute names");
          }
        }

        return e.prototype.set = function (t, e, n) {
          this._attributes.set(t, [n, e]);
        }, e.prototype.delete = function (t) {
          this._attributes.delete(t);
        }, e.prototype.getFloat = function (t, e) {
          return this.get(t, "float", e);
        }, e.prototype.getInt = function (t, e) {
          return this.get(t, "int", e);
        }, e.prototype.getString = function (t, e) {
          return this.get(t, "string", e);
        }, e.prototype.getTensor = function (t, e) {
          return this.get(t, "tensor", e);
        }, e.prototype.getFloats = function (t, e) {
          return this.get(t, "floats", e);
        }, e.prototype.getInts = function (t, e) {
          return this.get(t, "ints", e);
        }, e.prototype.getStrings = function (t, e) {
          return this.get(t, "strings", e);
        }, e.prototype.getTensors = function (t, e) {
          return this.get(t, "tensors", e);
        }, e.prototype.get = function (t, e, n) {
          var r = this._attributes.get(t);

          if (void 0 === r) {
            if (void 0 !== n) return n;
            throw new Error("required attribute not found: " + t);
          }

          if (r[1] !== e) throw new Error("type mismatch: expected " + e + " but got " + r[1]);
          return r[0];
        }, e.getType = function (t) {
          switch (t.type) {
            case a.onnx.AttributeProto.AttributeType.FLOAT:
              return "float";

            case a.onnx.AttributeProto.AttributeType.INT:
              return "int";

            case a.onnx.AttributeProto.AttributeType.STRING:
              return "string";

            case a.onnx.AttributeProto.AttributeType.TENSOR:
              return "tensor";

            case a.onnx.AttributeProto.AttributeType.FLOATS:
              return "floats";

            case a.onnx.AttributeProto.AttributeType.INTS:
              return "ints";

            case a.onnx.AttributeProto.AttributeType.STRINGS:
              return "strings";

            case a.onnx.AttributeProto.AttributeType.TENSORS:
              return "tensors";

            default:
              throw new Error("attribute type is not supported yet: " + a.onnx.AttributeProto.AttributeType[t.type]);
          }
        }, e.getValue = function (e) {
          if (e.type === a.onnx.AttributeProto.AttributeType.GRAPH || e.type === a.onnx.AttributeProto.AttributeType.GRAPHS) throw new Error("graph attribute is not supported yet");
          var n = this.getValueNoCheck(e);
          if (e.type === a.onnx.AttributeProto.AttributeType.INT && i.default.isLong(n)) return n.toNumber();

          if (e.type === a.onnx.AttributeProto.AttributeType.INTS) {
            for (var r = n, o = new Array(r.length), l = 0; l < r.length; l++) {
              var c = r[l];
              o[l] = s.LongUtil.longToNumber(c);
            }

            return o;
          }

          if (e.type === a.onnx.AttributeProto.AttributeType.TENSOR) return u.Tensor.fromProto(n);
          if (e.type === a.onnx.AttributeProto.AttributeType.TENSORS) return n.map(function (t) {
            return u.Tensor.fromProto(t);
          });

          if (e.type === a.onnx.AttributeProto.AttributeType.STRING) {
            var f = n;
            return t.from(f.buffer, f.byteOffset, f.byteLength).toString();
          }

          return e.type === a.onnx.AttributeProto.AttributeType.STRINGS ? n.map(function (e) {
            return t.from(e.buffer, e.byteOffset, e.byteLength).toString();
          }) : n;
        }, e.getValueNoCheck = function (t) {
          switch (t.type) {
            case a.onnx.AttributeProto.AttributeType.FLOAT:
              return t.f;

            case a.onnx.AttributeProto.AttributeType.INT:
              return t.i;

            case a.onnx.AttributeProto.AttributeType.STRING:
              return t.s;

            case a.onnx.AttributeProto.AttributeType.TENSOR:
              return t.t;

            case a.onnx.AttributeProto.AttributeType.GRAPH:
              return t.g;

            case a.onnx.AttributeProto.AttributeType.FLOATS:
              return t.floats;

            case a.onnx.AttributeProto.AttributeType.INTS:
              return t.ints;

            case a.onnx.AttributeProto.AttributeType.STRINGS:
              return t.strings;

            case a.onnx.AttributeProto.AttributeType.TENSORS:
              return t.tensors;

            case a.onnx.AttributeProto.AttributeType.GRAPHS:
              return t.graphs;

            default:
              throw new Error("unsupported attribute type: " + a.onnx.AttributeProto.AttributeType[t.type]);
          }
        }, e;
      }();

      e.Attribute = l;
    }).call(this, n(12).Buffer);
  }]);
});

/***/ }),

/***/ "./node_modules/uniq/uniq.js":
/*!***********************************!*\
  !*** ./node_modules/uniq/uniq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function unique_pred(list, compare) {
  var ptr = 1,
      len = list.length,
      a = list[0],
      b = list[0];

  for (var i = 1; i < len; ++i) {
    b = a;
    a = list[i];

    if (compare(a, b)) {
      if (i === ptr) {
        ptr++;
        continue;
      }

      list[ptr++] = a;
    }
  }

  list.length = ptr;
  return list;
}

function unique_eq(list) {
  var ptr = 1,
      len = list.length,
      a = list[0],
      b = list[0];

  for (var i = 1; i < len; ++i, b = a) {
    b = a;
    a = list[i];

    if (a !== b) {
      if (i === ptr) {
        ptr++;
        continue;
      }

      list[ptr++] = a;
    }
  }

  list.length = ptr;
  return list;
}

function unique(list, compare, sorted) {
  if (list.length === 0) {
    return list;
  }

  if (compare) {
    if (!sorted) {
      list.sort(compare);
    }

    return unique_pred(list, compare);
  }

  if (!sorted) {
    list.sort();
  }

  return unique_eq(list);
}

module.exports = unique;

/***/ })

/******/ });
});
//# sourceMappingURL=clientside.js.map